import { useState } from 'react';
import { Chess } from 'chess.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ChessBoard from './components/ChessBoard';
import Tutorial from './components/Tutorial';
import './App.css';

function App() {
  const [view, setView] = useState<'game' | 'tutorial'>('tutorial');
  const [game, setGame] = useState(new Chess());
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [_fen, setFen] = useState(game.fen()); // Triggers re-render on move
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
  };

  // Memoize game instance to prevent unnecessary re-creations, though state updates trigger re-render
  // actually useState(new Chess()) is fine as it's only initial.

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <header className="app-header">
          <h1>Zoo Chess</h1>
          <p>Learn to play with animal friends!</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
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
          </div>
        </header>

        {view === 'game' ? (
          <div className="game-layout">
            <div className="board-area">
              <ChessBoard game={game} onMove={handleMove} />
            </div>

            <aside className="info-panel">
              <div className="status-card">
                <h2>{message}</h2>
              </div>

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
              </div>

              {/* Placeholder for future features like "Captured Pieces" */}
              {/* <div className="captured-area">...</div> */}
            </aside>
          </div>
        ) : (
          <Tutorial />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
