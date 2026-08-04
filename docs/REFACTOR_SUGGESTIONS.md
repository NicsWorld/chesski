# Refactor Suggestions

This document outlines a prioritized list of small, low-risk, and high-leverage refactor tasks to improve maintainability, reduce duplication, and tighten the local design of the Chesski application.

---

### 1. Extract Domain Logic from Tutorial Component

- **Repo:** chesski
- **Area/surface:** Game logic & Tutorial flow
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What looks off today:** Pure domain string manipulation functions (`addKingsToFen` and `removeKings`) are defined directly inside the React component file, mixing domain logic with UI presentation.
- **Specific refactor:** Extract `addKingsToFen` and `removeKings` into a new utility file (e.g., `src/utils/tutorialHelpers.ts`) and import them where needed.
- **Why it is a good small task:** This directly separates concerns without altering how the application behaves.
- **Expected impact:** Cleaner React components and easily testable isolated domain logic.
- **Risk level:** `low`
- **Why it is a good fit:** I've been recently involved in separating domain rules from rendering (as seen in `gameStatus.ts`), making this a natural continuation.

---

### 2. Consolidate URL Search Parameter Parsing

- **Repo:** chesski
- **Area/surface:** App initialization
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** `URLSearchParams(window.location.search)` is parsed directly inside the initial state callbacks for both the `view` and `_fen` state variables.
- **Specific refactor:** Move the parsing of URL search parameters out of the state initializers into a single function or at the top level of the component/module to ensure it's evaluated only once and shared between state variable initializations.
- **Why it is a good small task:** It removes duplicate logic and centralizes the application's URL reading logic.
- **Expected impact:** Better readability and an easier path for adding more URL query features later.
- **Risk level:** `low`
- **Why it is a good fit:** This simplifies a core setup phase of the app I am very familiar with.

---

### 3. Remove Dead `lastMove` Prop

- **Repo:** chesski
- **Area/surface:** Chess board UI
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What looks off today:** The `BoardSquareProps` interface defines a `lastMove` boolean, but it is currently hardcoded to `false` when rendering the board squares and never actually used to drive any styling or logic.
- **Specific refactor:** Remove the `lastMove` property entirely from the `BoardSquareProps` interface and the instances where it's passed as a hardcoded prop.
- **Why it is a good small task:** This involves standardizing props by cleaning up unused ones, a fast and highly safe change.
- **Expected impact:** Cleaner interface definitions and fewer properties being unnecessarily passed down the component tree.
- **Risk level:** `low`
- **Why it is a good fit:** I have an eye for cleaning up React interfaces and improving component simplicity.

---

### 4. Standardize Initial Game Status Message

- **Repo:** chesski
- **Area/surface:** App state and UI
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** The `message` state is initialized with a hardcoded string ("Welcome! Drag the white pieces to start."), which is incorrect if the user loads an ongoing game from a FEN URL where it might be black's turn or a checkmate state.
- **Specific refactor:** Initialize the `message` state by evaluating the initial game instance using the existing `evaluateGameStatus(game)` utility function, falling back to a default welcome message only for new games.
- **Why it is a good small task:** It fixes a minor edge-case bug by leveraging an existing helper function.
- **Expected impact:** A more accurate user experience when sharing and loading game links.
- **Risk level:** `low`
- **Why it is a good fit:** I already understand the `evaluateGameStatus` utility and how the FEN loading logic functions in `App.tsx`.

---

### 5. Utilize Existing Black Piece Assets in Zoo Theme

- **Repo:** chesski
- **Area/surface:** Piece rendering
- **Relevant file(s):** `src/components/Piece.tsx`
- **What looks off today:** The 'zoo' theme currently renders white piece assets for both colors and uses a CSS filter (`brightness(0.4) contrast(1.2)`) to simulate black pieces, completely ignoring the existing black piece assets (e.g., `animal_bK.png`) located in the `public/pieces/` directory.
- **Specific refactor:** Update the `getPieceImage` function in `Piece.tsx` to construct the file path using the piece's actual color (e.g., `animal_${piece.color}${piece.type.toUpperCase()}.png`) and remove the CSS filter.
- **Why it is a good small task:** It’s a very small visual cleanup task that removes a hacky CSS filter in favor of standard asset usage.
- **Expected impact:** Proper use of provided assets resulting in a cleaner look for the black zoo pieces and slightly less client-side rendering overhead.
- **Risk level:** `low`
- **Why it is a good fit:** I've worked in the frontend surface recently and this involves straightforward component logic.

---

### 6. Refactor Unused State Variable Syntax

- **Repo:** chesski
- **Area/surface:** App state
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** The initialization of the `_fen` state in `src/App.tsx` intentionally ignores the state value using a placeholder variable (`const [_fen, setFen] = useState(...)`) combined with a `// eslint-disable-next-line @typescript-eslint/no-unused-vars` comment.
- **Specific refactor:** Remove the `_fen` variable and the eslint disable comment, utilizing standard array destructuring to skip the first element: `const [, setFen] = useState(...)`.
- **Why it is a good small task:** A tiny syntactical improvement that conforms to better linting practices without functional changes.
- **Expected impact:** A cleaner file free from unnecessary linter suppressions.
- **Risk level:** `low`
- **Why it is a good fit:** This aligns perfectly with a focus on code health and tightening local design patterns.
