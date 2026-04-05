import React from 'react';
import { Chess, type PieceSymbol } from 'chess.js';

interface CapturedPiecesProps {
    game: Chess;
    pieceTheme: 'zoo' | 'standard';
}

const STARTING_COUNTS: Record<PieceSymbol, number> = {
    p: 8, n: 2, b: 2, r: 2, q: 1, k: 1
};

const CapturedPieces: React.FC<CapturedPiecesProps> = ({ game, pieceTheme }) => {
    // Calculate captured pieces
    const board = game.board();
    const currentCounts = {
        w: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
        b: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 }
    };

    // Count pieces currently on the board
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece) {
                currentCounts[piece.color as 'w' | 'b'][piece.type as PieceSymbol]++;
            }
        }
    }

    // Determine what's missing (captured)
    const getCaptured = (color: 'w' | 'b') => {
        const captured: string[] = [];
        const types: PieceSymbol[] = ['p', 'n', 'b', 'r', 'q']; // kings can't be captured
        for (const type of types) {
            const missing = STARTING_COUNTS[type] - currentCounts[color][type];
            for (let i = 0; i < missing; i++) {
                captured.push(type);
            }
        }
        return captured;
    };

    const whiteCaptured = getCaptured('w'); // White pieces captured by black
    const blackCaptured = getCaptured('b'); // Black pieces captured by white

    const renderPieceIcon = (type: string, color: 'w' | 'b', index: number) => {
        const isStandard = pieceTheme === 'standard';
        const imageName = isStandard
            ? `${color}${type.toUpperCase()}.svg`
            : `animal_w${type.toUpperCase()}.png`;

        return (
            <img
                key={`${color}-${type}-${index}`}
                src={`/pieces/${imageName}`}
                alt={`${color} ${type}`}
                style={{
                    width: '24px',
                    height: '24px',
                    objectFit: 'contain',
                    filter: (!isStandard && color === 'b') ? 'brightness(0.4) contrast(1.2)' : undefined,
                    marginRight: '-8px' // slight overlap for tighter display
                }}
            />
        );
    };

    return (
        <div className="captured-area" style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', minHeight: '30px', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', marginRight: '0.5rem', width: '20px', fontWeight: 'bold' }}>W:</span>
                <div style={{ display: 'flex' }}>
                    {whiteCaptured.map((type, index) => renderPieceIcon(type, 'w', index))}
                </div>
            </div>
            <div style={{ display: 'flex', minHeight: '30px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', marginRight: '0.5rem', width: '20px', fontWeight: 'bold' }}>B:</span>
                <div style={{ display: 'flex' }}>
                    {blackCaptured.map((type, index) => renderPieceIcon(type, 'b', index))}
                </div>
            </div>
        </div>
    );
};

export default CapturedPieces;
