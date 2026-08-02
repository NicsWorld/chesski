import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('./components/ChessBoard', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => (
    <div
      data-testid="mock-chessboard"
      onClick={() => props.onMove({ from: 'e2', to: 'e5' })}
    />
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

describe('App handleMove', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    vi.useFakeTimers();
    // We mock window.location to ensure game view
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...originalLocation,
        search: '?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    // Restore location
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  it('displays error message for invalid move and resets after 2 seconds', () => {
    render(<App />);

    expect(screen.getByText("Welcome! Drag the white pieces to start.")).toBeInTheDocument();

    const board = screen.getByTestId('mock-chessboard');

    // Trigger an invalid move (e2 to e5 is invalid for the initial board)
    act(() => {
      fireEvent.click(board);
    });

    // Check if the error message is displayed
    expect(screen.getByText("Oops! You can't move there.")).toBeInTheDocument();

    // Fast-forward 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // It should reset to evaluateGameStatus(game)
    expect(screen.getByText("White's turn (Cute Animals)")).toBeInTheDocument();
  });
});
