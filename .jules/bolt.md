## 2024-09-13 - Memoize CapturedPieces Iteration
**Learning:** Caching board-level piece iteration using `useMemo` keyed by `game.fen()` significantly reduces redundant calculations during repetitive component re-renders.
**Action:** When calculating derived state from a chess game in a React component, use `useMemo` dependent on a serialized state like FEN rather than recalculating from scratch on every render cycle.
