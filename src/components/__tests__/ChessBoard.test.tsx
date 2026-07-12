import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChessBoard from '../ChessBoard';
import { Chess } from 'chess.js';

// Mock react-dnd to expose drop spec for testing without specialized backend
vi.mock('react-dnd', async () => {
    const original = await vi.importActual('react-dnd');
    return {
        ...original,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDrop: (specFn: () => any) => {
            const spec = specFn();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return [{ isOver: false, canDrop: true }, (node: any) => {
                if (node) {
                    node.__dropSpec = spec;
                }
            }];
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDrag: (specFn: () => any) => {
            const spec = specFn();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return [{ isDragging: false }, (node: any) => {
                if (node) {
                    node.__dragSpec = spec;
                }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node: any) => node];
        }
    };
});

describe('ChessBoard drop handler', () => {
    it('handles drop correctly and calls onMove with queen promotion by default', () => {
        const game = new Chess();
        const onMove = vi.fn();

        render(
            <ChessBoard game={game} onMove={onMove} pieceTheme="standard" />
        );

        // Retrieve the target square (e.g. e4)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const targetSquare = screen.getByTestId('e4') as any;

        // Assert the mock attached the drop spec
        expect(targetSquare.__dropSpec).toBeDefined();

        // Simulate dropping an item from e2 to e4
        act(() => {
            targetSquare.__dropSpec.drop({ id: 'pawn', position: 'e2' });
        });

        // Assert the onMove callback was invoked correctly
        expect(onMove).toHaveBeenCalledWith({
            from: 'e2',
            to: 'e4',
            promotion: 'q'
        });
    });
});
