import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Piece from './Piece';
import * as ReactDnd from 'react-dnd';
import React from 'react';

vi.mock('react-dnd', () => ({
    useDrag: vi.fn(() => [{ isDragging: false }, vi.fn(), vi.fn()]),
    DndProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Piece Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders standard piece image correctly', () => {
        const onDragStart = vi.fn();
        const onDragEnd = vi.fn();

        render(
            <Piece
                piece={{ type: 'p', color: 'w' }}
                position="e2"
                pieceTheme="standard"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
        );

        const img = screen.getByAltText('w p');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/pieces/wP.svg');
        expect(img.parentElement).toHaveStyle('opacity: 1');
    });

    it('renders zoo piece image correctly for white', () => {
        const onDragStart = vi.fn();
        const onDragEnd = vi.fn();

        render(
            <Piece
                piece={{ type: 'n', color: 'w' }}
                position="b1"
                pieceTheme="zoo"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
        );

        const img = screen.getByAltText('w n');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/pieces/animal_wN.png');
        expect(img).not.toHaveStyle('filter: brightness(0.4) contrast(1.2)');
    });

    it('renders zoo piece image correctly for black with filter applied', () => {
        const onDragStart = vi.fn();
        const onDragEnd = vi.fn();

        render(
            <Piece
                piece={{ type: 'n', color: 'b' }}
                position="b8"
                pieceTheme="zoo"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
        );

        const img = screen.getByAltText('b n');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/pieces/animal_wN.png'); // Uses white asset
        expect(img).toHaveStyle('filter: brightness(0.4) contrast(1.2)'); // But filtered to look black
    });

    it('calls onDragStart when isDragging becomes true', () => {
        const onDragStart = vi.fn();
        const onDragEnd = vi.fn();

        // Mock useDrag to return isDragging: true
        (ReactDnd.useDrag as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
            { isDragging: true },
            vi.fn(),
            vi.fn()
        ]);

        render(
            <Piece
                piece={{ type: 'p', color: 'w' }}
                position="e2"
                pieceTheme="standard"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
        );

        expect(onDragStart).toHaveBeenCalledTimes(1);
    });

    it('passes the correct configuration to useDrag and calls onDragEnd', () => {
        const onDragStart = vi.fn();
        const onDragEnd = vi.fn();

        let dragConfigFactory: (() => { type: string; item: { id: string; position: string }; end: () => void; collect: (monitor: { isDragging: () => boolean }) => { isDragging: boolean } }) | undefined;

        (ReactDnd.useDrag as unknown as ReturnType<typeof vi.fn>).mockImplementation((factory) => {
            dragConfigFactory = factory;
            return [{ isDragging: false }, vi.fn(), vi.fn()];
        });

        render(
            <Piece
                piece={{ type: 'k', color: 'b' }}
                position="e8"
                pieceTheme="standard"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
        );

        expect(dragConfigFactory).toBeDefined();

        if (dragConfigFactory) {
            const config = dragConfigFactory();
            expect(config.type).toBe('PIECE');
            expect(config.item).toEqual({ id: 'bk', position: 'e8' });

            // Simulate drag end
            config.end();
            expect(onDragEnd).toHaveBeenCalledTimes(1);
        }
    });

    it('applies opacity when dragging', () => {
        const onDragStart = vi.fn();
        const onDragEnd = vi.fn();

        // Mock useDrag to return isDragging: true
        (ReactDnd.useDrag as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
            { isDragging: true },
            vi.fn(),
            vi.fn()
        ]);

        render(
            <Piece
                piece={{ type: 'p', color: 'w' }}
                position="e2"
                pieceTheme="standard"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
        );

        const img = screen.getByAltText('w p');
        // The div wrapping the img should have opacity 0.5
        expect(img.parentElement).toHaveStyle('opacity: 0.5');
    });
});
