## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2026-09-07 - Optimize ChessBoard Rendering
**Learning:** Calling `game.get(square)` individually within a nested loop of 64 squares triggers slow FEN parsing/validation repeatedly, whereas calling `game.board()` once and memoizing its 2D array output is significantly faster per re-render.
**Action:** When rendering grid-based UI for chess.js, prefer computing and memoizing the bulk state via `game.board()` (keyed by `game.fen()`) rather than querying individual squares inside tight rendering loops.
