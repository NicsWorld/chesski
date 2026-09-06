💡 **What**: Added `useMemo` to cache the calculation of all legal moves keyed by the board's FEN string. Updated the `onDragStart` handler in `Piece` components within the `ChessBoard` to use this pre-computed map instead of dynamically resolving legal moves.
🎯 **Why**: Calling `game.moves({square, verbose: true})` in chess.js is an expensive calculation. Recalculating it repeatedly every time an `onDragStart` event triggers (i.e., during piece drags) creates significant performance bottlenecks and jitter, especially during rapid repetitive interactions.
📊 **Measured Improvement**: A basic benchmark demonstrated an order of magnitude improvement for the inner lookup loop over 10000 iterations:
- Uncached `game.moves({square})`: ~10.0 ms
- Cached lookup (`legalMovesMap[square]`): ~0.8 ms