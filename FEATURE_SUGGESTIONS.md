# Feature Suggestions for Chesski

## 1. Highlight Last Move
*   **Repo:** chesski
*   **Area / surface:** Game Board UI
*   **Relevant file(s):** `src/App.tsx`, `src/components/ChessBoard.tsx`
*   **What the gap or opportunity looks like today:** The `BoardSquareProps` interface already defines a `lastMove` boolean, but in `ChessBoard.tsx` it is hardcoded to `lastMove={false}`. Players have no visual indicator of what move the opponent just made, which is a standard expectation in digital chess.
*   **The specific feature to build:** Extract the last move from `game.history({ verbose: true })` in `App.tsx` (or directly in `ChessBoard.tsx`), identify the `from` and `to` squares, and pass `lastMove={true}` to the corresponding `SquareWrapper` components to render a subtle background highlight.
*   **Why this is a good small, focused task:** The CSS/styling and prop plumbing mostly already exist. It simply requires mapping the `chess.js` state to the React components.
*   **Expected user impact:** Massive reduction in cognitive load for players trying to track the game state, especially after returning to a shared game URL.
*   **Effort level:** `small`
*   **Why it is a good fit:** I recently worked extensively with the React component props and `chess.js` game state integration. Plucking the last move from the game state and passing it down aligns perfectly with my recent frontend data-binding work.

## 2. Dynamic Pawn Promotion UI
*   **Repo:** chesski
*   **Area / surface:** Game Board / Move Logic
*   **Relevant file(s):** `src/components/ChessBoard.tsx`
*   **What the gap or opportunity looks like today:** When a pawn reaches the 8th rank, the `handleDrop` function hardcodes the promotion to a Queen (`promotion: 'q'`). Players are completely blocked from under-promoting (e.g., to a Knight for a smothered mate), technically making the chess engine incomplete.
*   **The specific feature to build:** When a move triggers a promotion (detectable via `chess.js`'s move validation), pause the `onMove` execution, render a small inline modal over the target square with icons for Queen, Rook, Bishop, and Knight, and complete the move with the selected piece.
*   **Why this is a good small, focused task:** It closes an obvious functional gap in the core rules of chess without requiring any new backend or structural changes.
*   **Expected user impact:** Restores full standard chess rules, preventing edge-case game-breaking scenarios for advanced players.
*   **Effort level:** `medium`
*   **Why it is a good fit:** Having touched the drag-and-drop mechanics and `onMove` handlers recently, I understand exactly where to intercept the move logic and how to leverage the existing `Piece` component to render the selection modal.

## 3. "Premium" Themes (Monetization)
*   **Repo:** chesski
*   **Area / surface:** App Header / Monetization
*   **Relevant file(s):** `src/App.tsx`, `src/components/Piece.tsx`
*   **What the gap or opportunity looks like today:** The app has a fun "Zoo" theme freely available via a toggle. There is currently no mechanism to generate revenue.
*   **The specific feature to build:** Introduce a "Dinosaur" or "Space" premium theme. Add it to the Theme toggle list with a lock icon. When clicked, it opens a Stripe checkout link (or a placeholder modal for now) to "Unlock Premium Themes for $2.99". Store the unlock state in `localStorage`.
*   **Why this is a good small, focused task:** It directly answers the goal to "Find ways to make money" using the exact infrastructure already built for the `pieceTheme` state and asset loading.
*   **Expected user impact:** Creates a direct monetization funnel with zero disruption to the free core gameplay.
*   **Effort level:** `small`
*   **Why it is a good fit:** I am intimately familiar with how `pieceTheme` is propagated down to the `Piece` component. Adding a new theme and a gated state check is a natural extension of my recent state management updates.

## 4. Captured Pieces (Material Advantage Indicator)
*   **Repo:** chesski
*   **Area / surface:** Info Panel / Game Info
*   **Relevant file(s):** `src/App.tsx`
*   **What the gap or opportunity looks like today:** There is a commented-out placeholder `{/* <div className="captured-area">...</div> */}` in `App.tsx`. Players cannot see at a glance who is ahead on material without manually counting pieces on the board.
*   **The specific feature to build:** Create a utility function to parse the current board state (`game.board()`) and compare piece counts against standard starting values. Render small, static images of the captured pieces (using the current `pieceTheme`) in the Info Panel, grouped by color, alongside a calculated material score (e.g., "+2").
*   **Why this is a good small, focused task:** It utilizes data already present in the active `chess.js` instance and fills an explicitly identified gap in the UI layout.
*   **Expected user impact:** Provides crucial strategic context for players at a glance, highly expected in modern chess apps.
*   **Effort level:** `medium`
*   **Why it is a good fit:** I have recently written utilities around `chess.js` state evaluation (like `evaluateGameStatus`). Building a material calculator follows the exact same pattern.

## 5. "Play from Here" in Tutorials
*   **Repo:** chesski
*   **Area / surface:** Tutorial View -> Game View transition
*   **Relevant file(s):** `src/components/Tutorial.tsx`, `src/App.tsx`
*   **What the gap or opportunity looks like today:** Tutorials set up specific board states (FENs) for learning piece movements, but players are restricted to the tutorial sandbox and cannot seamlessly transition that specific board state into a fully playable standard game.
*   **The specific feature to build:** Add a "Play from Here" button in the Tutorial sidebar. When clicked, it takes the current tutorial's FEN, calls `setView('game')`, and initializes the main game board with that FEN so the user can play it out.
*   **Why this is a good small, focused task:** It bridges two existing, isolated features (Tutorials and Game View) using the URL/FEN sharing parameter logic already established in `App.tsx`.
*   **Expected user impact:** Hugely increases the replayability and interactivity of tutorials, allowing users to experiment freely.
*   **Effort level:** `small`
*   **Why it is a good fit:** I worked on the FEN URL parameter initialization in `App.tsx`. Reusing that FEN-passing pattern to hand off state from Tutorial to Game is a low-risk, high-reward integration.

## 6. Interactive Illegal Move Feedback
*   **Repo:** chesski
*   **Area / surface:** Game Board UI
*   **Relevant file(s):** `src/App.tsx`, `src/components/ChessBoard.tsx`
*   **What the gap or opportunity looks like today:** When a player attempts an illegal move, the text in the status card briefly changes to "Oops! You can't move there." However, players focused on the board often miss the text change, leading to confusion about why their piece snapped back.
*   **The specific feature to build:** When `game.move()` throws an error in `handleMove`, trigger a state toggle that applies a brief CSS `.shake` animation class to the entire `ChessBoard` or the specific `SquareWrapper` they tried to drop on.
*   **Why this is a good small, focused task:** It's a pure UI polish task that hooks into the existing `catch` block for invalid moves.
*   **Expected user impact:** Makes the application feel significantly more responsive and tactile, instantly communicating rule boundaries without requiring the user to look away from the board.
*   **Effort level:** `small`
*   **Why it is a good fit:** I recently ensured that `game.move()` invalidation is wrapped in `try...catch` blocks to prevent crashes. Hooking visual feedback into that exact catch block is the perfect logical next step.