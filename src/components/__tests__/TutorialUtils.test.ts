import { describe, it, expect, vi } from 'vitest';
import { addKingsToFen, removeKings } from '../Tutorial';
import { Chess } from 'chess.js';

describe('Tutorial Utils', () => {
    describe('addKingsToFen', () => {
        it('should return the original FEN if both kings are already present', () => {
            const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            expect(addKingsToFen(fen)).toBe(fen);
        });

        it('should add both kings if both are missing', () => {
            // 8 -> Kk6
            const fen = '8/8/8/8/8/8/8/8 w - - 0 1';
            const expectedFen = 'Kk6/8/8/8/8/8/8/8 w - - 0 1';
            expect(addKingsToFen(fen)).toBe(expectedFen);
        });

        it('should add only black king if white king is present', () => {
            // 8 -> k7
            const fen = 'K7/8/8/8/8/8/8/8 w - - 0 1';
            const expectedFen = 'Kk6/8/8/8/8/8/8/8 w - - 0 1';
            expect(addKingsToFen(fen)).toBe(expectedFen);
        });

        it('should add only white king if black king is present', () => {
            // 8 -> K7
            const fen = 'k7/8/8/8/8/8/8/8 w - - 0 1';
            const expectedFen = 'kK6/8/8/8/8/8/8/8 w - - 0 1';
            expect(addKingsToFen(fen)).toBe(expectedFen);
        });

        it('should correctly compress consecutive empty spaces (1s)', () => {
            // Replace first space with K, second with k, and rest are compressed
            // e.g. "8" row -> "Kk111111" -> "Kk6"
            const fen = '4p3/8/8/8/8/8/8/8 w - - 0 1';
            // First row has 4 spaces, then 'p', then 3 spaces.
            // 4 -> Kk2
            const expectedFen = 'Kk2p3/8/8/8/8/8/8/8 w - - 0 1';
            expect(addKingsToFen(fen)).toBe(expectedFen);
        });

        it('should preserve other pieces and fen parts', () => {
            const fen = '4P3/8/8/8/8/8/8/8 w - - 0 1';
            const expectedFen = 'Kk2P3/8/8/8/8/8/8/8 w - - 0 1';
            expect(addKingsToFen(fen)).toBe(expectedFen);
        });
    });

    describe('removeKings', () => {
        it('should remove the black king for any tutorial', () => {
            const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            const game = new Chess(fen);
            const removeSpy = vi.spyOn(game, 'remove');

            removeKings(game, 'p'); // Pawn tutorial

            // Should be called with black king's square (e8 in standard start)
            expect(removeSpy).toHaveBeenCalledWith('e8');
        });

        it('should remove the white king when tutorialId is not "k"', () => {
            const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            const game = new Chess(fen);
            const removeSpy = vi.spyOn(game, 'remove');

            removeKings(game, 'p');

            // Should be called with white king's square (e1) and black king's square (e8)
            expect(removeSpy).toHaveBeenCalledWith('e8');
            expect(removeSpy).toHaveBeenCalledWith('e1');
        });

        it('should NOT remove the white king when tutorialId is "k"', () => {
            const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            const game = new Chess(fen);
            const removeSpy = vi.spyOn(game, 'remove');

            removeKings(game, 'k');

            // Should be called ONLY with black king's square (e8)
            expect(removeSpy).toHaveBeenCalledWith('e8');
            expect(removeSpy).not.toHaveBeenCalledWith('e1');
        });

        it('should not throw error if kings are not on the board', () => {
             // Fen with no kings
             const game = new Chess();
             game.clear();
             // Add a piece just to make the board non-empty but no kings
             game.put({ type: 'p', color: 'w' }, 'e4');
             const removeSpy = vi.spyOn(game, 'remove');

             expect(() => removeKings(game, 'p')).not.toThrow();
             expect(removeSpy).not.toHaveBeenCalled();
        });
    });
});
