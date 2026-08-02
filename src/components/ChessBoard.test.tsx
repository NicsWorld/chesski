import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chess } from 'chess.js';
import ChessBoard from './ChessBoard';

vi.mock('react-dnd', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useDrop: (specFn: any) => {
        const spec = specFn();
        return [
            { isOver: false, canDrop: false },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node: any) => {
                if (node) {
                    node.__dropSpec = spec;
                }
            }
        ];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useDrag: (specFn: any) => {
        const spec = specFn();
        return [
            { isDragging: false },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node: any) => {
                if (node) {
                    node.__dragSpec = spec;
                }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node: any) => {
                if (node) {
                    node.__previewSpec = spec;
                }
            }
        ];
    }
}));

vi.mock('./Piece', () => {

    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        default: (props: any) => (
            <img
                data-testid={`piece-${props.position}`}
                alt={`${props.piece.color} ${props.piece.type}`}
                onClick={() => props.onDragStart()}
                onDoubleClick={() => props.onDragEnd()}
            />
        )
    };
});

describe('ChessBoard', () => {
    it('renders the board with correct number of squares', () => {
        const game = new Chess();
        const onMove = vi.fn();
        render(<ChessBoard game={game} onMove={onMove} pieceTheme="standard" />);
        expect(screen.getByTestId('a1')).toBeInTheDocument();
        expect(screen.getByTestId('h8')).toBeInTheDocument();
    });

    it('triggers onMove when a piece is dropped on a valid square', () => {
        const game = new Chess();
        const onMove = vi.fn();
        render(<ChessBoard game={game} onMove={onMove} pieceTheme="standard" />);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const targetSquare = screen.getByTestId('a3') as any;
        expect(targetSquare.__dropSpec).toBeDefined();

        act(() => {
            targetSquare.__dropSpec.drop({ id: 'wP', position: 'a2' });
        });

        expect(onMove).toHaveBeenCalledWith({ from: 'a2', to: 'a3', promotion: 'q' });
    });

    it('renders correctly with hidden pieces', () => {
        const game = new Chess();
        const onMove = vi.fn();
        const shouldHidePiece = (piece: { type: string; color: string }) => piece.color === 'w';

        render(<ChessBoard game={game} onMove={onMove} pieceTheme="standard" shouldHidePiece={shouldHidePiece} />);

        const pieces = screen.getAllByRole('img');
        expect(pieces.length).toBe(16);
        pieces.forEach(img => {
            expect(img.getAttribute('alt')).toMatch(/^b /);
        });
    });

    it('highlights valid moves when dragging starts, and clears them when dragging ends', () => {
        const game = new Chess();
        const onMove = vi.fn();
        render(<ChessBoard game={game} onMove={onMove} pieceTheme="standard" />);

        // Find piece on e2 (White pawn)
        const pawn = screen.getByTestId('piece-e2');

        // Before drag start, e3 and e4 should not have highlights
        const e3Square = screen.getByTestId('e3');
        expect(e3Square.innerHTML).not.toContain('rgba(0, 0, 0, 0.15)');

        // Simulate onDragStart
        act(() => {
            fireEvent.click(pawn);
        });

        // After drag start, e3 and e4 should be highlighted
        expect(e3Square.innerHTML).toContain('rgba(0, 0, 0, 0.15)');
        const e4Square = screen.getByTestId('e4');
        expect(e4Square.innerHTML).toContain('rgba(0, 0, 0, 0.15)');

        // Simulate onDragEnd
        act(() => {
            fireEvent.doubleClick(pawn);
        });

        // Highlights should be cleared
        expect(e3Square.innerHTML).not.toContain('rgba(0, 0, 0, 0.15)');
    });
});
