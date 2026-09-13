import React from 'react';
import { render } from '@testing-library/react';
import { Chess } from 'chess.js';
import CapturedPieces from './src/components/CapturedPieces';
import { performance } from 'perf_hooks';

const game = new Chess();
// Make a few moves to have some pieces captured
game.move('e4');
game.move('d5');
game.move('exd5');

const start = performance.now();
for (let i = 0; i < 10000; i++) {
    render(<CapturedPieces game={game} pieceTheme="zoo" />);
}
const end = performance.now();
console.log(`Time taken: ${end - start} ms`);
