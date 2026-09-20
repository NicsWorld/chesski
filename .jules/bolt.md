## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2026-09-20 - Optimize string concatenation in Tutorial component
**Learning:** String concatenation in a tight loop inside `addKingsToFen` creates excess memory allocations and degrades performance in the React render cycle.
**Action:** Use an array to collect string parts and call `.join('')` at the end to minimize memory allocations.
