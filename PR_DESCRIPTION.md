# 🧹 [Code Health] Refactor removeKings for efficient board evaluation

## 🎯 What
Refactored the `removeKings` function in `src/components/Tutorial.tsx` to use the `SQUARES` constant from `chess.js` instead of dynamically generating and iterating over a 2D array representation of the entire board.

## 💡 Why
The previous implementation called `game.board()`, which creates an expensive 2D array, and then used a nested loop to traverse all 64 squares. By directly iterating over the exported `SQUARES` constant and utilizing `game.get(square)`, the new approach completely avoids the overhead of generating the 2D board array, resulting in a cleaner and more efficient implementation that directly leverages the `chess.js` API.

## ✅ Verification
- Analyzed the `chess.js` source code (v1.4.0) to identify the `SQUARES` constant and the `.get()` method.
- Verified the code locally using an ad-hoc Node.js script.
- Executed `npm run lint` and `tsc -b` to ensure no typing or formatting issues were introduced.
- Ran the full test suite via `npx vitest run`, which passed successfully, confirming the domain logic remains intact.

## ✨ Result
The `removeKings` function is now more efficient, readable, and properly utilizes the `chess.js` API without unnecessary performance overhead or redundant board array generation.