# Feature Suggestions

Based on a review of the codebase and recent work, here is a prioritized list of well-scoped feature suggestions for Chesski. These are ranked best-first, with a focus on extending core value, utilizing existing infrastructure, and remaining fully self-contained.

## 1. Material Advantage / Captured Pieces Display
- **Repo:** chesski
- **Area / surface:** Game UI (`info-panel`)
- **Relevant file(s):** `src/App.tsx`
- **What the gap looks like today:** A placeholder (`{/* <div className="captured-area">...</div> */}`) exists in `App.tsx`, but there is no logic to calculate or display captured pieces or material advantage.
- **The specific feature to build:** Calculate the difference in pieces between white and black based on the current FEN/board state and render the advantage (e.g., '+2' and captured piece icons) in the `captured-area` placeholder.
- **Why this is a good small, focused task:** Leverages existing placeholder UI, uses existing `chess.js` state, and directly adds value without requiring new dependencies.
- **Expected user impact:** Highly requested core chess feature; helps users quickly evaluate the game state.
- **Effort level:** `small`
- **Why it is a good fit for me:** Extends my recent work on `evaluateGameStatus()` and UI state management.

## 2. Implement Last Move Highlighting
- **Repo:** chesski
- **Area / surface:** Chess Board Component
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap looks like today:** `BoardSquareProps` includes a `lastMove` boolean, but it is currently hardcoded to `false` when rendering squares.
- **The specific feature to build:** Track the `lastMove` (from and to squares) in the game state (either in `App.tsx` or using the `history` array) and pass it down to `ChessBoard.tsx` to highlight those specific squares.
- **Why this is a good small, focused task:** The prop structure is already built, it just needs the state logic wired up in the parent.
- **Expected user impact:** Reduces cognitive load for users by clearly showing the opponent's previous move.
- **Effort level:** `small`
- **Why it is a good fit for me:** Fits perfectly with my recent work handling game history and state updates.

## 3. Tutorial Navigation Controls (Next / Previous)
- **Repo:** chesski
- **Area / surface:** Tutorial UI
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What the gap looks like today:** The tutorial currently has an array of tutorials and an `activeTutorial` state, but lacks intuitive navigation buttons to progress through them linearly.
- **The specific feature to build:** Add "Next" and "Previous" buttons at the bottom of the tutorial view that update the `activeTutorial` state to the adjacent index in the array.
- **Why this is a good small, focused task:** Completely self-contained within one component, utilizing existing state patterns and requiring no new data structures.
- **Expected user impact:** Significantly improves the onboarding and learning experience for new users.
- **Effort level:** `small`
- **Why it is a good fit for me:** Aligns with my focus on improving core user value and reducing friction in existing flows.

## 4. Proper Pawn Promotion Selection UI
- **Repo:** chesski
- **Area / surface:** Move Handling
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap looks like today:** The `handleDrop` function in `ChessBoard.tsx` currently hardcodes pawn promotion to Queen (`promotion: 'q'`).
- **The specific feature to build:** Detect when a move is a pawn promotion and intercept the standard move to display a lightweight popup or modal allowing the user to select Queen, Rook, Bishop, or Knight before executing the move.
- **Why this is a good small, focused task:** Closes an obvious functional gap in the core chess engine integration without requiring external dependencies.
- **Expected user impact:** Essential for playing correct chess; fixes a known limitation in the current implementation.
- **Effort level:** `medium`
- **Why it is a good fit for me:** Leverages my understanding of `chess.js` move validation and React component state.

## 5. Fix Black Animal Assets in Zoo Theme
- **Repo:** chesski
- **Area / surface:** Piece Rendering
- **Relevant file(s):** `src/components/Piece.tsx`
- **What the gap looks like today:** The 'zoo' theme currently renders white piece assets for both colors and uses a CSS filter to simulate black pieces, even though distinct black piece assets (e.g., `animal_bK.png`) exist in `public/pieces/`.
- **The specific feature to build:** Update the `getPieceImage` function in `Piece.tsx` to correctly construct the filename using the actual piece color (`b` instead of just `w`) and remove the CSS filter hack.
- **Why this is a good small, focused task:** Cleans up tech debt while improving visual quality using already available assets.
- **Expected user impact:** Improves the polish and aesthetic appeal of the default 'zoo' theme.
- **Effort level:** `small`
- **Why it is a good fit for me:** Simple, focused fix that directly impacts the core visual presentation I've been reviewing.
