## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2026-09-20 - Avoid Repeated Object Allocation in React Components
**Learning:** Allocating constant object dictionaries inside frequently called functions (like render functions or mapping callbacks) causes unnecessary allocations and garbage collection overhead, degrading performance.
**Action:** Always move static, constant objects and arrays outside of the component or render function scope so they are only allocated once.
