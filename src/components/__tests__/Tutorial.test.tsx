import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tutorial from '../Tutorial';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Mock ChessBoard so we can inspect the props passed to it
vi.mock('../ChessBoard', () => {
    return {
        default: vi.fn((props) => {
            return (
                <div data-testid="mock-chessboard">
                    <button
                        data-testid="mock-move-button"
                        onClick={() => props.onMove({ from: 'e2', to: 'e4' })}
                    >
                        Simulate Move
                    </button>
                    <button
                        data-testid="mock-invalid-move-button"
                        onClick={() => props.onMove({ from: 'e2', to: 'e5' })}
                    >
                        Simulate Invalid Move
                    </button>
                    {props.shouldHidePiece && props.shouldHidePiece({ type: 'k', color: 'w' }) && (
                        <div data-testid="white-king-hidden"></div>
                    )}
                    {props.shouldHidePiece && props.shouldHidePiece({ type: 'k', color: 'b' }) && (
                        <div data-testid="black-king-hidden"></div>
                    )}
                    <div data-testid="current-fen">{props.game.fen()}</div>
                </div>
            );
        }),
    };
});

const renderTutorial = () => {
    return render(
        <DndProvider backend={HTML5Backend}>
            <Tutorial pieceTheme="zoo" />
        </DndProvider>
    );
};

describe('Tutorial Component', () => {
    it('renders the first tutorial (Pawn) by default', () => {
        renderTutorial();
        expect(screen.getByText('Tutorial: Pawn')).toBeInTheDocument();
        expect(screen.getByText(/Pawns move forward one square/)).toBeInTheDocument();
        expect(screen.getByTestId('mock-chessboard')).toBeInTheDocument();
    });

    it('can switch to different tutorials', () => {
        renderTutorial();
        const rookButton = screen.getByText('Rook');
        fireEvent.click(rookButton);

        expect(screen.getByText('Tutorial: Rook')).toBeInTheDocument();
        expect(screen.getByText(/Rooks move in straight lines/)).toBeInTheDocument();
    });

    it('has a Reset Position button', () => {
        renderTutorial();
        expect(screen.getByText('Reset Position')).toBeInTheDocument();
    });

    it('hides kings according to shouldHidePiece logic', () => {
        renderTutorial();

        // In Pawn tutorial (default), white king and black king should be hidden
        expect(screen.getByTestId('white-king-hidden')).toBeInTheDocument();
        expect(screen.getByTestId('black-king-hidden')).toBeInTheDocument();

        // Switch to King tutorial
        const kingButton = screen.getByText('King');
        fireEvent.click(kingButton);

        // In King tutorial, white king should NOT be hidden, but black king still hidden
        expect(screen.queryByTestId('white-king-hidden')).not.toBeInTheDocument();
        expect(screen.getByTestId('black-king-hidden')).toBeInTheDocument();
    });

    it('handles valid moves and updates the board', () => {
        renderTutorial();

        const fenBeforeMove = screen.getByTestId('current-fen').textContent;

        // Simulate a move
        const moveButton = screen.getByTestId('mock-move-button');
        fireEvent.click(moveButton);

        const fenAfterMove = screen.getByTestId('current-fen').textContent;
        expect(fenBeforeMove).not.toEqual(fenAfterMove);
    });

    it('handles invalid moves gracefully without updating the board', () => {
        renderTutorial();

        const fenBeforeMove = screen.getByTestId('current-fen').textContent;

        // Simulate an invalid move
        const moveButton = screen.getByTestId('mock-invalid-move-button');
        fireEvent.click(moveButton);

        const fenAfterMove = screen.getByTestId('current-fen').textContent;
        // FEN should not change on invalid move
        expect(fenBeforeMove).toEqual(fenAfterMove);
    });

    it('resets the position when Reset Position is clicked', () => {
        renderTutorial();

        // Make a move
        fireEvent.click(screen.getByTestId('mock-move-button'));
        const fenAfterMove = screen.getByTestId('current-fen').textContent;

        // Reset
        const resetButton = screen.getByText('Reset Position');
        fireEvent.click(resetButton);

        const fenAfterReset = screen.getByTestId('current-fen').textContent;
        expect(fenAfterMove).not.toEqual(fenAfterReset);
    });
});
