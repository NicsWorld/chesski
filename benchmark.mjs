const iterations = 100000;
const moves = ['e3', 'e4', 'f3', 'g4', 'h5'];
const squares = [];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];
for (const r of RANKS) {
  for (const f of FILES) {
    squares.push(`${f}${r}`);
  }
}

console.log("Benchmarking Array.includes()...");
let start = performance.now();
let countArray = 0;
for (let i = 0; i < iterations; i++) {
  for (const sq of squares) {
    if (moves.includes(sq)) {
      countArray++;
    }
  }
}
let end = performance.now();
const arrayTime = end - start;
console.log(`Array.includes() took ${arrayTime.toFixed(2)}ms`);

console.log("\nBenchmarking Set.has()...");
start = performance.now();
let countSet = 0;
const movesSet = new Set(moves);
for (let i = 0; i < iterations; i++) {
  for (const sq of squares) {
    if (movesSet.has(sq)) {
      countSet++;
    }
  }
}
end = performance.now();
const setTime = end - start;
console.log(`Set.has() took ${setTime.toFixed(2)}ms`);

console.log(`\nImprovement: ${((arrayTime - setTime) / arrayTime * 100).toFixed(2)}% faster`);
