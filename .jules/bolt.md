## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2024-11-20 - react-dnd useEffect infinite loop
**Learning:** Triggering prop callbacks inside a useEffect dependent on react-dnd state (like isDragging) causes catastrophic re-render loops if the parent passes a new inline function.
**Action:** Use the item initialization function in useDrag to cleanly trigger drag start side-effects once, rather than reacting to state changes with useEffect.
