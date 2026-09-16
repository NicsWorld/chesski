## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2026-09-16 - [React Render Optimization for CapturedPieces]
**Learning:** Calculating derived state from the `chess.js` game (like finding captured pieces by iterating all squares) during the React render cycle can cause redundant O(N) overhead if not memoized.
**Action:** Use `useMemo` keyed by a serialized game state like `game.fen()` to cache the expensive board derivation logic and prevent it from running on renders where the board hasn't changed.
