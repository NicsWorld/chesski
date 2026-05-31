import React from 'react';
import { renderToString } from 'react-dom/server';
import { Chess } from 'chess.js';

function AppSlow() {
  const [game, setGame] = React.useState(new Chess());
  return React.createElement('div', null, 'Game state');
}

function AppFast() {
  const [game, setGame] = React.useState(() => new Chess());
  return React.createElement('div', null, 'Game state');
}

let start = performance.now();
for (let i = 0; i < 10000; i++) {
  renderToString(React.createElement(AppSlow));
}
let end = performance.now();
console.log('AppSlow time taken: ' + (end - start) + ' ms');

start = performance.now();
for (let i = 0; i < 10000; i++) {
  renderToString(React.createElement(AppFast));
}
end = performance.now();
console.log('AppFast time taken: ' + (end - start) + ' ms');
