## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2024-09-19 - React.memo with external object references
**Learning:** External libraries (like `chess.js`) often return new object references on every lookup (e.g., `game.get(square)`). Passing these directly to child components defeats `React.memo`'s default shallow equality, causing unexpected re-renders.
**Action:** When memoizing components that accept objects generated dynamically by external libraries, provide a custom equality function to `React.memo` that explicitly compares the underlying primitive values (e.g., `prev.piece.type === next.piece.type`), while properly memoizing callbacks like `useCallback` in the parent.
