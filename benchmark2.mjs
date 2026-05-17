import { performance } from 'perf_hooks';

const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const validMoves = ['e3', 'e4', 'd3', 'f3', 'c4', 'g4', 'b5', 'h5', 'a4', 'a5', 'b3', 'f5'];

function baselineRender() {
    let highlightCount = 0;
    for (const rank of RANKS) {
        for (const file of FILES) {
            const square = `${file}${rank}`;
            if (validMoves.includes(square)) {
                highlightCount++;
            }
        }
    }
    return highlightCount;
}

const validMovesSet = new Set(validMoves);
function optimizedRender() {
    let highlightCount = 0;
    for (const rank of RANKS) {
        for (const file of FILES) {
            const square = `${file}${rank}`;
            if (validMovesSet.has(square)) {
                highlightCount++;
            }
        }
    }
    return highlightCount;
}

const iterations = 100000;

const startBaseline = performance.now();
for (let i = 0; i < iterations; i++) {
    baselineRender();
}
const endBaseline = performance.now();

const startOptimized = performance.now();
for (let i = 0; i < iterations; i++) {
    optimizedRender();
}
const endOptimized = performance.now();

console.log(`Baseline (Array.includes): ${(endBaseline - startBaseline).toFixed(2)} ms`);
console.log(`Optimized (Set.has): ${(endOptimized - startOptimized).toFixed(2)} ms`);
