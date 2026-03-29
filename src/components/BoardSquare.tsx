import React from 'react';
import { useDrop } from 'react-dnd';

export interface BoardSquareProps {
    position: string;
    isBlack: boolean;
    children?: React.ReactNode;
    onDrop: (item: { id: string; position: string }) => void;
    highlight: boolean;
    lastMove: boolean;
    isOver: boolean;
    canDrop: boolean;
}

export const BoardSquare: React.FC<BoardSquareProps> = ({ position, isBlack, children, highlight, isOver, canDrop }) => {
    // Determine background color based on state
    // Base color
    let backgroundColor = isBlack ? 'var(--color-board-black)' : 'var(--color-board-white)';

    // Hover state (Yellowish tint)
    if (isOver && canDrop) {
        backgroundColor = '#ffeaa7';
    }

    return (
        <div
            className="board-square-container"
            style={{ backgroundColor }}
        >
            {/* Coordinate Labels - Only show on edges */}
            {position.includes('1') && <span style={{ position: 'absolute', bottom: 4, right: 4, fontSize: '0.65em', fontWeight: 'bold', color: isBlack ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)' }}>{position[0]}</span>}
            {position.includes('a') && <span style={{ position: 'absolute', top: 4, left: 4, fontSize: '0.65em', fontWeight: 'bold', color: isBlack ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)' }}>{position[1]}</span>}

            {children}

            {/* Legal Move Highlight - Dot */}
            {highlight && !children && (
                <div className="legal-move-highlight" />
            )}

            {/* Legal Move Capture Highlight - Ring (if child exists i.e. capture) */}
            {highlight && children && (
                <div className="capture-highlight" />
            )}
        </div>
    );
};

// Wrapper handling drop logic to keep BoardSquare clean(er)
export const SquareWrapper: React.FC<Omit<BoardSquareProps, 'isOver' | 'canDrop'> & { onDrop: (item: { id: string; position: string }) => void }> = (props) => {
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
