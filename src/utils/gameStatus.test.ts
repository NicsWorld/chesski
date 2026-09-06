import { describe, it, expect, vi } from 'vitest';
import { evaluateGameStatus } from './gameStatus';
import { Chess } from 'chess.js';

describe('evaluateGameStatus', () => {
    it('should return checkmate message for Black winning', () => {
        const game = new Chess();
        vi.spyOn(game, 'isCheckmate').mockReturnValue(true);
        vi.spyOn(game, 'turn').mockReturnValue('w');
        expect(evaluateGameStatus(game)).toBe('Checkmate! Black wins!');
    });

    it('should return checkmate message for White winning', () => {
        const game = new Chess();
        vi.spyOn(game, 'isCheckmate').mockReturnValue(true);
        vi.spyOn(game, 'turn').mockReturnValue('b');
        expect(evaluateGameStatus(game)).toBe('Checkmate! White wins!');
    });

    it('should return draw message', () => {
        const game = new Chess();
        vi.spyOn(game, 'isCheckmate').mockReturnValue(false);
        vi.spyOn(game, 'isDraw').mockReturnValue(true);
        expect(evaluateGameStatus(game)).toBe("It's a draw!");
    });

    it('should return check message', () => {
        const game = new Chess();
        vi.spyOn(game, 'isCheckmate').mockReturnValue(false);
        vi.spyOn(game, 'isDraw').mockReturnValue(false);
        vi.spyOn(game, 'isCheck').mockReturnValue(true);
        expect(evaluateGameStatus(game)).toBe('Check! Watch out!');
    });

    it('should return turn message for White', () => {
        const game = new Chess();
        vi.spyOn(game, 'isCheckmate').mockReturnValue(false);
        vi.spyOn(game, 'isDraw').mockReturnValue(false);
        vi.spyOn(game, 'isCheck').mockReturnValue(false);
        vi.spyOn(game, 'turn').mockReturnValue('w');
        expect(evaluateGameStatus(game)).toBe("White's turn (Cute Animals)");
    });

    it('should return turn message for Black', () => {
        const game = new Chess();
        vi.spyOn(game, 'isCheckmate').mockReturnValue(false);
        vi.spyOn(game, 'isDraw').mockReturnValue(false);
        vi.spyOn(game, 'isCheck').mockReturnValue(false);
        vi.spyOn(game, 'turn').mockReturnValue('b');
        expect(evaluateGameStatus(game)).toBe("Black's turn (Cool Animals)");
    });
});
