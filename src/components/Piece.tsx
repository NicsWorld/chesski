import React from 'react';
import { useDrag } from 'react-dnd';

interface PieceProps {
    piece: { type: string; color: 'w' | 'b' };
    position: string;
    pieceTheme: 'zoo' | 'standard';
}

const Piece: React.FC<PieceProps & { onDragStart: () => void, onDragEnd: () => void }> = ({ piece, position, onDragStart, onDragEnd }) => {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'PIECE',
        item: { id: `${piece.color}${piece.type}`, position },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: () => {
            onDragEnd();
        }
    }), [position, piece, onDragEnd]);

    React.useEffect(() => {
        if (isDragging) {
            onDragStart();
        }
    }, [isDragging, onDragStart]);

    const getPieceImage = () => {
        return `${piece.color}${piece.type.toUpperCase()}.svg`;
    };

    const imageName = getPieceImage();
    const pieceNames: Record<string, string> = { p: 'Pawn', n: 'Knight', b: 'Bishop', r: 'Rook', q: 'Queen', k: 'King' };
    const altText = `${piece.color === 'w' ? 'White' : 'Black'} ${pieceNames[piece.type]}`;

    return (
        <div
            ref={drag as unknown as React.RefObject<HTMLDivElement>}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img
                ref={preview as unknown as React.RefObject<HTMLImageElement>}
                src={`/pieces/${imageName}`}
                alt={altText}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                }}
            />
        </div>
    );
};

export default Piece;
