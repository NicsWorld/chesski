# High-Value Feature Suggestions for Chesski

Here is a prioritized list of well-scoped, actionable feature suggestions that leverage existing infrastructure and fit within your product constraints.

### 1. Captured Pieces (Material Advantage Display)
* **Repo:** chesski
* **Area / surface:** Sidebar / Info Panel
* **Relevant file(s):** `src/App.tsx`, `src/components/MoveHistory.tsx` (or new `CapturedPieces.tsx`)
* **What the gap looks like today:** Currently, captured pieces are not displayed (there is even a commented-out placeholder `<div className="captured-area">...</div>` in `App.tsx`). This makes it hard for players to quickly assess who is ahead in material.
* **The specific feature to build:** Parse `game.history()` or compare `game.board()` to the initial state to calculate missing pieces. Render the captured white and black pieces as small inline icons (using the existing SVG/PNG assets) inside the empty sidebar placeholder.
* **Why this is a good small, focused task:** The layout placeholder already exists, the piece assets are already loaded, and `chess.js` makes board diffing straightforward.
* **Expected user impact:** Significantly improves the core gameplay experience by showing material advantage at a glance.
* **Effort level:** `small`
* **Why it is a good fit for me:** Based on my recent PR implementing the chunky 3D theme and piece rendering, I'm very familiar with the `Piece` component and how assets are loaded.

### 2. Pawn Promotion Selector
* **Repo:** chesski
* **Area / surface:** Game Board / Move Logic
* **Relevant file(s):** `src/components/ChessBoard.tsx`
* **What the gap looks like today:** Pawn promotion is hardcoded to Queen (`promotion: 'q'`) inside the `handleDrop` function. This breaks the rules of chess when under-promotion is desired (e.g., to a Knight to avoid a stalemate).
* **The specific feature to build:** Intercept pawn drops to the 1st/8th ranks. Instead of firing `onMove` immediately, hold the move in state and display a small inline modal or popover containing Q, R, B, and N icons. Once clicked, fire the move with the chosen piece.
* **Why this is a good small, focused task:** The core movement logic remains untouched; it's just adding an intermediary UI step before calling `chess.move()`.
* **Expected user impact:** Closes a critical gap in chess rules and prevents frustrating game losses due to forced Queen promotion.
* **Effort level:** `medium`
* **Why it is a good fit for me:** I already understand the `react-dnd` drop logic and board grid positioning from my recent styling work.

### 3. Board Flipping (Play as Black)
* **Repo:** chesski
* **Area / surface:** Board UI
* **Relevant file(s):** `src/App.tsx`, `src/components/ChessBoard.tsx`
* **What the gap looks like today:** The board is strictly rendered from White's perspective (Ranks 8 down to 1). This is awkward for players wanting to study Black openings or play pass-and-play with a friend.
* **The specific feature to build:** Add a "Flip Board" toggle button in the info panel. When toggled, pass a boolean to `ChessBoard` that reverses the `FILES` and `RANKS` arrays during the mapping loop.
* **Why this is a good small, focused task:** It requires exactly zero changes to the underlying chess logic; it is purely a visual array reversal.
* **Expected user impact:** Reduces friction for players studying Black's perspective and makes local play much better.
* **Effort level:** `small`
* **Why it is a good fit for me:** I heavily modified the `ChessBoard.tsx` render loops recently to build the 3D toy box theme, so I know exactly where these arrays live.

### 4. "Premium" Theme Teaser (Monetization)
* **Repo:** chesski
* **Area / surface:** Header / Theme Selector
* **Relevant file(s):** `src/App.tsx`
* **What the gap looks like today:** The app has a fun theming system but no current monetization vector.
* **The specific feature to build:** Add a "Pro Themes..." button or a 🔒 icon next to the existing theme toggles. Clicking it opens a simple modal showcasing mockups of premium themes (e.g., "Space", "Neon") with a "Unlock for $2" button (linking to a Stripe payment link) or a "Join Waitlist" form.
* **Why this is a good small, focused task:** It requires only front-end UI additions (a button and static modal) without actually having to build the new themes or a complex backend immediately.
* **Expected user impact:** Tests user willingness to pay (WTP) and captures leads to validate monetization with minimal upfront effort.
* **Effort level:** `small`
* **Why it is a good fit for me:** Leverages my recent theme system architecture to build a natural upsell path.

### 5. Last Move Highlight
* **Repo:** chesski
* **Area / surface:** Board Squares
* **Relevant file(s):** `src/components/ChessBoard.tsx`
* **What the gap looks like today:** The `BoardSquareProps` interface actually defines a `lastMove` boolean, but it is currently hardcoded to `false` when rendering. Players can easily lose track of what the opponent just played.
* **The specific feature to build:** Extract the last move's `from` and `to` coordinates from `game.history({ verbose: true })`. Pass `lastMove={true}` to those specific squares in the render loop and give them a subtle background highlight (e.g., yellowish tint).
* **Why this is a good small, focused task:** The prop already exists and the historical data is readily available in the `game` object.
* **Expected user impact:** Reduces cognitive load and prevents "wait, what did you just move?" moments.
* **Effort level:** `small`
* **Why it is a good fit for me:** Adding visual layers like highlights is straightforward for me since I just finished adding the 3D board CSS and shadows.

### 6. Copy PGN (Export Game)
* **Repo:** chesski
* **Area / surface:** Sidebar / Share Actions
* **Relevant file(s):** `src/App.tsx`
* **What the gap looks like today:** Users can share the current game state via FEN in the URL, but cannot export the full move history to analyze in external tools like Lichess or Chess.com.
* **The specific feature to build:** Add a "Copy PGN" button next to "Share Game" that calls `navigator.clipboard.writeText(game.pgn())` (with `.catch()` for errors) and temporarily shows a success message.
* **Why this is a good small, focused task:** `chess.js` natively supports `game.pgn()`, making this purely plumbing an existing capability to a new button.
* **Expected user impact:** Extends the utility of the app for more serious players who want to save or analyze their games.
* **Effort level:** `small`
* **Why it is a good fit for me:** A simple follow-up to the existing `shareGame` clipboard functionality.

### 7. Click-to-Move (Accessibility & Mobile)
* **Repo:** chesski
* **Area / surface:** Board Interaction
* **Relevant file(s):** `src/components/ChessBoard.tsx`
* **What the gap looks like today:** The game only supports drag-and-drop. This is notoriously clunky on mobile devices and difficult for users with trackpads or accessibility needs.
* **The specific feature to build:** Add click-to-move support. Clicking a piece selects it (persisting the `validMoves` in state), and clicking a valid destination square completes the move (firing the same `onMove` logic as `handleDrop`).
* **Why this is a good small, focused task:** The `validMoves` array is already being calculated for drag highlights. We just need to trigger the same logic via `onClick` handlers.
* **Expected user impact:** Massively improves the mobile experience and expands accessibility.
* **Effort level:** `medium`
* **Why it is a good fit for me:** Involves state management and interaction mapping within `ChessBoard.tsx` where I recently worked.
