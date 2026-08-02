import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tutorial from './Tutorial';

vi.mock('./ChessBoard', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ game, onMove, shouldHidePiece, pieceTheme }: any) => (
        <div data-testid="mock-chessboard" data-fen={game.fen()} data-theme={pieceTheme}>
            <button data-testid="trigger-move" onClick={() => onMove({ from: 'e2', to: 'e4' })}>Move e4</button>
            <button data-testid="trigger-invalid-move" onClick={() => onMove({ from: 'e2', to: 'e5' })}>Move invalid</button>
            <div data-testid="hide-b-king">{shouldHidePiece({ type: 'k', color: 'b' }).toString()}</div>
            <div data-testid="hide-w-king">{shouldHidePiece({ type: 'k', color: 'w' }).toString()}</div>
            <div data-testid="hide-pawn">{shouldHidePiece({ type: 'p', color: 'w' }).toString()}</div>
        </div>
    )
}));

describe('Tutorial', () => {
    it("renders the first tutorial by default", () => {
        render(<Tutorial pieceTheme="standard" />);
        expect(screen.getByText('Tutorial: Pawn')).toBeInTheDocument();
        expect(screen.getByText(/Pawns move forward/)).toBeInTheDocument();
    });

    it("changes tutorial when a different tutorial button is clicked", () => {
        render(<Tutorial pieceTheme="standard" />);

        const rookButton = screen.getByText('Rook');
        fireEvent.click(rookButton);

        expect(screen.getByText('Tutorial: Rook')).toBeInTheDocument();
        expect(screen.getByText(/Rooks move in straight lines/)).toBeInTheDocument();

        const board = screen.getByTestId('mock-chessboard');
        expect(board).toHaveAttribute('data-fen', '8/8/8/8/3R4/8/8/8 w - - 0 1');
    });

    it("resets position when reset button is clicked", () => {
        render(<Tutorial pieceTheme="standard" />);
        const board = screen.getByTestId('mock-chessboard');

        expect(board).toHaveAttribute('data-fen', '8/8/8/8/8/8/4P3/8 w - - 0 1');

        fireEvent.click(screen.getByTestId('trigger-move'));

        expect(board).toHaveAttribute('data-fen', '8/8/8/8/4P3/8/8/8 w - - 0 1');

        fireEvent.click(screen.getByText('Reset Position'));
        expect(board).toHaveAttribute('data-fen', '8/8/8/8/8/8/4P3/8 w - - 0 1');
    });

    it("ignores invalid moves", () => {
        render(<Tutorial pieceTheme="standard" />);
        const board = screen.getByTestId('mock-chessboard');

        expect(board).toHaveAttribute('data-fen', '8/8/8/8/8/8/4P3/8 w - - 0 1');

        fireEvent.click(screen.getByTestId('trigger-invalid-move'));

        expect(board).toHaveAttribute('data-fen', '8/8/8/8/8/8/4P3/8 w - - 0 1');
    });

    it("correctly identifies which pieces should be hidden", () => {
        render(<Tutorial pieceTheme="standard" />);

        expect(screen.getByTestId('hide-b-king')).toHaveTextContent('true');
        expect(screen.getByTestId('hide-w-king')).toHaveTextContent('true');
        expect(screen.getByTestId('hide-pawn')).toHaveTextContent('false');

        fireEvent.click(screen.getByText('King'));

        expect(screen.getByTestId('hide-b-king')).toHaveTextContent('true');
        expect(screen.getByTestId('hide-w-king')).toHaveTextContent('false');
    });
});
