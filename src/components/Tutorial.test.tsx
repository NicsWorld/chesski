import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tutorial from './Tutorial';

// Mock ChessBoard to expose the onMove prop
vi.mock('./ChessBoard', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ onMove }: any) => (
    <button
      data-testid="mock-chessboard"
      onClick={() => {
        // e2 to e5 is an invalid move in the starting pawn tutorial FEN
        // '7k/8/8/8/8/8/4P3/K7 w - - 0 1'
        onMove({ from: 'e2', to: 'e5' });
      }}
    >
      Mock Board
    </button>
  ),
}));

describe('Tutorial', () => {
  it('handles invalid moves safely without throwing', () => {
    render(<Tutorial pieceTheme="standard" />);

    const board = screen.getByTestId('mock-chessboard');

    // Simulating an invalid move should not throw an error,
    // it should be caught in the catch block.
    expect(() => fireEvent.click(board)).not.toThrow();
  });
});
