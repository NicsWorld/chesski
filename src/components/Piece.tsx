import React from 'react';
import { useDrag } from 'react-dnd';

interface PieceProps {
    piece: { type: string; color: 'w' | 'b' };
    position: string;
}

const Piece: React.FC<PieceProps & { onDragStart: () => void, onDragEnd: () => void }> = ({ piece, position, onDragStart, onDragEnd }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
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

    const getPieceImage = (type: string, color: 'w' | 'b') => {
        return `${color}${type.toUpperCase()}.svg`;
    };

    const imageName = getPieceImage(piece.type, piece.color);

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
                src={`/pieces/${imageName}`}
                alt={`${piece.color} ${piece.type}`}
                style={{
                    width: '90%',
                    height: '90%',
                    objectFit: 'contain'
                }}
            />
        </div>
    );
};

export default Piece;
