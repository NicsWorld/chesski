import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { useDrop } from 'react-dnd';
import Piece from './Piece';

interface ChessBoardProps {
    game: Chess;
    onMove: (move: { from: string; to: string; promotion?: string }) => void;
}

interface BoardSquareProps {
    position: string;
    isBlack: boolean;
    children?: React.ReactNode;
    onDrop: (item: { id: string; position: string }) => void;
    highlight: boolean;
    lastMove: boolean;
}

const BoardSquare: React.FC<BoardSquareProps> = ({ position, isBlack, children, onDrop, highlight, lastMove }) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'PIECE',
        drop: (item: { id: string; position: string }) => onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    let backgroundColor = isBlack ? 'var(--color-board-dark)' : 'var(--color-board-light)';
    if (highlight) {
        backgroundColor = isBlack ? '#a9dfbf' : '#d4efdf'; // Green-ish highlight
    }
    if (isOver && canDrop) {
        backgroundColor = '#f7dc6f'; // Yellow highlight on hover
    }
    if (lastMove) {
        backgroundColor = 'rgba(255, 255, 0, 0.4)'; // Subtle yellow for last move
    }

    return (
        <div
            ref={drop as unknown as React.RefObject<HTMLDivElement>}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            {children}
            {position.includes('1') && <span style={{ position: 'absolute', bottom: 2, right: 2, fontSize: '0.7em', color: isBlack ? '#fff' : '#000' }}>{position[0]}</span>}
            {position.includes('a') && <span style={{ position: 'absolute', top: 2, left: 2, fontSize: '0.7em', color: isBlack ? '#fff' : '#000' }}>{position[1]}</span>}
        </div>
    );
};

const ChessBoard: React.FC<ChessBoardProps> = ({ game, onMove }) => {
    const [board, setBoard] = useState(game.board());
    const [validMoves, setValidMoves] = useState<string[]>([]);

    useEffect(() => {
        setBoard(game.board());
    }, [game, game.fen()]);

    // Helper to get square color
    const isBlackSquare = (fileIndex: number, rankIndex: number) => {
        return (fileIndex + rankIndex) % 2 === 1;
    };

    const handleDrop = (item: { id: string; position: string }, to: string) => {
        const from = item.position;
        onMove({ from, to, promotion: 'q' }); // Auto-promote to Queen for simplicity in MVP
        setValidMoves([]);
    };

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    return (
        <div style={{
            width: '100%',
            maxWidth: '70vmin', // Ensure it fits on screen within viewport min dimension
            aspectRatio: '1 / 1',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            border: '8px solid #5a3a29',
            borderRadius: '4px',
            marginTop: '1rem',
            margin: '0 auto', // Center it
        }}>
            {ranks.map((rank, rankIndex) =>
                files.map((file, fileIndex) => {
                    const square = `${file}${rank}`;
                    const piece = board[rankIndex][fileIndex];
                    const isBlack = isBlackSquare(fileIndex, rankIndex);

                    return (
                        <BoardSquare
                            key={square}
                            position={square}
                            isBlack={isBlack}
                            onDrop={(item) => handleDrop(item, square)}
                            highlight={validMoves.includes(square)}
                            lastMove={false} // TODO: Implement last move highlighting
                        >
                            {piece && <Piece
                                piece={piece}
                                position={square}
                                onDragStart={() => {
                                    // Get legal moves for this piece
                                    const moves = game.moves({ square: square as any, verbose: true });
                                    setValidMoves(moves.map(m => m.to));
                                }}
                                onDragEnd={() => setValidMoves([])}
                            />}
                        </BoardSquare>
                    );
                })
            )}
        </div>
    );
};

export default ChessBoard;
