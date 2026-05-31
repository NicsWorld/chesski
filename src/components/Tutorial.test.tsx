import { describe, it, expect } from 'vitest';
import { addKingsToFen } from './Tutorial';

describe('addKingsToFen', () => {
    it('returns the original FEN if both kings are already present', () => {
        const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        expect(addKingsToFen(fen)).toBe(fen);
    });

    it('adds white king to the first available empty square if missing', () => {
        // missing white king, row 1 'rnbqkbnr' has black king, row 2 has no empty squares, row 3 has '8' which becomes 'K7'
        const inputFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQ1BNR w KQkq - 0 1';
        const expectedFen = 'rnbqkbnr/pppppppp/K7/8/8/8/PPPPPPPP/RNBQ1BNR w KQkq - 0 1';
        expect(addKingsToFen(inputFen)).toBe(expectedFen);
    });

    it('adds black king to the first available empty square if missing', () => {
        // missing black king, row 1 'rnbq1bnr' has empty square '1' which becomes 'k'
        const inputFen = 'rnbq1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        const expectedFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        expect(addKingsToFen(inputFen)).toBe(expectedFen);
    });

    it('adds both kings to the first available empty squares if missing', () => {
        // missing both kings, row 1 'rnbq1bnr' empty '1' becomes 'K', row 3 '8' becomes 'k7'
        const inputFen = 'rnbq1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQ1BNR w KQkq - 0 1';
        const expectedFen = 'rnbqKbnr/pppppppp/k7/8/8/8/PPPPPPPP/RNBQ1BNR w KQkq - 0 1';
        expect(addKingsToFen(inputFen)).toBe(expectedFen);
    });

    it('handles multiple empty squares and updates numbers correctly', () => {
        // Empty board
        const inputFen = '8/8/8/8/8/8/8/8 w - - 0 1';
        const expectedFen = 'Kk6/8/8/8/8/8/8/8 w - - 0 1';
        expect(addKingsToFen(inputFen)).toBe(expectedFen);
    });

    it('handles single empty square appropriately', () => {
        // Board full of pawns except for one square
        const inputFen = 'PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPP1P w - - 0 1';
        const expectedFen = 'PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPKP w - - 0 1';
        expect(addKingsToFen(inputFen)).toBe(expectedFen);
    });

    it('adds both kings when there are only two empty squares at the end', () => {
        const inputFen = 'PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPP2 w - - 0 1';
        const expectedFen = 'PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPKk w - - 0 1';
        expect(addKingsToFen(inputFen)).toBe(expectedFen);
    });

    it('preserves the rest of the FEN metadata exactly as is', () => {
        const inputFen = '8/8/8/8/8/8/8/8 b KQk e3 10 20';
        const expectedFen = 'Kk6/8/8/8/8/8/8/8 b KQk e3 10 20';
        expect(addKingsToFen(inputFen)).toBe(expectedFen);
    });
});
