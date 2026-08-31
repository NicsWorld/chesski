import { render, screen } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('./components/ChessBoard', () => ({
  default: () => <div data-testid="mock-chessboard" />,
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

    );

    // It should still render the game view because a fen param was present
    // but the FEN was invalid so it defaults to the initial game.fen()
    expect(screen.getByTestId('mock-chessboard')).toBeInTheDocument();
  });
});
