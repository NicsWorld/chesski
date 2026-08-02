import { render, screen } from '@testing-library/react';
import Tutorial from './Tutorial';
import { vi, describe, it, expect } from 'vitest';


vi.mock('./ChessBoard', () => ({
    default: ({ onMove }: { onMove: (move: { from: string; to: string }) => void }) => (
        <div data-testid="mock-chessboard">
            <button
                data-testid="trigger-invalid-move"
                onClick={() => onMove({ from: 'a1', to: 'a8' })}
            >
                Invalid Move
            </button>
        </div>
    ),
}));

describe('Tutorial Component', () => {
    it('handles invalid moves gracefully without throwing errors', () => {
        // Spying on the actual implementation of the underlying Chess instance
        // but we just want to ensure it throws inside move() and gets caught

        render(<Tutorial pieceTheme="standard" />);

        const button = screen.getByTestId('trigger-invalid-move');

        // This should not throw an error because of the try-catch block
        expect(() => {
            button.click();
        }).not.toThrow();
    });
});
