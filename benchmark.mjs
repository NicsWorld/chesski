const validMoves = ["a3", "a4", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

function benchArray() {
    let count = 0;
    for (const rank of RANKS) {
        for (const file of FILES) {
            const square = `${file}${rank}`;
            if (validMoves.includes(square)) {
                count++;
            }
        }
    }
    return count;
}

function benchSet() {
    let count = 0;
    const validMovesSet = new Set(validMoves);
    for (const rank of RANKS) {
        for (const file of FILES) {
            const square = `${file}${rank}`;
            if (validMovesSet.has(square)) {
                count++;
            }
        }
    }
    return count;
}

const ITERATIONS = 1000000;

const startArray = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    benchArray();
}
const endArray = performance.now();
console.log(`Array includes: ${endArray - startArray}ms`);

const startSet = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    benchSet();
}
const endSet = performance.now();
console.log(`Set has: ${endSet - startSet}ms`);
