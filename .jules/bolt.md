## 2023-10-25 - ChessBoard Rendering Optimization
**Learning:** React components that render large grids (like a 64-square chessboard) recalculate their layouts on every parent re-render unless explicitly memoized. This causes unnecessary CPU overhead.
**Action:** Use `useMemo` on computationally heavy array mappings inside render functions, especially for UI grids, ensuring the dependency array includes all variables that dictate the output state (e.g., game state, active moves).
