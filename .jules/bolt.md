## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.


## 2024-11-20 - [chess.js game.moves() Performance]
**Learning:** In `chess.js` (v1.x), calling `game.moves({ square: square, verbose: true })` inside tight rendering functions or repetitive UI callbacks (like drag events) is computationally expensive, especially when recalculating frequently. Additionally, `game.board()` vs `game.get()` findings from previous logs were inaccurate, as `game.get()` is actually O(1) and very fast, while `game.board()` forces array generation.
**Action:** When determining legal moves for UI interactions across the board, compute `game.moves({ verbose: true })` once, cache the legal move destinations mapped by starting square, and memoize this mapping using `useMemo` keyed by `game.fen()` to avoid recalculating legal moves redundantly on drag start events.