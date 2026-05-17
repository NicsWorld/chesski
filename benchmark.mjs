import { performance } from 'perf_hooks';

const addKingsToFenOriginal = (fen) => {
    const parts = fen.split(' ');
    const boardStr = parts[0];

    let whiteKingPlaced = boardStr.includes('K');
    let blackKingPlaced = boardStr.includes('k');

    if (whiteKingPlaced && blackKingPlaced) return fen;

    const rows = boardStr.split('/');

    const newRows = rows.map(row => {
        if (whiteKingPlaced && blackKingPlaced) return row;

        let newRow = '';
        for (let i = 0; i < row.length; i++) {
            const char = row[i];
            if (!isNaN(parseInt(char))) {
                let count = parseInt(char);
                while (count > 0) {
                    if (!whiteKingPlaced) {
                        newRow += 'K';
                        whiteKingPlaced = true;
                    } else if (!blackKingPlaced) {
                        newRow += 'k';
                        blackKingPlaced = true;
                    } else {
                        newRow += '1';
                    }
                    count--;
                }
            } else {
                newRow += char;
            }
        }
        return newRow.replace(/1+/g, (match) => match.length.toString());
    });

    parts[0] = newRows.join('/');
    return parts.join(' ');
};

const addKingsToFenOptimized = (fen) => {
    const parts = fen.split(' ');
    const boardStr = parts[0];

    let whiteKingPlaced = boardStr.includes('K');
    let blackKingPlaced = boardStr.includes('k');

    if (whiteKingPlaced && blackKingPlaced) return fen;

    const rows = boardStr.split('/');

    const newRows = rows.map(row => {
        if (whiteKingPlaced && blackKingPlaced) return row;

        let newRow = '';
        let emptyCount = 0;

        for (let i = 0; i < row.length; i++) {
            const charCode = row.charCodeAt(i);
            if (charCode >= 48 && charCode <= 57) { // 0-9
                let count = charCode - 48;
                while (count > 0) {
                    if (!whiteKingPlaced) {
                        if (emptyCount > 0) {
                            newRow += emptyCount.toString();
                            emptyCount = 0;
                        }
                        newRow += 'K';
                        whiteKingPlaced = true;
                    } else if (!blackKingPlaced) {
                        if (emptyCount > 0) {
                            newRow += emptyCount.toString();
                            emptyCount = 0;
                        }
                        newRow += 'k';
                        blackKingPlaced = true;
                    } else {
                        emptyCount++;
                    }
                    count--;
                }
            } else {
                if (emptyCount > 0) {
                    newRow += emptyCount.toString();
                    emptyCount = 0;
                }
                newRow += row[i];
            }
        }
        if (emptyCount > 0) {
            newRow += emptyCount.toString();
        }
        return newRow;
    });

    parts[0] = newRows.join('/');
    return parts.join(' ');
};

const testFen = '7k/8/8/8/8/8/4P3/8 w - - 0 1';

console.assert(addKingsToFenOriginal(testFen) === addKingsToFenOptimized(testFen), "Outputs don't match!");

const iterations = 100000;

let start = performance.now();
for (let i = 0; i < iterations; i++) {
    addKingsToFenOriginal(testFen);
}
let end = performance.now();
console.log(`Original: ${(end - start).toFixed(2)}ms`);

start = performance.now();
for (let i = 0; i < iterations; i++) {
    addKingsToFenOptimized(testFen);
}
end = performance.now();
console.log(`Optimized: ${(end - start).toFixed(2)}ms`);
