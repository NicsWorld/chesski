Title: 🧪 Add error path test for invalid move in Tutorial.tsx

🎯 **What:**
Added a test to `src/components/Tutorial.test.tsx` to verify the error path in `Tutorial.tsx` when an invalid chess move is made. The `chess.js` library throws an error for invalid moves, and `Tutorial.tsx` includes a `try-catch` block inside its `handleMove` function to handle it. This test validates that mechanism.

📊 **Coverage:**
- Covers the `catch` block path in `Tutorial.tsx`'s `handleMove` function.
- Mocks `ChessBoard` to programmatically trigger an invalid move (e.g., pawn from 'a1' to 'a8').
- Ensures that the invalid move does not bubble up as an unhandled exception, thereby gracefully ignoring the bad interaction.

✨ **Result:**
Increased test coverage and confidence that edge-case user interactions (like dragging a piece to an invalid square in tutorial mode) will fail gracefully without breaking the application state.