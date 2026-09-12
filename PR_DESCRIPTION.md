⚡ Bolt: Remove unnecessary game.fen() calls in Tutorial

💡 What: Removed the unused `setFen` state and its associated `game.fen()` calls in `Tutorial.tsx`.
🎯 Why: The `game.fen()` function in `chess.js` is notoriously computationally expensive because it serializes the entire board state to a string. It was being called on initial render and after every move or tutorial switch, but the result was never used (`_`).
📊 Impact: Eliminates expensive string serialization on every interaction in the Tutorial view, leading to faster re-renders and lower CPU usage.
🔬 Measurement: Check the React DevTools profiler or manually observe lower CPU usage during move interactions in the Tutorial view.
