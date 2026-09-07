import React, { useMemo } from 'react';
import { Chess, SQUARES, type PieceSymbol } from 'chess.js';

interface CapturedPiecesProps {
    game: Chess;
    pieceTheme: 'zoo' | 'standard';
}

const STARTING_COUNTS: Record<PieceSymbol, number> = {
    p: 8, n: 2, b: 2, r: 2, q: 1, k: 1
};

const CapturedPieces: React.FC<CapturedPiecesProps> = ({ game }) => {
    const fen = game.fen();
    // Calculate captured pieces
    const { whiteCaptured, blackCaptured } = useMemo(() => {
        const currentCounts = {
            w: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
            b: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 }
        };

        // Count pieces currently on the board.
        // Optimized: Iterating SQUARES and using game.get(square) is faster than game.board()
        for (const square of SQUARES) {
            const piece = game.get(square);
            if (piece) {
                currentCounts[piece.color as 'w' | 'b'][piece.type as PieceSymbol]++;
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

        return {
            whiteCaptured: getCaptured('w'), // White pieces captured by black
            blackCaptured: getCaptured('b')  // Black pieces captured by white
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fen]);

    const renderPieceIcon = (type: string, color: 'w' | 'b', index: number) => {
        const imageName = `${color}${type.toUpperCase()}.svg`;
        const pieceNames: Record<string, string> = { p: 'Pawn', n: 'Knight', b: 'Bishop', r: 'Rook', q: 'Queen', k: 'King' };
        const altText = `${color === 'w' ? 'White' : 'Black'} ${pieceNames[type]}`;

        return (
            <img
                key={`${color}-${type}-${index}`}
                src={`/pieces/${imageName}`}
                alt={altText}
                style={{
                    width: '24px',
                    height: '24px',
                    objectFit: 'contain',
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