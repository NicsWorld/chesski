import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CapturedPieces from './CapturedPieces';
import { Chess } from 'chess.js';

describe('CapturedPieces', () => {
    it('renders with no captured pieces at the start of a game', () => {
        const game = new Chess();
        const { container } = render(<CapturedPieces game={game} pieceTheme="standard" />);

        expect(screen.getByText('W:')).toBeInTheDocument();
        expect(screen.getByText('B:')).toBeInTheDocument();

        const images = container.querySelectorAll('img');
        expect(images.length).toBe(0);
    });

    it('renders captured pieces correctly', () => {
        const game = new Chess();
        game.move('e4');
        game.move('d5');
        game.move('exd5'); // White captures black pawn

        render(<CapturedPieces game={game} pieceTheme="standard" />);

        const blackPawn = screen.getByAltText('Black Pawn');
        expect(blackPawn).toBeInTheDocument();
        expect(blackPawn).toHaveAttribute('src', '/pieces/bP.svg');
    });

    it('renders multiple captured pieces', () => {
        const game = new Chess();
        game.move('e4'); game.move('d5');
        game.move('exd5'); game.move('Qxd5'); // White captures pawn, Black captures pawn
        game.move('Nc3'); game.move('Qe5+');
        game.move('Be2'); game.move('Qxe2+'); // Black captures bishop
        game.move('Ngxe2'); // White captures queen

        render(<CapturedPieces game={game} pieceTheme="standard" />);

        const whitePawn = screen.getByAltText('White Pawn');
        const whiteBishop = screen.getByAltText('White Bishop');
        expect(whitePawn).toBeInTheDocument();
        expect(whiteBishop).toBeInTheDocument();

        const blackPawn = screen.getByAltText('Black Pawn');
        const blackQueen = screen.getByAltText('Black Queen');
        expect(blackPawn).toBeInTheDocument();
        expect(blackQueen).toBeInTheDocument();
    });
});
