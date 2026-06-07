import { describe, it, expect, vi } from 'vitest';
import { evaluateGameStatus } from './gameStatus';
import { Chess } from 'chess.js';

describe('evaluateGameStatus', () => {
    it('returns checkmate for white', () => {
        const mockGame = {
            isCheckmate: vi.fn().mockReturnValue(true),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('w'),
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe('Checkmate! Black wins!');
    });

    it('returns checkmate for black', () => {
        const mockGame = {
            isCheckmate: vi.fn().mockReturnValue(true),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('b'),
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe('Checkmate! White wins!');
    });

    it('returns draw', () => {
        const mockGame = {
            isCheckmate: vi.fn().mockReturnValue(false),
            isDraw: vi.fn().mockReturnValue(true),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('w'),
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe("It's a draw!");
    });

    it('returns check', () => {
        const mockGame = {
            isCheckmate: vi.fn().mockReturnValue(false),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(true),
            turn: vi.fn().mockReturnValue('w'),
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe('Check! Watch out!');
    });

    it('returns normal turn for white', () => {
        const mockGame = {
            isCheckmate: vi.fn().mockReturnValue(false),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('w'),
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe("White's turn (Cute Animals)");
    });

    it('returns normal turn for black', () => {
        const mockGame = {
            isCheckmate: vi.fn().mockReturnValue(false),
            isDraw: vi.fn().mockReturnValue(false),
            isCheck: vi.fn().mockReturnValue(false),
            turn: vi.fn().mockReturnValue('b'),
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe("Black's turn (Cool Animals)");
    });
});
