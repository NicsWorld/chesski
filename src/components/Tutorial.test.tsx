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
});
