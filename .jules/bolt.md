## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2025-01-01 - [Unnecessary game.fen() State Binding]
**Learning:** Calling `game.fen()` on every state update or initialization is computationally expensive and unnecessary when the serialized string isn't actively used for rendering.
**Action:** Avoid binding `game.fen()` to unused component state variables and remove redundant calls triggered on UI events when the `game` instance state itself is already sufficient.
