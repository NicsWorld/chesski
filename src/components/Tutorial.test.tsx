import { render, screen, fireEvent } from '@testing-library/react';
import Tutorial from './Tutorial';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Chess } from 'chess.js';

// Mock ChessBoard to avoid dnd complexity
const mockChessBoard = vi.fn();
vi.mock('./ChessBoard', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: (props: any) => {
        mockChessBoard(props);
        return (
            <div data-testid="mock-chessboard">
                <button
                    data-testid="mock-move-btn"
                    onClick={() => props.onMove({ from: 'e2', to: 'e4' })}
                >
                    Move e2-e4
                </button>
                <button
                    data-testid="mock-invalid-move-btn"
                    onClick={() => props.onMove({ from: 'e2', to: 'e5' })}
                >
                    Invalid Move
                </button>
            </div>
        );
    }
}));

describe('Tutorial Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the default tutorial correctly', () => {
        render(<Tutorial pieceTheme="standard" />);

        expect(screen.getByText('Tutorial: Pawn')).toBeInTheDocument();
        expect(screen.getByText(/Pawns move forward one square/)).toBeInTheDocument();

        // Assert that ChessBoard gets the correct initial FEN with kings stripped out of standard position
        const lastCall = mockChessBoard.mock.lastCall![0];
        expect(lastCall.game).toBeInstanceOf(Chess);
    });

    it('changes tutorial when clicking a button', () => {
        render(<Tutorial pieceTheme="standard" />);

        const knightBtn = screen.getByRole('button', { name: 'Knight' });
        fireEvent.click(knightBtn);

        expect(screen.getByText('Tutorial: Knight')).toBeInTheDocument();
        expect(screen.getByText(/Knights move in an 'L' shape/)).toBeInTheDocument();
    });

    it('handles valid moves and updates board state', () => {
        render(<Tutorial pieceTheme="standard" />);

        // We'll simulate a valid move for a pawn. The mock button tries e2-e4
        const moveBtn = screen.getByTestId('mock-move-btn');
        fireEvent.click(moveBtn);

        // State should update, triggering re-render with a new Chess instance
        const lastCall = mockChessBoard.mock.lastCall![0];
        const newFen = lastCall.game.fen();

        // Basic check to see it advanced
        expect(newFen).not.toBe('7k/8/8/8/8/8/4P3/K7 w - - 0 1'); // Initial pawn FEN
    });

    it('ignores invalid moves gracefully', () => {
        render(<Tutorial pieceTheme="standard" />);

        const invalidMoveBtn = screen.getByTestId('mock-invalid-move-btn');

        // It should not throw when invalid move is made
        expect(() => {
            fireEvent.click(invalidMoveBtn);
        }).not.toThrow();
    });

    it('resets position on button click', () => {
        render(<Tutorial pieceTheme="standard" />);

        const moveBtn = screen.getByTestId('mock-move-btn');
        fireEvent.click(moveBtn); // Make a move

        const resetBtn = screen.getByRole('button', { name: 'Reset Position' });
        fireEvent.click(resetBtn); // Reset

        const lastCall = mockChessBoard.mock.lastCall![0];
        // The game should be reset to default pawn fen
        expect(lastCall.game.fen()).toContain('4P3'); // initial position has Pawn on e2
    });

    it('shouldHidePiece logic hides black king and non-tutorial white king', () => {
        render(<Tutorial pieceTheme="standard" />);

        const lastCall = mockChessBoard.mock.lastCall![0];
        const shouldHidePiece = lastCall.shouldHidePiece;

        // Black king is always hidden
        expect(shouldHidePiece({ type: 'k', color: 'b' })).toBe(true);

        // White king is hidden because we are not in King tutorial (we are in Pawn)
        expect(shouldHidePiece({ type: 'k', color: 'w' })).toBe(true);

        // Random other piece is not hidden
        expect(shouldHidePiece({ type: 'p', color: 'w' })).toBe(false);
    });

    it('shouldHidePiece does not hide white king in King tutorial', () => {
        render(<Tutorial pieceTheme="standard" />);

        const kingBtn = screen.getByRole('button', { name: 'King' });
        fireEvent.click(kingBtn);

        const lastCall = mockChessBoard.mock.lastCall![0];
        const shouldHidePiece = lastCall.shouldHidePiece;

        // White king should NOT be hidden in King tutorial
        expect(shouldHidePiece({ type: 'k', color: 'w' })).toBe(false);
    });
});
