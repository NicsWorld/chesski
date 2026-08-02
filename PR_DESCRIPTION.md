# 🧪 [Testing Improvement: Add invalid move error path test]

## 🎯 What
Added an error path test in `src/App.test.tsx` to verify that when an invalid move is attempted, the `catch` block in `handleMove` executes correctly, updates the message to `'Oops! You can't move there.'`, and then reverts the message back to the appropriate turn status after 2 seconds.

## 📊 Coverage
This test covers:
* The error `catch` path in the `handleMove` function within `App.tsx` where `chess.js` rejects an invalid move (such as an illegal pawn double move from `e2` to `e5` in the starting position).
* Correct application of the UI error message.
* Proper timing and delayed message reset functionality using fake timers.

## ✨ Result
Improved test coverage for edge cases involving illegal moves and UI state transitions (the 2-second timeout warning messages) in the `App` component, ensuring more robust and well-tested behavior when interacting with the chess board.
