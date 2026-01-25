import { useState } from 'react';
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
    isOver: boolean;
    canDrop: boolean;
}

const BoardSquare: React.FC<BoardSquareProps> = ({ position, isBlack, children, highlight, isOver, canDrop }) => {
    // Determine background color based on state
    // Base color
    let backgroundColor = isBlack ? 'var(--color-board-black)' : 'var(--color-board-white)';

    // Hover state (Yellowish tint)
    if (isOver && canDrop) {
        backgroundColor = '#ffeaa7';
    }

    return (
        <div
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
            {/* Coordinate Labels - Only show on edges */}
            {position.includes('1') && <span style={{ position: 'absolute', bottom: 4, right: 4, fontSize: '0.65em', fontWeight: 'bold', color: isBlack ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)' }}>{position[0]}</span>}
            {position.includes('a') && <span style={{ position: 'absolute', top: 4, left: 4, fontSize: '0.65em', fontWeight: 'bold', color: isBlack ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)' }}>{position[1]}</span>}

            {children}

            {/* Legal Move Highlight - Dot */}
            {highlight && !children && (
                <div style={{
                    width: '30%',
                    height: '30%',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.15)',
                    pointerEvents: 'none', // Allow clicks to pass through
                }} />
            )}

            {/* Legal Move Capture Highlight - Ring (if child exists i.e. capture) */}
            {highlight && children && (
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    border: '6px solid rgba(0, 0, 0, 0.15)',
                    borderRadius: '50%', // Optional: rounded piece shape or full square
                    pointerEvents: 'none',
                }} />
            )}
        </div>
    );
};

// Wrapper handling drop logic to keep BoardSquare clean(er)
const SquareWrapper: React.FC<Omit<BoardSquareProps, 'isOver' | 'canDrop'> & { onDrop: (item: { id: string; position: string }) => void }> = (props) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'PIECE',
        drop: (item: { id: string; position: string }) => props.onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    return (
        <div ref={drop as unknown as React.RefObject<HTMLDivElement>} style={{ width: '100%', height: '100%' }}>
            <BoardSquare {...props} isOver={isOver} canDrop={canDrop} />
        </div>
    )
}

const ChessBoard: React.FC<ChessBoardProps> = ({ game, onMove }) => {
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
        <div style={{
            width: '100%',
            maxWidth: '70vmin',
            aspectRatio: '1 / 1',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            border: '8px solid white', // Modern clean border
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden', // To clip corners
        }}>
            {ranks.map((rank, rankIndex) =>
                files.map((file, fileIndex) => {
                    const square = `${file}${rank}`;
                    const piece = board[rankIndex][fileIndex];
                    const isBlack = isBlackSquare(fileIndex, rankIndex);

                    return (
                        <SquareWrapper
                            key={square}
                            position={square}
                            isBlack={isBlack}
                            onDrop={(item) => handleDrop(item, square)}
                            highlight={validMoves.includes(square)}
                            lastMove={false}
                        >
                            {piece && <Piece
                                piece={piece}
                                position={square}
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
