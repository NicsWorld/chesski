## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2024-11-20 - [Optimizing Lists/Grids with React.memo]
**Learning:** Passing newly instantiated React elements or objects via `children` to `React.memo` components, or using complex objects instead of primitives, breaks memoization as the reference changes every render.
**Action:** Extract components into a separate memoized wrapper, pass primitive props, and instantiate child components internally. Use `useCallback` for functions passed down.
