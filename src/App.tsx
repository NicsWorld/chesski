import { useState } from 'react';
import { Chess } from 'chess.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ChessBoard from './components/ChessBoard';
import './App.css';

function App() {
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
    } catch (e) {
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
      <div className="game-container">
        <header>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '3rem', margin: '0.5rem 0' }}>Zoo Chess</h1>
          <p style={{ fontSize: '1.2rem' }}>Learn to play with animal friends!</p>
        </header>

        <div style={{ position: 'relative' }}>
          <ChessBoard game={game} onMove={handleMove} />
        </div>

        <div className="game-controls" style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: 'var(--border-radius-large)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          width: '100%'
        }}>
          <h2 style={{ color: 'var(--color-text-main)' }}>{message}</h2>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            <button onClick={resetGame}>Reset Game</button>
            <button onClick={() => {
              game.undo();
              setFen(game.fen());
              updateStatus();
            }} style={{ backgroundColor: 'var(--color-secondary)' }}>Undo Move</button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
