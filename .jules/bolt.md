## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## $(date +%Y-%m-%d) - Memoize array mapping in render
**Learning:** Performing O(N) array transformations (like grouping) during the render cycle of frequently updated components adds noticeable overhead and garbage collection pressure, especially for large lists.
**Action:** Always wrap expensive or O(N) array transformations directly inside a `useMemo` hook, using only the input data as the dependency, to ensure the work is only done when the underlying data actually changes.
