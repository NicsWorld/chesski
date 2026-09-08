⚡ Bolt: Memoize legal moves to optimize drag performance

💡 What: Cached `game.moves()` into a memoized `Map` keyed by starting square based on `game.fen()`, rather than calling `game.moves({ square })` dynamically on every `onDragStart`.
🎯 Why: `game.moves()` evaluates the board state to generate pseudo-legal and legal moves. Calling it repetitively during UI interactions like dragging causes stutter. Precomputing and memoizing avoids redundant computation.
📊 Impact: Eliminates expensive `game.moves()` computation during `onDragStart`, providing smoother dragging UX.
🔬 Measurement: Verify by dragging pieces repeatedly and checking interaction latency. Run tests to ensure no regressions.
