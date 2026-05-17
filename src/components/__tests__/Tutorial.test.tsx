import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tutorial from '../Tutorial';
import { Chess } from 'chess.js';

vi.mock('../ChessBoard', () => ({
    default: ({ game, onMove }: { game: Chess, onMove: (move: { from: string; to: string; promotion?: string }) => void }) => (
        <div data-testid="mock-chessboard" data-fen={game.fen()}>
            <button
                data-testid="invalid-move-btn"
                onClick={() => onMove({ from: 'a1', to: 'a8' })}
            >
                Invalid Move
            </button>
        </div>
    )
}));

describe('Tutorial', () => {
    it('ignores invalid moves', () => {
        render(<Tutorial pieceTheme="standard" />);
        const board = screen.getByTestId('mock-chessboard');
        const initialFen = board.getAttribute('data-fen');

        fireEvent.click(screen.getByTestId('invalid-move-btn'));

        expect(board.getAttribute('data-fen')).toBe(initialFen);
    });
});
