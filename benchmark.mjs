import { performance } from 'perf_hooks';

const validMoves = [
  'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
  'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
  'e5', 'd5', 'c5', 'f5'
];

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

// Generate 64 squares
const squares = [];
for (const rank of RANKS) {
  for (const file of FILES) {
    squares.push(`${file}${rank}`);
  }
}

function runBaseline() {
  let hits = 0;
  for (const square of squares) {
    if (validMoves.includes(square)) {
      hits++;
    }
  }
  return hits;
}

function runOptimized() {
  let hits = 0;
  // Simulate useMemo
  const validMovesSet = new Set(validMoves);
  for (const square of squares) {
    if (validMovesSet.has(square)) {
      hits++;
    }
  }
  return hits;
}

const ITERATIONS = 100000;

// Warmup
for (let i = 0; i < 1000; i++) {
  runBaseline();
  runOptimized();
}

const startBaseline = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  runBaseline();
}
const endBaseline = performance.now();
const baselineTime = endBaseline - startBaseline;

const startOptimized = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  runOptimized();
}
const endOptimized = performance.now();
const optimizedTime = endOptimized - startOptimized;

console.log(`Baseline (Array.includes): ${baselineTime.toFixed(2)} ms`);
console.log(`Optimized (Set.has): ${optimizedTime.toFixed(2)} ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}% faster`);
