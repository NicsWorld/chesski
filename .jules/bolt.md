## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2025-02-27 - [React.memo on heavily rendered array items]
**Learning:** `Piece.tsx` is rendered 32 times on the board. When `isDragging` starts, or when `ChessBoard` state updates valid moves (which updates hover states `canDrop`), all 32 pieces might unnecessarily re-render even if their `piece` and `position` are unchanged.
**Action:** Wrap list item components like `Piece` in `React.memo` to prevent O(N) rendering passes during high-frequency events like drag-and-drop.
