import { useState } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from './ChessBoard';

const tutorials = [
    {
        id: 'p',
        title: 'Pawn',
        description: "Pawns move forward one square, but capture diagonally. On their first move, they can move two squares!",
        fen: '7k/8/8/8/8/8/4P3/K7 w - - 0 1'
    },
    {
        id: 'r',
        title: 'Rook',
        description: "Rooks move in straight lines—forward, backward, left, or right, as far as they want.",
        fen: '7k/8/8/8/3R4/8/8/K7 w - - 0 1'
    },
    {
        id: 'n',
        title: 'Knight',
        description: "Knights move in an 'L' shape: two squares in one direction and then one square to the side. They can jump over other pieces!",
        fen: '7k/8/8/8/3N4/8/8/K7 w - - 0 1'
    },
    {
        id: 'b',
        title: 'Bishop',
        description: "Bishops move diagonally as far as they want. They always stay on the same color squares.",
        fen: '7k/8/8/8/3B4/8/8/K7 w - - 0 1'
    },
    {
        id: 'q',
        title: 'Queen',
        description: "The Queen is the most powerful piece! She can move like a Rook and a Bishop combined.",
        fen: '7k/8/8/8/3Q4/8/8/K7 w - - 0 1'
    },
    {
        id: 'k',
        title: 'King',
        description: "The King moves one square in any direction. Keep him safe!",
        fen: '7k/8/8/8/3K4/8/8/8 w - - 0 1'
    }
];

const addKingsToFen = (fen: string) => {
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

// Optimized: O(1) algebraic coordinate conversion based on 0x88 board representation
const algebraic = (sq: number) => {
    const f = sq & 15;
    const r = sq >> 4;
    return ('abcdefgh'[f] + '87654321'[r]) as import('chess.js').Square;
};

const removeKings = (game: Chess, tutorialId: string) => {
    // Optimized: Use internal _kings property for O(1) removal, avoiding full board scan
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const kings = (game as any)._kings;
    /* eslint-enable @typescript-eslint/no-explicit-any */

    if (kings) {
        if (kings.b !== undefined && kings.b !== -1) {
            game.remove(algebraic(kings.b));
        }
        if (tutorialId !== 'k' && kings.w !== undefined && kings.w !== -1) {
            game.remove(algebraic(kings.w));
        }
    } else {
        // Fallback to O(N) iteration if internal property changes in future library versions
        const SQUARES = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
            'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
            'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
            'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
            'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
            'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
            'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
            'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'] as const;

        for (const square of SQUARES) {
            const piece = game.get(square);
            if (piece) {
                if (piece.type === 'k' && piece.color === 'b') {
                    game.remove(square);
                }
                if (piece.type === 'k' && piece.color === 'w' && tutorialId !== 'k') {
                    game.remove(square);
                }
            }
        }
    }
};

const Tutorial = ({ pieceTheme }: { pieceTheme: 'zoo' | 'standard' }) => {
    const [activeTutorial, setActiveTutorial] = useState(tutorials[0]);

    const initGame = (t: typeof tutorials[0]) => {
        const g = new Chess(t.fen);
        removeKings(g, t.id);
        return g;
    };

    const [game, setGame] = useState(() => initGame(tutorials[0]));
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const [_, setFen] = useState(game.fen());

    const handleSelectTutorial = (t: typeof tutorials[0]) => {
        setActiveTutorial(t);
        const newGame = initGame(t);
        setGame(newGame);
        setFen(newGame.fen());
    };

    const handleMove = (move: { from: string; to: string; promotion?: string }) => {
        try {
            const result = game.move(move);
            if (result) {
                let currentFen = game.fen();
                const fenParts = currentFen.split(' ');
                fenParts[1] = 'w';
                currentFen = fenParts.join(' ');

                const validFen = addKingsToFen(currentFen);
                const newGame = new Chess(validFen);

                removeKings(newGame, activeTutorial.id);

                setGame(newGame);
                setFen(newGame.fen());
            }
        } catch (error) {
            console.debug("Invalid move:", error);
        }
    };

    const currentIndex = tutorials.findIndex(t => t.id === activeTutorial.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < tutorials.length - 1;

    return (
        <div className="game-layout">
            <div className="board-area">
                <ChessBoard game={game} onMove={handleMove} pieceTheme={pieceTheme} />
            </div>
            <aside className="info-panel">
                <div className="status-card">
                    <h2>Tutorial: {activeTutorial.title}</h2>
                    <p>{activeTutorial.description}</p>
                </div>
                <div className="action-buttons" style={{ marginBottom: '1rem' }}>
                    <button
                        className="btn-secondary"
                        onClick={() => handleSelectTutorial(tutorials[currentIndex - 1])}
                        disabled={!hasPrev}
                        aria-label="Previous tutorial"
                    >
                        Previous
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => handleSelectTutorial(tutorials[currentIndex + 1])}
                        disabled={!hasNext}
                        aria-label="Next tutorial"
                    >
                        Next
                    </button>
                </div>
                <div className="action-buttons" style={{ flexWrap: 'wrap' }}>
                    {tutorials.map(t => (
                        <button
                            key={t.id}
                            className={activeTutorial.id === t.id ? '' : 'btn-secondary'}
                            onClick={() => handleSelectTutorial(t)}
                        >
                            {t.title}
                        </button>
                    ))}
                </div>
                <button className="btn-secondary" onClick={() => {
                    const resetGame = initGame(activeTutorial);
                    setGame(resetGame);
                    setFen(resetGame.fen());
                }}>Reset Position</button>
            </aside>
        </div>
    );
};

export default Tutorial;
