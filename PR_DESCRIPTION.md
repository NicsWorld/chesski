# 🧪 Add Test Coverage for Invalid Move Handling in App.tsx

🎯 **What:**
The testing gap addressed in this PR is the lack of test coverage for the `try-catch` block around `game.move(move)` in `src/App.tsx`. Specifically, this tests how the application handles invalid moves that cause `game.move` to throw an error (which is standard behavior in `chess.js` v1.0.0-beta.6+).

📊 **Coverage:**
The newly added test (`src/App.test.tsx`) simulates a user making an invalid move from the `ChessBoard`. It verifies that:
1. The error message "Oops! You can't move there." is displayed immediately.
2. After a 2000ms delay, the application correctly reverts the message back to the standard game evaluation status using `evaluateGameStatus(game)`. (This behavior is accurately tested using `vi.useFakeTimers()`).

✨ **Result:**
The improvement in test coverage gives us confidence in the application's stability and robustness when interacting with the chess logic. Refactoring or modifying `App.tsx` can now be done safely, knowing that the core error handling for user interactions is thoroughly covered and deterministic.