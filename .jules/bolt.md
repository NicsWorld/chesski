## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2024-05-24 - React.memo on mapped elements with dynamic children
**Learning:** Using `React.memo` on list components mapped within a parent is easily defeated if the child components accept dynamically instantiated objects (like `chess.js` pieces) or newly created React elements (via `children`). This causes complete re-renders of large lists (e.g., a 64-square chessboard) during minor state changes like dragging.
**Action:** Extract the complex item into a memoized component. Instead of passing non-primitive objects, pass primitive properties (e.g., `piece?.type`, `piece?.color`). Additionally, avoid inline `children` elements by keeping the child render logic inside the memoized wrapper, allowing shallow comparison to succeed and prevent unnecessary re-renders.
