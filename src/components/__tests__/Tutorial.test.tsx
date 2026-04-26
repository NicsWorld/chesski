import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tutorial from '../Tutorial';
import { Chess } from 'chess.js';

// We mock ChessBoard because its react-dnd requirements would overcomplicate
// testing the Tutorial component's state management
vi.mock('../ChessBoard', () => ({
    default: ({ game, onMove, shouldHidePiece, pieceTheme }: {
        game: Chess;
        onMove: (move: { from: string; to: string; promotion?: string }) => void;
        shouldHidePiece: (piece: { type: string; color: string }) => boolean;
        pieceTheme: string;
    }) => (
        <div data-testid="mock-chessboard">
            <span data-testid="fen">{game.fen()}</span>
            <span data-testid="theme">{pieceTheme}</span>
            <span data-testid="hide-white-king">{String(shouldHidePiece({ type: 'k', color: 'w' }))}</span>
            <span data-testid="hide-black-king">{String(shouldHidePiece({ type: 'k', color: 'b' }))}</span>
            <span data-testid="hide-white-pawn">{String(shouldHidePiece({ type: 'p', color: 'w' }))}</span>
            <button
                data-testid="trigger-move"
                onClick={() => onMove({ from: 'e2', to: 'e4' })}
            >
                Move
            </button>
            <button
                data-testid="trigger-invalid-move"
                onClick={() => onMove({ from: 'e2', to: 'e5' })}
            >
                Invalid Move
            </button>
        </div>
    )
}));

describe('Tutorial Component', () => {
    it('renders initial tutorial correctly', () => {
        render(<Tutorial pieceTheme="standard" />);

        expect(screen.getByText('Tutorial: Pawn')).toBeDefined();
        expect(screen.getByText(/Pawns move forward one square/)).toBeDefined();
        expect(screen.getByTestId('theme').textContent).toBe('standard');
    });

    it('changes tutorial on button click', async () => {
        render(<Tutorial pieceTheme="standard" />);

        await act(async () => {
            fireEvent.click(screen.getByText('Knight'));
        });

        expect(screen.getByText('Tutorial: Knight')).toBeDefined();
        expect(screen.getByText(/Knights move in an 'L' shape/)).toBeDefined();
    });

    it('resets position on button click', async () => {
        render(<Tutorial pieceTheme="standard" />);

        // First move to change state
        await act(async () => {
            fireEvent.click(screen.getByTestId('trigger-move'));
        });

        const resetBtn = screen.getByText('Reset Position');
        await act(async () => {
            fireEvent.click(resetBtn);
        });

        expect(screen.getByText('Tutorial: Pawn')).toBeDefined();
        const fenSpan = screen.getByTestId('fen');
        // Initial FEN for pawn after removing kings
        expect(fenSpan.textContent).toBe('8/8/8/8/8/8/4P3/8 w - - 0 1');
    });

    it('handles valid move', async () => {
        render(<Tutorial pieceTheme="standard" />);

        const fenSpan = screen.getByTestId('fen');
        const initialFen = fenSpan.textContent;

        await act(async () => {
            fireEvent.click(screen.getByTestId('trigger-move'));
        });

        const newFen = fenSpan.textContent;
        expect(newFen).not.toBe(initialFen);
        // It should still be white's turn because tutorial always resets to white!
        expect(newFen).toContain('w ');
        expect(newFen).toBe('8/8/8/8/4P3/8/8/8 w - - 0 1');
    });

    it('ignores invalid move', async () => {
        render(<Tutorial pieceTheme="standard" />);

        const fenSpan = screen.getByTestId('fen');
        const initialFen = fenSpan.textContent;

        await act(async () => {
            fireEvent.click(screen.getByTestId('trigger-invalid-move'));
        });

        const newFen = fenSpan.textContent;
        expect(newFen).toBe(initialFen);
    });

    it('hides kings correctly in shouldHidePiece', () => {
        render(<Tutorial pieceTheme="standard" />);

        // Pawn tutorial (not king) -> should hide both kings
        expect(screen.getByTestId('hide-black-king').textContent).toBe('true');
        expect(screen.getByTestId('hide-white-king').textContent).toBe('true');
        expect(screen.getByTestId('hide-white-pawn').textContent).toBe('false');
    });

    it('shows white king in king tutorial', async () => {
        render(<Tutorial pieceTheme="standard" />);

        await act(async () => {
            fireEvent.click(screen.getByText('King'));
        });

        // King tutorial -> should only hide black king
        expect(screen.getByTestId('hide-black-king').textContent).toBe('true');
        expect(screen.getByTestId('hide-white-king').textContent).toBe('false');
        expect(screen.getByTestId('hide-white-pawn').textContent).toBe('false');
    });
});
