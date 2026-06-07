import { Chess } from 'chess.js';

const game = new Chess();
const iterations = 100000;

// Baseline: calling game.board() every time
console.time('Baseline: game.board() every render');
for (let i = 0; i < iterations; i++) {
    game.board();
}
console.timeEnd('Baseline: game.board() every render');

// Simulated Cache: passing down 'fen' string and memoizing
let memoizedBoard = null;
let lastFen = null;
let lastGame = null;

console.time('Optimized: useMemo with fen');
const fen = game.fen(); // Simulated prop passed down
for (let i = 0; i < iterations; i++) {
    // Simulated useMemo
    if (memoizedBoard === null || lastFen !== fen || lastGame !== game) {
        memoizedBoard = game.board();
        lastFen = fen;
        lastGame = game;
    }
    const board = memoizedBoard;
}
console.timeEnd('Optimized: useMemo with fen');
