import { performance } from 'perf_hooks';

// Setup mock history
const history = [];
for (let i = 0; i < 1000; i++) {
    history.push(`e${i}`);
}

// Baseline
function renderBaseline() {
    const movePairs = [];
    for (let i = 0; i < history.length; i += 2) {
        movePairs.push({
            white: history[i],
            black: history[i + 1]
        });
    }
    return movePairs;
}

// Simulated cache for useMemo
let cachedHistory = null;
let cachedMovePairs = null;
function useMemoSimulated(factory, deps) {
    if (cachedHistory === deps[0]) {
        return cachedMovePairs;
    }
    cachedHistory = deps[0];
    cachedMovePairs = factory();
    return cachedMovePairs;
}

function renderOptimized() {
    return useMemoSimulated(() => {
        const movePairs = [];
        for (let i = 0; i < history.length; i += 2) {
            movePairs.push({
                white: history[i],
                black: history[i + 1]
            });
        }
        return movePairs;
    }, [history]);
}

const ITERATIONS = 100000;

const startBaseline = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    renderBaseline();
}
const endBaseline = performance.now();
const baselineTime = endBaseline - startBaseline;

const startOptimized = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    renderOptimized();
}
const endOptimized = performance.now();
const optimizedTime = endOptimized - startOptimized;

console.log(`Baseline time: ${baselineTime.toFixed(2)} ms`);
console.log(`Optimized time: ${optimizedTime.toFixed(2)} ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}% reduction in execution time`);
