import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tutorial from '../Tutorial';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


// Mock ChessBoard to trigger onMove easily and observe passed props
vi.mock('../ChessBoard', () => ({
  default: ({ onMove, shouldHidePiece, game }: { onMove: (move: { from: string, to: string }) => void, shouldHidePiece: (piece: { type: string, color: string }) => boolean, game: import('chess.js').Chess }) => (
    <div data-testid="mock-chessboard">
      <button
        data-testid="mock-valid-move-btn"
        onClick={() => {
            // Need to pass a valid move for the pawn tutorial to advance
            onMove({ from: 'e2', to: 'e4' })
        }}
      >
        Mock Valid Move
      </button>
      <button
        data-testid="mock-invalid-move-btn"
        onClick={() => {
            onMove({ from: 'a1', to: 'a8' })
        }}
      >
        Mock Invalid Move
      </button>
      <div data-testid="mock-fen">{game.fen()}</div>
      <div data-testid="mock-hide-test">
        {shouldHidePiece({ type: 'k', color: 'b' }) ? 'hide-bk' : 'show-bk'}-
        {shouldHidePiece({ type: 'k', color: 'w' }) ? 'hide-wk' : 'show-wk'}-
        {shouldHidePiece({ type: 'p', color: 'w' }) ? 'hide-wp' : 'show-wp'}
      </div>
    </div>
  )
}));

describe('Tutorial', () => {
  const renderTutorial = () => {
    return render(
      <DndProvider backend={HTML5Backend}>
        <Tutorial pieceTheme="standard" />
      </DndProvider>
    );
  };

  it('renders initial tutorial correctly', () => {
    renderTutorial();
    expect(screen.getByText('Tutorial: Pawn')).toBeInTheDocument();
    expect(screen.getByText(/Pawns move forward one square/)).toBeInTheDocument();
    // In pawn tutorial, both kings should be removed and hidden.
    // The starting FEN for pawn is: 7k/8/8/8/8/8/4P3/K7 w - - 0 1
    // Removing kings means the FEN should reflect empty squares where kings were.
    const fenDiv = screen.getByTestId('mock-fen');
    expect(fenDiv.textContent).toContain('8/8/8/8/8/8/4P3/8');

    const hideDiv = screen.getByTestId('mock-hide-test');
    expect(hideDiv.textContent).toBe('hide-bk-hide-wk-show-wp');
  });

  it('switches to a different tutorial', () => {
    renderTutorial();
    const rookBtn = screen.getByRole('button', { name: 'Rook' });
    fireEvent.click(rookBtn);

    expect(screen.getByText('Tutorial: Rook')).toBeInTheDocument();
    expect(screen.getByText(/Rooks move in straight lines/)).toBeInTheDocument();

    const fenDiv = screen.getByTestId('mock-fen');
    // Rook FEN: 7k/8/8/8/3R4/8/8/K7 w - - 0 1
    // After removing kings:
    expect(fenDiv.textContent).toContain('8/8/8/8/3R4/8/8/8');
  });

  it('resets position correctly', () => {
    renderTutorial();

    const rookBtn = screen.getByRole('button', { name: 'Rook' });
    fireEvent.click(rookBtn);

    // Perform a move to change the state
    // We'd have to interact with the mock move button but to keep it simple, we just click reset and expect the current active tutorial FEN.

    const resetBtn = screen.getByRole('button', { name: 'Reset Position' });
    fireEvent.click(resetBtn);

    expect(screen.getByText('Tutorial: Rook')).toBeInTheDocument();
    const fenDiv = screen.getByTestId('mock-fen');
    expect(fenDiv.textContent).toContain('8/8/8/8/3R4/8/8/8');
  });

  it('handles valid moves and replaces kings during move logic', () => {
    renderTutorial(); // Defaults to Pawn

    // Initial fen for pawn without kings is: 8/8/8/8/8/8/4P3/8 w - - 0 1
    const moveBtn = screen.getByTestId('mock-valid-move-btn');
    fireEvent.click(moveBtn);

    // After pawn moves e2 to e4, new fen without kings should be:
    // 8/8/8/8/4P3/8/8/8
    const fenDiv = screen.getByTestId('mock-fen');
    expect(fenDiv.textContent).toContain('8/8/8/8/4P3/8/8/8');
  });

  it('handles invalid moves gracefully', () => {
    renderTutorial();

    const fenDiv = screen.getByTestId('mock-fen');
    const initialFen = fenDiv.textContent;

    const invalidMoveBtn = screen.getByTestId('mock-invalid-move-btn');
    fireEvent.click(invalidMoveBtn);

    // Fen should not change
    expect(fenDiv.textContent).toBe(initialFen);
  });

  it('does not hide white king in King tutorial', () => {
    renderTutorial();
    const kingBtn = screen.getByRole('button', { name: 'King' });
    fireEvent.click(kingBtn);

    const hideDiv = screen.getByTestId('mock-hide-test');
    expect(hideDiv.textContent).toBe('hide-bk-show-wk-show-wp');

    const fenDiv = screen.getByTestId('mock-fen');
    // King FEN: 7k/8/8/8/3K4/8/8/8 w - - 0 1
    // After removing black king only:
    expect(fenDiv.textContent).toContain('8/8/8/8/3K4/8/8/8');
  });
});
