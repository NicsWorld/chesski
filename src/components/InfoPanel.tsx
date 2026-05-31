import type { Dispatch, SetStateAction } from 'react';
import { Chess } from 'chess.js';
import MoveHistory from './MoveHistory';

interface InfoPanelProps {
  message: string;
  game: Chess;
  resetGame: () => void;
  setFen: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
  shareGame: () => void;
  evaluateGameStatus: (game: Chess) => string;
}

function InfoPanel({ message, game, resetGame, setFen, setMessage, shareGame, evaluateGameStatus }: InfoPanelProps) {
  return (
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
            setMessage(evaluateGameStatus(game));
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
  );
}

export default InfoPanel;
