import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MoveHistory from './MoveHistory';

describe('MoveHistory', () => {
    // Setup and teardown for HTMLElement mock
    beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
            configurable: true,
            value: 100,
        });
        Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
            configurable: true,
            writable: true,
            value: 0,
        });
    });

    afterEach(() => {
        // @ts-expect-error - Expected for cleanup of the mocked properties
        delete HTMLElement.prototype.scrollHeight;
        // @ts-expect-error - Expected for cleanup of the mocked properties
        delete HTMLElement.prototype.scrollTop;
    });

    it('renders "No moves yet" when history is empty', () => {
        render(<MoveHistory history={[]} />);
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
    });

    it('renders pairs of moves correctly', () => {
        const history = ['e4', 'e5', 'Nf3', 'Nc6'];
        render(<MoveHistory history={history} />);

        // We expect the moves to be there
        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();
        expect(screen.getByText('Nc6')).toBeInTheDocument();

        // The move numbers should be there (1. and 2.)
        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('2.')).toBeInTheDocument();

        // Check if there are exactly 2 rows inside tbody
        const rows = screen.getAllByRole('row');
        // 1 for thead, 2 for tbody
        expect(rows.length).toBe(3);
    });

    it('renders an incomplete pair correctly (odd number of moves)', () => {
        const history = ['e4', 'e5', 'Nf3'];
        render(<MoveHistory history={history} />);

        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();

        // The move numbers should be there (1. and 2.)
        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('2.')).toBeInTheDocument();

        // Check if there are exactly 2 rows inside tbody
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBe(3);
    });

    it('auto-scrolls to the bottom when history updates', () => {
        const { rerender } = render(<MoveHistory history={['e4']} />);

        // Wait for the effect
        const scrollContainer = screen.getByText('e4').closest('.move-list');
        expect(scrollContainer).toBeInTheDocument();

        if (scrollContainer) {
            // Initial state after first render
            expect(scrollContainer.scrollTop).toBe(100); // Because we mocked scrollHeight to 100
        }

        // Change scrollHeight to simulate new content
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
            configurable: true,
            value: 200,
        });

        rerender(<MoveHistory history={['e4', 'e5']} />);

        if (scrollContainer) {
            // State after update
            expect(scrollContainer.scrollTop).toBe(200); // Should have updated to new scrollHeight
        }
    });
});
