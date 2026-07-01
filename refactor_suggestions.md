# Refactoring Suggestions for `chesski`

Here is a best-first ranked list of small, actionable refactoring tasks for the `chesski` repository. These are focused on areas with recent contribution history, prioritizing high-leverage cleanup and deduplication without altering product behavior.

### 1. Fix Zoo Theme Assets and Remove CSS Filter Hack
- **Repo:** chesski
- **Area / surface:** Piece Rendering UI
- **Relevant file(s):** `src/components/Piece.tsx`
- **What looks off today:** The `zoo` theme incorrectly uses white piece assets for both colors and relies on an inline CSS filter hack (`filter: brightness(0.4) contrast(1.2)`) to simulate black pieces. Real black piece assets (e.g., `animal_bK.png`) already exist in `public/pieces/` but are dead code.
- **The specific refactor to make:** Update `getPieceImage()` to dynamically use `piece.color` in the filename (e.g., returning `animal_${piece.color}${piece.type.toUpperCase()}.png` instead of hardcoding `w`). Remove the inline `filter` property entirely.
- **Why this is a good small task:** It removes a messy inline style hack, deletes dead code by properly utilizing existing assets, and requires changes in only one component.
- **Expected impact:** Cleaner component logic, better-looking pieces without artifacts, and zero unused asset bloat.
- **Risk level:** `low`
- **Why it is a good fit for me:** I have recent context on the UI/React components in this project, making this a straightforward and safe visual cleanup.

### 2. Extract `BoardSquare` and `SquareWrapper` Components
- **Repo:** chesski
- **Area / surface:** Chessboard UI Components
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/components/BoardSquare.tsx` (new)
- **What looks off today:** `ChessBoard.tsx` is over 170 lines long and houses three distinct React components: `BoardSquare` (dumb presentation), `SquareWrapper` (drag-and-drop logic), and `ChessBoard` (grid and state orchestration).
- **The specific refactor to make:** Extract `BoardSquare` and `SquareWrapper` into a new `BoardSquare.tsx` file, then import them back into `ChessBoard.tsx`.
- **Why this is a good small task:** This is pure, mechanical code movement that separates presentation details from board state logic without requiring logic changes.
- **Expected impact:** Makes `ChessBoard.tsx` much shorter, focused purely on board state mapping and piece orchestration.
- **Risk level:** `low`
- **Why it is a good fit for me:** Having recently worked with the React structure and drag-and-drop context here, this is a very familiar area for structural cleanup.

### 3. Create a `useChessGame` Hook to Deduplicate Game State
- **Repo:** chesski
- **Area / surface:** Game State Management
- **Relevant file(s):** `src/App.tsx`, `src/components/Tutorial.tsx`, `src/hooks/useChessGame.ts` (new)
- **What looks off today:** Both `App.tsx` and `Tutorial.tsx` duplicate identical logic to synchronize a `Chess` instance and a `fen` string in separate `useState` calls. They both reimplement `try/catch` wrappers around `game.move()` to safely handle invalid moves and trigger React re-renders.
- **The specific refactor to make:** Extract a `useChessGame(initialFen?)` custom hook that encapsulates `useState(new Chess())`, `useState(fen)`, a safe `move()` wrapper, and a `reset()` function. Replace the inline logic in both components with this single hook.
- **Why this is a good small task:** It consolidates identical, slightly tricky state synchronization logic into a single, highly testable boundary.
- **Expected impact:** Significantly reduces duplication, standardizes error handling for moves across the app, and slims down main components.
- **Risk level:** `medium`
- **Why it is a good fit for me:** I have deep context on how `chess.js` mutable instances interact with React rendering cycles from recent commits, making me well-equipped to abstract this safely.

### 4. Isolate Tutorial Data and FEN Manipulation Logic
- **Repo:** chesski
- **Area / surface:** Tutorial Logic
- **Relevant file(s):** `src/components/Tutorial.tsx`, `src/utils/tutorialUtils.ts` (new), `src/data/tutorials.ts` (new)
- **What looks off today:** `Tutorial.tsx` is bloated because it mixes UI rendering, a hardcoded `tutorials` data array, and complex string manipulation functions (`addKingsToFen`, `removeKings`, `initGame`).
- **The specific refactor to make:** Extract the `tutorials` array to a constants file (`src/data/tutorials.ts`). Extract `addKingsToFen` and `removeKings` into a pure utility module (`src/utils/tutorialUtils.ts`).
- **Why this is a good small task:** It cleanly separates business logic (FEN string parsing) and static data from the React presentation layer.
- **Expected impact:** Improves the readability of `Tutorial.tsx` and enables trivial unit testing for the FEN manipulation logic, which is currently hidden inside a component file.
- **Risk level:** `low`
- **Why it is a good fit for me:** I am intimately familiar with the tutorial logic and how it modifies FEN strings, making this a natural and highly safe cleanup pass.

### 5. Centralize and Secure URL Parameter Parsing
- **Repo:** chesski
- **Area / surface:** App Initialization / Shared Games
- **Relevant file(s):** `src/App.tsx`, `src/utils/urlState.ts` (new)
- **What looks off today:** `App.tsx` contains duplicated logic to read `new URLSearchParams(window.location.search)` inline within the `useState` lazy initializers for both the `view` and `_fen` states. Furthermore, FEN parsing from the URL lacks validation before instantiation.
- **The specific refactor to make:** Extract a pure helper function (e.g., `getInitialGameState()`) outside the component that reads the URL once. Add logic to enforce a strict length limit (e.g., <= 100 chars) and validate the string format using `validateFen(fen).ok` before passing it to `new Chess(fenParam)`, guarding against bad input.
- **Why this is a good small task:** It cleans up the messy component initialization block while simultaneously closing a potential ReDoS/memory-exhaustion vector caused by unchecked external inputs.
- **Expected impact:** Cleaner startup logic, consolidated URL reading, and improved security/robustness against malformed shared links.
- **Risk level:** `low`
- **Why it is a good fit for me:** I understand how the URL "Shared Game" feature initializes state from my recent work, allowing me to easily tighten this boundary.