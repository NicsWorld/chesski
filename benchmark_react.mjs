import { renderToString } from 'react-dom/server';
import React from 'react';
import { Chess } from 'chess.js';
import ChessBoard from './src/components/ChessBoard.js';

// Setup
const game = new Chess();
const props = {
    game: game,
    onMove: () => {},
    pieceTheme: 'zoo'
};

const iterations = 1000;

console.time('ChessBoard Render Time');
for (let i = 0; i < iterations; i++) {
    renderToString(React.createElement(ChessBoard, props));
}
console.timeEnd('ChessBoard Render Time');
