## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2026-09-20 - Optimize Piece rendering with React.memo
**Learning:** The `chess.js` library returns new piece objects (`{ type, color }`) on every `game.get()` or `game.board()` call. Without a custom equality function comparing primitive properties (`type`, `color`), `React.memo` will fail to prevent re-renders because object references always change.
**Action:** When memoizing components that receive dynamically generated objects from external libraries, implement a custom equality function to compare the underlying values rather than relying on shallow object equality. Also wrap callback handlers with `useCallback`.
