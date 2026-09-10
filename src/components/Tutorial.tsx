import { useState } from 'react';
import { Chess, SQUARES } from 'chess.js';
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
    let whiteKingPlaced = fen.includes('K');
    let blackKingPlaced = fen.includes('k');

    if (whiteKingPlaced && blackKingPlaced) return fen;

    return fen.replace(/^[^\s]+/, (boardStr) => {
        return boardStr.replace(/[1-8]/g, (match) => {
            if (whiteKingPlaced && blackKingPlaced) return match;

            let count = parseInt(match);
            let replacement = '';

            while (count > 0) {
                if (!whiteKingPlaced) {
                    replacement += 'K';
                    whiteKingPlaced = true;
                } else if (!blackKingPlaced) {
                    replacement += 'k';
                    blackKingPlaced = true;
                } else {
                    replacement += '1';
                }
                count--;
            }
            return replacement;
        }).replace(/1+/g, (match) => match.length.toString());
    });
};

const removeKings = (game: Chess, tutorialId: string) => {
    // Optimized: Using game.get(square) over game.board() yields better performance
    for (const square of SQUARES) {
        const piece = game.get(square);
        if (piece) {
            if (piece.type === 'k' && piece.color === 'b') {
                // Remove black king
                game.remove(square);
            }
            if (piece.type === 'k' && piece.color === 'w' && tutorialId !== 'k') {
                // Remove white king unless it's king tutorial
                game.remove(square);
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

    const handleSelectTutorial = (t: typeof tutorials[0]) => {
        setActiveTutorial(t);
        const newGame = initGame(t);
        setGame(newGame);
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
                }}>Reset Position</button>
            </aside>
        </div>
    );
};

export default Tutorial;
