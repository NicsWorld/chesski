# Refactor Suggestions for chesski

Here is a prioritized list of 7 focused, high-leverage refactor opportunities. These are scoped to be actionable and low-risk, drawing from recent work on the core components.

## 1. Deduplicate URL parsing for FEN state
- **Repo:** chesski
- **Area / surface:** App Initialization / State Management
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** `new URLSearchParams(window.location.search)` is duplicated in the initializers for both `view` and `_fen` state hooks without centralized validation.
- **The specific refactor to make:** Extract the URL parsing logic into a small helper function or execute it once outside the `useState` initializers (or use a single initializer) to determine the initial `fen` and `view` together. Validate the FEN string length (e.g., <= 100 chars) before using it.
- **Why this is a good small task:** It removes duplicated logic, consolidates the entry point for untrusted URL data, and makes the component cleaner.
- **Expected impact:** Better maintainability, improved security (via FEN length validation against ReDoS), and cleaner state initialization.
- **Risk level:** `low`
- **Why it is a good fit:** It directly ties into the game's load state and FEN handling, which is core to the recent component work in `App.tsx`.

## 2. Refactor FEN manipulation to use Regex replacements
- **Repo:** chesski
- **Area / surface:** Tutorial Logic
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What looks off today:** The `addKingsToFen` function manually splits the board string into rows and iterates character-by-character using nested loops and `parseInt` to manipulate empty squares.
- **The specific refactor to make:** Replace the complex loops with `String.prototype.replace()` using a regex (e.g., `/[1-8]/g`) and a replacer callback to cleanly map the king placements and update numbers.
- **Why this is a good small task:** It replaces verbose, error-prone custom string parsing with a concise standard pattern.
- **Expected impact:** Significant reduction in code complexity and improved readability for FEN manipulation.
- **Risk level:** `low`
- **Why it is a good fit:** It tightens local design in an area that heavily manipulates game state strings, building on familiarity with how `chess.js` FENs are structured.

## 3. Extract `BoardSquare` into its own file
- **Repo:** chesski
- **Area / surface:** Chessboard Rendering
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What looks off today:** `ChessBoard.tsx` contains multiple component definitions (`BoardSquare`, `SquareWrapper`, and `ChessBoard`), making it quite large and mixing low-level tile rendering with board-level logic.
- **The specific refactor to make:** Move `BoardSquare` (and potentially `SquareWrapper`) into a new file `src/components/BoardSquare.tsx` and export/import appropriately.
- **Why this is a good small task:** It follows standard React practices of one-component-per-file, improving organization without changing behavior.
- **Expected impact:** Better file organization and easier testing of individual square logic.
- **Risk level:** `low`
- **Why it is a good fit:** It simplifies the main `ChessBoard` component, which is a core piece of the app, making future feature work (like highlights) easier.

## 4. Use O(1) Set for valid moves highlight lookup
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What looks off today:** The `validMoves` state is stored as a `string[]` array, and every square checks `validMoves.includes(square)` during render, which is an O(n) operation per square.
- **The specific refactor to make:** Change the state to a `Set<string>` (or convert the array to a `Set` before rendering the board) and use `validMoves.has(square)` to check for highlights.
- **Why this is a good small task:** It introduces a micro-optimization using a standard data structure that better matches the domain semantics (a set of valid destinations).
- **Expected impact:** Slightly better rendering performance during drag-and-drop operations and cleaner intent.
- **Risk level:** `low`
- **Why it is a good fit:** It improves performance of drag-and-drop interactions, an area frequently touched when handling `chess.js` state.

## 5. Implement correct black piece assets for Zoo theme
- **Repo:** chesski
- **Area / surface:** Piece Rendering
- **Relevant file(s):** `src/components/Piece.tsx`
- **What looks off today:** The 'zoo' theme currently renders white piece assets for both colors and applies a CSS filter (`brightness(0.4) contrast(1.2)`) to simulate black pieces, even though dedicated black piece assets (e.g., `animal_bK.png`) exist.
- **The specific refactor to make:** Update the `getPieceImage` logic in `Piece.tsx` to correctly construct the filename using the piece color (e.g., `animal_${piece.color}${piece.type.toUpperCase()}.png`) and remove the CSS filter.
- **Why this is a good small task:** It removes a hacky CSS workaround and properly utilizes existing static assets.
- **Expected impact:** Better visual quality and removed unnecessary CSS processing on the client.
- **Risk level:** `low`
- **Why it is a good fit:** This is a straightforward UI cleanup that resolves a discrepancy between the codebase and the asset library.

## 6. Support correct `lastMove` highlighting
- **Repo:** chesski
- **Area / surface:** Chessboard Rendering
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/components/BoardSquare.tsx` (once extracted)
- **What looks off today:** The `BoardSquareProps` interface defines a `lastMove` boolean, but it is currently hardcoded to `false` when rendering in `ChessBoard.tsx` (`lastMove={false}`).
- **The specific refactor to make:** Track the last move's `from` and `to` squares in state (e.g., in `App.tsx` or `ChessBoard.tsx`) and pass `true` to the `lastMove` prop for those specific squares. Implement the visual style in `BoardSquare`.
- **Why this is a good small task:** It finishes an incomplete feature that was already modeled in the component interface.
- **Expected impact:** Improved user experience by helping players track what move just occurred.
- **Risk level:** `low`
- **Why it is a good fit:** It brings a standard chess UX feature to life by connecting the existing `chess.js` move history to the React rendering layer.

## 7. Remove dead placeholder code for "Captured Pieces"
- **Repo:** chesski
- **Area / surface:** Game Layout
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** There is a commented-out HTML placeholder `{/* <div className="captured-area">...</div> */}` that is not doing anything.
- **The specific refactor to make:** Delete the commented-out code.
- **Why this is a good small task:** Removing dead code keeps the codebase clean and prevents distraction.
- **Expected impact:** A cleaner `App.tsx` render function.
- **Risk level:** `low`
- **Why it is a good fit:** An easy, zero-risk cleanup step while working inside the main application wrapper.