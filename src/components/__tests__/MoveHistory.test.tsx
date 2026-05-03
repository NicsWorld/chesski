import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import MoveHistory from '../MoveHistory';

describe('MoveHistory', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders empty history correctly', () => {
        render(<MoveHistory history={[]} />);

        expect(screen.getByText('Move History')).toBeInTheDocument();
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('renders an even number of moves correctly', () => {
        const history = ['e4', 'e5', 'Nf3', 'Nc6'];
        render(<MoveHistory history={history} />);

        expect(screen.getByRole('table')).toBeInTheDocument();

        const rows = screen.getAllByRole('row');
        // 1 header row + 2 data rows
        expect(rows).toHaveLength(3);

        // Row 1 (header is rows[0])
        expect(rows[1]).toHaveTextContent('1.');
        expect(rows[1]).toHaveTextContent('e4');
        expect(rows[1]).toHaveTextContent('e5');

        // Row 2
        expect(rows[2]).toHaveTextContent('2.');
        expect(rows[2]).toHaveTextContent('Nf3');
        expect(rows[2]).toHaveTextContent('Nc6');
    });

    it('renders an odd number of moves correctly', () => {
        const history = ['e4', 'e5', 'Nf3'];
        render(<MoveHistory history={history} />);

        const rows = screen.getAllByRole('row');
        // 1 header row + 2 data rows
        expect(rows).toHaveLength(3);

        // Row 1
        expect(rows[1]).toHaveTextContent('1.');
        expect(rows[1]).toHaveTextContent('e4');
        expect(rows[1]).toHaveTextContent('e5');

        // Row 2 (incomplete pair)
        expect(rows[2]).toHaveTextContent('2.');
        expect(rows[2]).toHaveTextContent('Nf3');

        // The black move cell should be empty but present
        const cells = rows[2].querySelectorAll('td');
        expect(cells[2]).toHaveTextContent('');
    });

    it('auto-scrolls to the bottom when history updates', () => {
        // Mock scrollHeight on HTMLElement prototype for jsdom
        const originalScrollHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight');
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 500 });

        const { container, rerender } = render(<MoveHistory history={['e4']} />);
        const moveListDiv = container.querySelector('.move-list') as HTMLDivElement;

        expect(moveListDiv).toBeInTheDocument();
        expect(moveListDiv.scrollTop).toBe(500);

        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 1000 });
        rerender(<MoveHistory history={['e4', 'e5']} />);

        expect(moveListDiv.scrollTop).toBe(1000);

        // Cleanup
        if (originalScrollHeight) {
            Object.defineProperty(HTMLElement.prototype, 'scrollHeight', originalScrollHeight);
        } else {
            // @ts-expect-error scrollHeight is readonly on HTMLElement
            delete HTMLElement.prototype.scrollHeight;
        }
    });
});
