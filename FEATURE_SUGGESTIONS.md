# Feature Suggestions

Based on a review of the codebase, here are 6 high-value, small-to-medium scoped feature suggestions prioritizing growth, monetization, and core value improvements, leveraging existing infrastructure.

## 1. Shareable "Wordle-style" Emoji Game Summary
- **Repo:** chesski
- **Area / surface:** App / Info Panel (`App.tsx`)
- **Relevant file(s):** `src/App.tsx`, `src/components/MoveHistory.tsx`
- **What the gap/opportunity looks like today:** The app has a "Share Game" button that copies the URL with the FEN. However, it lacks a visually engaging way to share game outcomes on social media (like Wordle's colored squares) which is a massive organic growth driver.
- **The specific feature to build:** When a game ends (or via a new "Share Result" button), generate a 3-5 line text snippet containing a visual representation of the game using emojis (e.g., ♟️🎉) alongside the shareable link, and copy it to the user's clipboard. It can leverage the existing `game.history()` to calculate a quick summary (e.g., number of moves, result).
- **Why this is a good small/focused task:** It requires no new UI components other than modifying the clipboard payload of an existing button. It purely relies on string manipulation and existing game state.
- **Expected user impact:** High. Significantly increases the virality of the app by giving users a fun, easily shareable artifact.
- **Effort level:** `small`
- **Why it is a good fit:** It builds directly on the recent FEN sharing work in `App.tsx` and doesn't require complex React state management or CSS changes.

## 2. Material Advantage / Captured Pieces Display
- **Repo:** chesski
- **Area / surface:** App / Info Panel (`App.tsx`)
- **Relevant file(s):** `src/App.tsx`
- **What the gap/opportunity looks like today:** There is a commented-out placeholder (`{/* <div className="captured-area">...</div> */}`) in `App.tsx` intended for displaying captured pieces. Currently, users have to manually count pieces to understand material advantage.
- **The specific feature to build:** Implement a simple component that parses the current FEN string, counts the pieces for both sides, calculates the standard material difference, and displays the captured pieces (using the existing `pieceTheme` logic to show the correct assets) along with a `+X` score advantage next to the leading side.
- **Why this is a good small/focused task:** The placeholder is already there, the piece assets already exist, and calculating material from a FEN string is straightforward.
- **Expected user impact:** Medium-High. Highly requested core chess feature that instantly improves player experience and game comprehension.
- **Effort level:** `small`
- **Why it is a good fit:** It closes an explicitly identified gap in the current layout and uses the FEN parsing patterns you're already familiar with.

## 3. Premium/Unlockable Piece Themes (Monetization)
- **Repo:** chesski
- **Area / surface:** App / Settings/Header (`App.tsx`)
- **Relevant file(s):** `src/App.tsx`, `src/components/Piece.tsx`
- **What the gap/opportunity looks like today:** The app has a basic `pieceTheme` state toggling between 'zoo' and 'standard'. The 'zoo' theme currently hacks white pieces with a CSS filter to create black pieces, despite black piece assets existing in `public/pieces/`. There is no monetization strategy.
- **The specific feature to build:** Fix the 'zoo' theme to use the actual black piece assets. Then, introduce a third theme (e.g., 'pixel' or 'neon') that requires a one-time microtransaction (via a simple Stripe checkout link) to unlock. The unlock state can be stored in `localStorage` for now.
- **Why this is a good small/focused task:** The theming infrastructure is already in place. Adding a new theme is just dropping in new image assets and adding a string to a type. The payment integration can be extremely lightweight (just a link out to Stripe Payment Links).
- **Expected user impact:** Medium. Provides an avenue for revenue while cleaning up existing technical debt in the theming system.
- **Effort level:** `medium`
- **Why it is a good fit:** You have the context of how the `Piece.tsx` component handles themes and the CSS filter hack, making you perfectly positioned to clean it up and extend it.

## 4. Pawn Underpromotion UI
- **Repo:** chesski
- **Area / surface:** ChessBoard (`ChessBoard.tsx`)
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap/opportunity looks like today:** `ChessBoard.tsx` currently hardcodes pawn promotion to Queen (`promotion: 'q'`). This means users literally cannot play certain chess positions correctly if underpromotion (e.g., to a Knight) is required.
- **The specific feature to build:** When a move involves a pawn reaching the 8th/1st rank, pause the move application and render a small absolute-positioned popup (or simple modal) asking the user to select the promotion piece (Q, R, B, N). Pass the selected value to the `onMove` callback instead of the hardcoded 'q'.
- **Why this is a good small/focused task:** It fixes a critical functional bug in the core product loop. It's a localized change to the move handling logic.
- **Expected user impact:** Medium. Crucial for serious chess players; prevents frustration in endgame scenarios.
- **Effort level:** `medium`
- **Why it is a good fit:** You understand the `onMove` callback flow between `ChessBoard.tsx` and `App.tsx` and the `react-dnd` drop handling.

## 5. Interactive Tutorial Progression
- **Repo:** chesski
- **Area / surface:** Tutorial View (`Tutorial.tsx`)
- **Relevant file(s):** `src/components/Tutorial.tsx`
- **What the gap/opportunity looks like today:** The tutorial component has an array of `tutorials` and an `activeTutorial` state, but there is no way for the user to navigate between them (no 'Next' or 'Previous' buttons). Users are stuck on the first tutorial.
- **The specific feature to build:** Add simple "Next" and "Previous" buttons to the `Tutorial.tsx` component that increment/decrement the `activeTutorial` state index, allowing users to page through the available lessons.
- **Why this is a good small/focused task:** The data structure and state variable are already there; it just lacks the UI controls to mutate that state.
- **Expected user impact:** High. Fixes a broken onboarding flow, making the app much more accessible to new players, thereby improving retention and growth.
- **Effort level:** `small`
- **Why it is a good fit:** It's an obvious, easily fixable gap in a recently built component that provides outsized value for user acquisition.

## 6. Last Move Highlighting
- **Repo:** chesski
- **Area / surface:** ChessBoard (`ChessBoard.tsx`)
- **Relevant file(s):** `src/components/ChessBoard.tsx`
- **What the gap/opportunity looks like today:** The `BoardSquareProps` interface includes a `lastMove` boolean, but it's not being calculated or used to highlight the squares involved in the previous move. This makes it hard to see what the opponent just did.
- **The specific feature to build:** Extract the "from" and "to" squares of the most recent move from the `chess.js` history (e.g., `game.history({ verbose: true })`). Pass these as props to the relevant `BoardSquare` components to render a subtle background highlight.
- **Why this is a good small/focused task:** The prop already exists on the component interface, meaning the intent was there. It just requires wiring up the data from the existing `game` object.
- **Expected user impact:** High. A standard expectation for any digital chess board that drastically reduces cognitive load.
- **Effort level:** `small`
- **Why it is a good fit:** You have the codebase context to know that the prop exists and how to extract data from the `chess.js` instance to feed it.
