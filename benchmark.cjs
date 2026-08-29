const { performance } = require('perf_hooks');

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

// Generate all 64 squares
const allSquares = [];
for (const rank of RANKS) {
  for (const file of FILES) {
    allSquares.push(`${file}${rank}`);
  }
}

// Typical number of valid moves for a piece (e.g. Queen in center)
const validMoves = ['a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4', 'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8', 'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8', 'a7', 'b6', 'c5', 'e3', 'f2', 'g1'];

const iterations = 100000;

function benchArrayIncludes() {
  let hits = 0;
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    for (let j = 0; j < allSquares.length; j++) {
      if (validMoves.includes(allSquares[j])) {
        hits++;
      }
    }
  }
  const end = performance.now();
  return end - start;
}

function benchSetHas() {
  let hits = 0;
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    const validMovesSet = new Set(validMoves);
    for (let j = 0; j < allSquares.length; j++) {
      if (validMovesSet.has(allSquares[j])) {
        hits++;
      }
    }
  }
  const end = performance.now();
  return end - start;
}

function benchSetHasMemoized() {
  let hits = 0;
  const start = performance.now();
  const validMovesSet = new Set(validMoves);
  for (let i = 0; i < iterations; i++) {
    for (let j = 0; j < allSquares.length; j++) {
      if (validMovesSet.has(allSquares[j])) {
        hits++;
      }
    }
  }
  const end = performance.now();
  return end - start;
}

const timeArray = benchArrayIncludes();
const timeSet = benchSetHas();
const timeSetMemoized = benchSetHasMemoized();

console.log(`Array.includes: ${timeArray.toFixed(2)} ms`);
console.log(`Set.has (re-created): ${timeSet.toFixed(2)} ms`);
console.log(`Set.has (memoized): ${timeSetMemoized.toFixed(2)} ms`);
