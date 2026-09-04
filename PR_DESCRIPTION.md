🧪 [testing improvement] Add invalid programmatic move test in Tutorial component

🎯 What:
Added a missing test case in `src/components/Tutorial.test.tsx` to cover the error path in `src/components/Tutorial.tsx:95` where an invalid programmatic move fails (and triggers the `try...catch` block).

📊 Coverage:
The new test covers the specific scenario where `game.move(move)` fails for programmatic reasons not related to chess.js standard validations. It now captures the output handled by the try...catch block ensuring safety when invalid moves are triggered.

✨ Result:
Improved test coverage and reliability of the Tutorial component by guaranteeing the UI does not crash gracefully resolving exceptions in programmatic moves.