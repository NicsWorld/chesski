# Refactor Suggestions

Here are 5 targeted, low-risk refactor opportunities in the `chesski` repository, ranked best-first. These focus on code paths recently touched and aim to improve maintainability and performance without changing product behavior.

### 1. De-duplicate `URLSearchParams` parsing in App state initializers

- **Repo**: chesski
- **Area / surface**: Application Initialization / Routing
- **Relevant file(s)**: `src/App.tsx`
- **What looks off today**: `new URLSearchParams(window.location.search)` is duplicated across the `useState` initializers for both `view` and `_fen`. This causes redundant parsing and duplicated logic for handling the FEN URL parameter.
- **The specific refactor to make**: Extract the URL parameter parsing into a single custom hook (e.g., `useGameParams`) or evaluate it once outside the component/in a single init function that returns both the initial view and FEN.
- **Why this is a good small task**: It removes duplication and centralizes the URL parsing logic, making future additions to URL parameters easier to manage.
- **Expected impact**: Slightly faster initialization, cleaner component setup, and easier testing of URL parameter handling.
- **Risk level**: Low
- **Why it is a good fit for me**: I recently touched `App.tsx` and the initialization logic. This is a quick win that tightens the local design.

### 2. Simplify FEN string manipulation in Tutorial logic

- **Repo**: chesski
- **Area / surface**: Tutorial FEN Management
- **Relevant file(s)**: `src/components/Tutorial.tsx`
- **What looks off today**: The `addKingsToFen` function uses complex loops, character-by-character iteration, and manual string building to modify FEN strings.
- **The specific refactor to make**: Replace the manual loops with a simpler, more declarative approach using `String.prototype.replace()` with a regex to handle the empty square numbers and insert kings.
- **Why this is a good small task**: It replaces a large chunk of imperative, error-prone code with a concise and readable standard regex pattern.
- **Expected impact**: More readable, maintainable, and less bug-prone string manipulation.
- **Risk level**: Low
- **Why it is a good fit for me**: I have a good understanding of the tutorial code and FEN manipulation from recent changes, making me well-equipped to test this refactor safely.

### 3. Optimize valid moves lookup in ChessBoard

- **Repo**: chesski
- **Area / surface**: Board Rendering / Performance
- **Relevant file(s)**: `src/components/ChessBoard.tsx`
- **What looks off today**: `validMoves` is stored as an array (`string[]`), and `validMoves.includes(square)` is called 64 times during every board render to highlight squares. This is an O(n) check for every square.
- **The specific refactor to make**: Convert `validMoves` to a `Set<string>` and use `.has(square)` for an O(1) lookup during the board mapping.
- **Why this is a good small task**: It's a localized, straightforward optimization that improves the rendering performance of the main interactive component.
- **Expected impact**: Improved rendering performance, especially noticeable on lower-end devices during drag interactions.
- **Risk level**: Low
- **Why it is a good fit for me**: It's a quick, high-leverage optimization in a core component I am familiar with.

### 4. Extract hardcoded pawn promotion logic

- **Repo**: chesski
- **Area / surface**: Move Handling
- **Relevant file(s)**: `src/components/ChessBoard.tsx`
- **What looks off today**: The `handleDrop` function hardcodes pawn promotion to Queen (`promotion: 'q'`), which limits the flexibility of the board component and technically violates chess rules (where underpromotion is allowed).
- **The specific refactor to make**: Introduce a configurable promotion parameter or callback (e.g., a modal or prop) rather than hardcoding `'q'`. For a minimal refactor, at least extract the hardcoded `'q'` into a constant or an optional prop on `ChessBoardProps`.
- **Why this is a good small task**: It prepares the component for full chess rule compliance without requiring a massive architectural shift.
- **Expected impact**: Better decoupling of move logic and preparation for an upcoming feature (promotion selection).
- **Risk level**: Low
- **Why it is a good fit for me**: I understand the `ChessBoard` component's drag-and-drop interface and move delegation well.

### 5. Implement missing lastMove highlight behavior

- **Repo**: chesski
- **Area / surface**: Board UI
- **Relevant file(s)**: `src/components/ChessBoard.tsx`
- **What looks off today**: The `BoardSquareProps` defines a `lastMove` boolean, but it is currently hardcoded as `lastMove={false}` when rendering the `SquareWrapper`.
- **The specific refactor to make**: Calculate the actual last move from `game.history({ verbose: true })` and pass the correct boolean to the `lastMove` prop to highlight the squares involved in the previous move.
- **Why this is a good small task**: It completes a partially implemented feature, improving the user experience by providing visual feedback on the opponent's (or their own) last move.
- **Expected impact**: Improved UX and completion of a dangling interface prop.
- **Risk level**: Low
- **Why it is a good fit for me**: I have worked with the board state and history, and this is a localized UI fix that builds on existing props.
