# High-Value Feature Suggestions for Chesski

Based on a review of the codebase, here are 5 high-value, self-contained feature suggestions prioritized by product growth, monetization, and leveraging existing patterns.

---

### 1. "Premium" Theme Unlock (Monetization Test)
* **Repo:** `chesski`
* **Area / Surface:** Header / Theme Selection (`App.tsx`)
* **Relevant files:** `src/App.tsx`
* **Gap / Opportunity:** The application currently has two free themes ('zoo' and 'standard'), but no path to monetization. We need a low-effort way to test willingness to pay.
* **Feature:** Add a third theme option (e.g., "Fantasy 🔒") to the theme toggle. Clicking it opens a simple modal or alert with a Stripe payment link (or email waitlist) to "Unlock Premium Themes."
* **Why it's focused:** It perfectly reuses the existing `pieceTheme` state and toggle UI pattern, requiring zero changes to the underlying chess logic or board rendering.
* **User impact:** Directly validates a monetization channel while signaling to users that the app is actively expanding its high-quality assets.
* **Effort:** `small`
* **Why it's a good fit:** I recently worked on state management and UI structure in `App.tsx`, making adding a new state-driven modal and button trivial.

### 2. Pawn Promotion UI Dialog
* **Repo:** `chesski`
* **Area / Surface:** Game Board (`ChessBoard.tsx`)
* **Relevant files:** `src/components/ChessBoard.tsx`, `src/App.tsx`
* **Gap / Opportunity:** Currently, pawn promotion is hardcoded to Queen (`promotion: 'q'` in `handleDrop`). This prevents players from under-promoting (e.g., to a Knight), which is a critical gap in chess rules.
* **Feature:** Intercept the `onMove` call in `handleDrop` when a pawn reaches the 8th or 1st rank. Display a small inline dialog or modal letting the user choose between Queen, Rook, Bishop, or Knight before executing the move.
* **Why it's focused:** The underlying library (`chess.js`) already fully supports under-promotion. This merely exposes an existing capability to the user via a small UI component.
* **User impact:** Closes a major functional gap for chess players, making the app fully compliant with standard chess rules.
* **Effort:** `medium`
* **Why it's a good fit:** I have recently optimized the `ChessBoard` component's move logic and rendering loop, giving me deep context on how the `react-dnd` drop handler integrates with the game state.

### 3. Captured Pieces Display
* **Repo:** `chesski`
* **Area / Surface:** Info Panel (`App.tsx`)
* **Relevant files:** `src/App.tsx`, `src/components/Piece.tsx`
* **Gap / Opportunity:** A placeholder comment (`{/* Placeholder for future features like "Captured Pieces" */}`) exists in the UI. We are already tracking the full game state via `chess.js`, but this material advantage data isn't surfaced to the user.
* **Feature:** Calculate captured pieces by comparing the current board state (`game.board()`) to the starting pieces. Render these captured pieces using the existing `<Piece />` component scaled down in the `captured-area` div.
* **Why it's focused:** Leverages existing data from `chess.js` and reuses the existing `<Piece />` component and `pieceTheme` styling without needing new assets or complex logic.
* **User impact:** Players can instantly see who has the material advantage, a crucial part of evaluating the game state.
* **Effort:** `medium`
* **Why it's a good fit:** I have extensive experience with the `chess.js` API in this project and know how to memoize board evaluations to prevent performance regressions.

### 4. Click-to-Move Support
* **Repo:** `chesski`
* **Area / Surface:** Game Board (`ChessBoard.tsx`)
* **Relevant files:** `src/components/ChessBoard.tsx`, `src/components/Piece.tsx`
* **Gap / Opportunity:** The game only supports drag-and-drop via `react-dnd`. This creates high friction for users on mobile devices or trackpads.
* **Feature:** Add a `selectedSquare` state. Clicking a piece selects it (highlighting valid moves). Clicking a valid destination square executes the move via the existing `onMove` callback.
* **Why it's focused:** We already calculate and highlight valid squares for drag-and-drop. We just need to trigger the same visual states and `onMove` callback via `onClick` events.
* **User impact:** Massively improves accessibility and mobile experience, potentially increasing the addressable user base.
* **Effort:** `medium`
* **Why it's a good fit:** I am highly familiar with the `react-dnd` implementation here and can add click handlers alongside it without breaking the existing drag-and-drop flow.

### 5. Interactive Tutorial Auto-Advance
* **Repo:** `chesski`
* **Area / Surface:** Tutorials (`Tutorial.tsx`)
* **Relevant files:** `src/components/Tutorial.tsx`
* **Gap / Opportunity:** The tutorial view allows free movement but doesn't track whether the user actually successfully moved the piece as instructed.
* **Feature:** Add a listener to `handleMove` in the tutorial. Once the user makes a valid move for the currently displayed piece, show a "Great job!" toast and automatically advance the selected tutorial to the next piece.
* **Why it's focused:** The state for the current tutorial and the move handler already exist. We just need to link them with a small success state to create a complete user loop.
* **User impact:** Transforms a static list of text instructions into an interactive, gamified onboarding flow, improving user retention.
* **Effort:** `small`
* **Why it's a good fit:** Having recently refactored FEN manipulation and state logic in `Tutorial.tsx`, I can easily implement this feedback loop efficiently.