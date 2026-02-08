import { useState } from 'react';
import { Chess } from 'chess.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ChessBoard from './components/ChessBoard';
import Tutorial from './components/Tutorial';
import MoveHistory from './components/MoveHistory';
import './App.css';

function App() {
  const [view, setView] = useState<'game' | 'tutorial'>(() => {
    // If we are loading a shared game (fen param exists), default to game view
    const params = new URLSearchParams(window.location.search);
    return params.has('fen') ? 'game' : 'tutorial';
  });
  const [game, setGame] = useState(new Chess());
  const [pieceTheme, setPieceTheme] = useState<'zoo' | 'standard'>('zoo');
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [fen, setFen] = useState(() => {
    // Check for FEN in URL on initialization
    const params = new URLSearchParams(window.location.search);
    const fenParam = params.get('fen');
    if (fenParam) {
      try {
        const loadedGame = new Chess(fenParam);
        setGame(loadedGame);
        return fenParam;
      } catch (e) {
        console.error("Invalid FEN in URL", e);
      }
    }
    return game.fen();
  });
  const [message, setMessage] = useState("Welcome! Drag the white pieces to start.");

  const handleMove = (move: { from: string; to: string; promotion?: string }) => {
    try {
      const result = game.move(move);
      if (result) {
        setFen(game.fen()); // Update state to re-render board
        updateStatus();
      }
    } catch {
      setMessage("Oops! You can't move there.");
      setTimeout(updateStatus, 2000);
    }
  };

  const updateStatus = () => {
    if (game.isCheckmate()) {
      setMessage(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`);
    } else if (game.isDraw()) {
      setMessage("It's a draw!");
    } else if (game.isCheck()) {
      setMessage("Check! Watch out!");
    } else {
      setMessage(game.turn() === 'w' ? "White's turn (Cute Animals)" : "Black's turn (Cool Animals)");
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setMessage("New Game! White starts.");
    // Clear the URL param
    window.history.pushState({}, '', window.location.pathname);
  };

  const shareGame = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('fen', game.fen());
    navigator.clipboard.writeText(url.toString()).then(() => {
      const originalMessage = message;
      setMessage("Link copied to clipboard!");
      setTimeout(() => setMessage(originalMessage), 2000);
    });
  };

  // Memoize game instance to prevent unnecessary re-creations, though state updates trigger re-render
  // actually useState(new Chess()) is fine as it's only initial.

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <header className="app-header">
          <h1>Zoo Chess</h1>
          <p>Learn to play with animal friends!</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              className={view === 'game' ? '' : 'btn-secondary'}
              onClick={() => setView('game')}
            >
              Play Game
            </button>
            <button
              className={view === 'tutorial' ? '' : 'btn-secondary'}
              onClick={() => setView('tutorial')}
            >
              Tutorials
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Theme:</span>
              <button
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', backgroundColor: pieceTheme === 'zoo' ? 'rgba(255,255,255,0.2)' : 'transparent' }}
                onClick={() => setPieceTheme('zoo')}
              >
                Zoo
              </button>
              <button
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', backgroundColor: pieceTheme === 'standard' ? 'rgba(255,255,255,0.2)' : 'transparent' }}
                onClick={() => setPieceTheme('standard')}
              >
                Standard
              </button>
            </div>
          </div>
        </header>

        {view === 'game' ? (
          <div className="game-layout">
            <div className="board-area">
              <ChessBoard game={game} onMove={handleMove} pieceTheme={pieceTheme} />
            </div>

            <aside className="info-panel">
              <div className="status-card">
                <h2>{message}</h2>
              </div>

              <MoveHistory history={game.history()} />

              <div className="action-buttons">
                <button onClick={resetGame}>New Game</button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    game.undo();
                    setFen(game.fen());
                    updateStatus();
                  }}
                >
                  Undo
                </button>
                <button
                  className="btn-secondary"
                  onClick={shareGame}
                  title="Copy link to current game"
                >
                  Share Game
                </button>
              </div>

              {/* Placeholder for future features like "Captured Pieces" */}
              {/* <div className="captured-area">...</div> */}
            </aside>
          </div>
        ) : (
          <Tutorial pieceTheme={pieceTheme} />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
