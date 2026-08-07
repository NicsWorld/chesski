# Refactor Suggestions for chesski

## 1. Extract `tutorials` array from `Tutorial.tsx` to a data file
* **Repo:** chesski
* **Area / surface:** Tutorial view
* **Relevant file(s) or component(s):** `src/components/Tutorial.tsx`
* **What looks off today:** The `tutorials` array containing the static tutorial data (id, title, description, fen) is hardcoded directly inside the component file, cluttering the UI code.
* **The specific refactor to make:** Move the `tutorials` array to a dedicated data or constants file (e.g., `src/data/tutorials.ts`) and import it into `Tutorial.tsx`.
* **Why this is a good small task:** Separating data from presentation is a common pattern that makes the component file shorter and the data easier to maintain or expand in the future.
* **Expected impact:** Cleaner component file, better separation of concerns.
* **Risk level:** `low`
* **Why it is a good fit for me:** I've previously noted the tutorial flow logic and this is a straightforward, isolated change in an area I'm familiar with.

## 2. Extract FEN manipulation functions from `Tutorial.tsx` to a utility file
* **Repo:** chesski
* **Area / surface:** Tutorial domain logic
* **Relevant file(s) or component(s):** `src/components/Tutorial.tsx`
* **What looks off today:** Pure domain string manipulation functions (`addKingsToFen`, `removeKings`) are defined directly inside the React component file, mixing domain logic with UI presentation.
* **The specific refactor to make:** Move `addKingsToFen` and `removeKings` to a utility file (e.g., `src/utils/fenUtils.ts`) and import them into `Tutorial.tsx`.
* **Why this is a good small task:** Similar to separating data, this separates pure business logic from React components, making the logic easier to test in isolation and reusing it elsewhere if needed.
* **Expected impact:** Cleaner component file, testable utility functions.
* **Risk level:** `low`
* **Why it is a good fit for me:** I am already familiar with FEN string processing rules from previous memory, so extracting this logic is well within my domain knowledge.

## 3. Clean up the unused `_fen` state placeholder in `App.tsx`
* **Repo:** chesski
* **Area / surface:** Main application state
* **Relevant file(s) or component(s):** `src/App.tsx`
* **What looks off today:** There is a state variable declared as `const [_fen, setFen] = useState(...)` where `_fen` is unused, requiring an `eslint-disable-next-line` comment to bypass the linter.
* **The specific refactor to make:** Use array destructuring to skip the first element entirely: `const [, setFen] = useState(...)`, and remove the `eslint-disable` comment.
* **Why this is a good small task:** It removes a hacky linter bypass and uses standard destructuring syntax.
* **Expected impact:** Cleaner, more idiomatic code without linter overrides.
* **Risk level:** `low`
* **Why it is a good fit for me:** This is a very specific, tiny pattern fix that I have explicit knowledge about applying.

## 4. Extract URL parsing logic from `useState` initialization in `App.tsx`
* **Repo:** chesski
* **Area / surface:** Main application initialization
* **Relevant file(s) or component(s):** `src/App.tsx`
* **What looks off today:** The logic to parse the `fen` parameter from the URL is duplicated across the initialization callbacks of both `view` and `_fen` state variables.
* **The specific refactor to make:** Extract the URL parsing logic (`new URLSearchParams(window.location.search).get('fen')`) to a small helper function or a `useEffect` hook, or at least perform it once before the state initializers and pass the result.
* **Why this is a good small task:** It reduces duplication and consolidates how the app reads its initial state from the environment.
* **Expected impact:** Less duplicated code, clearer initialization flow.
* **Risk level:** `low`
* **Why it is a good fit for me:** I have looked at the `App.tsx` initialization logic recently and understand how the URL params are being used to set the initial game state.

## 5. Update `Piece.tsx` to use actual black animal assets
* **Repo:** chesski
* **Area / surface:** Piece rendering
* **Relevant file(s) or component(s):** `src/components/Piece.tsx`
* **What looks off today:** In the 'zoo' theme, the component renders white piece assets for both colors and applies a CSS filter (`brightness(0.4) contrast(1.2)`) to simulate black pieces, even though dedicated black piece assets (e.g., `animal_bK.png`) exist in the `public/pieces/` directory.
* **The specific refactor to make:** Update the image source logic in `Piece.tsx` to load the correct asset based on the piece color (e.g., `animal_b${piece.type.toUpperCase()}.png`) and remove the CSS filter hack.
* **Why this is a good small task:** It replaces a visual hack with the correct implementation using existing assets, likely improving the visual quality of the black pieces in the 'zoo' theme.
* **Expected impact:** Better visuals, removal of a CSS workaround.
* **Risk level:** `low`
* **Why it is a good fit for me:** I've specifically noted this discrepancy in memory and know exactly where the assets are and how to fix it.

## 6. Replace hardcoded initial status message in `App.tsx`
* **Repo:** chesski
* **Area / surface:** UI Status Messaging
* **Relevant file(s) or component(s):** `src/App.tsx`
* **What looks off today:** The initial game status message is hardcoded to `"Welcome! Drag the white pieces to start."`, bypassing the `evaluateGameStatus()` utility which could handle the initial state dynamically.
* **The specific refactor to make:** Update the initial state of `message` to use `evaluateGameStatus(game)` or ensure the welcome message logic is integrated cleanly without being a disconnected hardcoded string.
* **Why this is a good small task:** Consolidates status message generation logic.
* **Expected impact:** More consistent messaging logic.
* **Risk level:** `low`
* **Why it is a good fit for me:** I've already investigated how status messages are evaluated and displayed.

## 7. Address hardcoded `lastMove` prop in `ChessBoard.tsx`
* **Repo:** chesski
* **Area / surface:** Chess board rendering
* **Relevant file(s) or component(s):** `src/components/ChessBoard.tsx`
* **What looks off today:** The `BoardSquareProps` interface defines a `lastMove` boolean, but when rendering `BoardSquare` components in `ChessBoard.tsx`, it is currently hardcoded to `false`.
* **The specific refactor to make:** Either calculate the actual `lastMove` status by tracking the previous move in the component/parent state and passing it down, or remove the unused prop entirely if the feature is dropped.
* **Why this is a good small task:** It resolves an incomplete feature implementation.
* **Expected impact:** Cleans up the component interface or completes a missing visual feature.
* **Risk level:** `low`
* **Why it is a good fit for me:** I've noticed this specific hardcoded prop during my exploration of the `ChessBoard` component.
