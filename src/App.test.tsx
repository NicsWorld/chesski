import { render, screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';
import { Chess } from 'chess.js';
import * as gameStatus from './utils/gameStatus';

// Mock ChessBoard so we can easily simulate a move
vi.mock('./components/ChessBoard', () => {
  return {
    default: (props: { onMove: (move: { from: string; to: string; promotion?: string }) => void, game: Chess }) => {
      return (
        <div data-testid="mock-chessboard">
          <button
            data-testid="simulate-invalid-move"
            onClick={() => {
              // Try to make an invalid move for the starting position, like a1 to a8
              props.onMove({ from: 'a1', to: 'a8' });
            }}
          >
            Simulate Invalid Move
          </button>
        </div>
      );
    }
  };
});

// Mock Tutorial component to avoid canvas/DOM issues
vi.mock('./components/Tutorial', () => {
  return {
    default: () => <div data-testid="mock-tutorial" />
  };
});

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('handles invalid moves correctly', () => {
    render(<App />);

    // Click "Play Game" to make sure we are in the game view
    const playGameButton = screen.getByText('Play Game');
    act(() => {
      playGameButton.click();
    });

    // Verify initial message
    expect(screen.getByText('Welcome! Drag the white pieces to start.')).toBeInTheDocument();

    // Simulate an invalid move
    const invalidMoveButton = screen.getByTestId('simulate-invalid-move');

    // We expect the original game evaluate status to be evaluated after 2000ms
    // so let's mock it to make sure we see it changes back.
    const spy = vi.spyOn(gameStatus, 'evaluateGameStatus').mockReturnValue('White to move');

    act(() => {
      invalidMoveButton.click();
    });

    // Expect the message to change to the error message immediately
    expect(screen.getByText("Oops! You can't move there.")).toBeInTheDocument();

    // Advance timers to trigger the setTimeout
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Expect the message to change back to the game status message
    expect(screen.getByText('White to move')).toBeInTheDocument();

    spy.mockRestore();
  });
});
