import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import MoveHistory from './MoveHistory';

describe('MoveHistory Component', () => {
    beforeEach(() => {
        // Mock scrollHeight and scrollTop for auto-scroll tests
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
            configurable: true,
            value: 100,
        });
        Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
            configurable: true,
            get() {
                return this._scrollTop || 0;
            },
            set(val) {
                this._scrollTop = val;
            },
        });
    });

    afterEach(() => {
        // Clean up mocks
        // @ts-expect-error - overriding readonly properties for testing cleanup
        delete HTMLElement.prototype.scrollHeight;
        // @ts-expect-error - overriding readonly properties for testing cleanup
        delete HTMLElement.prototype.scrollTop;
    });

    it('renders "No moves yet" when history is empty', () => {
        render(<MoveHistory history={[]} />);
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('renders correctly with an odd number of moves', () => {
        const history = ['e4'];
        render(<MoveHistory history={history} />);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('1.')).toBeInTheDocument();

        const whiteMove = screen.getByText('e4');
        expect(whiteMove).toBeInTheDocument();

        // Since there is only one move, black's column should be empty
        // The first <td> is the number, second is white, third is black
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(2); // 1 header row + 1 data row

        const dataCells = rows[1].querySelectorAll('td');
        expect(dataCells[1]).toHaveTextContent('e4');
        expect(dataCells[2]).toHaveTextContent('');
    });

    it('renders correctly with multiple pairs of moves', () => {
        const history = ['e4', 'e5', 'Nf3', 'Nc6'];
        render(<MoveHistory history={history} />);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('2.')).toBeInTheDocument();

        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();
        expect(screen.getByText('Nc6')).toBeInTheDocument();

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(3); // 1 header + 2 data rows

        const row1Cells = rows[1].querySelectorAll('td');
        expect(row1Cells[1]).toHaveTextContent('e4');
        expect(row1Cells[2]).toHaveTextContent('e5');

        const row2Cells = rows[2].querySelectorAll('td');
        expect(row2Cells[1]).toHaveTextContent('Nf3');
        expect(row2Cells[2]).toHaveTextContent('Nc6');
    });

    it('auto-scrolls to the bottom when history updates', () => {
        const { rerender } = render(<MoveHistory history={['e4']} />);

        const moveListContainer = document.querySelector('.move-list');
        expect(moveListContainer).not.toBeNull();

        if (moveListContainer) {
            // initial render
            expect(moveListContainer.scrollTop).toBe(100);

            // manually change it to simulate scrolling up
            moveListContainer.scrollTop = 50;

            // rerender with new history
            rerender(<MoveHistory history={['e4', 'e5']} />);

            // should have auto-scrolled back to 100
            expect(moveListContainer.scrollTop).toBe(100);
        }
    });
});
