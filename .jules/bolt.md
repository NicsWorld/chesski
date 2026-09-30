## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2026-09-30 - Prevent Piece Re-renders
**Learning:** `chess.js` `game.get(square)` creates a *new* object reference every time it is called, even if the piece hasn't changed. Passing this new object as a prop to a standard React component forces a re-render of all 32 pieces on the board every time the parent component (like `ChessBoard`) re-renders.
**Action:** When wrapping components in `React.memo` that receive `chess.js` piece objects, provide a custom equality function that explicitly compares the underlying primitive values (`prev.piece.type === next.piece.type` and `prev.piece.color === next.piece.color`).
