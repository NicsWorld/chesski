import { render, screen } from '@testing-library/react';
import MoveHistory from '../MoveHistory';
import { describe, it, expect } from 'vitest';

describe('MoveHistory Component', () => {
    it('displays "No moves yet" when history is empty', () => {
        render(<MoveHistory history={[]} />);
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
    });

    it('renders even number of moves correctly into White and Black columns', () => {
        render(<MoveHistory history={['e4', 'e5', 'Nf3', 'Nc6']} />);

        // Headers
        expect(screen.getByText('#')).toBeInTheDocument();
        expect(screen.getByText('White')).toBeInTheDocument();
        expect(screen.getByText('Black')).toBeInTheDocument();

        // Move 1
        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();

        // Move 2
        expect(screen.getByText('2.')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();
        expect(screen.getByText('Nc6')).toBeInTheDocument();
    });

    it('renders odd number of moves correctly with an empty Black move cell', () => {
        render(<MoveHistory history={['e4', 'e5', 'Nf3']} />);

        // Move 1
        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();

        // Move 2
        expect(screen.getByText('2.')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();

        // Find the empty cell for Black's move. We expect 4 td elements with class 'move-notation'
        // where the 4th one should be empty.
        const notationCells = document.querySelectorAll('.move-notation');
        expect(notationCells.length).toBe(4); // e4, e5, Nf3, (empty)
        expect(notationCells[3].textContent).toBe('');
    });

    it('auto-scrolls to the bottom when new moves are added', () => {
        // Mock the scroll logic. We'll use a wrapper to test re-renders
        const { rerender, container } = render(<MoveHistory history={['e4']} />);

        const moveListDiv = container.querySelector('.move-list') as HTMLDivElement;

        // Mock properties for testing
        Object.defineProperty(moveListDiv, 'scrollHeight', { value: 200, configurable: true });

        // Update history
        rerender(<MoveHistory history={['e4', 'e5', 'Nf3']} />);

        // scrollHeight will be applied to scrollTop
        expect(moveListDiv.scrollTop).toBe(200);
    });
});
