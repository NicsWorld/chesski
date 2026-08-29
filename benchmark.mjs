import { performance } from 'perf_hooks';

// Setup
const validMovesArray = ['e3', 'e4', 'f3', 'g3', 'h3']; // Some dummy valid moves
const validMovesSet = new Set(validMovesArray);
const squares = [];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];
for (const r of RANKS) {
    for (const f of FILES) {
        squares.push(f + r);
    }
}

const iterations = 100000;

function benchArray() {
    let count = 0;
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        for (const sq of squares) {
            if (validMovesArray.includes(sq)) {
                count++;
            }
        }
    }
    const end = performance.now();
    return { time: end - start, count };
}

function benchSet() {
    let count = 0;
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        for (const sq of squares) {
            if (validMovesSet.has(sq)) {
                count++;
            }
        }
    }
    const end = performance.now();
    return { time: end - start, count };
}

console.log("Warming up...");
benchArray();
benchSet();

console.log("Running array bench...");
const arrayResult = benchArray();
console.log(`Array.includes: ${arrayResult.time.toFixed(2)}ms`);

console.log("Running set bench...");
const setResult = benchSet();
console.log(`Set.has: ${setResult.time.toFixed(2)}ms`);

console.log(`Improvement: ${(arrayResult.time / setResult.time).toFixed(2)}x faster`);
