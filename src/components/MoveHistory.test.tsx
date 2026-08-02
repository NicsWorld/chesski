import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import MoveHistory from './MoveHistory';

describe('MoveHistory', () => {
    let scrollTopValue = 0;

    beforeEach(() => {
        scrollTopValue = 0;
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
            configurable: true,
            value: 100
        });
        Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
            configurable: true,
            set(val: number) {
                scrollTopValue = val;
            },
            get() {
                return scrollTopValue;
            }
        });
    });

    afterEach(() => {
        // @ts-expect-error cleanup mock
        delete HTMLElement.prototype.scrollHeight;
        // @ts-expect-error cleanup mock
        delete HTMLElement.prototype.scrollTop;
    });

    it('renders empty history correctly', () => {
        render(<MoveHistory history={[]} />);
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
    });

    it('renders an even number of moves correctly', () => {
        render(<MoveHistory history={['e4', 'e5', 'Nf3', 'Nc6']} />);

        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('2.')).toBeInTheDocument();
        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();
        expect(screen.getByText('Nc6')).toBeInTheDocument();
    });

    it('renders an odd number of moves correctly', () => {
        render(<MoveHistory history={['e4', 'e5', 'Nf3']} />);

        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('2.')).toBeInTheDocument();
        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();
    });

    it('auto-scrolls to the bottom when history updates', () => {
        const { rerender } = render(<MoveHistory history={['e4']} />);

        expect(scrollTopValue).toBe(100);

        scrollTopValue = 0;

        rerender(<MoveHistory history={['e4', 'e5']} />);

        expect(scrollTopValue).toBe(100);
    });
});
