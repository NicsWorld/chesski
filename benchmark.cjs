const { Chess } = require('chess.js');

const game = new Chess();
const square = 'e2';

const start = performance.now();
for (let i = 0; i < 100000; i++) {
    const moves = game.moves({ square, verbose: true });
    const validMoves = moves.map(m => m.to);
}
const end = performance.now();
console.log(`Original: ${end - start} ms`);

const cache = new Map();
let currentFen = game.fen();

const startCached = performance.now();
for (let i = 0; i < 100000; i++) {
    const fen = game.fen();
    if (fen !== currentFen) {
        cache.clear();
        currentFen = fen;
    }
    if (!cache.has(square)) {
        const moves = game.moves({ square, verbose: true });
        cache.set(square, moves.map(m => m.to));
    }
    const validMoves = cache.get(square);
}
const endCached = performance.now();
console.log(`Cached: ${endCached - startCached} ms`);
