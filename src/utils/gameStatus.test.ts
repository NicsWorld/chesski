import { describe, it, expect } from 'vitest';
import { evaluateGameStatus } from './gameStatus';
import { Chess } from 'chess.js';

describe('evaluateGameStatus', () => {
    it("returns White's turn message when it is White's turn and no other conditions apply", () => {
        const mockGame = {
            isCheckmate: () => false,
            isDraw: () => false,
            isCheck: () => false,
            turn: () => 'w',
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe("White's turn (Cute Animals)");
    });

    it("returns Black's turn message when it is Black's turn and no other conditions apply", () => {
        const mockGame = {
            isCheckmate: () => false,
            isDraw: () => false,
            isCheck: () => false,
            turn: () => 'b',
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe("Black's turn (Cool Animals)");
    });

    it("returns checkmate message and Black wins when it is White's turn and game is in checkmate", () => {
        const mockGame = {
            isCheckmate: () => true,
            isDraw: () => false,
            isCheck: () => false,
            turn: () => 'w',
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe("Checkmate! Black wins!");
    });

    it("returns checkmate message and White wins when it is Black's turn and game is in checkmate", () => {
        const mockGame = {
            isCheckmate: () => true,
            isDraw: () => false,
            isCheck: () => false,
            turn: () => 'b',
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe("Checkmate! White wins!");
    });

    it("returns draw message when game is a draw", () => {
        const mockGame = {
            isCheckmate: () => false,
            isDraw: () => true,
            isCheck: () => false,
            turn: () => 'w',
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe("It's a draw!");
    });

    it("returns check message when game is in check", () => {
        const mockGame = {
            isCheckmate: () => false,
            isDraw: () => false,
            isCheck: () => true,
            turn: () => 'w',
        } as unknown as Chess;

        expect(evaluateGameStatus(mockGame)).toBe("Check! Watch out!");
    });
});
