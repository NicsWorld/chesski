## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2026-09-23 - Memoize ChessBoard and useCallback for handleMove
**Learning:** Component `ChessBoard` re-renders every time `App` component state updates (e.g. message state changes on move errors) because `handleMove` function is not memoized and causes `React.memo` to be bypassed if it was applied.
**Action:** Use `React.memo` on the complex component and ensure any callbacks passed as props are wrapped in `useCallback` to prevent unnecessary re-renders.
