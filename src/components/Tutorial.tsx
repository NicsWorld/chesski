import { useState } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from './ChessBoard';
import { tutorials } from '../constants/tutorials';
import { addKingsToFen, removeKings } from '../utils/fen';

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
        } catch {
            // Invalid move
        }
    };

    const shouldHidePiece = (piece: { type: string; color: string }) => {
        // Since we remove kings physically, this might be redundant but safe to keep
        if (piece.type === 'k' && piece.color === 'b') return true;
        if (piece.type === 'k' && piece.color === 'w' && activeTutorial.id !== 'k') return true;
        return false;
    };

    return (
        <div className="game-layout">
            <div className="board-area">
                <ChessBoard game={game} onMove={handleMove} shouldHidePiece={shouldHidePiece} pieceTheme={pieceTheme} />
            </div>
            <aside className="info-panel">
                <div className="status-card">
                    <h2>Tutorial: {activeTutorial.title}</h2>
                    <p>{activeTutorial.description}</p>
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
