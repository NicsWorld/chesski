# 🧪 [testing improvement] Add unit tests for evaluateGameStatus

## 🎯 What
The `evaluateGameStatus` utility function in `src/utils/gameStatus.ts` lacked test coverage. This function takes a `Chess` instance and returns a string indicating the current status of the game (e.g., Checkmate, Draw, Check, or whose turn it is). We added a comprehensive suite of unit tests for this utility using `vitest` and mocked the `Chess` instance to test all conditional branches.

## 📊 Coverage
The new tests cover all scenarios by mocking the boolean returns of the `Chess` object state check methods.
The following scenarios are now covered:
- Game is in Checkmate and it was White's turn (Black wins)
- Game is in Checkmate and it was Black's turn (White wins)
- Game is a Draw
- Game is in Check
- Game is ongoing and it is White's turn
- Game is ongoing and it is Black's turn

## ✨ Result
Test coverage for `evaluateGameStatus` has been increased to 100%, and the function will reliably format status strings. This ensures that any refactoring of game status conditions will be caught if it breaks expected game states.
