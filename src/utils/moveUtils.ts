export interface MovePair {
    white: string;
    black?: string;
}

/**
 * Groups a flat array of move notations into pairs of (White, Black).
 * If there is an odd number of moves, the last pair will have an undefined black move.
 */
export const groupMovesIntoPairs = (history: string[]): MovePair[] => {
    const movePairs: MovePair[] = [];
    for (let i = 0; i < history.length; i += 2) {
        movePairs.push({
            white: history[i],
            black: history[i + 1]
        });
    }
    return movePairs;
};
