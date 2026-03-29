import { useState } from 'react';
import { Chess } from 'chess.js';
import Piece from './Piece';
import { SquareWrapper } from './BoardSquare';

interface ChessBoardProps {
    game: Chess;
    onMove: (move: { from: string; to: string; promotion?: string }) => void;
    shouldHidePiece?: (piece: { type: string; color: string }) => boolean;
    pieceTheme: 'zoo' | 'standard';
}

const ChessBoard: React.FC<ChessBoardProps> = ({ game, onMove, shouldHidePiece, pieceTheme }) => {
    const board = game.board();
    const [validMoves, setValidMoves] = useState<string[]>([]);

    const isBlackSquare = (fileIndex: number, rankIndex: number) => {
        return (fileIndex + rankIndex) % 2 === 1;
    };

    const handleDrop = (item: { id: string; position: string }, to: string) => {
        const from = item.position;
        onMove({ from, to, promotion: 'q' });
        setValidMoves([]);
    };

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    return (
        <div className="chess-board-grid">
            {ranks.map((rank, rankIndex) =>
                files.map((file, fileIndex) => {
                    const square = `${file}${rank}`;
                    const piece = board[rankIndex][fileIndex];
                    const isBlack = isBlackSquare(fileIndex, rankIndex);
                    const isHidden = piece && shouldHidePiece && shouldHidePiece(piece);

                    return (
                        <SquareWrapper
                            key={square}
                            position={square}
                            isBlack={isBlack}
                            onDrop={(item) => handleDrop(item, square)}
                            highlight={validMoves.includes(square)}
                            lastMove={false}
                        >
                            {piece && !isHidden && <Piece
                                piece={piece}
                                position={square}
                                pieceTheme={pieceTheme}
                                onDragStart={() => {
                                    const moves = game.moves({ square: square as import('chess.js').Square, verbose: true });
                                    setValidMoves(moves.map(m => m.to));
                                }}
                                onDragEnd={() => setValidMoves([])}
                            />}
                        </SquareWrapper>
                    );
                })
            )}
        </div>
    );
};

export default ChessBoard;
