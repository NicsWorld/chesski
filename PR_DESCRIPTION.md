# 🧪 [testing improvement] Add Tutorial component test coverage

🎯 **What:**
Added a missing test file `src/components/Tutorial.test.tsx` to provide proper test coverage for the `Tutorial` component, which has complex internal state.

📊 **Coverage:**
The new tests cover:
- Initial default rendering of the Pawn tutorial.
- State transitions when different tutorials are selected via user interactions.
- Board resets to the initial tutorial state.
- Graceful handling (ignoring) of invalid moves by mocking the `ChessBoard` component's `onMove` callback.
- Auxiliary piece rendering logic by verifying the output of the `shouldHidePiece` function passed to `ChessBoard`.

✨ **Result:**
Increased test coverage and confidence in refactoring the `Tutorial` component, ensuring the complex sequence of steps and state updates function correctly without regressions.