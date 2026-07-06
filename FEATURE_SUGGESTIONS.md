# Chesski - High-Value Feature Suggestions

Based on a review of the codebase, recent contributions (like performance optimizations and tests), and product constraints, here is a ranked list of small, actionable, high-value feature ideas. These focus on improving core user value, monetizing existing pathways, and extending the product without large rebuilds or external dependencies.

## 1. Implement Captured Pieces UI (Core Value & Gap Fill)
- **Repo:** chesski
- **Area / surface:** `App.tsx` (Game View sidebar)
- **Relevant file(s):** `src/App.tsx`, `src/components/ChessBoard.tsx` (indirectly)
- **What the gap looks like today:** There is a commented-out placeholder `{/* <div className="captured-area">...</div> */}` in `App.tsx`. Users cannot easily see material advantage during a game.
- **The specific feature to build:** Create a new `CapturedPieces` component. It will calculate the difference in pieces between the starting board and the current `game.board()` (or track it via `game.history({ verbose: true })`) and display the captured pieces for White and Black above/below the MoveHistory.
- **Why this is a good small, focused task:** It fulfills an obvious, already-identified gap using data (`chess.js` game state) we already have.
- **Expected user impact:** High. Material advantage is a critical part of chess UI. It reduces cognitive load for players.
- **Effort level:** `medium`
- **Why it is a good fit for me:** I've been working with the `ChessBoard` and `App` state management (e.g., `setFen`, memoization), so calculating and rendering derived state from `chess.js` fits perfectly with my recent experience.

## 2. Premium Pawn Promotion Choice UI (Monetization)
- **Repo:** chesski
- **Area / surface:** `ChessBoard.tsx`
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap looks like today:** In `handleDrop` inside `ChessBoard.tsx`, pawn promotion is hardcoded to Queen: `onMove({ from, to, promotion: 'q' });`. Underpromotion is impossible.
- **The specific feature to build:** When a pawn reaches the 8th/1st rank, temporarily pause the game state and show a small modal/overlay over the board to select Q, R, B, or N. **Monetization angle:** Allow Queen promotion for free, but lock underpromotion (R, B, N) behind a "Pro User" paywall/feature flag, showing an upsell modal if they try to select them.
- **Why this is a good small, focused task:** It fixes a mechanical limitation of the chess engine implementation while introducing a very natural, contextual monetization point without building a whole store.
- **Expected user impact:** Medium. Allows legal chess moves previously impossible, while testing conversion on power users.
- **Effort level:** `medium`
- **Why it is a good fit for me:** I've worked deeply on the React DnD implementation and `ChessBoard` logic, so intercepting the drop event before committing the move is right in my wheelhouse.

## 3. Highlight Last Move on the Board (Core Value & Polish)
- **Repo:** chesski
- **Area / surface:** `ChessBoard.tsx`
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap looks like today:** `BoardSquareProps` defines a `lastMove: boolean` property, but it is currently hardcoded as `lastMove={false}` when rendering the squares. It is very hard to see what the opponent just played.
- **The specific feature to build:** Extract the last move from `game.history({ verbose: true })` (which gives `from` and `to` squares). Pass `lastMove={true}` to the `BoardSquare` for those two specific squares, and apply a subtle CSS background tint (e.g., yellow) to them.
- **Why this is a good small, focused task:** The prop already exists, and the CSS/UI foundation is there. We just need to wire up the data from `chess.js`.
- **Expected user impact:** High. Drastically improves readability of the game state, especially in shared games or when returning to a tab.
- **Effort level:** `small`
- **Why it is a good fit for me:** Leverages my recent work optimizing square highlights (`Set.has` vs `includes`) and working with `BoardSquare` rendering.

## 4. Premium "Robot" or "Space" Piece Themes (Monetization)
- **Repo:** chesski
- **Area / surface:** `App.tsx` & `Piece.tsx`
- **Relevant file(s):** `src/App.tsx`, `src/components/Piece.tsx`
- **What the gap looks like today:** The app supports switching themes (`pieceTheme` state: 'zoo' or 'standard').
- **The specific feature to build:** Add a third button to the header for a premium theme (e.g., 'robot' or 'fantasy'). When clicked, if the user doesn't have a "Pro" flag, show a "Purchase Premium Themes" modal. If they do, switch the theme.
- **Why this is a good small, focused task:** The theme-switching infrastructure is fully built and working. Adding a new theme is just adding assets and updating the union type.
- **Expected user impact:** Medium. Cosmetic upgrades are highly requested in chess apps.
- **Effort level:** `small`
- **Why it is a good fit for me:** I'm familiar with how `Piece.tsx` handles rendering and CSS filters based on the theme.

## 5. Export Move History to PGN (Growth/Utility)
- **Repo:** chesski
- **Area / surface:** `App.tsx` (Action Buttons)
- **Relevant file(s):** `src/App.tsx`
- **What the gap looks like today:** Users can share the current game state via FEN URL ("Share Game" button), but power users can't export the game to analyze it in Lichess/Chess.com.
- **The specific feature to build:** Add an "Export PGN" button next to the existing "Share Game" button. It will call `game.pgn()` and use the existing clipboard API (`navigator.clipboard.writeText`) with the same toast notification pattern.
- **Why this is a good small, focused task:** Reuses the exact same UI and clipboard API patterns as the recently fixed "Share Game" feature, just calling a different `chess.js` method.
- **Expected user impact:** Medium. Helps bridge Chesski with the broader chess ecosystem.
- **Effort level:** `small`
- **Why it is a good fit for me:** I recently fixed the unhandled promise rejection in the `shareGame` clipboard API, so I know exactly how to implement this safely.

## 6. Interactive Tutorial Progress / Gamification (Core Value / Retention)
- **Repo:** chesski
- **Area / surface:** `Tutorial.tsx`
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What the gap looks like today:** The tutorials are static. Users can click through them, but there is no sense of completion or progression.
- **The specific feature to build:** Add a simple win condition to tutorials (e.g., capturing a specific target piece). When achieved, save the tutorial ID to a `completedTutorials` array in `localStorage`. In the UI, add a green checkmark `✓` next to the buttons of completed tutorials.
- **Why this is a good small, focused task:** Introduces gamification without needing a backend database. `localStorage` is sufficient for this scope.
- **Expected user impact:** Medium-High. Gamification drastically improves completion rates for new user onboarding.
- **Effort level:** `medium`
- **Why it is a good fit for me:** I've done significant refactoring in `Tutorial.tsx` recently (optimizing string concat, replacing catch blocks, simplifying FEN logic), so I am very familiar with its state and evaluation logic.