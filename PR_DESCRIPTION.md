⚡ Bolt: Optimize FEN string manipulation and avoid React state serialization overhead

💡 What
- Replaced slow `split` and `map` logic in `addKingsToFen` with optimized regex `.replace()` operations.
- Removed unused `useState(game.fen())` anti-pattern from `Tutorial.tsx`.

🎯 Why
- `addKingsToFen` previously relied on heavy string splitting and array mapping, which is inefficient.
- Calling `game.fen()` directly inside the React render cycle (un-lazily) forces the `chess.js` engine to perform computationally expensive string serialization on every re-render, degrading component performance.

📊 Impact
- Reduces execution time of `addKingsToFen` and avoids an unnecessary O(N) serialization cost on every render of the `Tutorial` component, significantly improving rendering speed when interacting with the tutorial board.

🔬 Measurement
- Measure `addKingsToFen` speed with a benchmark script. Profiling React renders will show `game.fen()` is no longer invoked repeatedly upon DOM updates in the `Tutorial` component.
