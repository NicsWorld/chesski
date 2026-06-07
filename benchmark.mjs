import { Chess } from 'chess.js';

const game = new Chess();
const iterations = 100000;

console.time('game.board()');
for (let i = 0; i < iterations; i++) {
    game.board();
}
console.timeEnd('game.board()');

console.time('game.fen()');
for (let i = 0; i < iterations; i++) {
    game.fen();
}
console.timeEnd('game.fen()');
