const { performance } = require('perf_hooks');

const history = Array.from({ length: 100 }, (_, i) => `e${i}`);

function withoutMemo() {
    const movePairs = [];
    for (let i = 0; i < history.length; i += 2) {
        movePairs.push({
            white: history[i],
            black: history[i + 1]
        });
    }
    return movePairs;
}

function withMemo(cached) {
    if (cached) return cached;
    const movePairs = [];
    for (let i = 0; i < history.length; i += 2) {
        movePairs.push({
            white: history[i],
            black: history[i + 1]
        });
    }
    return movePairs;
}

const ITERATIONS = 100000;

// Benchmark without memo
const startWithout = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    withoutMemo();
}
const endWithout = performance.now();

// Benchmark with memo
let cached = null;
const startWith = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    cached = withMemo(cached);
}
const endWith = performance.now();

console.log(`Without useMemo (simulated): ${(endWithout - startWithout).toFixed(2)} ms`);
console.log(`With useMemo (simulated): ${(endWith - startWith).toFixed(2)} ms`);
