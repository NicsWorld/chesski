import { Chess } from 'chess.js';

export const addKingsToFen = (fen: string) => {
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

export const removeKings = (game: Chess, tutorialId: string) => {
    const board = game.board();
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece) {
                if (piece.type === 'k' && piece.color === 'b') {
                    // Remove black king
                    game.remove(piece.square);
                }
                if (piece.type === 'k' && piece.color === 'w' && tutorialId !== 'k') {
                    // Remove white king unless it's king tutorial
                    game.remove(piece.square);
                }
            }
        }
    }
};
