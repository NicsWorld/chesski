import React from 'react';
import { useDrag } from 'react-dnd';
import { getPieceAsset } from '../utils/pieceAssets';

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

    const { src, styleOverrides } = getPieceAsset(pieceTheme, piece);

    return (
        <div
            className="piece-container"
            ref={drag as unknown as React.RefObject<HTMLDivElement>}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <img
                ref={preview as unknown as React.RefObject<HTMLImageElement>}
                src={src}
                alt={`${piece.color} ${piece.type}`}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    ...styleOverrides
                }}
            />
        </div>
    );
};

export default Piece;
