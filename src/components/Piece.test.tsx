import { render, screen, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Piece from './Piece';

let mockIsDragging = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockSpec: any = null;

vi.mock('react-dnd', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useDrag: (specFn: any) => {
        mockSpec = specFn();
        return [
            { isDragging: mockIsDragging },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node: any) => {
                if (node) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (node as any).__dragSpec = mockSpec;
                }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            () => {}
        ];
    }
}));

describe('Piece component', () => {
    beforeEach(() => {
        mockIsDragging = false;
        mockSpec = null;
    });

    it('renders standard piece image correctly', () => {
        render(
            <Piece
                piece={{ type: 'p', color: 'w' }}
                position="e2"
                pieceTheme="standard"
                onDragStart={() => {}}
                onDragEnd={() => {}}
            />
        );
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', '/pieces/wP.svg');
        expect(img).not.toHaveStyle('filter: brightness(0.4) contrast(1.2)');
    });

    it('renders zoo piece image correctly for white', () => {
        render(
            <Piece
                piece={{ type: 'p', color: 'w' }}
                position="e2"
                pieceTheme="zoo"
                onDragStart={() => {}}
                onDragEnd={() => {}}
            />
        );
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', '/pieces/wP.svg');
        expect(img).not.toHaveStyle('filter: brightness(0.4) contrast(1.2)');
    });

    it('renders zoo piece image for black', () => {
        render(
            <Piece
                piece={{ type: 'p', color: 'b' }}
                position="e7"
                pieceTheme="zoo"
                onDragStart={() => {}}
                onDragEnd={() => {}}
            />
        );
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', '/pieces/bP.svg');
    });

    it('calls onDragStart when isDragging becomes true', () => {
        const onDragStart = vi.fn();
        const { rerender } = render(
            <Piece
                piece={{ type: 'p', color: 'w' }}
                position="e2"
                pieceTheme="standard"
                onDragStart={onDragStart}
                onDragEnd={() => {}}
            />
        );

        expect(onDragStart).not.toHaveBeenCalled();

        mockIsDragging = true;
        rerender(
            <Piece
                piece={{ type: 'p', color: 'w' }}
                position="e2"
                pieceTheme="standard"
                onDragStart={onDragStart}
                onDragEnd={() => {}}
            />
        );

        expect(onDragStart).toHaveBeenCalledTimes(1);
    });

    it('calls onDragEnd when drag ends', () => {
        const onDragEnd = vi.fn();
        render(
            <Piece
                piece={{ type: 'p', color: 'w' }}
                position="e2"
                pieceTheme="standard"
                onDragStart={() => {}}
                onDragEnd={onDragEnd}
            />
        );

        act(() => {
            mockSpec.end();
        });

        expect(onDragEnd).toHaveBeenCalledTimes(1);
    });
});
