const squares = [];
const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
for (const rank of ranks) {
    for (const file of files) {
        squares.push(`${file}${rank}`);
    }
}

// simulate some valid moves
const validMovesArr = ['a3', 'a4', 'b3', 'c3', 'h3', 'e4', 'e5', 'd4', 'd5', 'f3'];
const validMovesSet = new Set(validMovesArr);

const iterations = 100000;

console.time('Array includes');
for (let i = 0; i < iterations; i++) {
    for (const square of squares) {
        validMovesArr.includes(square);
    }
}
console.timeEnd('Array includes');

console.time('Set has');
for (let i = 0; i < iterations; i++) {
    for (const square of squares) {
        validMovesSet.has(square);
    }
}
console.timeEnd('Set has');
