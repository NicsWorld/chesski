import { Chess } from 'chess.js';

const start = performance.now();
for (let i = 0; i < 10000; i++) {
  new Chess();
}
const end = performance.now();
console.log('Time taken: ' + (end - start) + ' ms');
