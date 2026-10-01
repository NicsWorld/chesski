## 2024-11-20 - [chess.js game.board() Performance]
**Learning:** Calling `game.board()` in `chess.js` is computationally expensive because it dynamically generates a 2D array representation of the board state.
**Action:** Replace `game.board()` with iteration over the `SQUARES` constant and use `game.get(square)` to lookup pieces efficiently, especially in tight loops like rendering `ChessBoard`, rendering `CapturedPieces`, or parsing board state in `Tutorial`.

## 2026-10-01 - [React.memo and Stale Closures]
**Learning:** Using `React.memo` with a custom equality function that deliberately ignores callback props to force memoization (when those callbacks rely on un-memoized closure state) creates a severe stale closure risk.
**Action:** When extracting components in `.map` loops for memoization, pass minimal primitive values and create the closures *inside* the memoized wrapper, or structure the component to avoid closing over loop variables in callbacks.
