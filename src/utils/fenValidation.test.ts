import { test } from 'node:test';
import assert from 'node:assert';
import { validateFen } from './fenValidation.ts';

test('validateFen', async (t) => {
  await t.test('returns true for standard starting position', () => {
    assert.strictEqual(validateFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'), true);
  });

  await t.test('returns true for a mid-game position', () => {
    assert.strictEqual(validateFen('r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 2 3'), true);
  });

  await t.test('returns false for string too long', () => {
    const longFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' + 'a'.repeat(100);
    assert.strictEqual(validateFen(longFen), false);
  });

  await t.test('returns false for missing fields', () => {
    assert.strictEqual(validateFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -'), false);
  });

  await t.test('returns false for invalid characters', () => {
    assert.strictEqual(validateFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNX w KQkq - 0 1'), false);
  });

  await t.test('returns false for incorrect number of rows', () => {
    assert.strictEqual(validateFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w KQkq - 0 1'), false);
  });

  await t.test('returns false if a row does not sum to 8', () => {
    // Row 3 has "9" empty squares
    assert.strictEqual(validateFen('rnbqkbnr/pppppppp/9/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'), false);
    // Row 3 has "7" empty squares
    assert.strictEqual(validateFen('rnbqkbnr/pppppppp/7/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'), false);
  });
});
