import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App';

const start = performance.now();
for (let i = 0; i < 1000; i++) {
  renderToString(React.createElement(App));
}
const end = performance.now();
console.log('Time taken: ' + (end - start) + ' ms');
