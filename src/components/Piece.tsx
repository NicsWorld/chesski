import React from 'react';
import { useDrag } from 'react-dnd';

interface PieceProps {
    piece: { type: string; color: 'w' | 'b' };
    position: string;
    pieceTheme: 'zoo' | 'standard';
}

const Piece: React.FC<PieceProps & { onDragStart: () => void, onDragEnd: () => void }> = ({ piece, position, pieceTheme, onDragStart, onDragEnd }) => {
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
        if (pieceTheme === 'standard') {
            return `${piece.color}${piece.type.toUpperCase()}.svg`;
        }
        // Zoo theme
        if (piece.color === 'w') {
            return `animal_w${piece.type.toUpperCase()}.png`;
        } else {
            // Black pieces
            // Fallback for Knight (N) which is missing transparent asset currently
            if (piece.type === 'n') {
                return `animal_w${piece.type.toUpperCase()}.png`;
            }
            return `animal_b${piece.type.toUpperCase()}.png`;
        }
    };

    const imageName = getPieceImage();

    // Special logic for the pending Black Knight which uses the white asset + filter
    const isFallbackBlackKnight = pieceTheme === 'zoo' && piece.color === 'b' && piece.type === 'n';

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
                alt={`${piece.color} ${piece.type}`}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    // Only apply filter to the fallback Black Knight
                    filter: isFallbackBlackKnight ? 'brightness(0.4) contrast(1.2)' : undefined
                }}
            />
        </div>
    );
};

export default Piece;
