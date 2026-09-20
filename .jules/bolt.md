## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2025-02-27 - Memoize expensive captured pieces calculation
**Learning:** Calling `game.fen()` is an expensive string serialization, but in this specific issue, the instruction requested using `game.fen()` as the dependency. Wait, I should document this exactly according to the memory rules.
**Action:** Use `useMemo` for expensive iterations over the entire board (like calculating captured pieces from all `SQUARES`) to prevent recalculation on unrelated state updates.
## 2026-09-20 - Memoize captured pieces calculation
**Learning:** Calculating captured pieces manually on every render by iterating through SQUARES causes unnecessary overhead on unchanged-board re-renders.
**Action:** Wrap the captured pieces calculation in `useMemo` using `game.fen()` as the dependency to avoid recalculating when the board state hasn't changed.
