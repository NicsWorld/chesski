import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Chess } from 'chess.js';
import CapturedPieces from './CapturedPieces';

describe('CapturedPieces component', () => {
    let game: Chess;

    beforeEach(() => {
        game = new Chess();
    });

    it('renders no captured pieces initially', () => {
        render(<CapturedPieces game={game} pieceTheme="standard" />);
        // W: and B: labels exist, but no images
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('renders captured white pieces correctly', () => {
        game.remove('a2'); // Remove white pawn
        render(<CapturedPieces game={game} pieceTheme="standard" />);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(1);
        expect(images[0]).toHaveAttribute('src', '/pieces/wP.svg');
        expect(images[0]).toHaveAttribute('alt', 'White Pawn');
    });

    it('renders captured black pieces correctly', () => {
        game.remove('a7'); // Remove black pawn
        render(<CapturedPieces game={game} pieceTheme="standard" />);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(1);
        expect(images[0]).toHaveAttribute('src', '/pieces/bP.svg');
        expect(images[0]).toHaveAttribute('alt', 'Black Pawn');
    });

    it('renders multiple captured pieces', () => {
        game.remove('a2'); // White Pawn
        game.remove('b2'); // White Pawn
        game.remove('c1'); // White Bishop
        game.remove('d8'); // Black Queen

        render(<CapturedPieces game={game} pieceTheme="standard" />);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(4);

        // 2 white pawns, 1 white bishop, 1 black queen
        const whitePawns = screen.getAllByAltText('White Pawn');
        expect(whitePawns).toHaveLength(2);

        const whiteBishops = screen.getAllByAltText('White Bishop');
        expect(whiteBishops).toHaveLength(1);

        const blackQueens = screen.getAllByAltText('Black Queen');
        expect(blackQueens).toHaveLength(1);
    });
});
