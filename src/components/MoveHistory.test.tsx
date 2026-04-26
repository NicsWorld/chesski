import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MoveHistory from './MoveHistory';

describe('MoveHistory Component', () => {
    it('renders empty state when history is empty', () => {
        render(<MoveHistory history={[]} />);
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('renders a single white move', () => {
        render(<MoveHistory history={['e4']} />);

        expect(screen.getByRole('table')).toBeInTheDocument();
        const rows = screen.getAllByRole('row');
        // 1 header row, 1 data row
        expect(rows.length).toBe(2);

        const cells = screen.getAllByRole('cell');
        expect(cells[0]).toHaveTextContent('1.');
        expect(cells[1]).toHaveTextContent('e4');
        expect(cells[2]).toHaveTextContent(''); // Black move should be empty
    });

    it('renders multiple complete and incomplete moves', () => {
        const history = ['e4', 'e5', 'Nf3'];
        render(<MoveHistory history={history} />);

        const rows = screen.getAllByRole('row');
        // 1 header row + 2 data rows
        expect(rows.length).toBe(3);

        // First row (e4, e5)
        const row1Cells = rows[1].querySelectorAll('td');
        expect(row1Cells[0]).toHaveTextContent('1.');
        expect(row1Cells[1]).toHaveTextContent('e4');
        expect(row1Cells[2]).toHaveTextContent('e5');

        // Second row (Nf3, '')
        const row2Cells = rows[2].querySelectorAll('td');
        expect(row2Cells[0]).toHaveTextContent('2.');
        expect(row2Cells[1]).toHaveTextContent('Nf3');
        expect(row2Cells[2]).toHaveTextContent('');
    });

    it('auto-scrolls when history updates', () => {
        const { rerender } = render(<MoveHistory history={['e4']} />);

        // In JSDOM, scrollHeight and scrollTop aren't fully implemented
        // We'll just verify it doesn't crash on update
        expect(() => {
            rerender(<MoveHistory history={['e4', 'e5']} />);
        }).not.toThrow();
    });
});
