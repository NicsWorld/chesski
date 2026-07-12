import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock components to simplify testing
vi.mock('./components/ChessBoard', () => ({
  default: ({ onMove, pieceTheme }: { onMove: (move: { from: string; to: string; promotion?: string }) => void, pieceTheme: string }) => (
    <div data-testid="chess-board" data-theme={pieceTheme}>
      <button
        data-testid="mock-move"
        onClick={() => onMove({ from: 'e2', to: 'e4' })}
      >
        Make Move
      </button>
      <button
        data-testid="mock-invalid-move"
        onClick={() => onMove({ from: 'e2', to: 'e5' })}
      >
        Invalid Move
      </button>
    </div>
  )
}));

vi.mock('./components/Tutorial', () => ({
  default: ({ pieceTheme }: { pieceTheme: string }) => (
    <div data-testid="tutorial" data-theme={pieceTheme}>Tutorial View</div>
  )
}));

vi.mock('./components/MoveHistory', () => ({
  default: ({ history }: { history: string[] }) => (
    <div data-testid="move-history">History: {history.join(', ')}</div>
  )
}));

describe('App', () => {
  beforeEach(() => {
    // Reset window.location
    // @ts-expect-error mock window.location
    delete window.location;
    // @ts-expect-error mock window.location
    window.location = new URL('http://localhost');

    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    // Mock history.pushState
    window.history.pushState = vi.fn();

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders default view (tutorial)', () => {
    render(<App />);
    expect(screen.getByTestId('tutorial')).toBeInTheDocument();
    expect(screen.queryByTestId('chess-board')).not.toBeInTheDocument();
  });

  it('switches to game view', () => {
    render(<App />);
    const playButton = screen.getByRole('button', { name: /play game/i });
    fireEvent.click(playButton);

    expect(screen.queryByTestId('tutorial')).not.toBeInTheDocument();
    expect(screen.getByTestId('chess-board')).toBeInTheDocument();
  });

  it('loads game view if fen param exists', () => {
    // @ts-expect-error mock window.location
    window.location = new URL('http://localhost?fen=rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR%20b%20KQkq%20-%200%201');
    render(<App />);

    expect(screen.getByTestId('chess-board')).toBeInTheDocument();
  });

  it('handles valid moves', () => {
    // @ts-expect-error mock window.location
    window.location = new URL('http://localhost?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    render(<App />);

    const moveButton = screen.getByTestId('mock-move');
    fireEvent.click(moveButton);

    // Game status should update to Black's turn after White moves e2 to e4
    expect(screen.getByText(/Black..*turn/i)).toBeInTheDocument();
    expect(screen.getByTestId('move-history')).toHaveTextContent('History: e4');
  });

  it('handles invalid moves', () => {
    render(<App />);
    // Switch to game view
    fireEvent.click(screen.getByRole('button', { name: /play game/i }));

    const invalidMoveButton = screen.getByTestId('mock-invalid-move');
    fireEvent.click(invalidMoveButton);

    // Should show error message
    expect(screen.getByText("Oops! You can't move there.")).toBeInTheDocument();

    // Error message should disappear after 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByText("Oops! You can't move there.")).not.toBeInTheDocument();
  });

  it('resets game correctly', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /play game/i }));

    // Make a move first
    fireEvent.click(screen.getByTestId('mock-move'));
    expect(screen.getByTestId('move-history')).toHaveTextContent('History: e4');

    // Reset game
    fireEvent.click(screen.getByRole('button', { name: /new game/i }));

    expect(screen.getByText("New Game! White starts.")).toBeInTheDocument();
    expect(screen.getByTestId('move-history')).toHaveTextContent('History:');
    expect(window.history.pushState).toHaveBeenCalled();
  });

  it('undos moves correctly', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /play game/i }));

    // Make a move
    fireEvent.click(screen.getByTestId('mock-move'));
    expect(screen.getByTestId('move-history')).toHaveTextContent('History: e4');

    // Undo
    fireEvent.click(screen.getByRole('button', { name: /undo/i }));

    expect(screen.getByTestId('move-history')).toHaveTextContent('History:');
  });

  it('shares game link', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /play game/i }));

    const shareButton = screen.getByRole('button', { name: /share game/i });

    await act(async () => {
      fireEvent.click(shareButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(screen.getByText("Link copied to clipboard!")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Message reverts
    expect(screen.queryByText("Link copied to clipboard!")).not.toBeInTheDocument();
  });

  it('changes theme', () => {
    render(<App />);

    // Default is zoo
    expect(screen.getByTestId('tutorial')).toHaveAttribute('data-theme', 'zoo');

    // Change to standard
    fireEvent.click(screen.getByRole('button', { name: 'Standard' }));
    expect(screen.getByTestId('tutorial')).toHaveAttribute('data-theme', 'standard');

    // Switch to game and check theme propagates
    fireEvent.click(screen.getByRole('button', { name: /play game/i }));
    expect(screen.getByTestId('chess-board')).toHaveAttribute('data-theme', 'standard');

    // Change back to zoo
    fireEvent.click(screen.getByRole('button', { name: 'Zoo' }));
    expect(screen.getByTestId('chess-board')).toHaveAttribute('data-theme', 'zoo');
  });
});
