import { performance } from 'perf_hooks';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Chess } from 'chess.js';

function AppBad() {
  const [game, setGame] = React.useState(new Chess());
  return React.createElement('div', null, game.fen());
}

function AppGood() {
  const [game, setGame] = React.useState(() => new Chess());
  return React.createElement('div', null, game.fen());
}

const ITERATIONS = 10000;

console.log("Benchmarking AppBad...");
let start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  renderToString(React.createElement(AppBad));
}
let end = performance.now();
console.log(`Time for ${ITERATIONS} renders (Bad): ${(end - start).toFixed(2)}ms`);

console.log("Benchmarking AppGood...");
start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  renderToString(React.createElement(AppGood));
}
end = performance.now();
console.log(`Time for ${ITERATIONS} renders (Good): ${(end - start).toFixed(2)}ms`);
