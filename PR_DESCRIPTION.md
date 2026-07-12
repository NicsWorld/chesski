## 🧪 [testing improvement] Add test for invalid FEN URL fallback in App component

🎯 **What:**
The application supports sharing and loading game states via URL parameters (e.g. `?fen=...`). However, the scenario where the provided FEN string is malformed or invalid was lacking test coverage. This PR introduces a unit test that verifies the application gracefully handles an invalid FEN parameter by rendering the game view using the default initial board state and logging an appropriate error.

📊 **Coverage:**
- Configured Vitest and testing-library for unit tests in this project.
- Added a test file `src/App.test.tsx` focused on component initialization.
- Mocks `window.location` to simulate navigating to an invalid FEN string in the URL.
- Spies on `console.error` to ensure the `"Invalid FEN in URL"` error is properly captured without interrupting execution.
- Asserts that the game view (`ChessBoard`) is successfully rendered as a fallback.

✨ **Result:**
The test suite now guarantees that invalid FEN string URL arguments will not crash the application during the initialization of the `App` component, ensuring the `catch` block correctly defaults to the standard starting chessboard.
