import { describe, it, expect } from 'vitest';
import { addKingsToFen } from './Tutorial';

describe('addKingsToFen', () => {
    it('returns the same FEN if both kings are already present', () => {
        const inputFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        expect(addKingsToFen(inputFen)).toBe(inputFen);
    });

    it('adds white king correctly when missing', () => {
        // Missing white king, replace the empty space logic manually in our head or let the function do it
        // The function adds 'K' on the first empty space if missing, then 'k' if missing.
        // If fen is '8/8/8/8/8/8/8/8 w - - 0 1' -> adds kings to the first empty spaces
        // The first row 'rnbq1bnr' has '1'. The white king is missing. Black king 'k' is NOT present here (actually 'k' is missing too in this string).
        // Let's create an exact string where ONLY white king is missing.
        // The first '1' it encounters will be in the last row 'RNBQ1BNR'. Actually it processes rows from top to bottom.
        // It's 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQ1BNR'
        // 'k' is present. 'K' is missing.
        // First empty space is in '8' -> first row of '8' is row 2.
        // Wait, the row is 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQ1BNR'. Top row is row 0.
        // The first empty space is the first '8'. The function converts it to 'K7'.

        // Let's test a simple one: '8/8/8/8/8/8/8/k7' -> 'k' is present. 'K' is missing.
        // row 0: '8' -> 'K7'
        const expected = 'K7/8/8/8/8/8/8/k7 w - - 0 1';
        expect(addKingsToFen('8/8/8/8/8/8/8/k7 w - - 0 1')).toBe(expected);
    });

    it('adds black king correctly when missing', () => {
        // 'K' is present. 'k' is missing.
        // 'K7/8/8/8/8/8/8/8' -> first empty space is in row 1: '8' -> 'k7'
        const expected = 'Kk6/8/8/8/8/8/8/8 w - - 0 1';
        expect(addKingsToFen('K7/8/8/8/8/8/8/8 w - - 0 1')).toBe(expected);
    });

    it('adds both kings correctly when missing', () => {
        // Both missing. '8/8/8/8/8/8/8/8' -> First empty space gets 'K', second gets 'k'
        // First empty space is row 0 '8'. It becomes 'Kk6'.
        const expected = 'Kk6/8/8/8/8/8/8/8 w - - 0 1';
        expect(addKingsToFen('8/8/8/8/8/8/8/8 w - - 0 1')).toBe(expected);
    });

    it('properly handles numbers representing empty spaces when inserting kings', () => {
        // '3p4/8/8/8/8/8/8/8' -> missing both kings.
        // '3p4' has '3' empty spaces.
        // '3' becomes 'Kk1'. So 'Kk1p4'.
        const expected = 'Kk1p4/8/8/8/8/8/8/8 w - - 0 1';
        expect(addKingsToFen('3p4/8/8/8/8/8/8/8 w - - 0 1')).toBe(expected);
    });

    it('properly replaces multiple 1s with numbers correctly', () => {
        // The function does: return newRow.replace(/1+/g, (match) => match.length.toString());
        // If we have '111p1111' -> should become '3p4'.
        // If we have '4p3' missing kings:
        // '4' -> 'Kk11' -> replace(/1+/g) -> 'Kk2'. So 'Kk2p3'.
        const expected = 'Kk2p3/8/8/8/8/8/8/8 w - - 0 1';
        expect(addKingsToFen('4p3/8/8/8/8/8/8/8 w - - 0 1')).toBe(expected);
    });
});
