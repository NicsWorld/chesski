🧪 [testing improvement] Add missing error path test for invalid moves in Tutorial component

🎯 **What:**
The `Tutorial` component lacked testing for its error handling path during invalid programmatic moves (when `chess.js` throws an error).

📊 **Coverage:**
Added a test suite for `src/components/Tutorial.tsx` that mocks `ChessBoard` to trigger an invalid move (`from: a1`, `to: a8`). This verifies that the `try...catch` block gracefully catches the exception thrown by `chess.js` and does not propagate the error or crash the application.

✨ **Result:**
Test coverage for the `Tutorial` component has increased, properly asserting the graceful handling of the error boundary for invalid moves.
