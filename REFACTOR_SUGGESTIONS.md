# Refactor Suggestions

1. **Extract URL Parsing Logic**
   - **Repo:** chesski
   - **Area / surface:** App Initialization / URL State
   - **Relevant file(s):** `src/App.tsx`
   - **What looks off today:** `new URLSearchParams(window.location.search)` and the logic to extract the `fen` parameter is duplicated verbatim across two different `useState` initializers (lines 14 and 22). It lacks robust validation before being used to initialize a new `Chess` game.
   - **The specific refactor to make:** Extract this logic into a small reusable helper function (e.g., `getFenFromUrl()`) that parses the URL, validates the `fen` string length (e.g., <= 100 characters) and format using `chess.js`'s `validateFen(fen).ok`, and returns it safely.
   - **Why this is a good small task:** It removes duplication, tightens validation against malicious/malformed URLs, and makes the component initialization much easier to read.
   - **Expected impact:** Better maintainability and improved security (prevents potential ReDoS/memory exhaustion).
   - **Risk level:** `low`
   - **Why it is a good fit:** I recently touched `App.tsx` during initialization and test adjustments, making me highly familiar with how this component loads.

2. **Use Existing Black Piece Assets in Zoo Theme**
   - **Repo:** chesski
   - **Area / surface:** Piece Rendering / Assets
   - **Relevant file(s):** `src/components/Piece.tsx`, `public/pieces/`
   - **What looks off today:** The `zoo` theme currently renders white piece assets for both colors and uses a CSS filter (`brightness(0.4) contrast(1.2)`) to artificially simulate black pieces, completely ignoring the fact that actual black piece assets (e.g., `animal_bK.png`) exist in the `public/pieces/` directory.
   - **The specific refactor to make:** Update `getPieceImage()` in `Piece.tsx` to correctly construct the image filename based on the piece color (e.g., returning `animal_${piece.color}${piece.type.toUpperCase()}.png`) and remove the CSS filter hack.
   - **Why this is a good small task:** It deletes a confusing workaround and utilizes existing but dead assets, immediately improving the visual quality and codebase accuracy.
   - **Expected impact:** Cleaner React component code and better visual quality for the zoo theme.
   - **Risk level:** `low`
   - **Why it is a good fit:** I've worked extensively with `Piece.tsx` and the drag-and-drop layer, so I understand the rendering cycle here.

3. **Optimize Valid Move Tracking**
   - **Repo:** chesski
   - **Area / surface:** ChessBoard Rendering
   - **Relevant file(s):** `src/components/ChessBoard.tsx`
   - **What looks off today:** `validMoves` is stored as an array of strings (`useState<string[]>([])`), and every square on the board checks if it's highlighted using `validMoves.includes(square)`. This causes 64 O(n) lookups on every render where valid moves are shown.
   - **The specific refactor to make:** Change the state to use a `Set<string>` and update the lookup to `validMoves.has(square)`.
   - **Why this is a good small task:** It's a textbook O(1) vs O(n) performance fix that requires modifying exactly two lines (the state type and the lookup).
   - **Expected impact:** Slight render performance improvement during piece interactions.
   - **Risk level:** `low`
   - **Why it is a good fit:** I've recently modified `ChessBoard.tsx` and its drag-and-drop interactions, so optimizing the interaction rendering is a natural extension of that work.

4. **Implement `lastMove` Highlighting**
   - **Repo:** chesski
   - **Area / surface:** Board Square Highlighting
   - **Relevant file(s):** `src/components/ChessBoard.tsx`
   - **What looks off today:** The `BoardSquareProps` interface correctly defines a `lastMove: boolean` prop, but it is currently hardcoded to `lastMove={false}` when mapping over the squares in `ChessBoard`.
   - **The specific refactor to make:** Pass down the actual last move from the `game` object (e.g., by inspecting the latest move in `game.history({ verbose: true })`) and evaluate whether the current `square` matches the `from` or `to` coordinates of that move, passing the result to `lastMove`.
   - **Why this is a good small task:** It finishes an incomplete feature utilizing existing interface definitions, improving user experience without adding new architectural complexity.
   - **Expected impact:** Better visual feedback for the user after a move is made.
   - **Risk level:** `low`
   - **Why it is a good fit:** I am intimately familiar with `ChessBoard.tsx` and the `game.history()` API from recent history state additions.

5. **Decouple FEN Manipulation in Tutorials**
   - **Repo:** chesski
   - **Area / surface:** Tutorial Logic
   - **Relevant file(s):** `src/components/Tutorial.tsx`
   - **What looks off today:** `addKingsToFen` uses complex, imperative loops and string splitting to manually inject Kings into the FEN strings. It is currently placed inside the React component file.
   - **The specific refactor to make:** Simplify this logic using regex string replacements (or a clearer mapping approach) and extract it out of the UI component file into a utility file (e.g., `src/utils/fenUtils.ts`).
   - **Why this is a good small task:** It untangles complex data manipulation from the view layer and makes the function independently testable.
   - **Expected impact:** Much cleaner `Tutorial.tsx` and improved testability for a notoriously tricky function.
   - **Risk level:** `medium`
   - **Why it is a good fit:** I've spent significant time working on `Tutorial.tsx`, FEN state management, and testing, making me perfectly positioned to pull this out safely and write tests for it.
