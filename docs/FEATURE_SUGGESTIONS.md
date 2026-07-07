# High-Value Feature Suggestions

Based on a review of the `chesski` codebase and recent contributions, here is a prioritized, best-first list of concrete, actionable feature suggestions. These focus on extending existing capabilities, improving the core user experience, reducing friction, and exploring early monetization, all while avoiding large rewrites.

---

### 1. Captured Pieces Display

- **Repo**: chesski
- **Area / surface**: Game Layout / Info Panel
- **Relevant file(s)**: `src/App.tsx`, `src/components/MoveHistory.tsx` (or new `CapturedPieces.tsx`)
- **What the gap looks like today**: There is an explicit commented-out placeholder in `src/App.tsx` (`{/* Placeholder for future features like "Captured Pieces" */}`) next to the MoveHistory. Users currently have to calculate material advantage mentally.
- **The specific feature to build**: Implement a React component that derives the captured pieces by comparing the current `game.board()` against the initial standard setup (or by parsing the FEN/history). Render the captured pieces using the existing `Piece` component logic within the `.captured-area` div.
- **Why this is a good small, focused task**: It leverages the existing `game` state and `Piece` rendering components. It directly targets a known gap identified in the source code.
- **Expected user impact**: Significant UX improvement, making it easier for users (especially beginners using the Zoo theme) to gauge who is winning at a glance.
- **Effort level**: `small`
- **Why it is a good fit**: It builds directly on the layout and state management patterns established in `App.tsx` and requires no new dependencies.

---

### 2. Pawn Promotion Selection Modal

- **Repo**: chesski
- **Area / surface**: Chess Board Interaction
- **Relevant file(s)**: `src/components/ChessBoard.tsx`
- **What the gap looks like today**: The `handleDrop` function in `ChessBoard.tsx` currently hardcodes all pawn promotions to a Queen (`promotion: 'q'`). This makes underpromotions (e.g., to a Knight to avoid stalemate) impossible, breaking standard chess rules.
- **The specific feature to build**: Intercept the `handleDrop` logic when a pawn reaches the 8th/1st rank. Display a small, inline UI modal (using existing piece assets) prompting the user to select Queen, Rook, Bishop, or Knight, and then dispatch the `onMove` callback with the selected piece.
- **Why this is a good small, focused task**: It closes a critical functional gap in standard chess logic using a localized UI state within a single component.
- **Expected user impact**: Resolves a core gameplay limitation, allowing users to play legally correct and complete games.
- **Effort level**: `medium`
- **Why it is a good fit**: It touches core interactive logic but is cleanly scoped to the `ChessBoard` component's drag-and-drop handler.

---

### 3. Last Move Highlight

- **Repo**: chesski
- **Area / surface**: Chess Board UI
- **Relevant file(s)**: `src/components/ChessBoard.tsx`
- **What the gap looks like today**: The `BoardSquareProps` interface already defines a `lastMove` boolean, but it is hardcoded to `false` when rendering (`lastMove={false}`). Players lack visual feedback on what their opponent (or they themselves) just played.
- **The specific feature to build**: Extract the `from` and `to` squares of the most recent move (using `game.history({ verbose: true })` or tracking the last move in `App.tsx` state). Pass these active squares to `BoardSquare` to render a subtle background highlight (similar to the existing legal move highlight).
- **Why this is a good small, focused task**: The prop plumbing already partially exists, making this a pure UI enrichment task based on existing state.
- **Expected user impact**: Vastly improves board readability, especially when returning to a shared game via URL or after a momentary distraction.
- **Effort level**: `small`
- **Why it is a good fit**: It completes an unfinished feature explicitly hinted at in the existing interface definitions.

---

### 4. Premium Themes (Monetization Test)

- **Repo**: chesski
- **Area / surface**: Header / Theme Selection
- **Relevant file(s)**: `src/App.tsx`
- **What the gap looks like today**: The app offers 'Zoo' and 'Standard' themes for free, but has no revenue model.
- **The specific feature to build**: Add a locked "Robot" or "Space" theme button next to the existing theme toggles in `App.tsx`. Clicking it opens a simple modal that explains premium themes are coming soon and collects an email (or links to a simple Stripe Checkout/Gumroad payment link for pre-orders).
- **Why this is a good small, focused task**: It validates willingness to pay with minimal engineering effort. We don't even need to build the full 3D theme first; we just need to measure intent.
- **Expected user impact**: Creates a clear path to monetization while keeping the core game free and accessible.
- **Effort level**: `small`
- **Why it is a good fit**: It satisfies the requirement to "find ways to make money" while leveraging the existing theming infrastructure introduced in recent commits.

---

### 5. Copy PGN (Export Game)

- **Repo**: chesski
- **Area / surface**: Info Panel / Actions
- **Relevant file(s)**: `src/App.tsx`
- **What the gap looks like today**: Users can share games via a FEN URL, but there is no way to export the full game history (Portable Game Notation) for analysis in tools like Lichess or Chess.com.
- **The specific feature to build**: Add a "Copy PGN" button to the `<div className="action-buttons">` in `App.tsx`. When clicked, it calls `game.pgn()`, writes the result to `navigator.clipboard`, and temporarily updates the status message to "PGN copied!".
- **Why this is a good small, focused task**: `chess.js` already provides the `pgn()` method. It's essentially duplicating the existing "Share Game" logic but for a different output format.
- **Expected user impact**: Makes the tool much more useful for serious players who want to analyze their games post-mortem.
- **Effort level**: `small`
- **Why it is a good fit**: It's a textbook example of exposing an existing internal capability (`game.pgn()`) as a high-value user feature.

---

### 6. Strict FEN Validation and Error UI

- **Repo**: chesski
- **Area / surface**: App Initialization / URL Parsing
- **Relevant file(s)**: `src/App.tsx`
- **What the gap looks like today**: If a user loads an invalid `?fen=` URL, the app logs an error to the console (`console.error("Invalid FEN in URL", e);`) and silently falls back to a new game.
- **The specific feature to build**: Implement strict validation on the `fenParam` using `validateFen(fenParam).ok` from `chess.js` and enforce a reasonable string length limit. If invalid, display a user-friendly error message in the UI (e.g., using the existing `setMessage` state) rather than a silent failure.
- **Why this is a good small, focused task**: Improves application robustness against malformed URLs (and potential ReDoS vectors) while improving the UX of sharing links.
- **Expected user impact**: Prevents confusion when shared links are truncated or malformed by messaging apps.
- **Effort level**: `small`
- **Why it is a good fit**: It addresses a known unhandled edge case in the `App` component's initial state logic.

---

### 7. Theme Persistence

- **Repo**: chesski
- **Area / surface**: State Management / Theme
- **Relevant file(s)**: `src/App.tsx`
- **What the gap looks like today**: The `pieceTheme` state defaults to 'zoo' on every reload. Users preferring 'standard' must toggle it manually every time they visit or refresh the page.
- **The specific feature to build**: Wrap the `pieceTheme` `useState` initialization to read from `localStorage.getItem('chesski_theme')`, and add a `useEffect` to sync changes back to `localStorage`.
- **Why this is a good small, focused task**: A standard, self-contained React pattern that requires no new UI.
- **Expected user impact**: Reduces friction for returning users, honoring their preferences.
- **Effort level**: `small`
- **Why it is a good fit**: It extends a recently built feature (themes) to cover an obvious adjacent use case (preference saving).
