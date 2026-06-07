import { useState } from 'react';
import { Chess } from 'chess.js';
import { useDrop } from 'react-dnd';
import Piece from './Piece';

interface ChessBoardProps {
    game: Chess;
    onMove: (move: { from: string; to: string; promotion?: string }) => void;
    shouldHidePiece?: (piece: { type: string; color: string }) => boolean;
    pieceTheme: 'zoo' | 'standard';
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
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.05)', /* Subtle inner shadow for depth */
                border: '1px solid rgba(0,0,0,0.02)', /* Give each square slight definition */
                boxSizing: 'border-box',
            }}
        >
            {/* Inner bevel effect to make squares look like distinct tiles */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                boxShadow: isBlack ? 'inset 2px 2px 4px rgba(255,255,255,0.1), inset -2px -2px 4px rgba(0,0,0,0.1)' : 'inset 2px 2px 4px rgba(255,255,255,0.5), inset -2px -2px 4px rgba(0,0,0,0.05)',
                pointerEvents: 'none'
            }} />

            {/* Coordinate Labels - Only show on edges */}
            {position.includes('1') && <span style={{ position: 'absolute', bottom: 4, right: 4, fontSize: '0.7em', fontWeight: '900', color: isBlack ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.4)', zIndex: 1 }}>{position[0]}</span>}
            {position.includes('a') && <span style={{ position: 'absolute', top: 4, left: 4, fontSize: '0.7em', fontWeight: '900', color: isBlack ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.4)', zIndex: 1 }}>{position[1]}</span>}

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

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

// Wrapper handling drop logic to keep BoardSquare clean(er)
const SquareWrapper: React.FC<Omit<BoardSquareProps, 'isOver' | 'canDrop'> & { onDrop: (item: { id: string; position: string }) => void }> = (props) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'PIECE',
        drop: (item: { id: string; position: string }) => props.onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }), [props.onDrop]);

    return (
        <div ref={drop as unknown as React.RefObject<HTMLDivElement>} style={{ width: '100%', height: '100%' }} data-testid={props.position}>
            <BoardSquare {...props} isOver={isOver} canDrop={canDrop} />
        </div>
    )
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

    const validMovesSet = new Set(validMoves);

    return (
        <div style={{
            width: '100%',
            maxWidth: '70vmin',
            aspectRatio: '1 / 1',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            border: '12px solid var(--board-border-color)', // Thicker, toy-like border
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 12px 0 var(--board-shadow-color), 0 16px 24px rgba(0,0,0,0.2)', // Heavy 3D "lip" and drop shadow
            overflow: 'hidden', // To clip corners
            transform: 'translateY(-6px)', // Lift it up so the shadow has room
        }}>
            {RANKS.map((rank, rankIndex) =>
                FILES.map((file, fileIndex) => {
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
                            highlight={validMovesSet.has(square)}
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
