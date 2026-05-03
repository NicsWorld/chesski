import { test, expect } from 'vitest';
import { addKingsToFen, removeKings } from '../tutorial';
import { Chess, type Square } from 'chess.js';

test('addKingsToFen - adds both kings when neither is present', () => {
    // Both kings missing, should add K and k
    const initialFen = '8/8/8/8/8/8/8/8 w - - 0 1';
    const result = addKingsToFen(initialFen);
    expect(result).toBe('Kk6/8/8/8/8/8/8/8 w - - 0 1');
});

test('addKingsToFen - adds missing black king', () => {
    // White king present, black king missing
    const initialFen = 'K7/8/8/8/8/8/8/8 w - - 0 1';
    const result = addKingsToFen(initialFen);
    expect(result).toBe('Kk6/8/8/8/8/8/8/8 w - - 0 1');
});

test('addKingsToFen - adds missing white king', () => {
    // Black king present, white king missing
    const initialFen = 'k7/8/8/8/8/8/8/8 w - - 0 1';
    const result = addKingsToFen(initialFen);
    // Since k is at the beginning, k is left, and K is added after
    expect(result).toBe('kK6/8/8/8/8/8/8/8 w - - 0 1');
});

test('addKingsToFen - returns original fen if both kings present', () => {
    // Both kings present
    const initialFen = 'Kk6/8/8/8/8/8/8/8 w - - 0 1';
    const result = addKingsToFen(initialFen);
    expect(result).toBe('Kk6/8/8/8/8/8/8/8 w - - 0 1');
});

test('addKingsToFen - handles pieces on board', () => {
    // Some pieces on board
    const initialFen = '4P3/8/8/8/8/8/8/8 w - - 0 1';
    const result = addKingsToFen(initialFen);
    // Note: K and k are added to the first available empty squares
    expect(result).toBe('Kk2P3/8/8/8/8/8/8/8 w - - 0 1');
});


class MockChess {
    private boardState: (null | { type: string, color: string, square: string })[][];
    public removedSquares: Square[] = [];

    constructor(setup: (null | { type: string, color: string, square: string })[][]) {
        this.boardState = setup;
    }

    board() {
        return this.boardState;
    }

    remove(square: Square) {
        this.removedSquares.push(square);
    }
}

test('removeKings - removes black king and white king (non-king tutorial)', () => {
    const mockBoard = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [{ type: 'k', color: 'b', square: 'a1' }, { type: 'k', color: 'w', square: 'b1' }, null, null, null, null, null, null],
    ];

    const game = new MockChess(mockBoard) as unknown as Chess;
    removeKings(game, 'p');

    const mockGame = game as unknown as MockChess;
    expect(mockGame.removedSquares).toEqual(['a1', 'b1']);
});

test('removeKings - removes black king only (king tutorial)', () => {
    const mockBoard = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [{ type: 'k', color: 'b', square: 'a1' }, { type: 'k', color: 'w', square: 'b1' }, null, null, null, null, null, null],
    ];

    const game = new MockChess(mockBoard) as unknown as Chess;
    removeKings(game, 'k');

    const mockGame = game as unknown as MockChess;
    expect(mockGame.removedSquares).toEqual(['a1']);
});
