import { render, screen } from '@testing-library/react';
import Piece from './Piece';
import { vi, describe, it, expect, beforeEach } from 'vitest';

let mockIsDragging = false;

vi.mock('react-dnd', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDrag: (specFn: any) => {
    const spec = typeof specFn === 'function' ? specFn() : specFn;
    return [
      { isDragging: mockIsDragging },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node: any) => {
        if (node) {
          node.__dragSpec = spec;
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node: any) => node
    ];
  }
}));

describe('Piece component', () => {
    const defaultProps = {
        piece: { type: 'p', color: 'w' as const },
        position: 'a2',
        pieceTheme: 'standard' as const,
        onDragStart: vi.fn(),
        onDragEnd: vi.fn(),
    };

    beforeEach(() => {
        mockIsDragging = false;
        vi.clearAllMocks();
    });

    it('renders a standard white piece correctly', () => {
        render(<Piece {...defaultProps} />);

        const img = screen.getByAltText('w p');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/pieces/wP.svg');
        expect(img).not.toHaveStyle({ filter: 'brightness(0.4) contrast(1.2)' });
    });

    it('renders a standard black piece correctly', () => {
        render(<Piece {...defaultProps} piece={{ type: 'n', color: 'b' }} />);

        const img = screen.getByAltText('b n');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/pieces/bN.svg');
        expect(img).not.toHaveStyle({ filter: 'brightness(0.4) contrast(1.2)' });
    });

    it('renders a zoo white piece correctly', () => {
        render(<Piece {...defaultProps} pieceTheme="zoo" piece={{ type: 'k', color: 'w' }} />);

        const img = screen.getByAltText('w k');
        expect(img).toHaveAttribute('src', '/pieces/animal_wK.png');
        expect(img).not.toHaveStyle({ filter: 'brightness(0.4) contrast(1.2)' });
    });

    it('renders a zoo black piece correctly with brightness filter', () => {
        render(<Piece {...defaultProps} pieceTheme="zoo" piece={{ type: 'q', color: 'b' }} />);

        const img = screen.getByAltText('b q');
        expect(img).toHaveAttribute('src', '/pieces/animal_wQ.png');
        expect(img).toHaveStyle({ filter: 'brightness(0.4) contrast(1.2)' });
    });

    it('calls onDragStart and applies opacity when dragging', () => {
        mockIsDragging = true;
        render(<Piece {...defaultProps} />);

        expect(defaultProps.onDragStart).toHaveBeenCalledTimes(1);

        const img = screen.getByAltText('w p');
        expect(img.parentElement).toHaveStyle({ opacity: '0.5' });
    });

    it('has opacity 1 when not dragging', () => {
        mockIsDragging = false;
        render(<Piece {...defaultProps} />);

        const img = screen.getByAltText('w p');
        expect(img.parentElement).toHaveStyle({ opacity: '1' });
        expect(defaultProps.onDragStart).not.toHaveBeenCalled();
    });

    it('calls onDragEnd via the drag spec', () => {
        render(<Piece {...defaultProps} />);

        const img = screen.getByAltText('w p');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const node = img.parentElement as any;

        expect(node.__dragSpec).toBeDefined();
        node.__dragSpec.end();

        expect(defaultProps.onDragEnd).toHaveBeenCalledTimes(1);
    });
});
