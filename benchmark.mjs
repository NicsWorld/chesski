import { Chess } from 'chess.js';

const iterations = 10000;

// Baseline: Re-creating Chess object on every simulated render
const startBaseline = performance.now();
let resultBaseline;
for (let i = 0; i < iterations; i++) {
  resultBaseline = new Chess();
}
const endBaseline = performance.now();
const baselineTime = endBaseline - startBaseline;
console.log(`Baseline (new Chess() every render for ${iterations} iterations): ${baselineTime.toFixed(2)} ms`);

// Optimized: Creating Chess object only once (simulating useState(() => new Chess()))
const startOptimized = performance.now();
let resultOptimized;
let firstRender = true;
for (let i = 0; i < iterations; i++) {
  if (firstRender) {
    resultOptimized = new Chess();
    firstRender = false;
  }
}
const endOptimized = performance.now();
const optimizedTime = endOptimized - startOptimized;
console.log(`Optimized (lazy init for ${iterations} iterations): ${optimizedTime.toFixed(2)} ms`);

console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}% faster`);
