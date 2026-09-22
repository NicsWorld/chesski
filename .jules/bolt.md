## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2024-11-20 - [React.memo in ChessBoard Pieces]
**Learning:** React components inside a .map loop re-render automatically when the parent re-renders. For the 32 `Piece` components, rendering causes noticeable performance degradation because inline callbacks and freshly generated `piece` objects (`game.get(square)`) break default shallow comparison.
**Action:** Use `React.memo` with a custom equality function on `Piece` and explicitly wrap event handlers in the parent `ChessBoard` component with `useCallback` to prevent unnecessary re-renders of the entire board.
