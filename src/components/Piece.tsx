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
    }), [position, onDragEnd]);

    React.useEffect(() => {
        if (isDragging) {
            onDragStart();
        }
    }, [isDragging, onDragStart]);

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const getPieceImage = (type: string, _color: 'w' | 'b') => {
        // Mapping piece types to our generated assets
        // Note: We are using White assets for both colors due to generation limits,
        // and will apply a filter for Black pieces.
        const assetMap: Record<string, string> = {
            p: 'white_pawn_bunny_1768881855454.png',
            r: 'white_rook_elephant_1768881868335.png',
            n: 'white_knight_pony_1768881881861.png',
            b: 'white_bishop_penguin_1768881900954.png', // Using penguin for bishop
            q: 'white_queen_cat_1768881913119.png',
            k: 'white_king_dog_1768881925672.png',
        };

        // Construct path. Note: In Vite, assets in src/assets/pieces should be imported or URL'd.
        // For simplicity efficiently, we will assume they are served correctly.
        // Ideally we import them, but for dynamic mapping, we might need a different approach.
        // Let's use a direct import map in a separate file or just switch to importing them here if list is small.
        return assetMap[type];
    };

    const imageName = getPieceImage(piece.type, piece.color);

    // We need to resolve the path. Since these are in artifacts, I need to copy them to src/assets
    // OR standard approach: import them. 
    // Let's rely on a helper to get the URL. For now, I'll assume they are in `public/pieces` or imported.
    // actually, the user sees them in artifacts. I should COPY them to `public/pieces` so they are accessible by URL.

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
                    objectFit: 'contain',
                    // Filter for black pieces to make them look "dark"
                    filter: piece.color === 'b' ? 'grayscale(100%) brightness(50%) sepia(20%) hue-rotate(180deg) saturate(200%)' : 'none'
                }}
            />
        </div>
    );
};

export default Piece;
