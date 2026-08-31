import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import MoveHistory from './MoveHistory';

describe('MoveHistory component', () => {
    let originalScrollHeight: PropertyDescriptor | undefined;
    let originalScrollTop: PropertyDescriptor | undefined;

    beforeEach(() => {
        originalScrollHeight = Object.getOwnPropertyDescriptor(HTMLDivElement.prototype, 'scrollHeight');
        originalScrollTop = Object.getOwnPropertyDescriptor(HTMLDivElement.prototype, 'scrollTop');

        Object.defineProperty(HTMLDivElement.prototype, 'scrollHeight', {
            configurable: true,
            value: 1000,
        });

        Object.defineProperty(HTMLDivElement.prototype, 'scrollTop', {
            configurable: true,
            writable: true,
            value: 0,
        });
    });

    afterEach(() => {
        if (originalScrollHeight) {
            Object.defineProperty(HTMLDivElement.prototype, 'scrollHeight', originalScrollHeight);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (HTMLDivElement.prototype as any).scrollHeight;
        }

        if (originalScrollTop) {
            Object.defineProperty(HTMLDivElement.prototype, 'scrollTop', originalScrollTop);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (HTMLDivElement.prototype as any).scrollTop;
        }
    });

    it('renders "No moves yet" when history is empty', () => {
        render(<MoveHistory history={[]} />);
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
    });

    it('renders moves correctly for even number of moves', () => {
        render(<MoveHistory history={['e4', 'e5', 'Nf3', 'Nc6']} />);

        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();
        expect(screen.getByText('Nc6')).toBeInTheDocument();

        const moveNumbers = screen.getAllByText(/\d+\./);
        expect(moveNumbers).toHaveLength(2);
    });

    it('renders moves correctly for odd number of moves', () => {
        const { container } = render(<MoveHistory history={['e4', 'e5', 'Nf3']} />);

        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();

        const moveNumbers = screen.getAllByText(/\d+\./);
        expect(moveNumbers).toHaveLength(2);

        const cells = container.querySelectorAll('.move-notation');
        expect(cells[3]?.textContent).toBe('');
    });

    it('auto-scrolls to the bottom when history updates', () => {
        const { rerender, container } = render(<MoveHistory history={['e4']} />);

        const moveList = container.querySelector('.move-list') as HTMLDivElement;
        expect(moveList).toBeInTheDocument();

        moveList.scrollTop = 0;

        rerender(<MoveHistory history={['e4', 'e5']} />);

        expect(moveList.scrollTop).toBe(1000);
    });
});
