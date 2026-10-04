## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.
## $(date +%Y-%m-%d) - [Extracting mapped components for memoization]
**Learning:** Extracting inline anonymous components created inside a `.map` render loop into dedicated `React.memo` wrapper components drastically reduces re-renders in large grids (like 64 chess squares).
**Action:** When extracting components from loops, explicitly avoid closing over the loop variable (e.g. `square`) in parent callbacks; instead, pass the primitive loop variable to the memoized wrapper and form the closure internally using `useCallback`.
