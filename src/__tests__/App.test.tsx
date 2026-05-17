import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';


// Mock evaluateGameStatus to control its output
vi.mock('../utils/gameStatus', () => ({
  evaluateGameStatus: vi.fn(() => "White's turn (Cute Animals)"),
}));

// Mock the ChessBoard to bypass drag-and-drop complexity and easily trigger onMove
vi.mock('../components/ChessBoard', () => {
  return {
    default: ({ onMove }: { onMove: (move: { from: string; to: string; promotion?: string }) => void }) => (
      <div data-testid="mock-chessboard">
        <button
          data-testid="invalid-move-btn"
          onClick={() => onMove({ from: 'e2', to: 'e5' })}
        >
          Make Invalid Move
        </button>
        <button
          data-testid="valid-move-btn"
          onClick={() => onMove({ from: 'e2', to: 'e4' })}
        >
          Make Valid Move
        </button>
      </div>
    ),
  };
});

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays an error message for an invalid move and clears it after 2000ms', () => {
    // 1. Render the App component
    render(<App />);

    // Switch to game view since we default to tutorial without URL params
    const playButton = screen.getByText('Play Game');
    fireEvent.click(playButton);

    // Initial message
    expect(screen.getByText('Welcome! Drag the white pieces to start.')).toBeInTheDocument();

    // 2. Simulate an invalid move using the mocked ChessBoard
    const invalidMoveBtn = screen.getByTestId('invalid-move-btn');

    act(() => {
      fireEvent.click(invalidMoveBtn);
    });

    // 3. Verify the error message appears
    expect(screen.getByText("Oops! You can't move there.")).toBeInTheDocument();

    // 4. Advance time by 2000ms
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // 5. Verify the error message is replaced by the status evaluated from the game
    expect(screen.getByText("White's turn (Cute Animals)")).toBeInTheDocument();
  });
});
