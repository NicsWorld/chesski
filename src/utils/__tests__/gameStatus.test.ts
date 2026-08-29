import { describe, it, expect } from 'vitest';
import { evaluateGameStatus } from '../gameStatus';
import { Chess } from 'chess.js';

describe('evaluateGameStatus', () => {
    const createMockGame = (
        isCheckmate: boolean,
        isDraw: boolean,
        isCheck: boolean,
        turn: 'w' | 'b'
    ): Chess => {
        return {
            isCheckmate: () => isCheckmate,
            isDraw: () => isDraw,
            isCheck: () => isCheck,
            turn: () => turn,
        } as unknown as Chess;
    };

    it('returns checkmate message for white turn (meaning black won)', () => {
        const game = createMockGame(true, false, false, 'w');
        expect(evaluateGameStatus(game)).toBe('Checkmate! Black wins!');
    });

    it('returns checkmate message for black turn (meaning white won)', () => {
        const game = createMockGame(true, false, false, 'b');
        expect(evaluateGameStatus(game)).toBe('Checkmate! White wins!');
    });

    it('returns draw message when the game is a draw', () => {
        const game = createMockGame(false, true, false, 'w');
        expect(evaluateGameStatus(game)).toBe("It's a draw!");
    });

    it('returns check message when the game is in check', () => {
        const game = createMockGame(false, false, true, 'b');
        expect(evaluateGameStatus(game)).toBe('Check! Watch out!');
    });

    it('returns turn message for white', () => {
        const game = createMockGame(false, false, false, 'w');
        expect(evaluateGameStatus(game)).toBe("White's turn (Cute Animals)");
    });

    it('returns turn message for black', () => {
        const game = createMockGame(false, false, false, 'b');
        expect(evaluateGameStatus(game)).toBe("Black's turn (Cool Animals)");
    });
});
