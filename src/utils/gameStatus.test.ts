import { describe, it, expect } from 'vitest';
import { Chess } from 'chess.js';
import { evaluateGameStatus } from './gameStatus';

describe('evaluateGameStatus', () => {
    it("returns White's turn", () => {
        const game = new Chess();
        expect(evaluateGameStatus(game)).toBe("White's turn (Cute Animals)");
    });

    it("returns Black's turn", () => {
        const game = new Chess();
        game.move('e4');
        expect(evaluateGameStatus(game)).toBe("Black's turn (Cool Animals)");
    });

    it('returns checkmate for White winning', () => {
        const game = new Chess();
        game.move('e4');
        game.move('e5');
        game.move('Bc4');
        game.move('Nc6');
        game.move('Qh5');
        game.move('Nf6');
        game.move('Qxf7');
        expect(game.isCheckmate()).toBe(true);
        expect(evaluateGameStatus(game)).toBe('Checkmate! White wins!');
    });

    it('returns checkmate for Black winning', () => {
        const game = new Chess();
        game.move('f3');
        game.move('e5');
        game.move('g4');
        game.move('Qh4');
        expect(game.isCheckmate()).toBe(true);
        expect(evaluateGameStatus(game)).toBe('Checkmate! Black wins!');
    });

    it('returns check message', () => {
        const game = new Chess();
        game.move('e4');
        game.move('e5');
        game.move('Bc4');
        game.move('Nf6');
        game.move('Bxf7+');
        expect(game.isCheck()).toBe(true);
        expect(game.isCheckmate()).toBe(false);
        expect(evaluateGameStatus(game)).toBe('Check! Watch out!');
    });

    describe('draws', () => {
        it('returns draw for stalemate', () => {
            const game = new Chess('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78');
            expect(game.isStalemate()).toBe(true);
            expect(evaluateGameStatus(game)).toBe("It's a draw!");
        });

        it('returns draw for insufficient material', () => {
            const game = new Chess('8/8/8/8/8/8/4k3/4K3 w - - 0 1');
            expect(game.isInsufficientMaterial()).toBe(true);
            expect(evaluateGameStatus(game)).toBe("It's a draw!");
        });

        it('returns draw for threefold repetition', () => {
            const game = new Chess();
            // Move knights back and forth
            game.move('Nf3');
            game.move('Nf6');
            game.move('Ng1');
            game.move('Ng8');
            game.move('Nf3');
            game.move('Nf6');
            game.move('Ng1');
            game.move('Ng8');
            game.move('Nf3');
            game.move('Nf6');
            expect(game.isThreefoldRepetition()).toBe(true);
            expect(evaluateGameStatus(game)).toBe("It's a draw!");
        });

        it('returns draw for 50-move rule', () => {
            // A position with 100 half-moves (50 full moves) without capture or pawn move
            const game = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 100 1');
            expect(game.isDraw()).toBe(true);
            expect(evaluateGameStatus(game)).toBe("It's a draw!");
        });
    });
});
