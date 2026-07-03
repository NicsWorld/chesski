# Targeted Refactor Suggestions

Here is a prioritized list of small, low-risk, high-leverage refactors for the codebase, focusing on maintainability and local design improvements based on recent touchpoints.

### 1. Extract and Validate FEN URL Parsing Logic
- **Repo:** chesski
- **Area / surface:** App initialization / State
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** URL parsing logic (`new URLSearchParams(window.location.search)`) to extract the 'fen' parameter is duplicated across the `view` and `_fen` state initializers. It also lacks validation against malformed or excessively long strings.
- **The specific refactor to make:** Extract this logic into a small reusable helper function (e.g., `getInitialFenFromUrl()`). This function should read the parameter once, enforce a reasonable length limit (<= 100 chars), use `chess.validateFen(fen).ok` to verify the format, and return the parsed FEN or a fallback. Use this helper in the state initializers.
- **Why this is a good small task:** Consolidates repeated logic and adds necessary validation to an untrusted input.
- **Expected impact:** Improved maintainability, removal of duplicated code, and better security against malformed URLs (e.g., ReDoS prevention).
- **Risk level:** low
- **Why it is a good fit for me specifically:** I have explicitly worked on the FEN loading/sharing behavior and am familiar with the need for strict FEN validation on untrusted inputs.

### 2. Optimize FEN String Manipulation
- **Repo:** chesski
- **Area / surface:** Tutorial game state management
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What looks off today:** `addKingsToFen` uses complex, manual `for` loops and character-by-character parsing to inject kings into empty squares. It is also tightly coupled within the React component file.
- **The specific refactor to make:** Replace the manual loops with a cleaner regex-based string replacement (e.g., `String.prototype.replace(/[1-8]/g, replacer)`). Extract `addKingsToFen` and `removeKings` into a separate pure utility module (e.g., `src/utils/fenUtils.ts`).
- **Why this is a good small task:** Decouples complex string manipulation logic from a React component, significantly simplifying the code and making it easily unit-testable in isolation.
- **Expected impact:** Reduced duplication and complexity, cleaner component file, and improved testability.
- **Risk level:** low
- **Why it is a good fit for me specifically:** It directly targets the complex string logic I have previously noted, matching my preference for clean regex replacements and separating utilities from view components.

### 3. Optimize Valid Move Lookups to O(1)
- **Repo:** chesski
- **Area / surface:** Board rendering and drag-and-drop
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What looks off today:** The `validMoves` state stores an array of strings. Inside the 64-square render loop, it checks `validMoves.includes(square)`, resulting in O(n) array lookups for every square during a drag interaction.
- **The specific refactor to make:** Change the `validMoves` state to store a `Set<string>` (or convert the array to a Set right before rendering the squares) and use `.has(square)` to check for highlights.
- **Why this is a good small task:** It is a textbook O(n) to O(1) optimization in a hot path (the board render loop). It is extremely isolated and simple to implement.
- **Expected impact:** Faster, more efficient board re-renders during drag-and-drop interactions.
- **Risk level:** low
- **Why it is a good fit for me specifically:** Aligns perfectly with my documented preference for optimizing React components with frequent element lookups against unique string collections using `Set`.

### 4. Utilize Correct Zoo Assets for Black Pieces
- **Repo:** chesski
- **Area / surface:** Piece rendering
- **Relevant file(s):** `src/components/Piece.tsx`
- **What looks off today:** The 'zoo' theme currently loads white piece assets (`animal_w{type}.png`) for both colors and applies a hacky CSS filter (`brightness(0.4) contrast(1.2)`) to simulate black pieces, ignoring the actual black piece assets that exist.
- **The specific refactor to make:** Update `getPieceImage` to correctly resolve the filename based on `piece.color` (e.g., returning `animal_bK.png` for black pieces) for the zoo theme, and remove the unnecessary CSS filter.
- **Why this is a good small task:** Standardizes asset loading, removes unnecessary CSS computations, and uses the correct intended art assets.
- **Expected impact:** Better visuals and removed CSS technical debt.
- **Risk level:** low
- **Why it is a good fit for me specifically:** I have previously identified this exact visual hack in the component. It directly improves local design using existing resources I am familiar with.

### 5. Implement 'lastMove' Highlight Support
- **Repo:** chesski
- **Area / surface:** Board rendering
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What looks off today:** The `BoardSquareProps` interface defines a `lastMove` boolean, but the `ChessBoard` component hardcodes it to `false` when rendering squares.
- **The specific refactor to make:** Extract the last move's `from` and `to` squares using `game.history({ verbose: true })`. Pass the dynamically evaluated boolean to the `lastMove` prop of `SquareWrapper`, and update `BoardSquare` to visibly highlight the squares.
- **Why this is a good small task:** Completes an unfinished feature interface that is already partially plumbed in, enhancing the UI without changing core logic.
- **Expected impact:** Improved visual feedback for players, making it easier to track the opponent's moves.
- **Risk level:** low
- **Why it is a good fit for me specifically:** Fills a specific gap in the UI properties that I have already identified as being hardcoded, leveraging my knowledge of the `chess.js` history API.

### 6. Fix Hardcoded Pawn Promotion
- **Repo:** chesski
- **Area / surface:** Move handling
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What looks off today:** In `handleDrop`, the move object passed to `onMove` hardcodes pawn promotion to Queen (`promotion: 'q'`) for every single move.
- **The specific refactor to make:** Add logic to correctly identify if a move is actually a promotion (e.g., a pawn reaching the 1st or 8th rank). While a full promotion UI might be a larger feature, the immediate refactor is to only append `promotion: 'q'` when the move requires it, removing the hardcoded flag from standard moves.
- **Why this is a good small task:** Fixes a silent limitation in the core game mechanics and cleans up the interface boundary between the board and the game logic.
- **Expected impact:** Better game correctness, cleaner move generation logic.
- **Risk level:** medium
- **Why it is a good fit for me specifically:** It touches the exact `ChessBoard` drag-and-drop mechanics I've worked on, explicitly targeting a known hardcoded limitation.

### 7. Remove Unused JSX Placeholder and Cleanup Dead Code
- **Repo:** chesski
- **Area / surface:** Main app layout
- **Relevant file(s):** `src/App.tsx`
- **What looks off today:** There is a dead JSX comment `<div className="captured-area">...</div>` and an overly generic ESLint suppression `// eslint-disable-next-line @typescript-eslint/no-unused-vars` for a `_fen` state variable that isn't fully utilized.
- **The specific refactor to make:** Remove the dead JSX comment. If `_fen` is only used to trigger re-renders, rename or restructure the hook to avoid the lint suppression, or utilize it properly.
- **Why this is a good small task:** Straightforward housekeeping that reduces noise and removes dead code.
- **Expected impact:** Cleaner, leaner codebase with no functional changes.
- **Risk level:** low
- **Why it is a good fit for me specifically:** I have already documented the presence of this exact placeholder and the linting setup, making it a very safe and quick cleanup task.
