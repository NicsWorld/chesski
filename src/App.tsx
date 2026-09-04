import { useState } from 'react';
import { Chess, validateFen } from 'chess.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ChessBoard from './components/ChessBoard';
import Tutorial from './components/Tutorial';
import MoveHistory from './components/MoveHistory';
import CapturedPieces from './components/CapturedPieces';
import { evaluateGameStatus } from './utils/gameStatus';
import './App.css';

function App() {
  const [view, setView] = useState<'game' | 'tutorial'>(() => {
    // If we are loading a shared game (fen param exists), default to game view
    const params = new URLSearchParams(window.location.search);
    return params.has('fen') ? 'game' : 'tutorial';
  });
  const [game, setGame] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const fenParam = params.get('fen');
    if (fenParam && fenParam.length <= 100 && validateFen(fenParam).ok) {
      try {
        return new Chess(fenParam);
      } catch (e) {
        console.error("Invalid FEN in URL", e);
      }
    } else if (fenParam) {
      console.error("Invalid FEN in URL", new Error("FEN length exceeded 100 characters or validation failed"));
    }
    return new Chess();
  });
  const [pieceTheme, setPieceTheme] = useState<'zoo' | 'standard'>('zoo');
  const [message, setMessage] = useState("Welcome! Drag the white pieces to start.");

  const handleMove = (move: { from: string; to: string; promotion?: string }) => {
    try {
      const gameClone = new Chess();
      gameClone.loadPgn(game.pgn());
      const result = gameClone.move(move);
      if (result) {
        setGame(gameClone);
        setMessage(evaluateGameStatus(gameClone));
      }
    } catch {
      setMessage("Oops! You can't move there.");
      setTimeout(() => setMessage(evaluateGameStatus(game)), 2000);
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
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
          <div className="app-header-controls">
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

            <div className="theme-selector">
              <span className="theme-selector-label">Theme:</span>
              <button
                className={`btn-secondary theme-btn ${pieceTheme === 'zoo' ? 'active' : ''}`}
                onClick={() => setPieceTheme('zoo')}
              >
                Zoo
              </button>
              <button
                className={`btn-secondary theme-btn ${pieceTheme === 'standard' ? 'active' : ''}`}
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
                    const gameClone = new Chess();
                    gameClone.loadPgn(game.pgn());
                    gameClone.undo();
                    setGame(gameClone);
                    setMessage(evaluateGameStatus(gameClone));
                  }}
                  disabled={game.history().length === 0}
                  title={game.history().length === 0 ? "No moves to undo" : "Undo last move"}
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

              <CapturedPieces game={game} pieceTheme={pieceTheme} />
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
