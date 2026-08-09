
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MoveHistory from './MoveHistory';

describe('MoveHistory Component', () => {
    let originalScrollHeight: PropertyDescriptor | undefined;
    let originalScrollTop: PropertyDescriptor | undefined;

    beforeEach(() => {
        // Save original descriptors
        originalScrollHeight = Object.getOwnPropertyDescriptor(HTMLDivElement.prototype, 'scrollHeight');
        originalScrollTop = Object.getOwnPropertyDescriptor(HTMLDivElement.prototype, 'scrollTop');

        // Mock scrollHeight
        Object.defineProperty(HTMLDivElement.prototype, 'scrollHeight', {
            configurable: true,
            get() { return 1000; }
        });
    });

    afterEach(() => {
        // Restore original descriptors
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
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('renders a single move correctly', () => {
        render(<MoveHistory history={['e4']} />);
        expect(screen.getByRole('table')).toBeInTheDocument();

        const rows = screen.getAllByRole('row');
        // 1 header row + 1 data row
        expect(rows).toHaveLength(2);

        const cells = screen.getAllByRole('cell');
        expect(cells).toHaveLength(3);
        expect(cells[0]).toHaveTextContent('1.');
        expect(cells[1]).toHaveTextContent('e4');
        expect(cells[2]).toHaveTextContent('');
    });

    it('groups multiple moves correctly into white and black pairs', () => {
        const history = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'];
        render(<MoveHistory history={history} />);

        const rows = screen.getAllByRole('row');
        // 1 header row + 3 data rows (5 moves = 3 pairs)
        expect(rows).toHaveLength(4);

        // First row
        const row1Cells = rows[1].querySelectorAll('td');
        expect(row1Cells[0]).toHaveTextContent('1.');
        expect(row1Cells[1]).toHaveTextContent('e4');
        expect(row1Cells[2]).toHaveTextContent('e5');

        // Second row
        const row2Cells = rows[2].querySelectorAll('td');
        expect(row2Cells[0]).toHaveTextContent('2.');
        expect(row2Cells[1]).toHaveTextContent('Nf3');
        expect(row2Cells[2]).toHaveTextContent('Nc6');

        // Third row
        const row3Cells = rows[3].querySelectorAll('td');
        expect(row3Cells[0]).toHaveTextContent('3.');
        expect(row3Cells[1]).toHaveTextContent('Bb5');
        expect(row3Cells[2]).toHaveTextContent('');
    });

    it('auto-scrolls to the bottom when history updates', () => {
        const scrollTopSetter = vi.fn();

        Object.defineProperty(HTMLDivElement.prototype, 'scrollTop', {
            configurable: true,
            set: scrollTopSetter,
            get() { return 0; }
        });

        const { rerender } = render(<MoveHistory history={[]} />);

        // Initial render does trigger useEffect if ref is set, but let's check updates
        scrollTopSetter.mockClear();

        rerender(<MoveHistory history={['e4']} />);

        // useEffect should have updated scrollTop to scrollHeight (which is mocked to 1000)
        expect(scrollTopSetter).toHaveBeenCalledWith(1000);
    });
});
