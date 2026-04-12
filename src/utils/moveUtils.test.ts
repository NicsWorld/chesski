import test from 'node:test';
import assert from 'node:assert';
import { groupMovesIntoPairs } from './moveUtils.ts';

test('groupMovesIntoPairs - empty history', () => {
    const history: string[] = [];
    const result = groupMovesIntoPairs(history);
    assert.strictEqual(result.length, 0);
});

test('groupMovesIntoPairs - even number of moves', () => {
    const history = ['e4', 'e5', 'Nf3', 'Nc6'];
    const result = groupMovesIntoPairs(history);
    assert.strictEqual(result.length, 2);
    assert.deepStrictEqual(result[0], { white: 'e4', black: 'e5' });
    assert.deepStrictEqual(result[1], { white: 'Nf3', black: 'Nc6' });
});

test('groupMovesIntoPairs - odd number of moves', () => {
    const history = ['e4', 'e5', 'Nf3'];
    const result = groupMovesIntoPairs(history);
    assert.strictEqual(result.length, 2);
    assert.deepStrictEqual(result[0], { white: 'e4', black: 'e5' });
    assert.deepStrictEqual(result[1], { white: 'Nf3', black: undefined });
});
