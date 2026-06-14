# Feature Suggestions for Chesski

Based on a review of the codebase, here are 6 high-value, well-scoped feature suggestions prioritized by the requested constraints (growth, monetization, leveraging existing infrastructure, and closing core gaps).

## 1. Premium Theme Upsell (Monetization)
- **Repo:** chesski
- **Area:** Header / Theme Selector
- **Relevant files:** `src/App.tsx`, `src/components/Piece.tsx`
- **Gap:** The app recently introduced theme switching (`zoo` vs `standard`), but there is no mechanism to monetize it.
- **Feature:** Add a third theme (e.g., 'space', 'robot', or 'fantasy'). Display it in the theme toggle with a lock icon. Clicking it opens a modal or redirects to a payment link (e.g., Stripe Checkout) to "Unlock Premium Themes".
- **Why it's good:** Directly addresses the "find ways to make money" constraint by leveraging the exact `pieceTheme` pattern established in recent pull requests. No new architectural systems needed.
- **Expected user impact:** Creates a monetization funnel while signaling premium value to users.
- **Effort level:** `small`
- **Fit:** Builds directly on recent work that added the `pieceTheme` state and prop drilling.

## 2. Captured Pieces Display (Core Gap)
- **Repo:** chesski
- **Area:** Game / Sidebar
- **Relevant files:** `src/App.tsx`, `src/components/ChessBoard.tsx` (or new `CapturedPieces.tsx`)
- **Gap:** There is a commented-out placeholder (`{/* <div className="captured-area">...</div> */}`) in `App.tsx`. Users currently cannot see what pieces have been captured, which is crucial for evaluating material advantage.
- **Feature:** Build a `CapturedPieces` component. Calculate captured pieces by comparing starting material to the current `game.board()` state. Display the captured pieces grouped by color using the existing `Piece` component assets.
- **Why it's good:** Fills an obvious and explicitly planned feature gap. Requires no new external dependencies and reuses the existing piece SVG/PNG infrastructure.
- **Expected user impact:** Users can quickly assess who is winning, reducing cognitive load.
- **Effort level:** `small`
- **Fit:** Relies heavily on parsing the board state, which aligns well with recent performance optimization work on `game.board()`.

## 3. Pawn Promotion Modal (Core Rules Gap)
- **Repo:** chesski
- **Area:** Game / ChessBoard
- **Relevant files:** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **Gap:** `ChessBoard.tsx` currently hardcodes all pawn promotions to Queen: `onMove({ from, to, promotion: 'q' });`. This prevents standard underpromotions (Rook, Bishop, Knight).
- **Feature:** When a user drags a pawn to the 1st or 8th rank, intercept the drop. Display a small inline UI or modal near the destination square to select Q, R, B, or N, and then fire `onMove` with the user's choice.
- **Why it's good:** Fixes a violation of standard chess rules and completes the core gameplay loop without expanding the app's scope.
- **Expected user impact:** Advanced users and those learning rules will not be confused by forced automatic promotions.
- **Effort level:** `medium`
- **Fit:** Requires extending the `react-dnd` drop logic and adding UI overlays, fitting well with recent DND optimizations.

## 4. Deep Linking for Tutorials (Growth)
- **Repo:** chesski
- **Area:** Tutorial View
- **Relevant files:** `src/components/Tutorial.tsx`, `src/App.tsx`
- **Gap:** The app supports sharing specific game states via the `?fen=` URL parameter. However, there is no way to share a link to a specific tutorial lesson.
- **Feature:** Add a check for a `?tutorial=[id]` URL parameter on initialization. Update the "Share Game" button logic to work in Tutorial mode, generating a link to the currently active tutorial.
- **Why it's good:** Reuses the existing URL sharing infrastructure to drive growth for the educational side of the application.
- **Expected user impact:** Allows teachers, parents, or friends to easily share specific piece movement lessons with beginners.
- **Effort level:** `small`
- **Fit:** Perfectly mirrors the FEN sharing logic recently added to `App.tsx`.

## 5. Clickable Move History for Time Travel (UX Improvement)
- **Repo:** chesski
- **Area:** Game / Sidebar
- **Relevant files:** `src/components/MoveHistory.tsx`, `src/App.tsx`
- **Gap:** `MoveHistory.tsx` lists past moves in pairs, but it is view-only.
- **Feature:** Make the rows in the move history table clickable. When clicked, reset the board state to that specific turn (either by calling `game.undo()` multiple times or loading the FEN from that point in history).
- **Why it's good:** A standard expectation in digital chess. Leverages the `game.history()` data already being processed.
- **Expected user impact:** Huge UX improvement allowing players to review mistakes or analyze past positions.
- **Effort level:** `medium`
- **Fit:** Naturally follows the recent PR that added and optimized the `MoveHistory` component.

## 6. Last Move Highlights (UX Improvement)
- **Repo:** chesski
- **Area:** Game / ChessBoard
- **Relevant files:** `src/components/ChessBoard.tsx`
- **Gap:** Valid moves are highlighted with dots, but the squares of the *last move played* (the origin and destination) are not highlighted.
- **Feature:** Extract the last move from `game.history({ verbose: true })`. Pass the `from` and `to` squares down to `ChessBoard` and apply a subtle distinct background color (e.g., `#fff3b0`) to those two squares.
- **Why it's good:** Standard chess UI pattern. Relies on data that `chess.js` already provides natively.
- **Expected user impact:** Greatly reduces the cognitive load of figuring out what move the opponent (or you) just made.
- **Effort level:** `small`
- **Fit:** Builds cleanly on top of the recent performance optimizations to the square highlighting system.