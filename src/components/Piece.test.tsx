import React from 'react';
import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';
import Piece from './Piece';
import { vi } from 'vitest';

describe('Piece Component', () => {
    const defaultProps = {
        piece: { type: 'p', color: 'w' as const },
        position: 'a2',
        pieceTheme: 'standard' as const,
        onDragStart: vi.fn(),
        onDragEnd: vi.fn(),
    };

    const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <DndProvider backend={TestBackend}>
            {children}
        </DndProvider>
    );

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders a standard white pawn correctly', () => {
        render(
            <TestProvider>
                <Piece {...defaultProps} />
            </TestProvider>
        );

        const image = screen.getByAltText('w p');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/pieces/wP.svg');
        expect(image).not.toHaveStyle({ filter: 'brightness(0.4) contrast(1.2)' });
    });

    it('renders a standard black knight correctly', () => {
        render(
            <TestProvider>
                <Piece {...defaultProps} piece={{ type: 'n', color: 'b' }} />
            </TestProvider>
        );

        const image = screen.getByAltText('b n');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/pieces/bN.svg');
    });

    it('renders a zoo white pawn correctly', () => {
        render(
            <TestProvider>
                <Piece {...defaultProps} pieceTheme="zoo" />
            </TestProvider>
        );

        const image = screen.getByAltText('w p');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/pieces/animal_wP.png');
        expect(image).not.toHaveStyle({ filter: 'brightness(0.4) contrast(1.2)' });
    });

    it('renders a zoo black knight correctly with CSS filter', () => {
        render(
            <TestProvider>
                <Piece {...defaultProps} pieceTheme="zoo" piece={{ type: 'n', color: 'b' }} />
            </TestProvider>
        );

        const image = screen.getByAltText('b n');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/pieces/animal_wN.png'); // Black pieces use white animal assets
        expect(image).toHaveStyle({ filter: 'brightness(0.4) contrast(1.2)' }); // The CSS filter is applied
    });
});
