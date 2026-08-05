# Refactor Suggestions

Here is a best-first ranked list of small, low-risk, high-leverage refactor opportunities for the `chesski` repository.

### 1. Refactor `Piece.tsx` to use proper black piece assets instead of CSS filters
* **Repo:** chesski
* **Area / surface:** UI / Theming
* **Relevant file(s):** `src/components/Piece.tsx`
* **What looks off today:** The 'zoo' theme renders white piece assets for both colors and uses an aggressive CSS filter (`brightness(0.4) contrast(1.2)`) to simulate black pieces, completely ignoring the existing black piece assets (e.g., `animal_bB.png`) in `public/pieces/`.
* **The specific refactor to make:** Update the `getPieceImage` function in `Piece.tsx` to dynamically select the correct file prefix (`animal_w` or `animal_b`) based on `piece.color`, and remove the CSS filter from the `<img>` style.
* **Why this is a good small task:** It deletes confusing styling code and correctly hooks up existing visual assets in an isolated component.
* **Expected impact:** Better visual quality for black zoo pieces and slightly better rendering performance by removing CSS filters.
* **Risk level:** `low`
* **Why it is a good fit for me:** Touches the UI and theming surface area, directly improving upon a component I've interacted with without changing broad application behavior.

### 2. Extract domain logic (`addKingsToFen`, `removeKings`) from `Tutorial.tsx`
* **Repo:** chesski
* **Area / surface:** Domain Logic / Tutorials
* **Relevant file(s):** `src/components/Tutorial.tsx`, `src/utils/fenUtils.ts` (new)
* **What looks off today:** Pure domain string manipulation functions (`addKingsToFen` and `removeKings`) are defined directly inside the `Tutorial` React component file, mixing complex string manipulation logic with UI presentation.
* **The specific refactor to make:** Extract `addKingsToFen` and `removeKings` into a new utility module (e.g., `src/utils/fenUtils.ts`), export them, and import them back into `Tutorial.tsx`.
* **Why this is a good small task:** Cleanly separates business logic from React views without altering any actual behavior. It establishes a pattern for moving complex string manipulation out of components.
* **Expected impact:** Thinner React components and easier unit testing for FEN string manipulation logic in isolation.
* **Risk level:** `low`
* **Why it is a good fit for me:** I've worked with component state and logic recently; this helps keep those architectural boundaries clean.

### 3. Extract URL parsing logic from `App.tsx` component initialization
* **Repo:** chesski
* **Area / surface:** State / Routing
* **Relevant file(s):** `src/App.tsx`, `src/utils/urlUtils.ts` (new)
* **What looks off today:** URL search parameters (e.g., `?fen=...`) are parsed directly inside the `useState` initialization callbacks for both the `view` and `_fen` state variables.
* **The specific refactor to make:** Create a small helper like `getInitialFenFromUrl()` in a utility file. Use this helper inside `App.tsx` to initialize the `view`, `game`, and `fen` states cleanly.
* **Why this is a good small task:** Removes `window.location` dependency and `URLSearchParams` boilerplate directly from the top level of the main App component.
* **Expected impact:** Makes `App.tsx` easier to read and test by decoupling it from the browser's URL API.
* **Risk level:** `low`
* **Why it is a good fit for me:** Relates directly to state management and application bootstrapping, areas I have been working in.

### 4. Move the hardcoded `tutorials` data array out of `Tutorial.tsx`
* **Repo:** chesski
* **Area / surface:** Data / Tutorials
* **Relevant file(s):** `src/components/Tutorial.tsx`, `src/data/tutorials.ts` (new)
* **What looks off today:** A large static array of tutorial steps (with long descriptions and FEN strings) sits at the very top of the `Tutorial.tsx` component file.
* **The specific refactor to make:** Move the `tutorials` array and its associated TypeScript type into a dedicated data file (e.g., `src/data/tutorials.ts`) and import it into the component.
* **Why this is a good small task:** Trivial to execute, immediately improves file readability, and isolates content changes from component changes.
* **Expected impact:** Reduces `Tutorial.tsx` file size by ~40 lines and makes adding new tutorials feel like a simple data update rather than a code change.
* **Risk level:** `low`
* **Why it is a good fit for me:** Low-effort cleanup that clears away noise, making future feature additions (like navigation buttons) to the Tutorial component much easier.

### 5. Fix the unused `_fen` state variable in `App.tsx`
* **Repo:** chesski
* **Area / surface:** State Management
* **Relevant file(s):** `src/App.tsx`
* **What looks off today:** The `_fen` state is declared with an unused variable prefix and an inline eslint disable comment (`// eslint-disable-next-line @typescript-eslint/no-unused-vars`), which is a code smell.
* **The specific refactor to make:** Change `const [_fen, setFen] = useState(...)` to `const [, setFen] = useState(...)` using array destructuring to skip the element, and remove the eslint disable comment.
* **Why this is a good small task:** It is a one-line change that standardizes unused state skipping according to modern React practices.
* **Expected impact:** Cleaner code, fewer linter overrides, and strict adherence to React array destructuring patterns.
* **Risk level:** `low`
* **Why it is a good fit for me:** It's a quick, surgical win in a file I'm already familiar with, improving general code health and linting standards.
