## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## 2026-09-24 - Memoize Board Squares
**Learning:** Re-rendering a 64-square chessboard with 32 drag-and-drop pieces inside a single parent component can cause significant performance overhead during state changes like highlighting valid moves.
**Action:** Extract the individual square rendering logic into a `React.memo` wrapped component to prevent unnecessary re-renders of unmodified squares when the parent state changes. Apply custom equality check to handle `chess.js` `Piece` objects properly and avoid unneeded allocations.
