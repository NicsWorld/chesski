## 2024-11-19 - chess.js instance equality
**Learning:** `chess.js` `game.get(square)` returns a new object if the board state changes, breaking `React.memo` default shallow comparisons for piece objects.
**Action:** When memoizing piece components, extract the primitive fields (`type` and `color`) to pass as props, or use a custom equality function.
