import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tutorial, { addKingsToFen } from './Tutorial';

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

describe('addKingsToFen', () => {
    it('returns the same fen if both kings are present', () => {
        const fen = 'k7/8/8/8/8/8/8/K7 w - - 0 1';
        expect(addKingsToFen(fen)).toBe(fen);
    });

    it('adds both kings if neither is present', () => {
        const fen = '8/8/8/8/8/8/8/8 w - - 0 1';
        expect(addKingsToFen(fen)).toBe('Kk6/8/8/8/8/8/8/8 w - - 0 1');
    });

    it('adds black king if only white king is present', () => {
        const fen = '8/8/8/8/8/8/8/K7 w - - 0 1';
        expect(addKingsToFen(fen)).toBe('k7/8/8/8/8/8/8/K7 w - - 0 1');
    });

    it('adds white king if only black king is present', () => {
        const fen = 'k7/8/8/8/8/8/8/8 w - - 0 1';
        expect(addKingsToFen(fen)).toBe('kK6/8/8/8/8/8/8/8 w - - 0 1');
    });
});
