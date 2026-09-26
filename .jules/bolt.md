## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2026-09-26 - Memoize Chessboard Rendering
**Learning:** React state updates trigger full re-renders, making nested `.map` item lists expensive without memoization. In `chess.js` grids, a single move re-renders all 64 squares since `game.get(square)` creates new piece object references.
**Action:** Always extract inner loop items into a `<MemoizedComponent>` and implement a custom equality function `(prev, next)` that compares inner primitive values (like `piece.type`) instead of accepting shallow object inequality.
