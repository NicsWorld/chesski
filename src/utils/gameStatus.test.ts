import { test } from 'node:test';
import assert from 'node:assert';
import { evaluateGameStatus } from './gameStatus.ts';

// Mocking Chess class for the test
class MockChess {
    _turn = 'w';
    _isCheckmate = false;
    _isDraw = false;
    _isCheck = false;

    turn() { return this._turn; }
    isCheckmate() { return this._isCheckmate; }
    isDraw() { return this._isDraw; }
    isCheck() { return this._isCheck; }
    move(m) {
        this._turn = this._turn === 'w' ? 'b' : 'w';
        return true;
    }
    load(f) { return true; }
}

test('evaluateGameStatus', async (t) => {
    await t.test('returns White\'s turn at start', () => {
        const game = new MockChess();
        assert.strictEqual(evaluateGameStatus(game as any), "White's turn (Cute Animals)");
    });

    await t.test('returns Black\'s turn after one move', () => {
        const game = new MockChess();
        game.move('e4');
        assert.strictEqual(evaluateGameStatus(game as any), "Black's turn (Cool Animals)");
    });

    await t.test('returns Check! when in check', () => {
        const game = new MockChess();
        game._isCheck = true;
        assert.strictEqual(evaluateGameStatus(game as any), "Check! Watch out!");
    });

    await t.test('returns Checkmate! White wins!', () => {
        const game = new MockChess();
        game._isCheckmate = true;
        game._turn = 'b'; // Black's turn and is checkmated, so White wins
        assert.strictEqual(evaluateGameStatus(game as any), "Checkmate! White wins!");
    });

    await t.test('returns Checkmate! Black wins!', () => {
        const game = new MockChess();
        game._isCheckmate = true;
        game._turn = 'w'; // White's turn and is checkmated, so Black wins
        assert.strictEqual(evaluateGameStatus(game as any), "Checkmate! Black wins!");
    });

    await t.test('returns draw', () => {
        const game = new MockChess();
        game._isDraw = true;
        assert.strictEqual(evaluateGameStatus(game as any), "It's a draw!");
    });
});
