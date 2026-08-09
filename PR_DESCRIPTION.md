# 🧪 [Add unit tests for evaluateGameStatus]

## 🎯 What
The `evaluateGameStatus` utility function in `src/utils/gameStatus.ts` lacked test coverage. This PR adds a comprehensive unit test suite in `src/utils/gameStatus.test.ts` to ensure its core domain logic works correctly and safely.

## 📊 Coverage
The new tests create a mock `Chess` instance using Vitest and `vi.fn()` to verify all string return branches for the function:
- Checkmate handling (for both White winning and Black winning scenarios).
- Draw handling.
- Check state warnings.
- Normal turn handling (for both White and Black turns).

## ✨ Result
Test coverage for `evaluateGameStatus` is now fully complete (100% of branches tested). This improves the overall reliability of the application's game state reporting and allows for confident refactoring in the future.
