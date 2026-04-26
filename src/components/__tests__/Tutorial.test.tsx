import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import Tutorial from '../Tutorial';

// Mock ChessBoard so we can test Tutorial's interaction with it
vi.mock('../ChessBoard', () => ({
  default: function MockChessBoard({ game, onMove, shouldHidePiece }: any) {
    return (
      <div data-testid="mock-chess-board">
        <span data-testid="game-fen">{game.fen()}</span>
        <button
          data-testid="mock-move"
          onClick={() => onMove({ from: 'e2', to: 'e4' })}
        >
          Mock Move
        </button>
        {/* We can test shouldHidePiece by rendering its output for a known piece */}
        <span data-testid="hide-black-king">
          {shouldHidePiece({ type: 'k', color: 'b' }).toString()}
        </span>
        <span data-testid="hide-white-king">
          {shouldHidePiece({ type: 'k', color: 'w' }).toString()}
        </span>
        <span data-testid="hide-white-pawn">
          {shouldHidePiece({ type: 'p', color: 'w' }).toString()}
        </span>
      </div>
    );
  }
}));

describe('Tutorial Component', () => {
  test('renders initial tutorial (Pawn)', () => {
    render(<Tutorial pieceTheme="standard" />);
    expect(screen.getByText('Tutorial: Pawn')).toBeTruthy();
    expect(screen.getByText(/Pawns move forward one square/i)).toBeTruthy();
  });

  test('switches to another tutorial when clicked', () => {
    render(<Tutorial pieceTheme="standard" />);

    // Click on Rook tutorial
    fireEvent.click(screen.getByText('Rook'));

    expect(screen.getByText('Tutorial: Rook')).toBeTruthy();
    expect(screen.getByText(/Rooks move in straight lines/i)).toBeTruthy();
  });

  test('shouldHidePiece works correctly depending on the tutorial', () => {
    render(<Tutorial pieceTheme="standard" />);

    // In Pawn tutorial, both Kings should be hidden
    expect(screen.getByTestId('hide-black-king').textContent).toBe('true');
    expect(screen.getByTestId('hide-white-king').textContent).toBe('true');
    expect(screen.getByTestId('hide-white-pawn').textContent).toBe('false');

    // Switch to King tutorial
    fireEvent.click(screen.getByText('King'));

    // In King tutorial, white king is NOT hidden, black king is hidden
    expect(screen.getByTestId('hide-black-king').textContent).toBe('true');
    expect(screen.getByTestId('hide-white-king').textContent).toBe('false');
  });

  test('resets position when reset button is clicked', () => {
    render(<Tutorial pieceTheme="standard" />);

    const initialFen = screen.getByTestId('game-fen').textContent;

    // Click Rook
    fireEvent.click(screen.getByText('Rook'));
    expect(screen.getByTestId('game-fen').textContent).not.toBe(initialFen);
    const rookFen = screen.getByTestId('game-fen').textContent;

    // Reset
    fireEvent.click(screen.getByText('Reset Position'));
    expect(screen.getByTestId('game-fen').textContent).toBe(rookFen);
  });

  test('handleMove updates the game state', () => {
    // Note: We use Pawn tutorial here where e2 to e4 is a valid move
    render(<Tutorial pieceTheme="standard" />);

    const initialFen = screen.getByTestId('game-fen').textContent;

    // Trigger mock move (e2 to e4)
    fireEvent.click(screen.getByTestId('mock-move'));

    const updatedFen = screen.getByTestId('game-fen').textContent;
    expect(updatedFen).not.toBe(initialFen);
    // Pawn on e2 moved to e4, so we should see it reflected in FEN somehow
    // E.g., row 4 has a pawn now
    expect(updatedFen).toContain('P');
  });
});
