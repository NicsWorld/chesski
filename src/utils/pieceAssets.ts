export const getPieceAsset = (pieceTheme: 'zoo' | 'standard', piece: { type: string; color: string }) => {
    let src = '';
    let styleOverrides: React.CSSProperties = {};

    if (pieceTheme === 'standard') {
        src = `/pieces/${piece.color}${piece.type.toUpperCase()}.svg`;
    } else {
        // Zoo theme
        src = `/pieces/animal_w${piece.type.toUpperCase()}.png`;
        if (piece.color === 'b') {
            styleOverrides = { filter: 'brightness(0.4) contrast(1.2)' };
        }
    }

    return { src, styleOverrides };
};
