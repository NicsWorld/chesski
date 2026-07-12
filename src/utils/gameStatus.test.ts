import { describe, it, expect, vi } from 'vitest';
import { evaluateGameStatus } from './gameStatus';
import { Chess } from 'chess.js';

describe('evaluateGameStatus', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createMockGame = (overrides: Partial<Record<keyof Chess, any>>) => {
        return {
            isCheckmate: vi.fn().mockReturnValue(false),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('w'),
            ...overrides,
        } as unknown as Chess;
    };

    it("returns checkmate for white", () => {
        const game = createMockGame({
            isCheckmate: vi.fn().mockReturnValue(true),
            turn: vi.fn().mockReturnValue('w')
        });
        expect(evaluateGameStatus(game)).toBe('Checkmate! Black wins!');
    });

    it("returns checkmate for black", () => {
        const game = createMockGame({
            isCheckmate: vi.fn().mockReturnValue(true),
            turn: vi.fn().mockReturnValue('b')
        });
        expect(evaluateGameStatus(game)).toBe('Checkmate! White wins!');
    });

    it("returns draw", () => {
        const game = createMockGame({
            isDraw: vi.fn().mockReturnValue(true)
        });
        expect(evaluateGameStatus(game)).toBe("It's a draw!");
    });

    it("returns check", () => {
        const game = createMockGame({
            isCheck: vi.fn().mockReturnValue(true)
        });
        expect(evaluateGameStatus(game)).toBe("Check! Watch out!");
    });

    it("returns White's turn", () => {
        const game = createMockGame({
            turn: vi.fn().mockReturnValue('w')
        });
        expect(evaluateGameStatus(game)).toBe("White's turn (Cute Animals)");
    });

    it("returns Black's turn", () => {
        const game = createMockGame({
            turn: vi.fn().mockReturnValue('b')
        });
        expect(evaluateGameStatus(game)).toBe("Black's turn (Cool Animals)");
    });
});
