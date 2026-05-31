import { useState } from 'react';
import { Chess } from 'chess.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ChessBoard from './components/ChessBoard';
import Tutorial from './components/Tutorial';
import Header from './components/Header';
import InfoPanel from './components/InfoPanel';
import { evaluateGameStatus } from './utils/gameStatus';
import './App.css';

function App() {
  const [view, setView] = useState<'game' | 'tutorial'>(() => {
    // If we are loading a shared game (fen param exists), default to game view
    const params = new URLSearchParams(window.location.search);
    return params.has('fen') ? 'game' : 'tutorial';
  });
  const [game, setGame] = useState(new Chess());
  const [pieceTheme, setPieceTheme] = useState<'zoo' | 'standard'>('zoo');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_fen, setFen] = useState(() => {
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
        setMessage(evaluateGameStatus(game));
      }
    } catch {
      setMessage("Oops! You can't move there.");
      setTimeout(() => setMessage(evaluateGameStatus(game)), 2000);
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
        <Header view={view} setView={setView} pieceTheme={pieceTheme} setPieceTheme={setPieceTheme} />

        {view === 'game' ? (
          <div className="game-layout">
            <div className="board-area">
              <ChessBoard game={game} onMove={handleMove} pieceTheme={pieceTheme} />
            </div>

            <InfoPanel message={message} game={game} resetGame={resetGame} setFen={setFen} setMessage={setMessage} shareGame={shareGame} evaluateGameStatus={evaluateGameStatus} />
          </div>
        ) : (
          <Tutorial pieceTheme={pieceTheme} />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
