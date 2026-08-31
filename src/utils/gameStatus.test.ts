import { describe, it, expect, vi } from 'vitest';
import { Chess } from 'chess.js';
import { evaluateGameStatus } from './gameStatus';

describe('evaluateGameStatus', () => {
    const createMockChess = (overrides: Partial<Record<keyof Chess, any>>) => {
        return {
            isCheckmate: vi.fn().mockReturnValue(false),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('w'),
            ...overrides,
        } as unknown as Chess;
    };

    it('returns checkmate message for White winning', () => {
        const game = createMockChess({
            isCheckmate: vi.fn().mockReturnValue(true),
            turn: vi.fn().mockReturnValue('b'),
        });
        expect(evaluateGameStatus(game)).toBe('Checkmate! White wins!');
    });

    it('returns checkmate message for Black winning', () => {
        const game = createMockChess({
            isCheckmate: vi.fn().mockReturnValue(true),
            turn: vi.fn().mockReturnValue('w'),
        });
        expect(evaluateGameStatus(game)).toBe('Checkmate! Black wins!');
    });

    it('returns draw message', () => {
        const game = createMockChess({
            isDraw: vi.fn().mockReturnValue(true),
        });
        expect(evaluateGameStatus(game)).toBe("It's a draw!");
    });

    it('returns check message', () => {
        const game = createMockChess({
            isCheck: vi.fn().mockReturnValue(true),
        });
        expect(evaluateGameStatus(game)).toBe("Check! Watch out!");
    });

    it('returns White turn message', () => {
        const game = createMockChess({
            turn: vi.fn().mockReturnValue('w'),
        });
        expect(evaluateGameStatus(game)).toBe("White's turn (Cute Animals)");
    });

    it('returns Black turn message', () => {
        const game = createMockChess({
            turn: vi.fn().mockReturnValue('b'),
        });
        expect(evaluateGameStatus(game)).toBe("Black's turn (Cool Animals)");
    });
});
