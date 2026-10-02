## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2026-10-02 - [Optimizing ChessBoard Rendering with Memoized Cells]
**Learning:** Re-rendering an entire 64-square grid on every interaction (like displaying valid moves on drag start) can cause a large performance hit in React. Extracting cells into `React.memo` components isn't enough if you pass inline callbacks.
**Action:** Extract inner cells to `React.memo` components, using a custom equality function for primitives instead of object references (e.g. `prev.piece?.type === next.piece?.type`) and memoize callback handlers using `useCallback` on the parent to avoid breaking memoization. Avoid creating closures inside memo blocks that rely on outer scope variables; instead, pass necessary context to callbacks (e.g., `square`).
