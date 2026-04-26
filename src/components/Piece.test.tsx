import { render, screen, fireEvent } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';
import Piece from './Piece';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('Piece Component', () => {
    let mockOnDragStart: ReturnType<typeof vi.fn>;
    let mockOnDragEnd: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockOnDragStart = vi.fn();
        mockOnDragEnd = vi.fn();
    });

    const renderWithDnd = (component: React.ReactNode) => {
        return render(
            <DndProvider backend={TestBackend}>
                {component}
            </DndProvider>
        );
    };

    it('renders standard piece image correctly', () => {
        renderWithDnd(
            <Piece
                piece={{ type: 'p', color: 'w' }}
                position="e2"
                pieceTheme="standard"
                onDragStart={mockOnDragStart}
                onDragEnd={mockOnDragEnd}
            />
        );

        const img = screen.getByAltText('w p');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/pieces/wP.svg');
        expect(img).not.toHaveStyle({ filter: 'brightness(0.4) contrast(1.2)' });
    });

    it('renders zoo piece image correctly for white piece', () => {
        renderWithDnd(
            <Piece
                piece={{ type: 'n', color: 'w' }}
                position="g1"
                pieceTheme="zoo"
                onDragStart={mockOnDragStart}
                onDragEnd={mockOnDragEnd}
            />
        );

        const img = screen.getByAltText('w n');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/pieces/animal_wN.png');
        expect(img).not.toHaveStyle({ filter: 'brightness(0.4) contrast(1.2)' });
    });

    it('renders zoo piece image correctly for black piece with filter', () => {
        renderWithDnd(
            <Piece
                piece={{ type: 'q', color: 'b' }}
                position="d8"
                pieceTheme="zoo"
                onDragStart={mockOnDragStart}
                onDragEnd={mockOnDragEnd}
            />
        );

        const img = screen.getByAltText('b q');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/pieces/animal_wQ.png');
        expect(img).toHaveStyle({ filter: 'brightness(0.4) contrast(1.2)' });
    });

    it('opacity is 1 when not dragging', () => {
        renderWithDnd(
            <Piece
                piece={{ type: 'r', color: 'w' }}
                position="h1"
                pieceTheme="standard"
                onDragStart={mockOnDragStart}
                onDragEnd={mockOnDragEnd}
            />
        );

        // the piece is wrapped in a div which has opacity
        const img = screen.getByAltText('w r');
        const div = img.parentElement;
        expect(div).toHaveStyle({ opacity: 1 });
    });
});
