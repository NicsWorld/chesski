import { describe, it, expect } from 'vitest';
import { Chess } from 'chess.js';
import { evaluateGameStatus } from './gameStatus';

describe('evaluateGameStatus', () => {
    it('returns Black wins on checkmate when it is White turn', () => {
        const mockGame = {
            isCheckmate: () => true,
            turn: () => 'w',
            isDraw: () => false,
            isCheck: () => false
        } as unknown as Chess;
        expect(evaluateGameStatus(mockGame)).toBe('Checkmate! Black wins!');
    });

    it('returns White wins on checkmate when it is Black turn', () => {
        const mockGame = {
            isCheckmate: () => true,
            turn: () => 'b',
            isDraw: () => false,
            isCheck: () => false
        } as unknown as Chess;
        expect(evaluateGameStatus(mockGame)).toBe('Checkmate! White wins!');
    });

    it('returns draw message when the game is a draw', () => {
        const mockGame = {
            isCheckmate: () => false,
            turn: () => 'w',
            isDraw: () => true,
            isCheck: () => false
        } as unknown as Chess;
        expect(evaluateGameStatus(mockGame)).toBe("It's a draw!");
    });

    it('returns check message when the game is in check', () => {
        const mockGame = {
            isCheckmate: () => false,
            turn: () => 'w',
            isDraw: () => false,
            isCheck: () => true
        } as unknown as Chess;
        expect(evaluateGameStatus(mockGame)).toBe("Check! Watch out!");
    });

    it('returns White turn message when no special condition and it is White turn', () => {
        const mockGame = {
            isCheckmate: () => false,
            turn: () => 'w',
            isDraw: () => false,
            isCheck: () => false
        } as unknown as Chess;
        expect(evaluateGameStatus(mockGame)).toBe("White's turn (Cute Animals)");
    });

    it('returns Black turn message when no special condition and it is Black turn', () => {
        const mockGame = {
            isCheckmate: () => false,
            turn: () => 'b',
            isDraw: () => false,
            isCheck: () => false
        } as unknown as Chess;
        expect(evaluateGameStatus(mockGame)).toBe("Black's turn (Cool Animals)");
    });
});
