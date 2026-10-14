## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2024-10-14 - Memoizing ChessBoard squares with piece primitives
**Learning:** In `chess.js`, `game.get(square)` can return a newly instantiated object across calls, breaking shallow equality in `React.memo`. Additionally, passing `children` into a memoized component breaks memoization because the `children` prop gets a new reference on every render.
**Action:** Extract list item rendering into a separate `React.memo` component. Pass primitive properties (like `piece?.type`, `piece?.color`) instead of objects, and render child components internally rather than passing them as `children`.
