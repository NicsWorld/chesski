## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2026-09-20 - [Optimize Array Includes with Set for Lookup]
**Learning:** Checking for elements in an array using `.includes()` is an O(N) operation which can become a performance bottleneck within rendering loops. Converting to a `Set` makes lookups O(1).
**Action:** Replace `string[]` arrays with `Set<string>` and use `.has()` for checking if an item exists within components that map over collections of items and perform lookups during rendering.
