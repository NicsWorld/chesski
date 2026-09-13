import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Chess } from 'chess.js';
import { evaluateGameStatus } from './gameStatus';

describe('evaluateGameStatus', () => {
    let game: Chess;

    beforeEach(() => {
        game = new Chess();
        vi.spyOn(game, 'isCheckmate').mockReturnValue(false);
        vi.spyOn(game, 'isDraw').mockReturnValue(false);
        vi.spyOn(game, 'isCheck').mockReturnValue(false);
        vi.spyOn(game, 'turn').mockReturnValue('w');
    });

    it('returns checkmate for black', () => {
        vi.spyOn(game, 'isCheckmate').mockReturnValue(true);
        vi.spyOn(game, 'turn').mockReturnValue('w');
        expect(evaluateGameStatus(game)).toBe('Checkmate! Black wins!');
    });

    it('returns checkmate for white', () => {
        vi.spyOn(game, 'isCheckmate').mockReturnValue(true);
        vi.spyOn(game, 'turn').mockReturnValue('b');
        expect(evaluateGameStatus(game)).toBe('Checkmate! White wins!');
    });

    it('returns draw', () => {
        vi.spyOn(game, 'isDraw').mockReturnValue(true);
        expect(evaluateGameStatus(game)).toBe("It's a draw!");
    });

    it('returns check', () => {
        vi.spyOn(game, 'isCheck').mockReturnValue(true);
        expect(evaluateGameStatus(game)).toBe('Check! Watch out!');
    });

    it('returns normal turn for white', () => {
        vi.spyOn(game, 'turn').mockReturnValue('w');
        expect(evaluateGameStatus(game)).toBe("White's turn (Cute Animals)");
    });

    it('returns normal turn for black', () => {
        vi.spyOn(game, 'turn').mockReturnValue('b');
        expect(evaluateGameStatus(game)).toBe("Black's turn (Cool Animals)");
    });
});
