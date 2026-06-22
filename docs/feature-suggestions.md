# Feature Suggestions

Based on a review of the `chesski` codebase, here are 5 high-value, actionable feature suggestions ranked by priority. These suggestions adhere to constraints: leveraging existing infrastructure, improving core value, avoiding new external dependencies, and remaining scoped as small, focused tasks.

### 1. Pawn Promotion Choice UI
* **Repo:** chesski
* **Area:** Game Board / Core Rules
* **Relevant files:** `src/components/ChessBoard.tsx`
* **Gap:** Currently, pawn promotion is hardcoded to Queen (`promotion: 'q'`) in the `handleDrop` function. This prevents underpromotion (e.g., to Knight), which is sometimes necessary to avoid stalemate or win.
* **Feature:** When a move triggers promotion, temporarily pause the move execution and overlay a small UI on the target square to let the user select the promotion piece (Queen, Rook, Bishop, or Knight) before applying the move.
* **Why it's a good task:** It fixes an incomplete chess rule implementation using the existing `onMove` callback interface. The logic is entirely isolated to `ChessBoard` and a localized piece-selection UI.
* **Expected user impact:** Completes the core game experience, ensuring competitive/advanced players don't encounter illegal or unintended states.
* **Effort level:** `medium`
* **Fit for me:** I am deeply familiar with the drag-and-drop piece movement logic and React state management required to briefly interrupt the drop flow for user input.

### 2. Captured Pieces Display
* **Repo:** chesski
* **Area:** Info Panel / UI
* **Relevant files:** `src/App.tsx`, `src/components/Piece.tsx` (optional reuse)
* **Gap:** `App.tsx` has an explicit placeholder commented out: `{/* <div className="captured-area">...</div> */}`. Captured material is a standard feature in chess apps to assess advantage, but is missing here.
* **Feature:** Calculate captured pieces (or material imbalance) by comparing the current board state/FEN against the starting position. Display small icons for the captured pieces next to the players' info areas.
* **Why it's a good task:** Fills an obvious, already-identified product gap. It surfaces data that is entirely computable from the existing `chess.js` state.
* **Expected user impact:** Reduces cognitive load for users, allowing them to quickly see material advantage at a glance.
* **Effort level:** `small`
* **Fit for me:** I've previously worked on performance optimizations around piece tracking and board evaluation, so computing material differences dynamically is well within my recent context.

### 3. Export Game (PGN)
* **Repo:** chesski
* **Area:** Info Panel / Actions
* **Relevant files:** `src/App.tsx`
* **Gap:** Users can share the current game state via a FEN URL link, but cannot export the entire move history to review elsewhere.
* **Feature:** Add an "Export PGN" button alongside the "Share Game" button. It will call `game.pgn()`, create a text Blob, and trigger a browser download of a `.pgn` file.
* **Why it's a good task:** Exposes a powerful internal capability (`chess.js` natively supports PGN generation) directly to the user with minimal UI footprint.
* **Expected user impact:** Tremendous value for players who want to analyze their Zoo Chess games in engines like Lichess or Chess.com.
* **Effort level:** `small`
* **Fit for me:** It perfectly mimics the pattern of the recent FEN sharing implementation but utilizes the PGN output, meaning no new library dependencies are needed.

### 4. Flip Board Toggle
* **Repo:** chesski
* **Area:** Game Board / UI
* **Relevant files:** `src/App.tsx`, `src/components/ChessBoard.tsx`
* **Gap:** The board always renders from White's perspective (ranks 8 down to 1), making it difficult to play comfortably if you are simulating Black's moves.
* **Feature:** Add a "Flip Board" toggle button that reverses the iteration order of the `RANKS` and `FILES` arrays during rendering in `ChessBoard.tsx`.
* **Why it's a good task:** It is a high-value accessibility/UX feature that requires no changes to the underlying chess logic—only a simple visual mapping change based on a boolean prop.
* **Expected user impact:** Allows users to play as Black naturally or analyze a game from the opponent's perspective.
* **Effort level:** `small`
* **Fit for me:** I recently worked on rendering logic and array iterations within React components here, so mapping the grid inversion is straightforward.

### 5. Load Game from FEN Text Input
* **Repo:** chesski
* **Area:** Game Header / UI
* **Relevant files:** `src/App.tsx`
* **Gap:** The app can load a game via the `?fen=` URL parameter, but there is no UI surface to quickly paste a FEN string without manually editing the URL.
* **Feature:** Add a simple "Load FEN" input field and button (perhaps hidden behind an "Import" dropdown or modal) that parses the input, validates it, and resets the game state to that position.
* **Why it's a good task:** It reuses the robust FEN validation and state initialization logic already present for URL parameters, just exposing it via a more accessible UI.
* **Expected user impact:** Greatly reduces friction for users wanting to practice specific scenarios or puzzles without messing with URL encoding.
* **Effort level:** `small`
* **Fit for me:** I recently fortified the FEN validation logic for the URL parameter; reusing that robust pipeline for user input is a logical next step.
