## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2024-11-20 - [ChessBoard Re-render Optimization]
**Learning:** `ChessBoard` re-renders all 64 squares when `validMoves` state changes during drag operations, which is visually stuttery and expensive. Passing piece objects directly to `React.memo` wrapped components fails memoization because `game.get(square)` creates new object references on every call.
**Action:** Extract rendering of individual squares into a `React.memo` component, and only pass primitive values (like `piece?.type` and `piece?.color`) instead of the piece object to ensure shallow comparison prevents unnecessary re-renders. Reconstruct the piece object inside the memoized component.
