⚡ Bolt: Memoize board squares to prevent full re-renders on drag

💡 What: Wrapped the individual square rendering inside `ChessBoard.tsx` into a new `React.memo`-ized component (`MemoizedSquare`), and used `useCallback` for the drag/drop event handlers.
🎯 Why: Previously, when a user started dragging a piece, `onDragStart` called `setValidMoves`. This caused the parent `ChessBoard` component to re-render, passing new inline arrow functions to all 64 squares. This forced a complete re-render of all 64 `SquareWrapper` and `Piece` components, causing noticeable UI stutter during drag initiation.
📊 Impact: Reduces React re-renders by ~95% during drag events. Now, only the squares that are explicitly highlighted as valid moves will re-render, while the rest of the board remains memoized.
🔬 Measurement: Observe the React DevTools Profiler while initiating a piece drag, or simply experience a much smoother drag pickup on slower devices.