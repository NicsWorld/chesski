import React, { useMemo } from 'react';
import { renderToString } from 'react-dom/server';

const history = Array.from({ length: 1000 }, (_, i) => `Move ${i}`);

const UnmemoizedMoveHistory = ({ history }) => {
    const movePairs = [];
    for (let i = 0; i < history.length; i += 2) {
        movePairs.push({
            white: history[i],
            black: history[i + 1]
        });
    }
    return React.createElement('div', null, movePairs.length);
};

const MemoizedMoveHistory = ({ history }) => {
    const movePairs = useMemo(() => {
        const pairs = [];
        for (let i = 0; i < history.length; i += 2) {
            pairs.push({
                white: history[i],
                black: history[i + 1]
            });
        }
        return pairs;
    }, [history]);
    return React.createElement('div', null, movePairs.length);
};

const ITERATIONS = 10000;

console.time('Unmemoized');
for (let i = 0; i < ITERATIONS; i++) {
    renderToString(React.createElement(UnmemoizedMoveHistory, { history }));
}
console.timeEnd('Unmemoized');

console.time('Memoized');
for (let i = 0; i < ITERATIONS; i++) {
    renderToString(React.createElement(MemoizedMoveHistory, { history }));
}
console.timeEnd('Memoized');
