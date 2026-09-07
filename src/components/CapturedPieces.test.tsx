import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Chess } from 'chess.js';
import CapturedPieces from './CapturedPieces';

describe('CapturedPieces', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('renders no captured pieces for starting position', () => {
        const game = new Chess();
        render(<CapturedPieces game={game} pieceTheme="standard" />);

        expect(screen.getByText('W:')).toBeInTheDocument();
        expect(screen.getByText('B:')).toBeInTheDocument();

        const images = screen.queryAllByRole('img');
        expect(images).toHaveLength(0);
    });

    it('renders captured pieces correctly when pieces are missing', () => {
        const game = new Chess();
        game.remove('a2'); // White Pawn
        game.remove('d1'); // White Queen
        game.remove('b8'); // Black Knight
        game.remove('g8'); // Black Knight
        game.remove('a8'); // Black Rook

        render(<CapturedPieces game={game} pieceTheme="standard" />);

        const images = screen.getAllByRole('img');

        expect(images).toHaveLength(5);

        const altTexts = images.map(img => img.getAttribute('alt'));
        expect(altTexts).toContain('White Pawn');
        expect(altTexts).toContain('White Queen');
        expect(altTexts.filter(alt => alt === 'Black Knight')).toHaveLength(2);
        expect(altTexts).toContain('Black Rook');
    });

    it('uses standard piece theme by default', () => {
        const game = new Chess();
        game.remove('a2'); // White Pawn

        render(<CapturedPieces game={game} pieceTheme="standard" />);
        const images = screen.getAllByRole('img');

        expect(images[0]).toHaveAttribute('src', '/pieces/wP.svg');
    });
});
