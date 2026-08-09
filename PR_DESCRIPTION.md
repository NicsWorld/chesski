# 🧪 [App.tsx] Add testing for invalid move error message and auto-reset

## 🎯 What
The `App` component previously lacked test coverage for how it handles an invalid move (where `game.move()` throws an exception). Specifically, it wasn't verifying that the game displays the error message `"Oops! You can't move there."` and then reverts to the standard game status message after 2000 milliseconds via a `setTimeout`.

## 📊 Coverage
The new test in `src/App.test.tsx` addresses this gap by:
1. Simulating an invalid move (e.g., trying to move from `e2` to `e5` as white's first move).
2. Verifying the temporary `"Oops! You can't move there."` message renders in the DOM.
3. Using `vi.useFakeTimers()` to fast-forward exactly 2000ms.
4. Verifying that the application correctly resets the state to the default status string for a new game.

## ✨ Result
The testing logic surrounding the `try...catch` block in the `handleMove` function is now fully covered, ensuring no future refactoring unintentionally breaks the user-facing error feedback loop in `App.tsx`.
