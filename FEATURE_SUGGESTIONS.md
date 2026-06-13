# High-Value Feature Suggestions

Based on a review of the product and codebase context, here are 6 high-value, tightly scoped feature ideas ranked by expected impact. These suggestions prioritize growth, core product value, and monetization while adhering strictly to existing patterns and avoiding scope creep.

---

### 1. Shareable Tutorial Deep Links
- **Repo:** chesski
- **Area / surface:** Tutorials & URL Routing
- **Relevant file(s):** `App.tsx`, `Tutorial.tsx`
- **What the gap looks like today:** We have a great URL sharing mechanism for game states (`?fen=...`), but if a parent wants to share a specific tutorial (e.g., "Learn the Knight") with their child, they can't link directly to it.
- **The specific feature to build:** Read a `?tutorial=knight` query parameter on initialization to default the view to `tutorial` and pass the active ID to `<Tutorial />`. Add a "Share Tutorial" button in `Tutorial.tsx` that uses the same clipboard API as `shareGame`.
- **Why this is a good small, focused task:** It perfectly mirrors the existing URL parameter and clipboard sharing patterns we already have for `fen`.
- **Expected user impact:** Enables viral sharing of educational content by parents or teachers, directly helping to gain more users.
- **Effort level:** `small`
- **Why it's a good fit for me:** I recently implemented strict FEN validation and fixed unhandled promise rejections in the clipboard sharing API. I am highly familiar with this exact surface area and can implement the tutorial deep linking robustly.

### 2. Captured Pieces Display
- **Repo:** chesski
- **Area / surface:** Info Panel (Game View)
- **Relevant file(s):** `App.tsx`, `components/CapturedPieces.tsx` (new)
- **What the gap looks like today:** There is a literal ` {/* Placeholder for future features like "Captured Pieces" */}` in `App.tsx`. In chess, seeing the material difference is a core requirement, especially for beginners evaluating who is "winning".
- **The specific feature to build:** Compare the current board state (`game.board()`) against a standard 16-piece starting set for each color to derive missing pieces. Render these using small versions of our existing `Piece` component images inside the info panel.
- **Why this is a good small, focused task:** The design placeholder already exists, the piece images exist, and the logic is a pure function of the existing `game` state.
- **Expected user impact:** Closes a major functional gap in the core chess experience, helping kids understand piece value and material advantage.
- **Effort level:** `medium`
- **Why it's a good fit for me:** I recently cleaned up the old commented-out captured pieces code across several commits (`152e211`, `b09efea`, `e68b95b`). I know exactly where this belongs and how to implement it cleanly without cluttering `App.tsx`.

### 3. "Buy Animal Food" (Monetization Support Link)
- **Repo:** chesski
- **Area / surface:** Header
- **Relevant file(s):** `App.tsx`
- **What the gap looks like today:** The app has zero monetization. Building a full payment gateway or premium subscription is too large of a task right now.
- **The specific feature to build:** Add a themed "Buy Animal Food 🍎" button to the header next to the Theme selector. This button links out to a Stripe Payment Link, Ko-fi, or BuyMeACoffee page.
- **Why this is a good small, focused task:** It requires zero backend work or complex state management—just a styled `a` tag using our existing button classes (`btn-secondary`).
- **Expected user impact:** Opens a revenue stream by allowing happy parents or teachers to financially support the app with zero friction.
- **Effort level:** `small`
- **Why it's a good fit for me:** I recently added Content Security Policy (CSP) headers; I can ensure this external link is added safely and complies with our security posture.

### 4. Board Flip for Local Multiplayer
- **Repo:** chesski
- **Area / surface:** Game Board
- **Relevant file(s):** `ChessBoard.tsx`, `App.tsx`
- **What the gap looks like today:** The app acts as a local "hotseat" board, but the orientation is locked with White at the bottom. The player controlling Black has to play upside down.
- **The specific feature to build:** Add a "Flip Board" button in `App.tsx`. Pass a `flipped` boolean prop to `ChessBoard.tsx`. If `flipped` is true, reverse the `FILES` and `RANKS` arrays during the render map.
- **Why this is a good small, focused task:** It's a purely presentational change requiring one piece of state and array reversal, utilizing the existing flexible grid layout.
- **Expected user impact:** Drastically improves the experience for two kids playing together on a single tablet or computer screen.
- **Effort level:** `small`
- **Why it's a good fit for me:** I recently optimized the rendering performance of the board (memoizing `game.board()`, optimizing valid move lookups). I can implement this visual flip without degrading render speed.

### 5. Pawn Underpromotion Selector
- **Repo:** chesski
- **Area / surface:** Game Logic & Board
- **Relevant file(s):** `ChessBoard.tsx`
- **What the gap looks like today:** In `handleDrop`, pawn promotion is hardcoded to Queen (`promotion: 'q'`). This violates standard chess rules where a player can choose a Rook, Bishop, or Knight.
- **The specific feature to build:** When a pawn drag ends on the 1st or 8th rank, temporarily pause the `onMove` execution and show a small inline prompt (or overlay on the square) asking the user to click Q, R, B, or N.
- **Why this is a good small, focused task:** It closes an obvious rules gap using the existing `onMove` callback interface.
- **Expected user impact:** Ensures the game engine is 100% rules-compliant, allowing users to solve puzzles or play out endgames requiring underpromotion.
- **Effort level:** `medium`
- **Why it's a good fit for me:** I have strong familiarity with the interaction between `ChessBoard` and `App` from my recent refactoring work, and I can ensure this async selection doesn't break the drag-and-drop flow.

### 6. Tutorial Completion Checkmarks
- **Repo:** chesski
- **Area / surface:** Tutorials
- **Relevant file(s):** `Tutorial.tsx`
- **What the gap looks like today:** Kids can play through tutorials, but there is no sense of progression, making it harder to stay motivated.
- **The specific feature to build:** Track which tutorials a user has completed (e.g., when they make a valid move) by saving an array of completed IDs to `localStorage`. Display a ✅ or 🌟 next to the tutorial buttons they have finished.
- **Why this is a good small, focused task:** Simple integration with `localStorage` that requires no backend, database, or external dependencies.
- **Expected user impact:** Adds a layer of gamification that increases user retention and encourages kids to finish all the lessons.
- **Effort level:** `small`
- **Why it's a good fit for me:** I recently refactored `Tutorial.tsx` (optimizing string concatenation) and fixed warning logs. I know the component structure intimately and can easily weave in local state management.
