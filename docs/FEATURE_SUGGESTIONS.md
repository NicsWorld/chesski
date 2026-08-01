# Chesski Feature Suggestions

Here are 7 high-value, small-to-medium scoped feature suggestions based on the current state of the codebase. These lean on existing infrastructure and UI patterns.

### 1. Show Captured Pieces
- **Repo:** chesski
- **Area / surface:** Game Info Panel
- **Relevant file(s):** `src/App.tsx`, `src/components/CapturedPieces.tsx` (new)
- **What the gap looks like today:** The `App.tsx` file has a commented-out section `<!-- <div className="captured-area">...</div> -->`. Players cannot easily see material advantage during a game.
- **The specific feature:** Create a new `CapturedPieces` component that takes the current `game.history({ verbose: true })` or calculates captured pieces by comparing the current FEN against the starting position. Render small SVGs (re-using standard theme assets) of captured pieces grouped by color.
- **Why this is a good small, focused task:** It fulfills a standard chess application expectation and fills an explicitly marked gap in the UI. It relies entirely on the already-present `chess.js` game state without any new external dependencies.
- **Expected user impact:** Users can quickly assess who is winning based on material, reducing cognitive load.
- **Effort level:** `medium`
- **Why it is a good fit:** I can easily leverage my familiarity with React component creation, `chess.js` API, and the existing layout grid.

### 2. Piece Promotion UI Dialog
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap looks like today:** In `ChessBoard.tsx`, pawn promotion is hardcoded to Queen: `onMove({ from, to, promotion: 'q' });`. This breaks standard chess rules by preventing underpromotion (e.g., to Knight).
- **The specific feature:** When a move triggers a promotion (detectable via `chess.js` or piece rank), intercept the move before committing it. Display a small modal or floating popover near the promotion square allowing the user to select Queen, Rook, Bishop, or Knight. Then submit the move with the selected piece.
- **Why this is a good small, focused task:** It fixes a mechanical gap in the game logic. It requires purely frontend state management (intercepting the drag-drop action) and utilizes existing piece images.
- **Expected user impact:** Allows advanced players to play legally (underpromotions are sometimes necessary to avoid stalemate).
- **Effort level:** `medium`
- **Why it is a good fit:** I recently worked on the drag-and-drop components, so I understand where to intercept the `handleDrop` event.

### 3. Click-to-Move Support
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/components/Piece.tsx`
- **What the gap looks like today:** The app only supports Drag-and-Drop (via `react-dnd`). On mobile or trackpads, drag-and-drop can be clunky.
- **The specific feature:** Implement a two-click move system. Click a piece to select it (highlight its square), then click an empty square or enemy piece to move. This can co-exist seamlessly with the drag-and-drop functionality.
- **Why this is a good small, focused task:** It builds on the existing `onMove` prop and square highlighting logic (`highlight` prop in `BoardSquare`). It doesn't require new UI elements, just new event handlers.
- **Expected user impact:** Vastly improves accessibility and mobile playability.
- **Effort level:** `small`
- **Why it is a good fit:** I have context on the `ChessBoard` component's state management and how it passes moves up to `App.tsx`.

### 4. "Copy PGN" Button
- **Repo:** chesski
- **Area / surface:** Game Info Panel / Action Buttons
- **Relevant file(s):** `src/App.tsx`
- **What the gap looks like today:** We have a "Share Game" button that copies the FEN URL. We don't have a way to export the full move history for analysis in external tools like Lichess or Chess.com.
- **The specific feature:** Add an "Export PGN" button next to "Share Game". It should call `game.pgn()` and use `navigator.clipboard.writeText()` to copy it to the clipboard, utilizing the same temporary success message pattern as "Share Game".
- **Why this is a good small, focused task:** It's practically a one-liner API call from `chess.js` (`game.pgn()`) wired up to an existing clipboard utility pattern.
- **Expected user impact:** Power users can easily analyze their completed games elsewhere.
- **Effort level:** `small`
- **Why it is a good fit:** I am familiar with the `shareGame` implementation and its promise rejection handling, ensuring I can implement this safely.

### 5. Highlight Last Move
- **Repo:** chesski
- **Area / surface:** Chessboard Visuals
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap looks like today:** When a move is made, the board updates instantly. It can be hard to track what piece just moved, especially if looking away.
- **The specific feature:** Pass the last move (e.g., from `game.history({ verbose: true })`) down to `ChessBoard`. Apply a specific background color or CSS class to the `from` and `to` squares of that last move.
- **Why this is a good small, focused task:** The `BoardSquare` component already accepts a `highlight` prop (currently unused or only for DND). We just need to compute which squares to highlight based on `chess.js` history.
- **Expected user impact:** Improves the visual clarity of the game flow, matching industry standards.
- **Effort level:** `small`
- **Why it is a good fit:** I know how to modify the `ChessBoard` render loop and square styling logic without causing performance issues.

### 6. Sound Effects for Moves
- **Repo:** chesski
- **Area / surface:** Game Interactions
- **Relevant file(s):** `src/App.tsx`, `src/assets/` (new)
- **What the gap looks like today:** The game is completely silent, lacking visceral feedback on actions.
- **The specific feature:** Add two small audio files: `move.mp3` and `capture.mp3`. In `App.tsx`, inside `handleMove`, play the appropriate sound based on whether the move object returned by `game.move()` includes a capture flag (e.g., `result.flags.includes('c')`).
- **Why this is a good small, focused task:** It uses the standard HTML5 Audio API and taps into the existing centralized `handleMove` function.
- **Expected user impact:** Makes the game feel significantly more polished and "juicy."
- **Effort level:** `small`
- **Why it is a good fit:** It's a quick win that adds immediate perceived value without touching complex rendering logic.

### 7. Tutorial Completion Tracking
- **Repo:** chesski
- **Area / surface:** Tutorial View
- **Relevant file(s):** `src/components/Tutorial.tsx`, `src/App.tsx`
- **What the gap looks like today:** The `Tutorial.tsx` view lets users click through pieces, but there's no sense of progression or feedback when they successfully complete a learning objective (like making a valid move).
- **The specific feature:** Add a `completedTutorials` state (Set of IDs) to `App.tsx` or `Tutorial.tsx`. When a user successfully makes a legal move in a tutorial scenario, mark that tutorial as complete and show a small green checkmark next to the button. Persist this state to `localStorage`.
- **Why this is a good small, focused task:** It adds a gamification layer using simple React state and `localStorage`, leveraging the existing `handleMove` success path in the tutorial.
- **Expected user impact:** Encourages new players to finish all tutorials, increasing their engagement and understanding of the game.
- **Effort level:** `medium`
- **Why it is a good fit:** I understand the split between `App.tsx` and `Tutorial.tsx` state management and can implement this cleanly.