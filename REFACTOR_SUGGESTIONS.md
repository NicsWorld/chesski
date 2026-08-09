# Refactor Suggestions

Here is a prioritized list of small, low-risk, high-leverage refactor tasks for the chesski project, focusing on improving maintainability, reducing duplication, and tightening the local design without altering product behavior.

### 1. Extract domain logic from Tutorial component
- **Repo**: chesski
- **Area / surface**: Tutorial Feature
- **Relevant file(s)**: `src/components/Tutorial.tsx`, `src/utils/fenHelpers.ts` (new)
- **What looks off today**: Pure domain string manipulation functions (`addKingsToFen` and `removeKings`) are defined directly inside the React component file, mixing domain logic with UI presentation.
- **The specific refactor to make**: Extract `addKingsToFen` and `removeKings` into a dedicated utility module (e.g., `src/utils/fenHelpers.ts`) and import them into `Tutorial.tsx`.
- **Why this is a good small task**: It's a pure code movement task that strictly separates concerns, making the component file smaller and the domain logic independently testable.
- **Expected impact**: Improved code organization, easier unit testing for FEN string manipulation, and better separation of concerns.
- **Risk level**: `low`
- **Why it is a good fit for me**: I have recent context on how the tutorial handles FEN strings and have previously worked with testing domain logic in this repo.

### 2. Replace CSS filter with native assets for black zoo pieces
- **Repo**: chesski
- **Area / surface**: Piece Rendering
- **Relevant file(s)**: `src/components/Piece.tsx`
- **What looks off today**: The 'zoo' theme currently renders white piece assets for both colors and uses a CSS filter (`filter: 'brightness(0.4) contrast(1.2)'`) to simulate black pieces, even though dedicated black piece assets (e.g., `animal_bK.png`) exist in the `public/pieces/` directory.
- **The specific refactor to make**: Update `getPieceImage()` in `Piece.tsx` to conditionally resolve the correct asset name based on the piece color (e.g., `animal_${piece.color}${piece.type.toUpperCase()}.png`) and remove the inline CSS filter.
- **Why this is a good small task**: It replaces an arbitrary CSS hack with proper asset utilization in a single, isolated component.
- **Expected impact**: Cleaner rendering code, potential performance improvement by removing the CSS filter, and better visual consistency.
- **Risk level**: `low`
- **Why it is a good fit for me**: I have recently worked with piece rendering logic, drag-and-drop state, and UI representations in this component.

### 3. Consolidate and validate FEN URL parsing
- **Repo**: chesski
- **Area / surface**: App Initialization / State Management
- **Relevant file(s)**: `src/App.tsx`
- **What looks off today**: URL search parameter parsing for FEN strings is duplicated directly inside multiple `useState` initialization callbacks (for `view` and `_fen`), lacking centralized validation or length limits, which poses a minor ReDoS/memory exhaustion risk.
- **The specific refactor to make**: Create a single helper function to parse, validate (e.g., using `validateFen(fen).ok`), and enforce a length limit on the FEN string from the URL, then use this helper to initialize the application state.
- **Why this is a good small task**: It consolidates duplicated initialization logic into a robust, secure utility without changing the overall application flow.
- **Expected impact**: Improved security and resilience against malformed URLs, and cleaner state initialization in `App.tsx`.
- **Risk level**: `low`
- **Why it is a good fit for me**: I am familiar with the FEN handling requirements and have historical context on security/validation practices for `chess.js` inputs.

### 4. Wire up last move highlighting
- **Repo**: chesski
- **Area / surface**: Board Rendering
- **Relevant file(s)**: `src/components/ChessBoard.tsx`
- **What looks off today**: The `BoardSquareProps` interface defines a `lastMove` boolean, but it is currently hardcoded to `false` when rendering the board, making the prop useless.
- **The specific refactor to make**: Pass the actual last move information down from the `ChessBoard` (or `App.tsx`) state to the `lastMove` prop to enable the visual highlighting of the most recently moved piece.
- **Why this is a good small task**: The UI infrastructure for this feature already exists; it just needs to be connected to the state.
- **Expected impact**: Improved user experience and visual feedback without adding new UI components.
- **Risk level**: `low`
- **Why it is a good fit for me**: I have recent context on the `ChessBoard` component's prop structure and state management.

### 5. Utilize evaluation utility for initial game status
- **Repo**: chesski
- **Area / surface**: App State
- **Relevant file(s)**: `src/App.tsx`
- **What looks off today**: The initial game status message is hardcoded to `"Welcome! Drag the white pieces to start."`, bypassing the `evaluateGameStatus(game)` utility that handles status messages throughout the rest of the application lifecycle.
- **The specific refactor to make**: Update the `message` state initialization to use `evaluateGameStatus(new Chess())` or a similar integrated approach, or standardize how the welcome message is handled within the evaluation utility.
- **Why this is a good small task**: It removes a hardcoded string and unifies the state management for game status messaging.
- **Expected impact**: More consistent application state and a single source of truth for game status messages.
- **Risk level**: `low`
- **Why it is a good fit for me**: I have worked on the UI state updates and asynchronous message handling (e.g., the 2000ms delay logic) in `App.tsx`.

### 6. Extract static tutorial data
- **Repo**: chesski
- **Area / surface**: Tutorial Feature
- **Relevant file(s)**: `src/components/Tutorial.tsx`, `src/data/tutorials.ts` (new)
- **What looks off today**: The `tutorials` data array is hardcoded directly inside the `Tutorial.tsx` component file, cluttering the view logic.
- **The specific refactor to make**: Move the `tutorials` array into a dedicated constants file (e.g., `src/data/tutorials.ts`) and import it into the component.
- **Why this is a good small task**: It is a trivial extraction that immediately improves the readability of the component file.
- **Expected impact**: Cleaner component file and easier management of tutorial content.
- **Risk level**: `low`
- **Why it is a good fit for me**: I am very familiar with the `Tutorial.tsx` component and the structure of the data it consumes.

### 7. Clean up dead code placeholders
- **Repo**: chesski
- **Area / surface**: App UI Layout
- **Relevant file(s)**: `src/App.tsx`
- **What looks off today**: There is an unused, commented-out placeholder `{/* <div className="captured-area">...</div> */}` intended for displaying captured pieces.
- **The specific refactor to make**: Delete the commented-out block entirely.
- **Why this is a good small task**: It is a purely subtractive change that removes clutter.
- **Expected impact**: Slightly cleaner source file with zero impact on runtime behavior.
- **Risk level**: `low`
- **Why it is a good fit for me**: I frequently touch `App.tsx` and removing dead code is a quick, safe win based on my understanding of the current layout.
