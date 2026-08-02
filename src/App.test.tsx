import { render, screen } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('./components/ChessBoard', () => ({
  default: () => <div data-testid="mock-chessboard" />,
}));

vi.mock('./components/Tutorial', () => ({
  default: () => <div data-testid="mock-tutorial" />,
}));

describe('App FEN URL parameters', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  const originalLocation = window.location;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    // @ts-expect-error mock window.location
    delete window.location;
    // @ts-expect-error mock window.location
    window.location = originalLocation;
  });

  const setMockUrl = (url: string) => {
    // @ts-expect-error mock window.location
    delete window.location;
    // @ts-expect-error mock window.location
    window.location = {
      ...originalLocation,
      search: url.split('?')[1] ? `?${url.split('?')[1]}` : '',
      href: url,
    } as unknown as Location;
  };

  it('catches invalid FEN in URL, logs error, and falls back to default board', () => {
    setMockUrl('http://localhost/?fen=invalid_fen_string');
    render(<App />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Invalid FEN in URL',
      expect.any(Error)
    );
    expect(screen.getByTestId('mock-chessboard')).toBeInTheDocument();
  });

  it('loads valid FEN from URL successfully', () => {
    setMockUrl('http://localhost/?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201');
    render(<App />);

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(screen.getByTestId('mock-chessboard')).toBeInTheDocument();
  });
});
