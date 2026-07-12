import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from './App';

vi.mock('./components/ChessBoard', () => ({
  default: ({ onMove }: { onMove: (move: { from: string; to: string; promotion?: string }) => void }) => (
    <button
      data-testid="invalid-move-btn"
      onClick={() => onMove({ from: 'e2', to: 'e5' })}
    >
      Invalid Move
    </button>
  )
}));

// Mock ResizeObserver for react-dnd
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Set URL search params to force 'game' view
    Object.defineProperty(window, 'location', {
      value: { search: '?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', href: 'http://localhost/?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', pathname: '/' },
      writable: true,
    });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('handles invalid moves correctly', () => {
    render(<App />);

    // Initial message
    expect(screen.getByText("Welcome! Drag the white pieces to start.")).toBeInTheDocument();

    // Trigger invalid move
    const invalidMoveBtn = screen.getByTestId('invalid-move-btn');
    fireEvent.click(invalidMoveBtn);

    // Assert message changed
    expect(screen.getByText("Oops! You can't move there.")).toBeInTheDocument();

    // Advance time by 2000ms
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Assert message reverts to default
    expect(screen.getByText("White's turn (Cute Animals)")).toBeInTheDocument();
  });
});
