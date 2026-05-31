import { describe, it, expect } from 'vitest';
import { evaluateGameStatus } from './gameStatus';
import { type Chess } from 'chess.js';

const createMockChess = (
    isCheckmate = false,
    isDraw = false,
    isCheck = false,
    turn: 'w' | 'b' = 'w'
) => {
    return {
        isCheckmate: () => isCheckmate,
        isDraw: () => isDraw,
        isCheck: () => isCheck,
        turn: () => turn,
    } as unknown as Chess;
};

describe('evaluateGameStatus', () => {
    it('returns Black wins string when white is checkmated', () => {
        const game = createMockChess(true, false, false, 'w');
        expect(evaluateGameStatus(game)).toBe('Checkmate! Black wins!');
    });

    it('returns White wins string when black is checkmated', () => {
        const game = createMockChess(true, false, false, 'b');
        expect(evaluateGameStatus(game)).toBe('Checkmate! White wins!');
    });

    it('returns draw string when the game is a draw', () => {
        const game = createMockChess(false, true, false, 'w');
        expect(evaluateGameStatus(game)).toBe("It's a draw!");
    });

    it('returns check string when a player is in check', () => {
        const game = createMockChess(false, false, true, 'b');
        expect(evaluateGameStatus(game)).toBe('Check! Watch out!');
    });

    it('returns White\'s turn string for normal turn', () => {
        const game = createMockChess(false, false, false, 'w');
        expect(evaluateGameStatus(game)).toBe("White's turn (Cute Animals)");
    });

    it('returns Black\'s turn string for normal turn', () => {
        const game = createMockChess(false, false, false, 'b');
        expect(evaluateGameStatus(game)).toBe("Black's turn (Cool Animals)");
    });
});
