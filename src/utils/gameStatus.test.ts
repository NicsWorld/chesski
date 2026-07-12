import { describe, it, expect, vi } from 'vitest';
import { evaluateGameStatus } from './gameStatus';
import type { Chess } from 'chess.js';

describe('evaluateGameStatus', () => {
    const createMockGame = (
        isCheckmate: boolean,
        isDraw: boolean,
        isCheck: boolean,
        turn: 'w' | 'b'
    ) => {
        return {
            isCheckmate: vi.fn().mockReturnValue(isCheckmate),
            isDraw: vi.fn().mockReturnValue(isDraw),
            isCheck: vi.fn().mockReturnValue(isCheck),
            turn: vi.fn().mockReturnValue(turn),
        } as unknown as Chess;
    };

    it('returns checkmate when White wins', () => {
        // If it's checkmate and it's Black's turn, it means White won
        const gameMock = createMockGame(true, false, false, 'b');
        expect(evaluateGameStatus(gameMock)).toBe('Checkmate! White wins!');
    });

    it('returns checkmate when Black wins', () => {
        // If it's checkmate and it's White's turn, it means Black won
        const gameMock = createMockGame(true, false, false, 'w');
        expect(evaluateGameStatus(gameMock)).toBe('Checkmate! Black wins!');
    });

    it("returns draw", () => {
        const gameMock = createMockGame(false, true, false, 'w');
        expect(evaluateGameStatus(gameMock)).toBe("It's a draw!");
    });

    it("returns check", () => {
        const gameMock = createMockGame(false, false, true, 'w');
        expect(evaluateGameStatus(gameMock)).toBe("Check! Watch out!");
    });

    it("returns White's turn", () => {
        const gameMock = createMockGame(false, false, false, 'w');
        expect(evaluateGameStatus(gameMock)).toBe("White's turn (Cute Animals)");
    });

    it("returns Black's turn", () => {
        const gameMock = createMockGame(false, false, false, 'b');
        expect(evaluateGameStatus(gameMock)).toBe("Black's turn (Cool Animals)");
    });
});
