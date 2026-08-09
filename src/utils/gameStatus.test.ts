import { describe, it, expect, vi } from 'vitest';
import { evaluateGameStatus } from './gameStatus';
import { Chess } from 'chess.js';

describe('evaluateGameStatus', () => {
    it('should return checkmate message for white winning', () => {
        const game = {
            isCheckmate: vi.fn().mockReturnValue(true),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('b')
        } as unknown as Chess;

        expect(evaluateGameStatus(game)).toBe('Checkmate! White wins!');
    });

    it('should return checkmate message for black winning', () => {
        const game = {
            isCheckmate: vi.fn().mockReturnValue(true),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('w')
        } as unknown as Chess;

        expect(evaluateGameStatus(game)).toBe('Checkmate! Black wins!');
    });

    it('should return draw message', () => {
        const game = {
            isCheckmate: vi.fn().mockReturnValue(false),
            isDraw: vi.fn().mockReturnValue(true),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('w')
        } as unknown as Chess;

        expect(evaluateGameStatus(game)).toBe("It's a draw!");
    });

    it('should return check message', () => {
        const game = {
            isCheckmate: vi.fn().mockReturnValue(false),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(true),
            turn: vi.fn().mockReturnValue('w')
        } as unknown as Chess;

        expect(evaluateGameStatus(game)).toBe("Check! Watch out!");
    });

    it('should return normal turn message for white', () => {
        const game = {
            isCheckmate: vi.fn().mockReturnValue(false),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('w')
        } as unknown as Chess;

        expect(evaluateGameStatus(game)).toBe("White's turn (Cute Animals)");
    });

    it('should return normal turn message for black', () => {
        const game = {
            isCheckmate: vi.fn().mockReturnValue(false),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('b')
        } as unknown as Chess;

        expect(evaluateGameStatus(game)).toBe("Black's turn (Cool Animals)");
    });
});
