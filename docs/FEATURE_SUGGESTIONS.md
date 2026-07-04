# High-Value Feature Suggestions

Based on a review of the codebase, recent contributions, and the stated product goals (growth, monetization, and leveraging existing infrastructure), here are 6 well-scoped, actionable feature suggestions ranked best-first.

## 1. Premium Themes (Monetization)
- **Repo:** chesski
- **Area / surface:** Header / Theme Selector
- **Relevant file(s):** `src/App.tsx`, `src/components/PremiumThemeGate.tsx` (new)
- **What the gap or opportunity looks like today:** The user can currently select between 'zoo' and 'standard' themes freely. There is no monetization strategy in the app right now, despite recent additions like the "chunky toy box 3D theme".
- **The specific feature to build:** Add a 3rd locked premium theme to the selector. When clicked, it displays a modal with a Stripe checkout link to purchase the theme, unlocking it via a `localStorage` flag upon return.
- **Why this is a good small, focused task:** It builds on the exact theme-switching pattern recently implemented. Adding a locked state and a checkout link is purely a UI extension of existing state.
- **Expected user impact:** Opens a clear, direct path to monetization while keeping the core gameplay free.
- **Effort level:** `medium`
- **Why it is a good fit for me:** I recently worked on merging the chunky toy box 3D theme, so I'm familiar with how the theme state is managed and passed down to the components.

## 2. PGN Export for Game Sharing (Growth & Retention)
- **Repo:** chesski
- **Area / surface:** Game View Info Panel
- **Relevant file(s):** `src/App.tsx`, `src/utils/export.ts` (new)
- **What the gap or opportunity looks like today:** The app has a "Share Game" feature that copies a FEN URL, but FEN only captures the current board state, omitting the move history which is vital for post-game analysis.
- **The specific feature to build:** Add an "Export PGN" button next to "Share Game". This will call `game.pgn()` from the existing `chess.js` instance and copy the full Portable Game Notation text to the user's clipboard using the navigator clipboard API.
- **Why this is a good small, focused task:** `chess.js` provides `game.pgn()` out of the box, and we already have a proven pattern for clipboard interaction with success/error toasts.
- **Expected user impact:** Extends sharing capabilities, allowing users to analyze games in external tools, increasing product utility and potentially bringing in users who share PGNs.
- **Effort level:** `small`
- **Why it is a good fit for me:** I recently fixed an unhandled promise rejection in the `shareGame` clipboard API usage, so I am intimately familiar with this exact feature's mechanics.

## 3. Last Move Highlighting (Core Value / UX)
- **Repo:** chesski
- **Area / surface:** ChessBoard Component
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap or opportunity looks like today:** The `BoardSquareProps` interface actually defines a `lastMove` boolean, but it is currently hardcoded to `false` when rendering the board, making it hard to see what move the opponent just made.
- **The specific feature to build:** Parse `game.history({ verbose: true })` to extract the `from` and `to` squares of the most recent move. Pass `lastMove={true}` to those specific squares in the `ChessBoard` render loop, and ensure the CSS highlights them appropriately.
- **Why this is a good small, focused task:** The prop already exists and the data is readily available in the current `chess.js` instance. It's simply a matter of connecting the two without inventing new infrastructure.
- **Expected user impact:** A significant usability win that reduces cognitive load, as players can easily track the flow of the game.
- **Effort level:** `small`
- **Why it is a good fit for me:** I have recently optimized square highlights and valid moves lookups using Sets in this component, so I know exactly how to hook into the rendering loop efficiently.

## 4. Move Promotion UI (Closing an Obvious Gap)
- **Repo:** chesski
- **Area / surface:** ChessBoard Component
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap or opportunity looks like today:** The `handleDrop` function currently hardcodes pawn promotion to Queen (`promotion: 'q'`). This prevents advanced players from under-promoting (e.g., to a Knight) when tactically necessary.
- **The specific feature to build:** When a pawn move reaches the 8th or 1st rank, pause the move execution and display a small inline modal over the destination square letting the user choose Q, R, B, or N.
- **Why this is a good small, focused task:** It replaces a known, hardcoded shortcut in the existing game logic with standard chess functionality, completely localized to the board interaction logic.
- **Expected user impact:** Fixes a core gameplay gap for serious players, removing a point of friction and frustration.
- **Effort level:** `medium`
- **Why it is a good fit for me:** I've been deep in the `ChessBoard.tsx` logic and `chess.js` integrations, making me well-equipped to handle the async pause between drop and move execution.

## 5. Captured Pieces Display (Closing an Obvious Gap)
- **Repo:** chesski
- **Area / surface:** Game View Info Panel
- **Relevant file(s):** `src/App.tsx`, `src/components/CapturedPieces.tsx` (new)
- **What the gap or opportunity looks like today:** There is a commented-out `{/* <div className="captured-area">...</div> */}` placeholder in `App.tsx`. Users currently have no visual indicator of material advantage.
- **The specific feature to build:** Create a `CapturedPieces` component that compares the starting 16 pieces per side against the current board state (or `game.history`), calculates the captured pieces, and renders them using the active `pieceTheme`.
- **Why this is a good small, focused task:** It fulfills an existing placeholder, reuses the existing piece rendering assets/themes, and is isolated to a single new display component.
- **Expected user impact:** A standard UI expectation for chess apps that makes material evaluation much easier for players.
- **Effort level:** `small`
- **Why it is a good fit for me:** I've recently written tests for the `Piece` component and worked with the `MoveHistory` panel, so I know how to extract data from `chess.js` and render pieces properly.

## 6. Interactive Tutorial Progression (Growth / Onboarding)
- **Repo:** chesski
- **Area / surface:** Tutorial View
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What the gap or opportunity looks like today:** The `Tutorial` view currently just presents static FEN scenarios. There is no validation or progression if the user makes the correct educational move.
- **The specific feature to build:** Add state to track the "expected next move" for each tutorial step. If the user makes the correct move, display a success message and automatically advance to the next tutorial FEN.
- **Why this is a good small, focused task:** It wraps the exact tutorial FENs and board component we already have in a simple array-based state progression, avoiding the need for a complex backend.
- **Expected user impact:** Creates a guided "first-time user" onboarding sequence, which drives better understanding of the app and higher retention.
- **Effort level:** `medium`
- **Why it is a good fit for me:** I heavily refactored `Tutorial.tsx`, including replacing string manipulation with regex for FEN generation and optimizing string concatenation, so I know this component inside out.
