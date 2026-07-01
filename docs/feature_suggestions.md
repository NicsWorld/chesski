# Feature Suggestions for Chesski

Here is a ranked list of well-scoped, actionable feature suggestions that leverage existing infrastructure to improve core value, close obvious gaps, and introduce lightweight monetization paths.

## 1. Highlight Last Move

- **Repo:** chesski
- **Area / surface:** Game View / Board
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap/opportunity looks like today:** The `BoardSquareProps` interface defines a `lastMove` boolean, but it is currently hardcoded to `false`. Without highlighting the previous move, users can easily lose track of the game state, especially when sharing or reloading games.
- **The specific feature to build:** Pass the actual last move data from the `game.history({ verbose: true })` object in `App.tsx` down to the `ChessBoard` component. Use the `from` and `to` coordinates to dynamically set `lastMove` to `true` on the corresponding `BoardSquare` components, rendering a distinct CSS background or overlay.
- **Why this is a good small/focused task:** The infrastructure for highlighting (`lastMove` prop) and the data (`game.history()`) already exist; it just needs to be connected and styled.
- **Expected user impact:** Significantly improves usability and board legibility by answering "what just happened?"
- **Effort level:** small
- **Why it is a good fit for me:** I recently worked on `MoveHistory.tsx` and optimized square highlight checks in `ChessBoard.tsx`, making me deeply familiar with both the history API and square rendering logic.

## 2. Dynamic Pawn Promotion UI

- **Repo:** chesski
- **Area / surface:** Game View / Board Interaction
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap/opportunity looks like today:** In `src/components/ChessBoard.tsx`, the `handleDrop` function hardcodes all pawn promotions to Queen (`promotion: 'q'`). Underpromotion (e.g., to Knight to avoid stalemate) is impossible.
- **The specific feature to build:** When a pawn reaches the back rank during `handleDrop`, pause the move execution and render a lightweight React modal or inline overlay letting the user choose the promotion piece (Queen, Rook, Bishop, Knight). Use the selected piece to complete the `game.move()` call.
- **Why this is a good small/focused task:** The chess logic for promotion is already fully supported by `chess.js`; this is purely a frontend state and UI task.
- **Expected user impact:** Completes the core chess ruleset, eliminating a frustrating limitation for intermediate players.
- **Effort level:** medium
- **Why it is a good fit for me:** I've previously worked on error handling and state management for `handleMove` in `App.tsx`.

## 3. Display Captured Pieces (Material Advantage)

- **Repo:** chesski
- **Area / surface:** Game View / Info Panel
- **Relevant file(s):** `src/App.tsx`, (new) `src/components/CapturedPieces.tsx`
- **What the gap/opportunity looks like today:** There is a commented-out JSX placeholder (`{/* <div className="captured-area">...</div> */}`) in `App.tsx`. Users currently have to manually scan the board to figure out who is ahead in material.
- **The specific feature to build:** Create a component that compares the current board state (`game.board()`) against the starting position to calculate captured pieces. Render the captured pieces (using the existing `pieces/` assets and `pieceTheme` logic) above and below the `status-card` or `MoveHistory`, grouped by color.
- **Why this is a good small/focused task:** Leverages existing piece assets and the already-present layout placeholder. The calculation can be memoized easily.
- **Expected user impact:** Adds essential situational awareness, reducing cognitive load for players.
- **Effort level:** medium
- **Why it is a good fit for me:** I have a track record of removing dead code and unused placeholders, and I recently implemented the `Piece` tests, making me familiar with the asset structure.

## 4. Copy PGN to Clipboard

- **Repo:** chesski
- **Area / surface:** Game View / Action Buttons
- **Relevant file(s):** `src/App.tsx`
- **What the gap/opportunity looks like today:** The app has a "Share Game" feature that exports the current FEN via URL, but no way to export the full move history (PGN) for analysis in other tools (like Lichess or Chess.com).
- **The specific feature to build:** Add an "Export PGN" button next to "Share Game" in `App.tsx`. When clicked, it calls `game.pgn()`, copies the string using `navigator.clipboard.writeText()`, and briefly updates the `message` state to confirm success (mirroring the existing "Share Game" pattern).
- **Why this is a good small/focused task:** Reuses the exact same feedback mechanism and clipboard API as the existing "Share Game" button, just calling a different built-in `chess.js` method.
- **Expected user impact:** Unlocks portability for serious players wanting to analyze their games elsewhere.
- **Effort level:** small
- **Why it is a good fit for me:** I am already familiar with the `shareGame` function's clipboard implementation and error handling requirements.

## 5. Board Flipping (Play as Black)

- **Repo:** chesski
- **Area / surface:** Game View / Board
- **Relevant file(s):** `src/App.tsx`, `src/components/ChessBoard.tsx`
- **What the gap/opportunity looks like today:** The board always renders from White's perspective (rank 1 at the bottom).
- **The specific feature to build:** Add a `flipped` boolean state to `App.tsx` and a toggle button in the header or action area. Pass `flipped` as a prop to `ChessBoard.tsx`. If true, reverse the order of the ranks and files when iterating to generate the `BoardSquare` components.
- **Why this is a good small/focused task:** Requires no changes to game logic (`chess.js` handles moves purely by coordinate); it is strictly a rendering order adjustment in a single component.
- **Expected user impact:** Essential for users wanting to play or analyze from Black's perspective.
- **Effort level:** small
- **Why it is a good fit for me:** Fits well with my recent work optimizing the rendering loops (e.g., using `Set` instead of `Array` in highlight checks) within the board component.

## 6. Premium Themes (Lightweight Monetization)

- **Repo:** chesski
- **Area / surface:** App Header / Theme Selection
- **Relevant file(s):** `src/App.tsx`, `src/components/Piece.tsx`
- **What the gap/opportunity looks like today:** The app has a theme selector ("Zoo" vs "Standard"), but no monetization path. The user prompt requested "ways to make money."
- **The specific feature to build:** Add 1-2 new, high-quality themes (e.g., "Neon", "Wood") to the UI. When a user clicks a premium theme, display a modal (e.g., integrating a simple Stripe Checkout payment link or a "Buy me a coffee" link) to unlock it. Store the unlock status in `localStorage`.
- **Why this is a good small/focused task:** The theme-switching infrastructure is already fully implemented (`pieceTheme` state, conditional rendering in `Piece.tsx`). Adding new options and a paywall modal slots perfectly into this existing pattern without disrupting core gameplay.
- **Expected user impact:** Provides a non-intrusive way to generate revenue from engaged users who want cosmetic upgrades.
- **Effort level:** medium
- **Why it is a good fit for me:** I've worked extensively with the `Piece` component and asset rendering logic, making it easy for me to integrate new theme definitions cleanly.