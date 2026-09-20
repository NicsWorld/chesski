import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Chess } from 'chess.js';
import ChessBoard from './ChessBoard';

vi.mock('./Piece', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ position, onDragStart, onDragEnd }: any) => (
        <div data-testid={`piece-${position}`}>
            <button onClick={onDragStart} data-testid={`drag-start-${position}`}>Drag Start</button>
            <button onClick={onDragEnd} data-testid={`drag-end-${position}`}>Drag End</button>
        </div>
    )
}));

let mockIsOver = false;
let mockCanDrop = false;

vi.mock('react-dnd', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useDrop: (specFn: any) => {
        const spec = specFn();
        return [
            { isOver: mockIsOver, canDrop: mockCanDrop },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node: any) => {
                if (node) {
                   // eslint-disable-next-line @typescript-eslint/no-explicit-any
                   (node as any).__dropSpec = spec;
                }
            }
        ];
    }
}));

describe('ChessBoard component', () => {
    beforeEach(() => {
        mockIsOver = false;
        mockCanDrop = false;
    });

    it('renders exactly 64 squares', () => {
        const game = new Chess();
        const { container } = render(<ChessBoard game={game} onMove={() => {}} pieceTheme="standard" />);

        // Checking files and ranks to ensure it renders a1 through h8
        const squares = ['a1', 'b2', 'e4', 'h8'];
        squares.forEach(sq => {
             expect(screen.getByTestId(sq)).toBeInTheDocument();
        });

        // Count total wrapped squares with data-testid inside the container
        const allTestIds = Array.from(container.querySelectorAll('[data-testid]'));
        const squareTestIds = allTestIds.filter(el => /^[a-h][1-8]$/.test(el.getAttribute('data-testid') || ''));
        expect(squareTestIds.length).toBe(64);
    });

    it('renders pieces on their starting squares', () => {
        const game = new Chess();
        render(<ChessBoard game={game} onMove={() => {}} pieceTheme="standard" />);
        expect(screen.getByTestId('piece-e2')).toBeInTheDocument(); // White Pawn
        expect(screen.getByTestId('piece-e8')).toBeInTheDocument(); // Black King
        // Ensure an empty square has no piece
        expect(screen.queryByTestId('piece-e4')).not.toBeInTheDocument();
    });

    it('handles drag start (shows valid moves)', () => {
        const game = new Chess();
        render(<ChessBoard game={game} onMove={() => {}} pieceTheme="standard" />);

        // Drag e2 pawn
        act(() => {
            fireEvent.click(screen.getByTestId('drag-start-e2'));
        });

        // The squares e3 and e4 should be highlighted.
        const squareE3 = screen.getByTestId('e3');
        const squareE4 = screen.getByTestId('e4');

        // Highlight logic in ChessBoard renders a 30% rounded div if highlight is true and no children
        expect(squareE3.innerHTML).toContain('30%');
        expect(squareE4.innerHTML).toContain('30%');

        // Check a square that shouldn't be highlighted
        const squareE5 = screen.getByTestId('e5');
        expect(squareE5.innerHTML).not.toContain('30%');
    });

    it('handles drag start for capture (shows ring highlight)', () => {
        const captureGame = new Chess('rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 2');
        render(<ChessBoard game={captureGame} onMove={() => {}} pieceTheme="standard" />);

        // Drag f3 knight
        act(() => {
            fireEvent.click(screen.getByTestId('drag-start-f3'));
        });

        // The square e5 should be highlighted as a capture.
        // It has a piece, so the highlight is a 6px solid border div.
        const squareE5 = screen.getByTestId('e5');
        expect(squareE5.innerHTML).toContain('6px solid');
    });

    it('handles drag end (clears valid moves)', () => {
        const game = new Chess();
        render(<ChessBoard game={game} onMove={() => {}} pieceTheme="standard" />);

        // Drag e2 pawn
        act(() => {
            fireEvent.click(screen.getByTestId('drag-start-e2'));
        });

        expect(screen.getByTestId('e3').innerHTML).toContain('30%');

        // Drag end
        act(() => {
            fireEvent.click(screen.getByTestId('drag-end-e2'));
        });

        expect(screen.getByTestId('e3').innerHTML).not.toContain('30%');
    });

    it('handles drop event successfully', () => {
        const game = new Chess();
        const onMove = vi.fn();
        render(<ChessBoard game={game} onMove={onMove} pieceTheme="standard" />);

        // Drop on e4
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const squareE4 = screen.getByTestId('e4') as any;
        act(() => {
             squareE4.__dropSpec.drop({ position: 'e2' });
        });

        expect(onMove).toHaveBeenCalledWith({ from: 'e2', to: 'e4', promotion: 'q' });
    });

    it('renders labels on edges', () => {
        const game = new Chess();
        // Clear all pieces so we can safely assert text content of the square container
        game.clear();
        render(<ChessBoard game={game} onMove={() => {}} pieceTheme="standard" />);

        // In ChessBoard:
        // {position.includes('1') && <span>{position[0]}</span>}  (e.g., 'a' for 'a1')
        // {position.includes('a') && <span>{position[1]}</span>}  (e.g., '1' for 'a1')

        // a1 should have both 'a' (from includes '1') and '1' (from includes 'a')
        const squareA1 = screen.getByTestId('a1');
        expect(squareA1).toHaveTextContent('a');
        expect(squareA1).toHaveTextContent('1');

        // a8 should have '8' (from includes 'a') but no file label (rank '1' only)
        const squareA8 = screen.getByTestId('a8');
        expect(squareA8).toHaveTextContent('8');
        expect(squareA8).not.toHaveTextContent('a');

        // h1 should have 'h' (from includes '1') but no rank label (file 'a' only)
        const squareH1 = screen.getByTestId('h1');
        expect(squareH1).toHaveTextContent('h');
        expect(squareH1).not.toHaveTextContent('1');

        // e4 should have no labels
        const squareE4 = screen.getByTestId('e4');
        expect(squareE4).not.toHaveTextContent('e');
        expect(squareE4).not.toHaveTextContent('4');
    });
});
