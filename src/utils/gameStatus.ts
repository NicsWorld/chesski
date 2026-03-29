import { Chess } from 'chess.js';

export const evaluateGameStatus = (game: Chess): string => {
    if (game.isCheckmate()) {
        return `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`;
    }
    if (game.isDraw()) {
        return "It's a draw!";
    }
    if (game.isCheck()) {
        return "Check! Watch out!";
    }
    return game.turn() === 'w' ? "White's turn (Cute Animals)" : "Black's turn (Cool Animals)";
};
