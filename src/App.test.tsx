import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';


vi.mock('./components/ChessBoard', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ onMove, pieceTheme }: any) => (
    <div data-testid="mock-chessboard" data-theme={pieceTheme}>
      <button onClick={() => onMove({ from: 'e2', to: 'e4' })}>Valid Move</button>
      <button onClick={() => onMove({ from: 'e2', to: 'e5' })}>Invalid Move</button>
    </div>
  ),
}));

vi.mock('./components/Tutorial', () => ({
  default: () => <div data-testid="mock-tutorial" />,
}));

// Mock MoveHistory since we don't need to test it here
vi.mock('./components/MoveHistory', () => ({
  default: () => <div data-testid="mock-move-history" />,
}));

describe('App Main Functionality', () => {
  let originalLocation: Location;

  beforeEach(() => {
    vi.useFakeTimers();
    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    originalLocation = window.location;
    // @ts-expect-error mock window.location
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = {
      ...originalLocation,
      // Provide a valid FEN so the app doesn't complain
      search: '?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      pathname: '/',
      href: 'http://localhost/?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    } as Location;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = originalLocation;
    cleanup();
  });

  it('handles a valid move and updates status message', () => {
    render(<App />);
    const validMoveBtn = screen.getByText('Valid Move');
    fireEvent.click(validMoveBtn);
    expect(screen.getByText("Black's turn (Cool Animals)")).toBeInTheDocument();
  });

  it('handles an invalid move, shows error, and restores message after timeout', () => {
    render(<App />);
    const invalidMoveBtn = screen.getByText('Invalid Move');
    fireEvent.click(invalidMoveBtn);

    expect(screen.getByText("Oops! You can't move there.")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText("White's turn (Cute Animals)")).toBeInTheDocument();
  });

  it('resets game when New Game is clicked', () => {
    render(<App />);
    // Make a move first
    fireEvent.click(screen.getByText('Valid Move'));
    expect(screen.getByText("Black's turn (Cool Animals)")).toBeInTheDocument();

    // Click New Game
    fireEvent.click(screen.getByText('New Game'));
    expect(screen.getByText("New Game! White starts.")).toBeInTheDocument();
  });

  it('undoes a move when Undo is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Valid Move'));
    expect(screen.getByText("Black's turn (Cool Animals)")).toBeInTheDocument();

    fireEvent.click(screen.getByText('Undo'));
    expect(screen.getByText("White's turn (Cute Animals)")).toBeInTheDocument();
  });

  it('copies URL to clipboard and shows temp message when Share Game is clicked', async () => {
    render(<App />);
    const shareBtn = screen.getByText('Share Game');

    await act(async () => {
      fireEvent.click(shareBtn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(screen.getByText("Link copied to clipboard!")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText("Welcome! Drag the white pieces to start.")).toBeInTheDocument();
  });

  it('switches themes and passes prop to ChessBoard', () => {
    render(<App />);
    const standardThemeBtn = screen.getByText('Standard');
    fireEvent.click(standardThemeBtn);

    const board = screen.getByTestId('mock-chessboard');
    expect(board).toHaveAttribute('data-theme', 'standard');
  });

  it('toggles tutorial view', () => {
    // If fen is present, it defaults to game. We need to clear it or click the button.
    render(<App />);
    const tutorialBtn = screen.getByText('Tutorials');
    fireEvent.click(tutorialBtn);

    expect(screen.getByTestId('mock-tutorial')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-chessboard')).not.toBeInTheDocument();
  });
});

describe('App invalid FEN fallback', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let originalLocation: Location;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    originalLocation = window.location;
    // @ts-expect-error mock window.location
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = {
      ...originalLocation,
      search: '?fen=invalid_fen_string',
      pathname: '/',
      href: 'http://localhost/?fen=invalid_fen_string',
    };
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = originalLocation;
    cleanup();
  });

  it('catches invalid FEN in URL, logs error, and falls back to default board', () => {
    render(<App />);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Invalid FEN in URL',
      expect.any(Error)
    );
    expect(screen.getByTestId('mock-chessboard')).toBeInTheDocument();
  });
});
