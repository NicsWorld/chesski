💡 What: Wrapped the `Piece` component in `React.memo` to prevent unnecessary re-renders.
🎯 Why: The chess board renders 32 `Piece` components. During drag-and-drop interactions, updating the board's valid move state or hover state causes the entire board and all 32 pieces to re-render, creating a performance bottleneck (high CPU usage during rendering). `React.memo` ensures pieces only re-render if their position or underlying state changes.
📊 Impact: Significantly reduces React rendering workload during drag-and-drop operations, leading to smoother UI interactions.
🔬 Measurement: Reduced overall component render count; pieces not involved in a drag operation bypass rendering entirely.
