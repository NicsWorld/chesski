# Refactor Suggestions

Based on a review of recent changes and the existing codebase, here are 7 targeted, low-risk refactor opportunities to improve maintainability and clean up technical debt, ranked best-first.

## 1. Extract Domain Logic from Tutorial Component
- **Repo:** chesski
- **Area / surface:** Tutorial flow
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What looks off today:** Pure domain string manipulation functions (`addKingsToFen` and `removeKings`) are defined directly inside the React component file, mixing domain logic with UI presentation.
- **The specific refactor to make:** Move `addKingsToFen` and `removeKings` into a new utility file (e.g., `src/utils/fenUtils.ts`), export them, and import them into `Tutorial.tsx`.
- **Why this is a good small task:** Completely self-contained extraction that improves the separation of concerns.
- **Expected impact:** Makes the `Tutorial.tsx` component smaller and more focused on rendering, while making the FEN manipulation logic easier to unit test.
- **Risk level:** `low`
- **Why it is a good fit for me:** I am already familiar with the `Tutorial.tsx` codebase and FEN manipulation rules.

## 2. Extract Tutorial Data to a Constants File
- **Repo:** chesski
- **Area / surface:** Tutorial flow
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What looks off today:** The `tutorials` data array (containing descriptions, titles, and FENs) is hardcoded directly inside the component file.
- **The specific refactor to make:** Extract the `tutorials` array and its associated interface into a dedicated data file (e.g., `src/data/tutorials.ts`) and import it.
- **Why this is a good small task:** Simple data extraction that doesn't change any logic.
- **Expected impact:** Cleans up the top of the `Tutorial.tsx` file, improving readability. Makes it easier to add new tutorials in the future without touching component code.
- **Risk level:** `low`
- **Why it is a good fit for me:** Easy win in an area I recently modified.

## 3. Fix Zoo Theme Asset Resolution
- **Repo:** chesski
- **Area / surface:** Piece rendering
- **Relevant file(s):** `src/components/Piece.tsx`
- **What looks off today:** The 'zoo' theme currently renders white piece assets for both colors and uses a CSS filter (`brightness(0.4) contrast(1.2)`) to simulate black pieces, rather than utilizing the existing black piece assets (e.g., `animal_bK.png`) located in `public/pieces/`.
- **The specific refactor to make:** Update `getPieceImage()` to return the correct asset name based on the piece color (e.g., `animal_${piece.color}${piece.type.toUpperCase()}.png`), and remove the CSS filter fallback.
- **Why this is a good small task:** Removes a hacky CSS workaround in favor of the correct asset pipeline.
- **Expected impact:** Better visual fidelity for black pieces in the zoo theme, reducing unnecessary CSS processing.
- **Risk level:** `low`
- **Why it is a good fit for me:** Straightforward component logic fix in a core surface area.

## 4. Extract URL Parsing from State Initialization
- **Repo:** chesski
- **Area / surface:** App routing / initialization
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** URL search parameters (e.g., `?fen=...`) are parsed directly inside the `useState` initialization callbacks for the `view` and `_fen` state variables.
- **The specific refactor to make:** Extract the URL parsing logic into a helper function (e.g., `getInitialGameState()`) outside the component or at the top of the component, and use its return values to initialize state cleanly.
- **Why this is a good small task:** Simplifies the component initialization logic and removes duplicate `URLSearchParams` instantiation.
- **Expected impact:** Cleaner, more readable `App` component setup.
- **Risk level:** `low`
- **Why it is a good fit for me:** I recently worked with the `App.tsx` state management.

## 5. Use Dynamic Initial Game Status
- **Repo:** chesski
- **Area / surface:** App state
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** The initial game status message is hardcoded to "Welcome! Drag the white pieces to start.", rather than utilizing the `evaluateGameStatus()` function output, which could be inaccurate if the game is initialized from a FEN string in the URL.
- **The specific refactor to make:** Update the initial state of `message` to use `evaluateGameStatus(game)` based on the initially loaded `game` instance.
- **Why this is a good small task:** Ensures correctness for edge cases (shared URLs) using existing helpers.
- **Expected impact:** Correct messaging when users load shared games from URLs.
- **Risk level:** `low`
- **Why it is a good fit for me:** Connects an existing utility to an existing state variable I am familiar with.

## 6. Clean Up Unused Variables and Dead Code
- **Repo:** chesski
- **Area / surface:** App component
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** There is an unused state variable `_fen` (with an eslint-disable comment), and commented-out dead code (`{/* <div className="captured-area">...</div> */}`).
- **The specific refactor to make:** Remove the unused `_fen` variable completely by using array destructuring to skip the element (`const [, setFen] = useState(...)`), remove the eslint-disable comment, and delete the commented-out `captured-area` code block.
- **Why this is a good small task:** Pure cleanup with zero logic changes.
- **Expected impact:** Cleaner code, no linter warnings, smaller file size.
- **Risk level:** `low`
- **Why it is a good fit for me:** Simple housekeeping in the main entry point.

## 7. Pass Correct `lastMove` Prop to `BoardSquare`
- **Repo:** chesski
- **Area / surface:** Chess Board rendering
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What looks off today:** The `BoardSquareProps` interface defines a `lastMove` boolean, but it is currently hardcoded to `false` when rendering the `BoardSquare` components.
- **The specific refactor to make:** Plumb the actual last move data from the `game` object's history (e.g., `game.history({ verbose: true })`) down to the squares so the `lastMove` prop correctly reflects the state.
- **Why this is a good small task:** Fixes a partially implemented feature by connecting existing state to existing props.
- **Expected impact:** Enables the UI to highlight the last move, improving the user experience without adding new components.
- **Risk level:** `medium` (requires slight logic to check if a square is part of the last move)
- **Why it is a good fit for me:** Good opportunity to work with the `chess.js` history API and component props.