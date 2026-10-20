## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2026-10-20 - [Memoize ChessBoard squares]
**Learning:** In `chess.js`, `game.get(square)` returns a newly instantiated object on each call. Passing this object directly to memoized child components causes object equality checks to fail, leading to unnecessary re-renders.
**Action:** Extract the rendering logic into a `React.memo` component and pass primitive piece properties (e.g., `piece?.type`, `piece?.color`) instead of the piece object to ensure shallow comparison prevents unnecessary re-renders.
