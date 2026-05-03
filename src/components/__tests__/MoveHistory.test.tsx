import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MoveHistory from '../MoveHistory';

describe('MoveHistory component', () => {
    it('renders empty state when history is empty', () => {
        render(<MoveHistory history={[]} />);
        expect(screen.getByText('Move History')).toBeInTheDocument();
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('renders a single white move (odd number of moves)', () => {
        render(<MoveHistory history={['e4']} />);
        expect(screen.getByRole('table')).toBeInTheDocument();

        const rows = screen.getAllByRole('row');
        // 1 header row + 1 data row
        expect(rows.length).toBe(2);

        // Data row cells: [#, White, Black]
        const cells = rows[1].querySelectorAll('td');
        expect(cells[0].textContent).toBe('1.');
        expect(cells[1].textContent).toBe('e4');
        expect(cells[2].textContent).toBe('');
    });

    it('renders full move pairs correctly', () => {
        render(<MoveHistory history={['e4', 'e5', 'Nf3', 'Nc6']} />);

        const rows = screen.getAllByRole('row');
        // 1 header row + 2 data rows
        expect(rows.length).toBe(3);

        // First move pair
        const cells1 = rows[1].querySelectorAll('td');
        expect(cells1[0].textContent).toBe('1.');
        expect(cells1[1].textContent).toBe('e4');
        expect(cells1[2].textContent).toBe('e5');

        // Second move pair
        const cells2 = rows[2].querySelectorAll('td');
        expect(cells2[0].textContent).toBe('2.');
        expect(cells2[1].textContent).toBe('Nf3');
        expect(cells2[2].textContent).toBe('Nc6');
    });

    it('auto-scrolls to bottom when history updates', () => {
        const { rerender } = render(<MoveHistory history={['e4']} />);

        // Get the scroll container
        // Based on MoveHistory.tsx, ref is on <div className="move-list">
        // It wraps the table/empty state.
        // We can get it by role 'table' parent, but let's query the DOM element by class since there's no specific role given to the container itself
        const moveListContainer = document.querySelector('.move-list');
        expect(moveListContainer).toBeInTheDocument();

        // Mock scrollHeight and scrollTop setters
        if (moveListContainer) {
            Object.defineProperty(moveListContainer, 'scrollHeight', { value: 500, configurable: true });

            let currentScrollTop = 0;
            Object.defineProperty(moveListContainer, 'scrollTop', {
                get() { return currentScrollTop; },
                set(val) { currentScrollTop = val; },
                configurable: true
            });
        }

        // Rerender with new history
        rerender(<MoveHistory history={['e4', 'e5', 'Nf3']} />);

        // After effect runs, scrollTop should equal scrollHeight
        if (moveListContainer) {
            expect(moveListContainer.scrollTop).toBe(500);
        }
    });
});
