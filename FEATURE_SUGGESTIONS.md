# Feature Suggestions for Chesski

Based on a review of the codebase, here are 7 high-value, small-to-medium feature suggestions. These ideas are ranked best-first, focusing on extending the product, leveraging existing infrastructure, closing obvious gaps, and introducing simple monetization opportunities without requiring large platform rebuilds.

### 1. Implement Captured Pieces Display
- **Repo:** chesski
- **Area / surface:** Sidebar Info Panel
- **Relevant file(s):** `src/App.tsx`, `src/components/ChessBoard.tsx`, `src/components/CapturedPieces.tsx` (new)
- **What the gap/opportunity looks like today:** There is an unused JSX placeholder comment `<!-- <div className="captured-area">...</div> -->` in `App.tsx`. Captures occur in the game, but players have no visual representation of the material imbalance or pieces they've taken.
- **The specific feature to build:** Create a `CapturedPieces` component that parses the `chess.js` board state to calculate material advantage (e.g., "+2") and renders the captured piece icons using the existing theme infrastructure.
- **Why this is a good small, focused task:** It builds exactly on top of existing `chess.js` state and piece assets without introducing new external dependencies.
- **Expected user impact:** Closes an obvious UX gap for chess players, making the game feel complete and providing essential game state information at a glance.
- **Effort level:** `medium`
- **Why it is a good fit for me specifically:** It involves React component design and working closely with `chess.js` state, which aligns perfectly with my recent frontend and logic contributions.

### 2. Interactive Pawn Promotion Modal
- **Repo:** chesski
- **Area / surface:** ChessBoard / Game Logic
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap/opportunity looks like today:** Pawn promotion is currently hardcoded to automatically promote to a Queen (`promotion: 'q'`) in the `handleDrop` function of `ChessBoard.tsx`.
- **The specific feature to build:** Introduce a lightweight UI overlay or modal that appears when a pawn is dropped on the final rank, prompting the user to select Queen, Rook, Bishop, or Knight before executing the move via `onMove`.
- **Why this is a good small, focused task:** It finishes a partially implemented core chess rule using the existing `onMove` callback and standard React state.
- **Expected user impact:** Allows players to underpromote, fixing a rule violation and improving the integrity and depth of the game.
- **Effort level:** `medium`
- **Why it is a good fit for me specifically:** Involves React state management and `chess.js` move validation, which is well-suited to my recent work on the board components.

### 3. Add a "Copy PGN" Export Button
- **Repo:** chesski
- **Area / surface:** Sidebar Info Panel
- **Relevant file(s):** `src/App.tsx`
- **What the gap/opportunity looks like today:** We have a "Share Game" button that copies the FEN URL link, and we display the move history, but users cannot export the entire game in PGN format to analyze in external tools.
- **The specific feature to build:** Add a "Copy PGN" button next to "Share Game" that calls `game.pgn()` and copies the resulting string to the clipboard using `navigator.clipboard.writeText`.
- **Why this is a good small, focused task:** `chess.js` already provides a native `.pgn()` method. It is a very quick addition utilizing existing clipboard API patterns from the "Share Game" logic.
- **Expected user impact:** High value for serious chess players who want to save or analyze their games in tools like Lichess or Chess.com, increasing the app's utility.
- **Effort level:** `small`
- **Why it is a good fit for me specifically:** Directly mimics the pattern of the recently added "Share Game" capability I'm already familiar with.

### 4. Implement Premium / Unlockable Themes (Monetization Test)
- **Repo:** chesski
- **Area / surface:** App Header / Theme Selection
- **Relevant file(s):** `src/App.tsx`, `src/components/Piece.tsx`
- **What the gap/opportunity looks like today:** The app supports "Zoo" and "Standard" themes perfectly, but there is no monetization path. The infrastructure to swap piece assets is already robust.
- **The specific feature to build:** Add a "Fantasy" (or similar) premium theme option to the UI. Selecting it displays a "Support the Developer for $1 to unlock" modal linking out to a simple Stripe payment link (or just acts as a waitlist/interest check for now).
- **Why this is a good small, focused task:** It leverages the exact same `pieceTheme` state and rendering logic already present while validating a potential revenue stream with almost zero backend overhead.
- **Expected user impact:** Provides a low-friction path to monetization for users who enjoy the app and want more visual customization.
- **Effort level:** `small`
- **Why it is a good fit for me specifically:** Uses the existing theming infrastructure and React state I just reviewed, adding a simple UI extension.

### 5. Highlight Last Move on Board
- **Repo:** chesski
- **Area / surface:** ChessBoard UI
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap/opportunity looks like today:** The `BoardSquareProps` interface defines a `lastMove` boolean, but it is currently hardcoded to `false` when rendering squares in `ChessBoard.tsx`.
- **The specific feature to build:** Extract the 'from' and 'to' squares of the last move from `game.history({ verbose: true })` and pass `lastMove={true}` to those squares to apply a distinct CSS highlight.
- **Why this is a good small, focused task:** The prop interface is already defined, meaning the foundational thought process is done. It just requires wiring the `chess.js` history to the square props.
- **Expected user impact:** Helps players immediately identify what move the opponent just played, significantly reducing cognitive load.
- **Effort level:** `small`
- **Why it is a good fit for me specifically:** Modifies `ChessBoard.tsx` rendering logic, which I have strong context on.

### 6. "Play vs Bot" (Random Mover) Toggle
- **Repo:** chesski
- **Area / surface:** Game Mode
- **Relevant file(s):** `src/App.tsx`
- **What the gap/opportunity looks like today:** The game is local pass-and-play only. Solo users cannot play a match unless they manually control both sides or share a link and wait.
- **The specific feature to build:** Add a simple "Play vs Bot (Easy)" toggle. When active, after the user moves as White, use `setTimeout` to trigger a random valid move selected from `game.moves()` for Black.
- **Why this is a good small, focused task:** It avoids complex Stockfish WebAssembly integrations but introduces a functional solo play loop using the existing `game.moves()` API.
- **Expected user impact:** Allows solo users to actually play a game immediately, increasing engagement and time on site for those without an opponent.
- **Effort level:** `medium`
- **Why it is a good fit for me specifically:** I understand the `chess.js` API and how to hook it into React's event cycle safely.

### 7. Interactive Move History Navigation
- **Repo:** chesski
- **Area / surface:** Move History Component
- **Relevant file(s):** `src/components/MoveHistory.tsx`, `src/App.tsx`
- **What the gap/opportunity looks like today:** The `MoveHistory` component simply displays a static text table of the moves played so far.
- **The specific feature to build:** Make the rows in the move history clickable. When clicked, update the board state to display the game at that specific move (by traversing `chess.js` history) in a "view-only" mode.
- **Why this is a good small, focused task:** Uses existing components and just adds `onClick` handlers, passing a "viewed position" down to the `ChessBoard` without changing the actual game state logic.
- **Expected user impact:** A major quality-of-life improvement for players wanting to review their game or spot where they made a mistake.
- **Effort level:** `medium`
- **Why it is a good fit for me specifically:** Requires solid React state management and component communication, fitting my core skills.
