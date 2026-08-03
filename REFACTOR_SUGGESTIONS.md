# Refactoring Suggestions

Based on a review of the `chesski` codebase, here are 5 targeted, low-risk refactoring opportunities focusing on maintainability and code health, ranked best-first:

## 1. Extract FEN URL handling into a custom hook/utility
- **Repo:** chesski
- **Area / surface:** App.tsx
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** URL search parameters (like `?fen=...`) are parsed directly inside the initial state callback for the `view` state variable.
- **The specific refactor to make:** Extract a `useFenUrl` hook or a small pure utility function to handle URL state initialization.
- **Why this is a good small task:** It centralizes URL parsing logic out of the UI layer without changing behavior.
- **Expected impact:** Improved testability of URL handling logic and a cleaner `App.tsx` component.
- **Risk level:** `low`
- **Why it is a good fit for me:** I am highly familiar with `App.tsx` and its fallback tests, having recently reviewed this file and its edge cases.

## 2. Fix unused `_fen` state variable in `Tutorial.tsx`
- **Repo:** chesski
- **Area / surface:** Tutorial.tsx
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What looks off today:** It uses `const [_, setFen] = useState(game.fen());` with an ESLint disable comment (`/* eslint-disable-next-line @typescript-eslint/no-unused-vars */`).
- **The specific refactor to make:** Use array destructuring to skip the first element entirely: `const [, setFen] = useState(game.fen());` and remove the ESLint disable comment.
- **Why this is a good small task:** It is a tiny, local change that aligns with project conventions for handling unused variables.
- **Expected impact:** Cleaner code and fewer lint suppressions.
- **Risk level:** `low`
- **Why it is a good fit for me:** It's a simple syntax update on a file I recently worked on and reviewed.

## 3. Move FEN string manipulation functions to a utility file
- **Repo:** chesski
- **Area / surface:** Tutorial.tsx
- **Relevant file(s):** `src/components/Tutorial.tsx` and a new `src/utils/fenUtils.ts`
- **What looks off today:** `addKingsToFen` and `removeKings` are pure domain functions defined directly inside the React component file for tutorials.
- **The specific refactor to make:** Extract these functions into a separate utility file (`src/utils/fenUtils.ts`) and import them where needed.
- **Why this is a good small task:** It removes chess domain logic from a UI presentation file, adhering to separation of concerns.
- **Expected impact:** Improved testability of domain functions and easier reuse if needed elsewhere.
- **Risk level:** `low`
- **Why it is a good fit for me:** I recently reviewed `Tutorial.tsx` in depth and understand the logic inside these functions.

## 4. Extract `BoardSquare` component into its own file
- **Repo:** chesski
- **Area / surface:** ChessBoard.tsx
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What looks off today:** The `BoardSquare` component is defined in the exact same file as `ChessBoard`, making the file quite large.
- **The specific refactor to make:** Move `BoardSquare` to a new `src/components/BoardSquare.tsx` and export/import it.
- **Why this is a good small task:** It separates concerns, shrinks the main board component, and is purely a file structural change.
- **Expected impact:** Better readability, simpler imports, and easier isolated testing for the square UI.
- **Risk level:** `low`
- **Why it is a good fit for me:** I am very familiar with `ChessBoard.tsx` and the interaction between the board and its squares.

## 5. Consolidate move grouping logic in `MoveHistory.tsx`
- **Repo:** chesski
- **Area / surface:** MoveHistory.tsx
- **Relevant file(s):** `src/components/MoveHistory.tsx`
- **What looks off today:** A manual `for` loop is used in the component body right before rendering to group moves into pairs (White/Black).
- **The specific refactor to make:** Extract this chunking logic into a helper utility function or encapsulate it better outside the render body.
- **Why this is a good small task:** It removes data transformation logic from the React render path, keeping the component strictly focused on presentation.
- **Expected impact:** Slightly cleaner component logic.
- **Risk level:** `low`
- **Why it is a good fit for me:** It is a simple visual component I have recently viewed and analyzed.