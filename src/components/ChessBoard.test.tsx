import { render, screen, act, cleanup, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
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
                    node.__dropSpec = spec;
                    node.__onDrop = spec.drop;
                }
            },
        ];
    }
}));


vi.mock('./Piece', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ piece, position, onDragStart, onDragEnd }: any) => (
        <div data-testid={`piece-${position}`} onClick={() => { onDragStart(); }}>
            {piece.color}{piece.type}
            <button data-testid={`drag-end-${position}`} onClick={(e) => { e.stopPropagation(); onDragEnd(); }}>end drag</button>
        </div>
    )
}));

describe('ChessBoard component interactions', () => {
    let game: Chess;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let onMove: any;

    beforeEach(() => {
        game = new Chess();
        onMove = vi.fn();
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('renders the initial board with 64 squares', () => {
        render(<ChessBoard game={game} onMove={onMove} pieceTheme="standard" />);
        const squares = screen.getAllByTestId(/^[a-h][1-8]$/);
        expect(squares).toHaveLength(64);
    });

    it('renders the pieces in starting positions', () => {
        render(<ChessBoard game={game} onMove={onMove} pieceTheme="standard" />);
        expect(screen.getByTestId('piece-e2')).toHaveTextContent('wp');
        expect(screen.getByTestId('piece-e7')).toHaveTextContent('bp');
        expect(screen.getByTestId('piece-e1')).toHaveTextContent('wk');
    });

    it('highlights valid moves on drag start and clears on drag end', () => {
        render(<ChessBoard game={game} onMove={onMove} pieceTheme="standard" />);

        const getHighlightElement = (squareId: string) => {
             const square = screen.getByTestId(squareId);
             return Array.from(square.querySelectorAll('div')).find(div => div.style.borderRadius === '50%');
        };

        expect(getHighlightElement('e3')).toBeFalsy();
        expect(getHighlightElement('e4')).toBeFalsy();

        fireEvent.click(screen.getByTestId('piece-e2'));

        expect(getHighlightElement('e3')).toBeTruthy();
        expect(getHighlightElement('e4')).toBeTruthy();

        fireEvent.click(screen.getByTestId('drag-end-e2'));

        expect(getHighlightElement('e3')).toBeFalsy();
        expect(getHighlightElement('e4')).toBeFalsy();
    });

    it('calls onMove when a piece is dropped and clears highlights', () => {
        render(<ChessBoard game={game} onMove={onMove} pieceTheme="standard" />);

        fireEvent.click(screen.getByTestId('piece-e2'));

        const e4Square = screen.getByTestId('e4');
        const hasHighlight = () => Array.from(e4Square.querySelectorAll('div')).some(div => div.style.borderRadius === '50%');
        expect(hasHighlight()).toBeTruthy();

        act(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (e4Square as any).__onDrop({ id: 'wp', position: 'e2' });
        });

        expect(onMove).toHaveBeenCalledWith({
            from: 'e2',
            to: 'e4',
            promotion: 'q'
        });

        expect(hasHighlight()).toBeFalsy();
    });

    it('renders with alternate piece theme', () => {
        render(<ChessBoard game={game} onMove={onMove} pieceTheme="zoo" />);
        expect(screen.getByTestId('piece-e2')).toHaveTextContent('wp');
    });
});
