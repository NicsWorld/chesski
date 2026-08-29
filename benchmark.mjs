const addKingsToFen_Baseline = (fen) => {
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

const addKingsToFen_Optimized = (fen) => {
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

            if (charCode >= 48 && charCode <= 57) {
                let count = charCode - 48;
                while (count > 0) {
                    if (!whiteKingPlaced) {
                        if (emptyCount > 0) {
                            newRow += emptyCount;
                            emptyCount = 0;
                        }
                        newRow += 'K';
                        whiteKingPlaced = true;
                    } else if (!blackKingPlaced) {
                        if (emptyCount > 0) {
                            newRow += emptyCount;
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
                    newRow += emptyCount;
                    emptyCount = 0;
                }
                newRow += row[i];
            }
        }
        if (emptyCount > 0) {
            newRow += emptyCount;
        }
        return newRow;
    });

    parts[0] = newRows.join('/');
    return parts.join(' ');
};

// Check correctness
const fens = [
    '8/8/8/8/8/8/4P3/8 w - - 0 1',
    '7k/8/8/8/8/8/4P3/8 w - - 0 1',
    '8/8/8/8/8/8/4P3/K7 w - - 0 1',
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    '8/8/2k5/8/8/8/8/8 w - - 0 1'
];
for (const fen of fens) {
    if (addKingsToFen_Baseline(fen) !== addKingsToFen_Optimized(fen)) {
        console.error('Mismatch for FEN:', fen);
        console.error('Baseline:', addKingsToFen_Baseline(fen));
        console.error('Optimized:', addKingsToFen_Optimized(fen));
    }
}

// Benchmark
const measure = (name, fn) => {
    const start = performance.now();
    for (let i = 0; i < 100000; i++) {
        for (const fen of fens) {
            fn(fen);
        }
    }
    const end = performance.now();
    console.log(`${name}: ${(end - start).toFixed(2)} ms`);
    return end - start;
};

// Warmup
for (let i = 0; i < 10000; i++) {
    for (const fen of fens) {
        addKingsToFen_Baseline(fen);
        addKingsToFen_Optimized(fen);
    }
}

const timeBaseline = measure('Baseline', addKingsToFen_Baseline);
const timeOptimized = measure('Optimized', addKingsToFen_Optimized);
console.log(`Improvement: ${(((timeBaseline - timeOptimized) / timeBaseline) * 100).toFixed(2)}%`);
