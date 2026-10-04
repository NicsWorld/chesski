import { Chess } from 'chess.js';
const game = new Chess();
const p1 = game.get('e2');
const p2 = game.get('e2');
console.log(p1 === p2);
