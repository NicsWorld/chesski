💡 What: Optimized `Piece` component to prevent unnecessary re-renders. Wrapped `Piece` with `React.memo` and a custom equality function comparing primitive piece properties (`type` and `color`). Updated `ChessBoard.tsx` to pass stable memoized callbacks (`useCallback`) to `Piece`.
🎯 Why: Previously, all 32 pieces would re-render whenever the board state updated, because `chess.js` generates new object references for pieces.
📊 Impact: Prevents O(N) re-renders of Piece components when a move is made, resulting in faster and smoother drag-and-drop gameplay.
🔬 Measurement: Play a game locally or run performance profiling in the browser to verify pieces only re-render when actually moving or being captured.
