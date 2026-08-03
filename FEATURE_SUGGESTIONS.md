# High-Value Feature Suggestions for Chesski

Here is a ranked list of 6 focused, self-contained feature ideas based on the current state of the codebase. These suggestions leverage existing patterns, close obvious functional gaps, and include a path to monetization.

## 1. Interactive Pawn Promotion Picker
- **Repo:** chesski
- **Area / surface:** Board / Gameplay
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap or opportunity looks like today:** Currently, pawn promotion is hardcoded to Queen (`promotion: 'q'`) in `handleDrop`. Users cannot underpromote to a Knight, Rook, or Bishop, which limits tactical play.
- **The specific feature to build:** Create a small modal or contextual popup that appears when a pawn is dropped on the last rank. It should offer the 4 pieces (Q, R, B, N) to pick from, and pass the selected piece to the `onMove` callback instead of a hardcoded 'q'.
- **Why this is a good small, focused task:** It fixes a strict functional gap in standard chess rules using the existing board components and `onMove` callback pattern. No new external dependencies are needed.
- **Expected user impact:** Allows users to play fully legal chess games, avoiding forced draws or missing out on underpromotion tactics.
- **Effort level:** `medium`
- **Why it is a good fit for me specifically:** I am familiar with the React state management and `react-dnd` drop handlers within this exact component.

## 2. Display Captured Pieces (Material Advantage)
- **Repo:** chesski
- **Area / surface:** Info Panel / Game Layout
- **Relevant file(s):** `src/App.tsx`
- **What the gap or opportunity looks like today:** In `App.tsx`, there is a commented-out placeholder `{/* Placeholder for future features like "Captured Pieces" */}`. Users have no visual indicator of the material advantage, which is a standard UI element on chess platforms.
- **The specific feature to build:** Use the board state or game history to calculate captured pieces for both sides. Display them in the existing placeholder area using small versions of the `Piece` component or standard icons.
- **Why this is a good small, focused task:** The UI placeholder is already mapped out, and the chess state is readily available from the existing `game` object.
- **Expected user impact:** Highly requested standard feature that gives players immediate visual context on who is winning in material, reducing cognitive load.
- **Effort level:** `small`
- **Why it is a good fit for me specifically:** Directly builds on the existing `game` state and `Piece.tsx` component usage I've been working with.

## 3. Highlight Last Move on Board
- **Repo:** chesski
- **Area / surface:** Board
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap or opportunity looks like today:** The `BoardSquareProps` interface has a `lastMove` boolean, but it's hardcoded to `false` when rendering squares in `ChessBoard.tsx`. Players can easily lose track of what their opponent just played.
- **The specific feature to build:** Extract the last move's `from` and `to` squares from `game.history({ verbose: true })` in `App.tsx` or `ChessBoard.tsx`. Pass it down to set `lastMove={true}` on the correct squares, adding a subtle CSS highlight to the background.
- **Why this is a good small, focused task:** The prop already exists and is wired up in the component interface. It just needs the data connection from the game state to the prop and a small CSS tweak.
- **Expected user impact:** Drastically reduces cognitive load, especially when returning to a shared game URL or playing asynchronously.
- **Effort level:** `small`
- **Why it is a good fit for me specifically:** Simple React prop-drilling and state extraction that aligns well with my recent structural reviews.

## 4. PGN Export for Game Sharing
- **Repo:** chesski
- **Area / surface:** Info Panel / Game Layout
- **Relevant file(s):** `src/App.tsx`
- **What the gap or opportunity looks like today:** Users can share the current position via FEN URL (the "Share Game" button), but there is no way to export the whole game history (PGN).
- **The specific feature to build:** Add a "Copy PGN" button next to "Share Game" that calls `game.pgn()` and copies the resulting string to the user's clipboard.
- **Why this is a good small, focused task:** `chess.js` already provides the `pgn()` method. It requires minimal UI addition (one button) and reuses the clipboard copy logic from the FEN share feature.
- **Expected user impact:** Allows users to export their games to analyze on external platforms (like Lichess or Chess.com), increasing the overall utility of the app.
- **Effort level:** `small`
- **Why it is a good fit for me specifically:** Reuses the exact clipboard API pattern and notification system already present in the file.

## 5. Sequential Tutorial Flow
- **Repo:** chesski
- **Area / surface:** Tutorial View
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What the gap or opportunity looks like today:** Users have to manually click through each piece tutorial in the side panel. There's no sense of progression or completion.
- **The specific feature to build:** Add "Next" and "Previous" buttons in the tutorial view to cycle through the `tutorials` array, automatically updating the active tutorial when completed.
- **Why this is a good small, focused task:** The data structure (`tutorials` array) is already ordered, and the state `activeTutorial` exists. It just needs two buttons and simple index math.
- **Expected user impact:** Creates a smoother, gamified onboarding experience for beginners learning how the pieces move.
- **Effort level:** `small`
- **Why it is a good fit for me specifically:** Pure React state task with no complex domain logic required.

## 6. Donation / Merch Call-out for Monetization
- **Repo:** chesski
- **Area / surface:** Header / Global Layout
- **Relevant file(s):** `src/App.tsx`
- **What the gap or opportunity looks like today:** The product has zero monetization or call-to-action, but there's a goal to find ways to make money.
- **The specific feature to build:** Add a non-intrusive "Support the project" or "Buy physical Zoo Chess pieces" button in the header. Link it out to a Ko-fi, Patreon, or Shopify store.
- **Why this is a good small, focused task:** It's a simple external link integration. Requires zero new backend infrastructure, payment processing integration, or complex state.
- **Expected user impact:** Directly addresses the monetization goal by capturing goodwill from users who enjoy the animal-themed chess.
- **Effort level:** `small`
- **Why it is a good fit for me specifically:** An extremely safe UI addition that fulfills a core project constraint without risking regressions.
