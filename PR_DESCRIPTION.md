🧪 Add tests for evaluateGameStatus utility

🎯 **What:**
Added comprehensive unit tests for the `evaluateGameStatus` utility function in `src/utils/gameStatus.ts`, which previously had no test coverage.

📊 **Coverage:**
The new tests cover all possible game states evaluated by the utility:
- Checkmate (both Black and White winning scenarios)
- Draw conditions
- Check conditions
- Normal ongoing turns (for both White and Black)

✨ **Result:**
Improved test coverage and reliability for game state evaluation logic. By mocking `Chess` instance methods, the tests are simple, isolated, and deterministic.
