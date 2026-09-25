## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2026-09-25 - [React.memo and map function]
**Learning:** Wrapping complex interactive elements rendered via `.map` within a parent component that has its own local state (like `validMoves` in `ChessBoard`) can result in massive unnecessary re-renders. Every interaction that updates the parent state forces a re-render of all mapped items. Using `React.memo` with a custom equality function is critical, but requires careful extraction of the mapped logic into its own component.
**Action:** When a parent component renders many interactive items via `map`, extract the item rendering logic into a separate `React.memo` component, provide a custom equality function for primitive values (like piece types), and strictly use `useCallback` for any event handlers passed down to avoid stale closures.
