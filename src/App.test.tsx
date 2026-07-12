import { render, screen, act, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import App from './App';
import * as ChessBoardModule from './components/ChessBoard';

// Mock the ChessBoard component to easily trigger onMove
vi.mock('./components/ChessBoard', () => ({
  default: vi.fn(() => <div data-testid="mock-chess-board" />),
}));

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("displays an error message for an invalid move and resets it after 2 seconds", () => {
    render(<App />);

    // By default, the view is 'tutorial'. Switch to 'game' view first.
    const playGameBtn = screen.getByText('Play Game');
    fireEvent.click(playGameBtn);

    // Initial message
    expect(screen.getByText('Welcome! Drag the white pieces to start.')).toBeInTheDocument();

    // Get the mocked onMove handler from the ChessBoard props
    // We mocked the default export, so we can access its calls
    const chessBoardCalls = vi.mocked(ChessBoardModule.default).mock.calls;
    expect(chessBoardCalls.length).toBeGreaterThan(0);
    const lastCall = chessBoardCalls[chessBoardCalls.length - 1];
    const onMove = lastCall[0].onMove;

    // Trigger an invalid move (e.g. pawn moving from e2 to e5)
    // The handleMove function has a try-catch for invalid moves in chess.js v1+
    act(() => {
      onMove({ from: 'e2', to: 'e5' });
    });

    // The message should be updated immediately due to the error caught in try-catch
    expect(screen.getByText("Oops! You can't move there.")).toBeInTheDocument();

    // Fast-forward time by 2000ms
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // The message should revert to the game status evaluateGameStatus(game)
    expect(screen.getByText("White's turn (Cute Animals)")).toBeInTheDocument();
  });
});
