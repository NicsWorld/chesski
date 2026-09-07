## Title: 🧪 [testing improvement] Add component tests for ChessBoard

🎯 **What:**
Added a test suite for `ChessBoard.tsx` to verify drag and drop logic, move highlights, and board rendering since it had no coverage.

📊 **Coverage:**
- Rendering of the 64-square grid and proper piece placement based on FEN.
- Highlights rendering when a piece is dragged showing legal moves.
- `onMove` callback triggering correctly when a piece is dropped on a square.
- Highlights clearing correctly after dropping or dragging ends.
- Piece theme passing to child pieces correctly.

✨ **Result:**
Significant improvement in component-level test coverage. Ensures drag, drop, and visual indicators remain functional during refactoring.
