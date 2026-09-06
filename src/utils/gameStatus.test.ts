import { describe, it, expect, vi } from 'vitest';
import { Chess } from 'chess.js';
import { evaluateGameStatus } from './gameStatus';

describe('evaluateGameStatus', () => {
    it('returns checkmate message when white is checkmated', () => {
        const game = new Chess();
        vi.spyOn(game, 'isCheckmate').mockReturnValue(true);
        vi.spyOn(game, 'turn').mockReturnValue('w');
        expect(evaluateGameStatus(game)).toBe('Checkmate! Black wins!');
    });

    it('returns checkmate message when black is checkmated', () => {
        const game = new Chess();
        vi.spyOn(game, 'isCheckmate').mockReturnValue(true);
        vi.spyOn(game, 'turn').mockReturnValue('b');
        expect(evaluateGameStatus(game)).toBe('Checkmate! White wins!');
    });

    it('returns draw message when the game is drawn', () => {
        const game = new Chess();
        vi.spyOn(game, 'isDraw').mockReturnValue(true);
        expect(evaluateGameStatus(game)).toBe("It's a draw!");
    });

    it('returns check message when a king is in check', () => {
        const game = new Chess();
        vi.spyOn(game, 'isCheck').mockReturnValue(true);
        expect(evaluateGameStatus(game)).toBe('Check! Watch out!');
    });

    it('returns turn message for white', () => {
        const game = new Chess();
        // By default, turn is 'w'
        expect(evaluateGameStatus(game)).toBe("White's turn (Cute Animals)");
    });

    it('returns turn message for black', () => {
        const game = new Chess();
        vi.spyOn(game, 'turn').mockReturnValue('b');
        expect(evaluateGameStatus(game)).toBe("Black's turn (Cool Animals)");
    });
});
