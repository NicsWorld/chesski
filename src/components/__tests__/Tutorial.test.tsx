import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Tutorial from '../Tutorial';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

describe('Tutorial Component', () => {
    const renderWithDnd = (ui: React.ReactElement) => {
        return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
    };

    it('renders the initial tutorial (Pawn) correctly', () => {
        renderWithDnd(<Tutorial pieceTheme="standard" />);
        expect(screen.getByText('Tutorial: Pawn')).toBeInTheDocument();
        expect(screen.getByText(/Pawns move forward one square/)).toBeInTheDocument();
    });

    it('can switch to another tutorial', () => {
        renderWithDnd(<Tutorial pieceTheme="standard" />);

        const knightButton = screen.getByRole('button', { name: 'Knight' });
        fireEvent.click(knightButton);

        expect(screen.getByText('Tutorial: Knight')).toBeInTheDocument();
        expect(screen.getByText(/Knights move in an 'L' shape/)).toBeInTheDocument();
    });

    it('can reset the position', () => {
        renderWithDnd(<Tutorial pieceTheme="standard" />);

        const resetButton = screen.getByRole('button', { name: 'Reset Position' });
        expect(resetButton).toBeInTheDocument();
        fireEvent.click(resetButton);

        // At least we verify it doesn't crash and the title remains
        expect(screen.getByText('Tutorial: Pawn')).toBeInTheDocument();
    });
});
