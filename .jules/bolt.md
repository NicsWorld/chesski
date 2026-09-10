## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2024-11-20 - [FEN Serialization in React State]
**Learning:** Calling `game.fen()` as the initial state of a `useState` hook without a lazy initializer (e.g., `useState(game.fen())` instead of `useState(() => game.fen())`) forces expensive FEN string serialization on every single component re-render, even though the state is only used once during initialization.
**Action:** When FEN serialization is required in React components, either use a lazy initializer `useState(() => game.fen())`, memoize it, or remove it entirely if the string is unused (e.g., when the `Chess` instance itself is already driving state updates).
