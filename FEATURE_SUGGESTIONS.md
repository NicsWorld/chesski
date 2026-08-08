# Chesski Feature Suggestions

Here is a prioritized list of high-value, actionable feature ideas based on the current codebase, optimized for growth, user value, and leveraging existing patterns.

## 1. "Share on X / Twitter" Intent (Growth)
- **Repo:** chesski
- **Area / surface:** Info Panel / Action Buttons
- **Relevant file(s):** `src/App.tsx`
- **What the gap or opportunity looks like today:** The `shareGame` function copies a FEN-encoded URL to the clipboard, but users have to manually open social apps and paste it, causing friction for viral sharing.
- **The specific feature to build:** Add a "Share to X" button next to "Share Game". Clicking it opens a new tab using the `intent/tweet` URL, pre-populated with a message (e.g., "Check out my Chesski position!") and the FEN URL.
- **Why this is a good small/focused task:** Reuses the existing FEN URL generation logic. It only requires a new button and a simple `window.open()` call.
- **Expected user impact:** Reduces friction for users sharing games on social media, directly driving viral loop growth and new user acquisition.
- **Effort level:** `small`
- **Why it is a good fit:** It directly extends the recent sharing work in `shareGame` with an immediate growth benefit.

## 2. Premium Theme Upsell (Monetization)
- **Repo:** chesski
- **Area / surface:** Header / Theme Selector
- **Relevant file(s):** `src/App.tsx`, `src/components/Piece.tsx`, `src/components/ChessBoard.tsx`
- **What the gap or opportunity looks like today:** The app offers "Zoo" and "Standard" themes for free, with robust infrastructure for theme passing, but no current monetization strategy.
- **The specific feature to build:** Introduce a third premium theme (e.g., "Cosmic" or "Pixel"). Display it in the header with a lock icon. Clicking it opens a simple modal with a payment link (e.g., Stripe Payment Link). Once paid (or simulated), unlock the theme via local storage.
- **Why this is a good small/focused task:** The `pieceTheme` prop is already wired throughout the app. Adding a new state and conditional payment link requires minimal structural change.
- **Expected user impact:** Validates willingness to pay and introduces a revenue stream without gating core gameplay.
- **Effort level:** `medium`
- **Why it is a good fit:** Leverages the existing theme-switching pattern to introduce monetization safely.

## 3. Captured Pieces / Material Advantage (Core Value)
- **Repo:** chesski
- **Area / surface:** Info Panel / Game Layout
- **Relevant file(s):** `src/App.tsx`
- **What the gap or opportunity looks like today:** There is a commented-out `{/* <div className="captured-area">...</div> */}` placeholder in `App.tsx`. Users currently have to mentally calculate material balance.
- **The specific feature to build:** Calculate captured pieces by comparing a standard starting set with the current `game.board()` state. Render small icons for captured pieces grouped by color in the `captured-area`, along with a calculated material score (e.g., "+2").
- **Why this is a good small/focused task:** The UI placeholder exists, and `chess.js` provides easy access to the board state. It's a pure UI projection of existing data.
- **Expected user impact:** Closes a major UX gap expected in modern chess apps, significantly helping players evaluate positions.
- **Effort level:** `medium`
- **Why it is a good fit:** Fills an obvious incomplete feature utilizing the same piece assets and game state currently in use.

## 4. PGN Export (Core Value)
- **Repo:** chesski
- **Area / surface:** Move History
- **Relevant file(s):** `src/components/MoveHistory.tsx` or `src/App.tsx`
- **What the gap or opportunity looks like today:** The `MoveHistory` component lists moves, but users cannot export their games to analyze them in other standard chess tools (like Lichess or Chess.com).
- **The specific feature to build:** Add a "Copy PGN" button near the move history that calls `game.pgn()` and writes the standard PGN string to the clipboard via `navigator.clipboard.writeText`.
- **Why this is a good small/focused task:** `chess.js` natively supports `game.pgn()`. It requires almost no custom calculation or logic.
- **Expected user impact:** Extremely valuable for intermediate/advanced players wanting to save or analyze their games externally.
- **Effort level:** `small`
- **Why it is a good fit:** Directly extends the existing move tracking using an out-of-the-box library method.

## 5. Pawn Underpromotion UI (Core Value)
- **Repo:** chesski
- **Area / surface:** ChessBoard / Drop Logic
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap or opportunity looks like today:** Pawn promotion is hardcoded to Queen (`promotion: 'q'`) in the `handleDrop` function, making underpromotion (e.g., to Knight) impossible.
- **The specific feature to build:** When a pawn lands on the 1st/8th rank, pause the move execution and render a small floating modal over the target square with options for Queen, Rook, Bishop, and Knight. Complete the move based on the user's choice.
- **Why this is a good small/focused task:** Fixes a critical chess rule violation without needing new backends; it just requires a React state check before finalizing the move.
- **Expected user impact:** Allows advanced players to play legally and removes a frustrating limitation.
- **Effort level:** `medium`
- **Why it is a good fit:** Fixes a glaringly hardcoded parameter in an otherwise fully functional drag-and-drop system.

## 6. Next / Previous Tutorial Navigation (Friction Reduction)
- **Repo:** chesski
- **Area / surface:** Tutorial View
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What the gap or opportunity looks like today:** Users have to manually click distinct buttons to change tutorials; there is no guided, linear flow.
- **The specific feature to build:** Add "Next" and "Previous" buttons at the bottom of the tutorial panel that update `activeTutorial` by incrementing/decrementing its index in the `tutorials` array.
- **Why this is a good small/focused task:** The `tutorials` array and `activeTutorial` state already exist. It only requires simple index math and two new buttons.
- **Expected user impact:** Creates a smoother, guided learning experience for beginners, improving engagement and retention.
- **Effort level:** `small`
- **Why it is a good fit:** A clean, self-contained UI addition to a specific isolated component that I can implement quickly.
