import { describe, it, expect } from 'vitest';
import { evaluateGameStatus } from './gameStatus';
import type { Chess } from 'chess.js';

describe('evaluateGameStatus', () => {
    it('returns checkmate message for black winning', () => {
        const game = {
            isCheckmate: () => true,
            turn: () => 'w',
        } as unknown as Chess;
        expect(evaluateGameStatus(game)).toBe('Checkmate! Black wins!');
    });

    it('returns checkmate message for white winning', () => {
        const game = {
            isCheckmate: () => true,
            turn: () => 'b',
        } as unknown as Chess;
        expect(evaluateGameStatus(game)).toBe('Checkmate! White wins!');
    });

    it('returns draw message when game is a draw', () => {
        const game = {
            isCheckmate: () => false,
            isDraw: () => true,
        } as unknown as Chess;
        expect(evaluateGameStatus(game)).toBe("It's a draw!");
    });

    it('returns check message when game is in check', () => {
        const game = {
            isCheckmate: () => false,
            isDraw: () => false,
            isCheck: () => true,
        } as unknown as Chess;
        expect(evaluateGameStatus(game)).toBe("Check! Watch out!");
    });

    it('returns white turn message', () => {
        const game = {
            isCheckmate: () => false,
            isDraw: () => false,
            isCheck: () => false,
            turn: () => 'w',
        } as unknown as Chess;
        expect(evaluateGameStatus(game)).toBe("White's turn (Cute Animals)");
    });

    it('returns black turn message', () => {
        const game = {
            isCheckmate: () => false,
            isDraw: () => false,
            isCheck: () => false,
            turn: () => 'b',
        } as unknown as Chess;
        expect(evaluateGameStatus(game)).toBe("Black's turn (Cool Animals)");
    });
});
