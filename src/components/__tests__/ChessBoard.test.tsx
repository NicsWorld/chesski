import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ChessBoard from '../ChessBoard';
import { Chess } from 'chess.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

let capturedDropHandlers: Record<string, (item: { id: string; position: string }) => void> = {};

vi.mock('react-dnd', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-dnd')>();
    return {
        ...actual,
        useDrop: (specFn: () => { drop: (item: { id: string; position: string }) => void }) => {
            const spec = specFn();
            const dropRef = (node: HTMLElement | null) => {
                if (node && node.dataset.testid) {
                    capturedDropHandlers[node.dataset.testid] = spec.drop;
                }
            };
            return [
                { isOver: false, canDrop: false },
                dropRef,
            ];
        },
    };
});

// Since we cannot put functions directly on DOM attributes, we'll put them on a window object mapping
// or just use custom DOM events that the mock listens for.
// Let's use custom events.
interface MockPieceProps {
    piece: { color: string; type: string };
    position: string;
    onDragStart: () => void;
    onDragEnd: () => void;
}

vi.mock('../Piece', () => {
    return {
        default: ({ piece, position, onDragStart, onDragEnd }: MockPieceProps) => {
            return (
                <div
                    data-testid={`piece-${position}`}
                    data-piece={`${piece.color}${piece.type}`}
                    ref={(node) => {
                        if (node) {
                            // We can attach the functions directly to the node object
                            (node as unknown as { triggerDragStart: () => void }).triggerDragStart = onDragStart;
                            (node as unknown as { triggerDragEnd: () => void }).triggerDragEnd = onDragEnd;
                        }
                    }}
                >
                    {`${piece.color}${piece.type}`}
                </div>
            );
        }
    };
});


describe('ChessBoard', () => {
    let game: Chess;
    let onMoveMock: Mock<(...args: any[]) => any>;

    beforeEach(() => {
        game = new Chess();
        onMoveMock = vi.fn();
        capturedDropHandlers = {};
    });

    const renderBoard = (props = {}) => {
        return render(
            <DndProvider backend={HTML5Backend}>
                <ChessBoard
                    game={game}
                    onMove={onMoveMock}
                    pieceTheme="standard"
                    {...props}
                />
            </DndProvider>
        );
    };

    it('renders all 64 squares', () => {
        renderBoard();
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

        for (const file of files) {
            for (const rank of ranks) {
                expect(screen.getByTestId(`${file}${rank}`)).toBeInTheDocument();
            }
        }
    });

    it('renders pieces in their initial positions', () => {
        renderBoard();

        expect(screen.getByTestId('piece-e2')).toHaveAttribute('data-piece', 'wp');
        expect(screen.getByTestId('piece-e1')).toHaveAttribute('data-piece', 'wk');
        expect(screen.getByTestId('piece-e7')).toHaveAttribute('data-piece', 'bp');
        expect(screen.getByTestId('piece-e8')).toHaveAttribute('data-piece', 'bk');

        expect(screen.queryByTestId('piece-e4')).not.toBeInTheDocument();
    });

    it('calls onMove when a piece is dropped', () => {
        renderBoard();

        const dropHandler = capturedDropHandlers['e4'];
        expect(dropHandler).toBeDefined();

        // Simulate dropping the piece from e2 onto e4
        act(() => {
            dropHandler({ id: 'wp', position: 'e2' });
        });

        expect(onMoveMock).toHaveBeenCalledWith({
            from: 'e2',
            to: 'e4',
            promotion: 'q'
        });
    });

    it('highlights valid moves when dragging starts and clears them when dragging ends', () => {
        renderBoard();

        const pieceE2 = screen.getByTestId('piece-e2');
        const triggerDragStart = (pieceE2 as unknown as { triggerDragStart: () => void }).triggerDragStart;
        const triggerDragEnd = (pieceE2 as unknown as { triggerDragEnd: () => void }).triggerDragEnd;

        // Verify no highlights initially
        // A highlight dot in BoardSquare is rendered when `highlight && !children`
        // We can check if a square has a child dot. Let's look for the dot.
        // The dot has a background-color: rgba(0, 0, 0, 0.15)
        // It's easier to verify highlight by checking the DOM for the specific highlight div, but it has no test id.
        // We can just query by style.
        const e3Square = screen.getByTestId('e3');
        const e4Square = screen.getByTestId('e4');

        const hasHighlightChild = (square: HTMLElement) => {
            return Array.from(square.querySelectorAll('div')).some(
                div => div.style.backgroundColor === 'rgba(0, 0, 0, 0.15)'
            );
        };

        expect(hasHighlightChild(e3Square)).toBe(false);
        expect(hasHighlightChild(e4Square)).toBe(false);

        // Start dragging e2 pawn
        act(() => {
            triggerDragStart();
        });

        // e3 and e4 should now be highlighted
        expect(hasHighlightChild(e3Square)).toBe(true);
        expect(hasHighlightChild(e4Square)).toBe(true);

        // End dragging
        act(() => {
            triggerDragEnd();
        });

        // Highlights should be cleared
        expect(hasHighlightChild(e3Square)).toBe(false);
        expect(hasHighlightChild(e4Square)).toBe(false);
    });

    it('hides pieces when shouldHidePiece returns true', () => {
        renderBoard({
            shouldHidePiece: (piece: { type: string; color: string }) => piece.type === 'p' && piece.color === 'w'
        });

        // White pawns should be hidden
        expect(screen.queryByTestId('piece-e2')).not.toBeInTheDocument();

        // White king should still be visible
        expect(screen.getByTestId('piece-e1')).toBeInTheDocument();

        // Black pawns should still be visible
        expect(screen.getByTestId('piece-e7')).toBeInTheDocument();
    });
});
