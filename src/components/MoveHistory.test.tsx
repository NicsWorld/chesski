import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import MoveHistory from './MoveHistory';

describe('MoveHistory', () => {
    let originalScrollHeight: PropertyDescriptor | undefined;
    let originalScrollTop: PropertyDescriptor | undefined;

    beforeEach(() => {
        originalScrollHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight');
        originalScrollTop = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTop');

        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
            configurable: true,
            get: () => 1000
        });

        Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
            configurable: true,
            value: 0,
            writable: true
        });
    });

    afterEach(() => {
        if (originalScrollHeight) {
            Object.defineProperty(HTMLElement.prototype, 'scrollHeight', originalScrollHeight);
        } else {
            // @ts-expect-error Typescript will complain but we need to delete it
            delete HTMLElement.prototype.scrollHeight;
        }

        if (originalScrollTop) {
            Object.defineProperty(HTMLElement.prototype, 'scrollTop', originalScrollTop);
        } else {
            // @ts-expect-error Typescript will complain but we need to delete it
            delete HTMLElement.prototype.scrollTop;
        }
    });

    it('renders empty state when history is empty', () => {
        render(<MoveHistory history={[]} />);
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
    });

    it('renders moves grouped into white and black pairs', () => {
        const history = ['e4', 'e5', 'Nf3'];
        render(<MoveHistory history={history} />);

        expect(screen.queryByText('No moves yet')).not.toBeInTheDocument();

        // Check moves
        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();

        // Check move numbers
        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('2.')).toBeInTheDocument();

        // Check empty cell for the missing black move
        const cells = screen.getAllByRole('cell');
        // 3 columns: #, White, Black
        // row 1: 1., e4, e5
        // row 2: 2., Nf3, empty
        expect(cells[0]).toHaveTextContent('1.');
        expect(cells[1]).toHaveTextContent('e4');
        expect(cells[2]).toHaveTextContent('e5');

        expect(cells[3]).toHaveTextContent('2.');
        expect(cells[4]).toHaveTextContent('Nf3');
        expect(cells[5]).toHaveTextContent('');
    });

    it('auto-scrolls to bottom when history updates', () => {
        const { rerender, container } = render(<MoveHistory history={['e4']} />);

        const scrollContainer = container.querySelector('.move-list') as HTMLDivElement;
        expect(scrollContainer.scrollTop).toBe(1000);

        scrollContainer.scrollTop = 0;

        rerender(<MoveHistory history={['e4', 'e5']} />);

        expect(scrollContainer.scrollTop).toBe(1000);
    });
});
