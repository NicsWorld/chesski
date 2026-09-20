## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2026-09-20 - Memoize Move History Array Grouping
**Learning:** Reconstructing the linear history array into pairs on every single render cycle of the `MoveHistory` component creates unnecessary calculations when the `history` prop itself hasn't changed.
**Action:** When grouping or transforming props for display (like formatting a linear array into pairs), always wrap the transformation logic in a `useMemo` hook, using the original prop as the dependency to ensure the calculation only runs when the underlying data changes.
