# 🧪 Add tests for evaluateGameStatus

## 🎯 What
This PR adds comprehensive unit tests for `evaluateGameStatus` located in `src/utils/gameStatus.ts`. Previously, this utility function lacked tests despite having clear and straightforward behavior based on `Chess` states.

## 📊 Coverage
The new tests cover all branches within `evaluateGameStatus`, specifically testing:
- **Checkmate (White wins)**
- **Checkmate (Black wins)**
- **Draw**
- **Check**
- **White's regular turn**
- **Black's regular turn**

These scenarios are achieved by effectively mocking the `chess.js` object properties.

## ✨ Result
The codebase is now significantly safer for future refactors, with exhaustive coverage of the game status evaluation logic.
