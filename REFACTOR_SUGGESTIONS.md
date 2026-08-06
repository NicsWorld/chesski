# Refactor Suggestions

Here is a prioritized list of small, focused, and low-risk refactoring tasks for the `chesski` repository, ranked best-first.

## 1. Remove linter bypasses by properly destructuring unused state
- **Repo:** chesski
- **Area / surface:** State Management / Linting
- **Relevant file(s) or component(s):** `src/App.tsx`, `src/components/Tutorial.tsx`
- **What looks off today:** Both files declare unused variables for the first element of the `useState` tuple (e.g., `const [_fen, setFen] = useState(...)` and `const [_, setFen] = useState(...)`) and use ESLint disable comments (`// eslint-disable-next-line @typescript-eslint/no-unused-vars`) to silence the linter.
- **The specific refactor to make:** Remove the ESLint disable comments and use empty commas in array destructuring to properly ignore the unused state value (e.g., `const [, setFen] = useState(...)`).
- **Why this is a good small task:** It removes hacky linter workarounds and adheres to cleaner, standard React/JavaScript syntax without changing any logic.
- **Expected impact:** Cleaner code, elimination of unnecessary linter suppression comments.
- **Risk level:** `low`
- **Why it is a good fit:** I recently touched state handling and testing in these components. It's a quick win that tightens the local design.

## 2. Extract pure functions and static data from Tutorial
- **Repo:** chesski
- **Area / surface:** Tutorials / Domain Logic
- **Relevant file(s) or component(s):** `src/components/Tutorial.tsx`
- **What looks off today:** The `Tutorial.tsx` component file contains hardcoded static data (`tutorials` array) and complex pure domain string manipulation functions (`addKingsToFen`, `removeKings`) defined directly alongside the React component, mixing business logic with presentation.
- **The specific refactor to make:** Extract the `tutorials` array and the `addKingsToFen` and `removeKings` functions into a dedicated utility file (e.g., `src/utils/tutorialUtils.ts` or `tutorialData.ts`) and import them into `Tutorial.tsx`.
- **Why this is a good small task:** It strictly separates domain logic and static data from the UI component, making the component file significantly smaller and easier to read, while making the logic easily testable in isolation.
- **Expected impact:** Improved maintainability, smaller component file size, better separation of concerns.
- **Risk level:** `low`
- **Why it is a good fit:** I have experience working with FEN strings and domain logic in this repository, and this is a straightforward extraction that improves the architecture.

## 3. Replace hacky CSS filters with native black piece assets
- **Repo:** chesski
- **Area / surface:** UI / Theming
- **Relevant file(s) or component(s):** `src/components/Piece.tsx`
- **What looks off today:** In the 'zoo' theme, `Piece.tsx` currently renders white piece assets for both colors and applies a CSS filter (`filter: 'brightness(0.4) contrast(1.2)'`) to simulate black pieces, rather than using the existing black piece assets (e.g., `animal_bK.png`) located in the `public/pieces/` directory.
- **The specific refactor to make:** Update `getPieceImage()` to correctly build the filename for black zoo pieces using `piece.color` (e.g., returning `animal_${piece.color}${piece.type.toUpperCase()}.png`) and remove the CSS filter logic.
- **Why this is a good small task:** It removes a workaround and utilizes the actual assets designed for the application, simplifying the rendering logic and CSS.
- **Expected impact:** Better visual fidelity for black pieces, simplified rendering code.
- **Risk level:** `low`
- **Why it is a good fit:** I've worked on the `Piece.tsx` UI and testing. This is a targeted UI polish that leverages existing unused assets.

## 4. Standardize the initial game status message
- **Repo:** chesski
- **Area / surface:** Game Status UI
- **Relevant file(s) or component(s):** `src/App.tsx`
- **What looks off today:** The initial game status message is hardcoded to `"Welcome! Drag the white pieces to start."` in the `useState` initialization, rather than utilizing the `evaluateGameStatus(game)` function output which acts as the source of truth for the game state message elsewhere.
- **The specific refactor to make:** Change the initial state of `message` in `App.tsx` to use the `evaluateGameStatus` utility, passing the initial game instance. Alternatively, conditionally render a welcome message that transitions to `evaluateGameStatus` after the first move.
- **Why this is a good small task:** It centralizes the source of truth for the game status message, removing duplicated or hardcoded strings.
- **Expected impact:** Consistent status messaging, preventing potential desyncs if initialization logic changes.
- **Risk level:** `low`
- **Why it is a good fit:** I am familiar with the `gameStatus` utility and the state flow in `App.tsx`, making this a safe and logical consolidation.

## 5. Clean up unused `lastMove` prop on the Chessboard
- **Repo:** chesski
- **Area / surface:** Chessboard UI / React Props
- **Relevant file(s) or component(s):** `src/components/ChessBoard.tsx`
- **What looks off today:** The `BoardSquareProps` interface defines a `lastMove` boolean, but when `SquareWrapper` is rendered inside `ChessBoard.tsx`, it is hardcoded to `lastMove={false}` and is never dynamically calculated or used inside `BoardSquare`.
- **The specific refactor to make:** Remove the `lastMove` property from `BoardSquareProps` and remove the hardcoded `lastMove={false}` assignment from the `SquareWrapper` rendering logic in `ChessBoard.tsx`.
- **Why this is a good small task:** It removes dead code and cleans up the component interface, reducing cognitive load for future readers.
- **Expected impact:** Cleaner component props and slightly reduced bundle/file size.
- **Risk level:** `low`
- **Why it is a good fit:** I have recently inspected `ChessBoard.tsx` and its prop structure. Cleaning up dead props is a quick, safe win for maintainability.

## 6. Consolidate URL parameter parsing
- **Repo:** chesski
- **Area / surface:** App Initialization / State
- **Relevant file(s) or component(s):** `src/App.tsx`
- **What looks off today:** URL search parameters (e.g., `?fen=...`) are parsed twice directly inside two different `useState` initialization callbacks (for `view` and `_fen`).
- **The specific refactor to make:** Move the URL parsing logic (`new URLSearchParams(window.location.search)`) outside and above the state declarations (or into a single `useMemo`/initialization function) to parse the parameters once and use the result to initialize both the `view`, `game`, and FEN states.
- **Why this is a good small task:** It removes redundant logic, improves readability of the state initialization, and ensures the URL is only read and parsed once on load.
- **Expected impact:** Cleaner initialization logic and slight performance improvement by avoiding duplicate parsing.
- **Risk level:** `low`
- **Why it is a good fit:** I recently touched state flow and URL mocking for tests. Consolidating this initialization logic will make the component much tidier.