# Chesski Actionable Feature Ideas

Here are 5 high-value, well-scoped feature suggestions based on recent development context (like accessibility improvements, performance optimizations, and CSP setup) and the current state of the codebase. These lean heavily on existing UI patterns and infrastructure.

### 1. Show Captured Pieces
- **Repo:** chesski
- **Area / surface:** Game Info Panel
- **Relevant file(s):** `src/App.tsx`, `src/components/CapturedPieces.tsx` (new)
- **What the gap looks like today:** The `App.tsx` file has a commented-out section `<!-- <div className="captured-area">...</div> -->`. Players cannot easily see material advantage during a game.
- **The specific feature:** Create a new `CapturedPieces` component that takes the current `game.history({ verbose: true })` or calculates captured pieces by comparing the current FEN against the starting position. Render small SVGs (re-using standard theme assets) of captured pieces grouped by color.
- **Why this is a good small, focused task:** It fulfills a standard chess application expectation and fills an explicitly marked gap in the UI. It relies entirely on the already-present `chess.js` game state without any new external dependencies.
- **Expected user impact:** Users can quickly assess who is winning based on material, reducing cognitive load.
- **Effort level:** `medium`
- **Why it is a good fit:** I can leverage my recent experience with accessibility (Palette) to ensure these captured pieces have proper ARIA labels, and my component memoization experience (Bolt) to ensure it only re-renders when material changes.

### 2. "Copy PGN" Button
- **Repo:** chesski
- **Area / surface:** Game Info Panel / Action Buttons
- **Relevant file(s):** `src/App.tsx`
- **What the gap looks like today:** We have a "Share Game" button that copies the FEN URL. We don't have a way to export the full move history for analysis in external tools like Lichess or Chess.com.
- **The specific feature:** Add an "Export PGN" button next to "Share Game". It should call `game.pgn()` and use `navigator.clipboard.writeText()` to copy it to the clipboard, utilizing the same temporary success message pattern as "Share Game".
- **Why this is a good small, focused task:** It's practically a one-liner API call from `chess.js` (`game.pgn()`) wired up to an existing clipboard utility pattern.
- **Expected user impact:** Power users can easily analyze their completed games elsewhere, increasing retention and perceived value.
- **Effort level:** `small`
- **Why it is a good fit:** I am familiar with the `shareGame` implementation and its promise rejection handling, ensuring I can implement this safely, and I can easily apply the correct button styling and semantic roles.

### 3. Piece Promotion UI Dialog
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap looks like today:** In `ChessBoard.tsx`, pawn promotion is hardcoded to Queen: `onMove({ from, to, promotion: 'q' });`. This breaks standard chess rules by preventing underpromotion (e.g., to Knight).
- **The specific feature:** When a move triggers a promotion (detectable via `chess.js` or piece rank), intercept the move before committing it. Display a small modal or floating popover near the promotion square allowing the user to select Queen, Rook, Bishop, or Knight. Then submit the move with the selected piece.
- **Why this is a good small, focused task:** It fixes a mechanical gap in the game logic. It requires purely frontend state management (intercepting the drag-drop action) and utilizes existing piece images.
- **Expected user impact:** Allows advanced players to play legally (underpromotions are sometimes necessary to avoid stalemate).
- **Effort level:** `medium`
- **Why it is a good fit:** Having recently optimized the `ChessBoard` component (Bolt), I am very familiar with its internal state and rendering lifecycle, ensuring the promotion dialog doesn't introduce performance regressions.

### 4. Highlight Last Move
- **Repo:** chesski
- **Area / surface:** Chessboard Visuals
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap looks like today:** When a move is made, the board updates instantly. It can be hard to track what piece just moved, especially if looking away.
- **The specific feature:** Pass the last move (e.g., from `game.history({ verbose: true })`) down to `ChessBoard`. Apply a specific background color or CSS class to the `from` and `to` squares of that last move.
- **Why this is a good small, focused task:** The `BoardSquare` component already accepts a `highlight` prop (currently unused or only for DND). We just need to compute which squares to highlight based on `chess.js` history.
- **Expected user impact:** Improves the visual clarity of the game flow, matching industry standards.
- **Effort level:** `small`
- **Why it is a good fit:** I have recently added ARIA grid roles to the `ChessBoard` (Palette) and optimized its rendering (Bolt). I know exactly where to apply this styling without breaking memoization or accessibility.

### 5. Sound Effects for Moves
- **Repo:** chesski
- **Area / surface:** Game Interactions
- **Relevant file(s):** `src/App.tsx`, `src/assets/` (new)
- **What the gap looks like today:** The game is completely silent, lacking visceral feedback on actions.
- **The specific feature:** Add two small audio files: `move.mp3` and `capture.mp3`. In `App.tsx`, inside `handleMove`, play the appropriate sound based on whether the move object returned by `game.move()` includes a capture flag (e.g., `result.flags.includes('c')`).
- **Why this is a good small, focused task:** It uses the standard HTML5 Audio API and taps into the existing centralized `handleMove` function.
- **Expected user impact:** Makes the game feel significantly more polished and "juicy," increasing user delight.
- **Effort level:** `small`
- **Why it is a good fit:** It's a quick win that adds immediate perceived value. I can also ensure that the CSP (Sentinel) allows audio playback, leaning on my recent security work.
