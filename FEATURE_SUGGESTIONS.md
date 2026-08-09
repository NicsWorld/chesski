# Feature Suggestions for Chesski

Here is a ranked list of 5 concrete, actionable feature suggestions that are focused, self-contained, and leverage existing infrastructure.

## 1. Captured Pieces / Material Advantage Display
- **Repo:** chesski
- **Area / surface:** Info Panel / Sidebar UI
- **Relevant file(s):** `src/App.tsx`, (new) `src/components/CapturedPieces.tsx`
- **What the gap or opportunity looks like today:** There is a commented-out placeholder `<div className="captured-area">...</div>` in `App.tsx`. Currently, users cannot see which pieces they have captured or who is ahead in material, which is a standard feature in chess apps.
- **The specific feature to build:** Parse the current FEN string or keep a running tally of captured pieces. Render a visual component in the sidebar displaying captured pieces grouped by color, alongside a calculated material advantage score (e.g., "+3").
- **Why this is a good small, focused task:** The layout space is already reserved. The data needed can be derived easily from the `chess.js` game state without any new external APIs. It directly addresses a known missing UI element.
- **Expected user impact:** High. Players constantly rely on material advantage to evaluate positions. It improves the core play experience immediately.
- **Effort level:** `small`
- **Why it is a good fit for me:** It involves state management and UI rendering in React, building directly upon the existing `Chess` object integration pattern used in `App.tsx`.

## 2. Last Move Highlighting on Board
- **Repo:** chesski
- **Area / surface:** Chess Board
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx` (to pass the last move)
- **What the gap or opportunity looks like today:** The `BoardSquareProps` interface in `ChessBoard.tsx` defines a `lastMove` boolean, but it is currently hardcoded to `lastMove={false}`. Users cannot easily see what the opponent just moved.
- **The specific feature to build:** Update `App.tsx` (or `ChessBoard.tsx`) to track the previous move's "from" and "to" squares. Pass these to the respective `SquareWrapper` components to render a subtle background highlight (using the `lastMove` prop) indicating the most recent action.
- **Why this is a good small, focused task:** The component API already anticipates this (`lastMove` prop exists). It just requires threading the state from the `chess.js` history or move result down to the board rendering loop.
- **Expected user impact:** High. Reducing cognitive load by showing the opponent's last move is a basic expectation for chess interfaces.
- **Effort level:** `small`
- **Why it is a good fit for me:** I've been working with the board's rendering logic and component props. This just closes the loop on an unfinished pattern.

## 3. Pawn Underpromotion UI Modal
- **Repo:** chesski
- **Area / surface:** Chess Board / Move Handling
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap or opportunity looks like today:** Inside `handleDrop` in `ChessBoard.tsx`, pawn promotion is hardcoded to Queen (`promotion: 'q'`). This means players cannot legally play underpromotions (e.g., to Knight), which is occasionally required in games and puzzles.
- **The specific feature to build:** Before executing a pawn move to the final rank, pause the move execution and display a small, absolute-positioned modal or overlay at the target square letting the user choose Queen, Rook, Bishop, or Knight. Once selected, execute the move with the chosen promotion character.
- **Why this is a good small, focused task:** It fixes a silent bug/limitation in the game rules using existing state patterns. The UI can be very simple (just four piece images) and constrained strictly to `ChessBoard.tsx`.
- **Expected user impact:** Medium. While rare in casual play, serious players expect full rule compliance. It closes an obvious feature gap.
- **Effort level:** `medium`
- **Why it is a good fit for me:** Dealing with drag-and-drop state interruptions and conditional rendering is exactly in line with the recent board interaction work.

## 4. Clickable Move History to Navigate Game State
- **Repo:** chesski
- **Area / surface:** Move History Sidebar
- **Relevant file(s):** `src/components/MoveHistory.tsx`, `src/App.tsx`
- **What the gap or opportunity looks like today:** `MoveHistory.tsx` displays a static table of moves. A user cannot click a move to see the board state at that point in time, which is a common way to review games.
- **The specific feature to build:** Add an `onClick` handler to the move entries in the history table. When clicked, load the FEN at that specific half-move into a "review mode" state in `App.tsx`, rendering the board temporarily at that position without losing the actual game state (or allowing branch continuation if desired).
- **Why this is a good small, focused task:** The move data is already cleanly formatted in the component. The `chess.js` instance can easily generate FENs for any point in the history. It's just a matter of adding interaction and managing a separate "view" state.
- **Expected user impact:** Medium. Greatly improves post-game analysis and learning.
- **Effort level:** `medium`
- **Why it is a good fit for me:** I am already familiar with routing FEN strings into the board state. This extends the existing state management in `App.tsx` to handle historical states.

## 5. Tutorial Next/Previous Navigation Buttons
- **Repo:** chesski
- **Area / surface:** Tutorial View
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What the gap or opportunity looks like today:** The `Tutorial.tsx` component relies on users clicking specific lesson buttons to jump around. There is no guided flow to step through lessons sequentially.
- **The specific feature to build:** Add "Next" and "Previous" buttons at the bottom of the tutorial info panel that update the `activeTutorial` state to the next/previous index in the `tutorials` array. Hide "Previous" on the first step, and change "Next" to "Finish" (returning to game view) on the last step.
- **Why this is a good small, focused task:** It requires zero new external dependencies or complex logic. It simply wraps an existing state update pattern in new UI elements.
- **Expected user impact:** Low/Medium. It reduces friction for new users trying to learn the game, creating a smoother onboarding experience.
- **Effort level:** `small`
- **Why it is a good fit for me:** I've worked on the tutorial component's structure. This is a straightforward UI enhancement that improves flow.
