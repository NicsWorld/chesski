import { render, screen, act } from '@testing-library/react';
import MoveHistory from './MoveHistory';

describe('MoveHistory Component', () => {
    let mockScrollTop = 0;

    beforeEach(() => {
        mockScrollTop = 0;
        // Mock scroll properties on HTMLElement for jsdom
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
            configurable: true,
            get: () => 100,
        });
        Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
            configurable: true,
            get: () => mockScrollTop,
            set: function (val) {
                mockScrollTop = val;
            },
        });
    });

    afterEach(() => {
        // @ts-expect-error cleanup mock
        delete HTMLElement.prototype.scrollHeight;
        // @ts-expect-error cleanup mock
        delete HTMLElement.prototype.scrollTop;
    });

    test('renders empty state when history is empty', () => {
        render(<MoveHistory history={[]} />);
        expect(screen.getByText('Move History')).toBeInTheDocument();
        expect(screen.getByText('No moves yet')).toBeInTheDocument();
    });

    test('renders a single move correctly', () => {
        render(<MoveHistory history={['e4']} />);
        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('1.')).toBeInTheDocument();

        // Ensure there's a cell for Black's missing move
        const tdElements = screen.getAllByRole('cell');
        // Structure: index, white move, black move. So tdElements[2] should be empty
        expect(tdElements[2]).toHaveTextContent('');
    });

    test('renders multiple moves grouped correctly', () => {
        const history = ['e4', 'e5', 'Nf3', 'Nc6'];
        render(<MoveHistory history={history} />);

        // 1st pair
        expect(screen.getByText('1.')).toBeInTheDocument();
        expect(screen.getByText('e4')).toBeInTheDocument();
        expect(screen.getByText('e5')).toBeInTheDocument();

        // 2nd pair
        expect(screen.getByText('2.')).toBeInTheDocument();
        expect(screen.getByText('Nf3')).toBeInTheDocument();
        expect(screen.getByText('Nc6')).toBeInTheDocument();
    });

    test('auto-scrolls to the bottom when history updates', () => {
        const { rerender } = render(<MoveHistory history={['e4']} />);

        const scrollContainer = screen.getByText('e4').closest('.move-list') as HTMLDivElement;

        // Verify initial auto-scroll (triggered by initial render/effect)
        expect(scrollContainer.scrollTop).toBe(100);

        // Reset the mocked scroll top to simulate user scrolling up
        act(() => {
            scrollContainer.scrollTop = 50;
        });
        expect(scrollContainer.scrollTop).toBe(50);

        // Update props
        rerender(<MoveHistory history={['e4', 'e5']} />);

        // Verify it scrolled back to bottom after update
        expect(scrollContainer.scrollTop).toBe(100);
    });
});
