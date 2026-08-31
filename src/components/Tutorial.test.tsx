import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Tutorial from './Tutorial';

vi.mock('./ChessBoard', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ onMove }: any) => (
        <button
            data-testid="mock-chessboard-move"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={() => onMove({ from: 'a1', to: 'a8' } as any)}
        >
            Invalid Move
        </button>
    ),
}));

describe('Tutorial component', () => {
    it('handles invalid moves gracefully', () => {
        expect(() => {
            render(<Tutorial pieceTheme="standard" />);
            const moveButton = screen.getByTestId('mock-chessboard-move');
            fireEvent.click(moveButton);
        }).not.toThrow();
    });
});
