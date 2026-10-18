## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2024-11-20 - [Memoizing ChessBoard squares]
**Learning:** In `chess.js`, `game.get(square)` returns newly instantiated objects on state updates, which breaks `React.memo` shallow equality when passed directly as props.
**Action:** Extract rendering into a memoized component, passing primitive values (e.g., `pieceType`, `pieceColor`) instead of the piece object to prevent unnecessary re-renders in `.map` loops, and use `useCallback` to maintain referential equality of event handlers.
