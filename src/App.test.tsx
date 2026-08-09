import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('./components/ChessBoard', () => ({
  default: ({ onMove }: { onMove: (move: { from: string; to: string }) => void }) => (
    <div data-testid="mock-chessboard">
      <button
        data-testid="mock-move-button"
        onClick={() => onMove({ from: 'e2', to: 'e5' })}
      >
        Make Invalid Move
      </button>
    </div>
  ),
}));

vi.mock('./components/Tutorial', () => ({
  default: () => <div data-testid="mock-tutorial" />,
}));

describe('App invalid FEN fallback', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  const originalLocation = window.location;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock window.location
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...originalLocation,
        search: '?fen=invalid_fen_string',
        pathname: '/',
        href: 'http://localhost/?fen=invalid_fen_string',
      },
    });
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  it('catches invalid FEN in URL, logs error, and falls back to default board', () => {
    render(<App />);

    // It should have logged the error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Invalid FEN in URL',
      expect.any(Error)
    );

    // It should still render the game view because a fen param was present
    // but the FEN was invalid so it defaults to the initial game.fen()
    expect(screen.getByTestId('mock-chessboard')).toBeInTheDocument();
  });
});

describe('App invalid move handling', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('displays an error message for an invalid move and resets it after 2 seconds', () => {
    // The App defaults to 'tutorial' view if no fen param is present.
    // We mock window.location to simulate a shared game so it loads in 'game' view.
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...originalLocation, search: '?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' },
    });

    render(<App />);

    // Initially, it should show the welcome message
    expect(screen.getByText("Welcome! Drag the white pieces to start.")).toBeInTheDocument();

    // Trigger an invalid move (e2 to e5 is invalid for white's first move in standard chess)
    const moveButton = screen.getByTestId('mock-move-button');
    fireEvent.click(moveButton);

    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });

    // It should update the message to the error
    expect(screen.getByText("Oops! You can't move there.")).toBeInTheDocument();

    // Advance timers by 2000ms
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // It should reset to the game status evaluateGameStatus(game)
    // which for a new game is "White's turn (Cute Animals)"
    expect(screen.getByText("White's turn (Cute Animals)")).toBeInTheDocument();
  });
});
