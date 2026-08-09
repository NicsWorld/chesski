# 🧪 Add Unit Tests for Tutorial Component

## 🎯 What
The `Tutorial` component (`src/components/Tutorial.tsx`) lacked unit tests. It manages internal state such as the active tutorial and the current `chess.js` game instance, and passes custom logic down to the `ChessBoard`.

## 📊 Coverage
Added a new test file `src/components/Tutorial.test.tsx` that covers:
*   Rendering the default tutorial (Pawn) correctly.
*   Simulating clicking tutorial buttons to change the active tutorial (e.g., clicking "Knight").
*   Handling valid moves correctly and updating the internal board state.
*   Gracefully catching and ignoring invalid moves.
*   Resetting the position using the "Reset Position" button.
*   Testing the `shouldHidePiece` prop logic passed to the board to verify it dynamically hides kings according to tutorial requirements.

## ✨ Result
The component is now comprehensively tested without relying on complex drag-and-drop implementations by mocking the child `ChessBoard` component, allowing safe future refactoring of tutorial presentation and state logic. Test suite passes with 8 assertions covering 7 unique scenarios.