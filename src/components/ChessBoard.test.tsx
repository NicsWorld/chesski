import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ChessBoard from './ChessBoard';
import { Chess } from 'chess.js';

vi.mock('react-dnd', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useDrop: (specFn: any) => {
        const spec = specFn();
        return [
            { isOver: false, canDrop: false },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node: any) => {
                if (node) {
                    node.__onDrop = spec.drop;
                }
            }
        ];
    }
}));

vi.mock('./Piece', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ position, onDragStart, onDragEnd }: any) => (
        <div
            data-testid={`piece-${position}`}
            onClick={onDragStart}
            onMouseLeave={onDragEnd}
        >
            Piece {position}
        </div>
    )
}));

describe('ChessBoard Component', () => {
    let game: Chess;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let onMoveMock: any;

    beforeEach(() => {
        game = new Chess();
        onMoveMock = vi.fn();
    });

    it('renders exactly 64 squares', () => {
        render(<ChessBoard game={game} onMove={onMoveMock} pieceTheme="standard" />);
        const a1 = screen.getByTestId('a1');
        const h8 = screen.getByTestId('h8');
        expect(a1).toBeInTheDocument();
        expect(h8).toBeInTheDocument();
        const allSquares = screen.getAllByTestId(/^[a-h][1-8]$/);
        expect(allSquares.length).toBe(64);
    });

    it('calls onMove when a piece is dropped on a square', () => {
        render(<ChessBoard game={game} onMove={onMoveMock} pieceTheme="standard" />);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const e4Square = screen.getByTestId('e4') as any;
        expect(e4Square).toBeInTheDocument();

        act(() => {
            if (e4Square.__onDrop) {
                e4Square.__onDrop({ id: 'wP', position: 'e2' });
            }
        });

        expect(onMoveMock).toHaveBeenCalledWith({ from: 'e2', to: 'e4', promotion: 'q' });
    });

    it('sets valid moves when dragging starts and clears when ends', () => {
        const { container } = render(<ChessBoard game={game} onMove={onMoveMock} pieceTheme="standard" />);

        const piece = screen.getByTestId('piece-e2');
        expect(piece).toBeInTheDocument();

        // Valid moves for e2 pawn at start of game are e3 and e4.
        act(() => {
            fireEvent.click(piece); // Our mock mapped onClick to onDragStart
        });

        const e3Square = container.querySelector('[data-testid="e3"] > div') as HTMLElement;
        const e4Square = container.querySelector('[data-testid="e4"] > div') as HTMLElement;

        // Assert that a child div for highlight (background: rgba(0, 0, 0, 0.15)) exists in e3 and e4
        expect(e3Square.innerHTML).toContain('rgba(0, 0, 0, 0.15)');
        expect(e4Square.innerHTML).toContain('rgba(0, 0, 0, 0.15)');

        act(() => {
            fireEvent.mouseLeave(piece); // Our mock mapped onMouseLeave to onDragEnd
        });

        // The highlight div should be removed
        expect(e3Square.innerHTML).not.toContain('rgba(0, 0, 0, 0.15)');
        expect(e4Square.innerHTML).not.toContain('rgba(0, 0, 0, 0.15)');
    });
});
