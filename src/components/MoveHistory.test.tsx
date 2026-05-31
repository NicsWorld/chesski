import { render, screen } from '@testing-library/react';
import MoveHistory from './MoveHistory';
import { test, describe, expect, beforeEach, afterEach, vi } from 'vitest';

describe('MoveHistory Component', () => {
    beforeEach(() => {
        // Mock scrollHeight and scrollTop
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
            configurable: true,
            value: 500
        });

        let scrollTopValue = 0;
        Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
            configurable: true,
            get() { return scrollTopValue; },
            set(val) { scrollTopValue = val; }
        });
    });

    afterEach(() => {
        // @ts-expect-error cleanup mock
        delete HTMLElement.prototype.scrollHeight;
        // @ts-expect-error cleanup mock
        delete HTMLElement.prototype.scrollTop;
        vi.restoreAllMocks();
    });

    test('renders empty history message', () => {
        render(<MoveHistory history={[]} />);
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    test('renders populated history correctly grouped by White and Black', () => {
        const history = ['e4', 'e5', 'Nf3'];
        render(<MoveHistory history={history} />);

        const rows = screen.getAllByRole('row');
        // 1 header row + 2 data rows
        expect(rows).toHaveLength(3);

        // Check first move (e4 e5)
        const firstRowCells = rows[1].querySelectorAll('td');
        expect(firstRowCells[0]).toHaveTextContent('1.');
        expect(firstRowCells[1]).toHaveTextContent('e4');
        expect(firstRowCells[2]).toHaveTextContent('e5');

        // Check second move (Nf3)
        const secondRowCells = rows[2].querySelectorAll('td');
        expect(secondRowCells[0]).toHaveTextContent('2.');
        expect(secondRowCells[1]).toHaveTextContent('Nf3');
        expect(secondRowCells[2]).toHaveTextContent('');
    });

    test('auto-scrolls to bottom on history update', () => {
        const { rerender, container } = render(<MoveHistory history={['e4']} />);

        const scrollContainer = container.querySelector('.move-list');
        expect(scrollContainer).toBeInTheDocument();

        if (scrollContainer) {
            // Initial render scroll
            expect(scrollContainer.scrollTop).toBe(500);

            // Reset scroll position
            scrollContainer.scrollTop = 0;

            // Rerender with new history
            rerender(<MoveHistory history={['e4', 'e5']} />);

            // Should scroll down again
            expect(scrollContainer.scrollTop).toBe(500);
        }
    });
});
