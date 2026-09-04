import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tutorial from './Tutorial';

vi.mock('./ChessBoard', () => ({
    default: ({ onMove }: { onMove: (move: { from: string; to: string; promotion?: string }) => void }) => (
        <div
            data-testid="mock-chessboard"
            onClick={(e) => {
                const moveAttr = e.currentTarget.getAttribute('data-move');
                if (moveAttr) {
                    onMove(JSON.parse(moveAttr));
                }
            }}
        />
    )
}));

describe('Tutorial Component', () => {
    it('handles invalid moves safely without throwing', () => {
        render(<Tutorial pieceTheme="standard" />);

        const board = screen.getByTestId('mock-chessboard');

        // Setting an invalid move string to the data-move attribute
        board.setAttribute('data-move', JSON.stringify({ from: 'h8', to: 'a1' }));

        expect(() => fireEvent.click(board)).not.toThrow();
    });

    it('handles programmatic invalid move returning false without throwing', () => {
        render(<Tutorial pieceTheme="standard" />);
        const board = screen.getByTestId('mock-chessboard');

        // Move a piece incorrectly (illegal jump)
        board.setAttribute('data-move', JSON.stringify({ from: 'a1', to: 'a8' }));
        expect(() => fireEvent.click(board)).not.toThrow();
    });

    it('handles valid moves correctly', () => {
        render(<Tutorial pieceTheme="standard" />);
        const board = screen.getByTestId('mock-chessboard');

        // Initial pawn tutorial position: '7k/8/8/8/8/8/4P3/K7 w - - 0 1'
        // Move pawn e2 to e4
        board.setAttribute('data-move', JSON.stringify({ from: 'e2', to: 'e4' }));
        expect(() => fireEvent.click(board)).not.toThrow();
    });
});
