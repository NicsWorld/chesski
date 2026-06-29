# Refactoring Suggestions

Here is a best-first ranked list of small, low-risk, high-leverage refactor tasks for the `chesski` repository, based on recent contributions to the thematic UI and tutorial features.

### 1. Extract `tutorials` constant data to separate file
- **Repo:** chesski
- **Area:** React Components / Content
- **Relevant file(s):** `src/components/Tutorial.tsx`, `src/data/tutorials.ts` (new)
- **What looks off today:** The `tutorials` array, containing bulky strings (titles, descriptions, and FENs), is hardcoded at the top of `Tutorial.tsx`, heavily cluttering the view logic.
- **The specific refactor to make:** Move the `tutorials` array into a new file `src/data/tutorials.ts`, export it, and import it into `Tutorial.tsx`.
- **Why this is a good small task:** It cleanly separates static content from presentation logic, making the component file significantly shorter and easier to navigate.
- **Expected impact:** Improved maintainability and readability of `Tutorial.tsx`.
- **Risk level:** `low`
- **Why it is a good fit:** I recently touched the tutorial component; this separates the data from the UI mechanics I was working on.

### 2. Extract `addKingsToFen` and `removeKings` into a pure utility module
- **Repo:** chesski
- **Area:** Core Game Logic
- **Relevant file(s):** `src/components/Tutorial.tsx`, `src/utils/fenHelpers.ts` (new)
- **What looks off today:** Complex FEN string manipulation and board mutation logic (`addKingsToFen` and `removeKings`) are defined directly inside the React component file (`Tutorial.tsx`).
- **The specific refactor to make:** Move these two functions into a new dedicated utility file (`src/utils/fenHelpers.ts`) and export them.
- **Why this is a good small task:** De-couples domain logic from the React UI. It creates a clear interface boundary and enables these pure(ish) functions to be unit tested in isolation without rendering React components.
- **Expected impact:** Better separation of concerns and immediate testability for complex FEN manipulation.
- **Risk level:** `low`
- **Why it is a good fit:** I worked heavily on the game state and UI recently; tightening the FEN parsing logic fits perfectly into my familiarity with this system.

### 3. Consolidate URL initialization logic in App state
- **Repo:** chesski
- **Area:** App Initialization
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** `new URLSearchParams(window.location.search)` is instantiated redundantly in two separate `useState` lazy initializer callbacks for `view` and `_fen`.
- **The specific refactor to make:** Create a single helper function (e.g., `getInitialAppState()`) outside the component that parses the URL parameters once and returns an object containing the initial `view` and `fen`.
- **Why this is a good small task:** Removes duplicated boilerplate and centralizes the side-effect of reading the browser URL.
- **Expected impact:** Cleaner, DRY-er initialization logic in the root component.
- **Risk level:** `low`
- **Why it is a good fit:** I added/touched the game modes and FEN sharing logic in `App.tsx`; cleaning up its initialization is a natural follow-up.

### 4. Extract `FILES`, `RANKS`, and `isBlackSquare` to a board utility
- **Repo:** chesski
- **Area:** UI Components / Constants
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/utils/boardUtils.ts` (new)
- **What looks off today:** `FILES`, `RANKS` arrays and the generic `isBlackSquare` calculation are defined alongside the specific drag-and-drop `ChessBoard` logic.
- **The specific refactor to make:** Move these constants and the pure helper function into a reusable `src/utils/boardUtils.ts` file.
- **Why this is a good small task:** Removes generic board topology concepts from the React rendering layer, shrinking the file size.
- **Expected impact:** Cleaner component file and reusable coordinate logic.
- **Risk level:** `low`
- **Why it is a good fit:** Directly addresses UI component clutter from the recent 3D theme and board visual updates I made.

### 5. De-duplicate piece asset resolution in `Piece.tsx`
- **Repo:** chesski
- **Area:** Asset Management
- **Relevant file(s):** `src/components/Piece.tsx`
- **What looks off today:** The `getPieceImage` function is defined inside the component and rebuilds its logic on every render, coupling the component lifecycle to simple path generation.
- **The specific refactor to make:** Extract a pure helper function `resolvePieceAssetPath(theme, color, type)` outside the component body.
- **Why this is a good small task:** Simplifies the component body, prevents recreating the function on every render, and creates a single easily-testable source of truth for asset mapping.
- **Expected impact:** Slightly tighter component and clear mapping logic.
- **Risk level:** `low`
- **Why it is a good fit:** I recently introduced the `zoo` theme and these assets; this solidifies how those assets are resolved.

### 6. Document and extract hardcoded promotion logic
- **Repo:** chesski
- **Area:** Game Logic / Constants
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What looks off today:** Pawn promotion is silently hardcoded to Queen (`promotion: 'q'`) inside the `handleDrop` callback without context.
- **The specific refactor to make:** Extract this into a named constant at the top of the file (e.g., `const DEFAULT_PROMOTION = 'q';`) and add a small comment indicating it's a placeholder until a promotion selection UI is built.
- **Why this is a good small task:** It documents an implicit piece of tech-debt explicitly without risking behavior changes.
- **Expected impact:** Makes the codebase friendlier for future contributors by highlighting where the promotion UI hook needs to go.
- **Risk level:** `low`
- **Why it is a good fit:** A tiny polish task in the board interaction layer I've been working with.
