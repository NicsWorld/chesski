## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2024-05-20 - [Memoizing list items with React elements as children]
**Learning:** Passing instantiated React elements as `children` to a `React.memo` component breaks memoization because the `children` prop gets a new reference on every render. Additionally, `chess.js`'s `game.get()` returns new object instances, breaking shallow equality.
**Action:** Extract list item logic into a separate memoized component, pass primitive values instead of objects, and render children internally rather than passing them as props.
