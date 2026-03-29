import { Chess } from 'chess.js';

export const getInitialAppState = () => {
    let initialView: 'game' | 'tutorial' = 'tutorial';
    let initialGame = new Chess();
    let initialFen = initialGame.fen();

    const params = new URLSearchParams(window.location.search);
    const fenParam = params.get('fen');

    if (fenParam) {
        try {
            initialGame = new Chess(fenParam);
            initialFen = fenParam;
            initialView = 'game';
        } catch (e) {
            console.error("Invalid FEN in URL", e);
        }
    }

    return { initialView, initialGame, initialFen };
};
