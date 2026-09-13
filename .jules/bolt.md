## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2025-02-14 - Optimize removeKings O(1) internal state lookup
**Learning:** `chess.js` internals contain `_kings` which stores 0x88 board positions for kings.
**Action:** Use internal state indexing coupled with 0x88 algebraic extraction to remove pieces instead of full O(N) iteration scanning over the whole board.
