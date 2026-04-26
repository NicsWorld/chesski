import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Chess } from 'chess.js';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';
import ChessBoard from '../ChessBoard';

// We mock the Piece component to make testing onDragStart and onDragEnd easier
// without needing to simulate actual complex react-dnd dragging mechanics
vi.mock('../Piece', () => {
    return {
        default: ({ position, onDragStart, onDragEnd }: any) => (
            <div data-testid={`mock-piece-${position}`}>
                <button data-testid={`drag-start-${position}`} onClick={onDragStart}>Drag Start</button>
                <button data-testid={`drag-end-${position}`} onClick={onDragEnd}>Drag End</button>
            </div>
        )
    };
});

// Since we also need to trigger a drop, we can either mock react-dnd useDrop entirely or we can simulate it.
// Actually, since handleDrop is bound to the BoardSquare's onDrop prop in SquareWrapper,
// testing SquareWrapper's drop is easiest by extracting handleDrop from props, but SquareWrapper is internal.
// Let's just mock SquareWrapper inside ChessBoard? No, ChessBoard defines it internally.
// A simpler way: we can spy on ChessBoard's state or simply mock react-dnd to expose the drop callback.
// Another approach: since handleDrop is passed to onDrop prop of SquareWrapper, and SquareWrapper passes it to drop().
// We can use the TestBackend from react-dnd-test-backend to simulate drop.
// Alternatively, we can mock react-dnd's useDrop to intercept the drop handler.
vi.mock('react-dnd', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-dnd')>();
    return {
        ...actual,
        useDrop: vi.fn((specFn) => {
            specFn();
            return [
                { isOver: false, canDrop: false },
                (node: any) => node // dummy drop ref
            ];
        }),
    };
});

import { useDrop } from 'react-dnd';

describe('ChessBoard', () => {
    let game: Chess;
    let onMoveMock: any;

    beforeEach(() => {
        game = new Chess();
        onMoveMock = vi.fn();
    });

    const renderChessBoard = (props = {}) => {
        return render(
            <DndProvider backend={TestBackend}>
                <ChessBoard
                    game={game}
                    onMove={onMoveMock}
                    pieceTheme="standard"
                    {...props}
                />
            </DndProvider>
        );
    };

    it('renders 64 squares', () => {
        renderChessBoard();
        const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

        for (const rank of RANKS) {
            for (const file of FILES) {
                expect(screen.getByTestId(`${file}${rank}`)).toBeInTheDocument();
            }
        }
    });


    it('hides a piece when shouldHidePiece returns true', () => {
        // Let's modify shouldHidePiece to just hide the black pawn on a7 by checking if it hides all black pawns
        const shouldHideAllBlackPawns = vi.fn((piece) => {
            return piece.type === 'p' && piece.color === 'b';
        });

        renderChessBoard({ shouldHidePiece: shouldHideAllBlackPawns });

        // A white pawn on a2 should still be visible
        expect(screen.getByTestId('a2')).toBeInTheDocument();
        // Since we mocked Piece, it renders a div with data-testid mock-piece-a2, not an img
        expect(screen.queryByTestId('mock-piece-a2')).toBeInTheDocument();

        // The a7 pawn (black pawn) should be hidden
        expect(screen.getByTestId('a7')).toBeInTheDocument();
        expect(screen.queryByTestId('mock-piece-a7')).not.toBeInTheDocument();

        // Ensure shouldHidePiece was called
        expect(shouldHideAllBlackPawns).toHaveBeenCalled();
    });


    it('highlights squares on drag start and triggers onMove on drop', async () => {
        renderChessBoard();

        // Let's mock the drop action that would happen on square e4
        // We know that useDrop was called 64 times for each square.
        // Let's extract the drop callback for 'e4'
        const useDropMock = vi.mocked(useDrop);

        // Iterate through all calls to useDrop to find the one associated with the e4 SquareWrapper
        // We can't directly know which one is e4 from the specFn without executing it,
        // but we can execute the `drop` function from the spec to see if it calls our mocked handleDrop
        // by looking at the closures.

        // Actually, we can trigger the onDragStart from the mock Piece
        const dragStartE2 = screen.getByTestId('drag-start-e2');

        await act(async () => {
            fireEvent.click(dragStartE2);
        });

        // After dragStart, legal moves from e2 (which is a pawn) are e3 and e4
        // The ChessBoard component renders a highlight div for these squares
        const e3Square = screen.getByTestId('e3');
        const e4Square = screen.getByTestId('e4');

        // Look for the highlight div. In the ChessBoard component, the highlight div has a background-color of rgba(0, 0, 0, 0.15)
        // We can just verify that it added the div by checking its children count or inner HTML.
        expect(e3Square.innerHTML).toContain('rgba(0, 0, 0, 0.15)');
        expect(e4Square.innerHTML).toContain('rgba(0, 0, 0, 0.15)');

        // Now, to simulate a drop, we can just find the spec function for e4
        // Since we are mocking useDrop, let's just intercept the calls.
        // Each SquareWrapper calls useDrop(() => ({ accept, drop: ..., collect })
        // We can find the call where dropping triggers the handleDrop for e4.
        const allDropCalls = useDropMock.mock.calls;
        for (const call of allDropCalls) {
            const specFn = call[0] as unknown as () => any;
            const spec = specFn();
            if (spec.drop) {
                // If we call this drop function with item={ position: 'e2' }, it will call onMove with to: 'the_square'
                // We don't know the_square, but we can call all of them and check when onMoveMock is called with 'e4'
                // Or better, we can clear the mock, call drop, check if it matched.
            }
        }

        // Actually, let's trigger it specifically by finding the one that resolves to e4.
        // Wait, every square has a drop handler. If we call it, it triggers onMoveMock.
        await act(async () => {
            for (const call of allDropCalls) {
                const specFn = call[0] as unknown as () => any;
                const spec = specFn();
                spec.drop({ id: 'wp', position: 'e2' });
            }
        });

        // At least one of these calls should have been to 'e4' with from 'e2'
        expect(onMoveMock).toHaveBeenCalledWith({
            from: 'e2',
            to: 'e4',
            promotion: 'q'
        });

        // Trigger drag end
        const dragEndE2 = screen.getByTestId('drag-end-e2');
        await act(async () => {
            fireEvent.click(dragEndE2);
        });

        // Highlights should be cleared
        // Since we dropped on all squares, state might have changed, but validMoves is cleared on drop anyway.
        // Let's re-query and check
        expect(e3Square.innerHTML).not.toContain('rgba(0, 0, 0, 0.15)');
        expect(e4Square.innerHTML).not.toContain('rgba(0, 0, 0, 0.15)');
    });
});
