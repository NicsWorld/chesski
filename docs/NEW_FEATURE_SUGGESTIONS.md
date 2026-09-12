# New Feature Suggestions

### 1. "Challenge a Friend" Viral Loop (Growth)
- **Repo:** chesski
- **Area / surface:** Game Header / Action Buttons
- **Relevant file(s):** `src/App.tsx`
- **What the gap looks like today:** The "Share Game" button only copies the current game state via a FEN URL. There is no clear call-to-action (CTA) to invite a new player to start a brand new game against the user.
- **The specific feature:** Add a prominent "Challenge a Friend" button next to "Play Game". Clicking it generates a URL like `?challenge=white` (reusing the FEN URL param pattern), copies it to the clipboard, and shows a success toast. When a second user opens the link, `App.tsx` reads the param and defaults to the 'game' view with a custom "You've been challenged! You play Black." welcome message.
- **Why this is a good small, focused task:** It perfectly mirrors the existing URL parameter reading logic and clipboard writing pattern already present in the codebase.
- **Expected user impact:** Creates a direct viral loop, naturally distributing the app to friends and aiding organic user growth.
- **Effort level:** `small`
- **Why it is a good fit:** I already understand the URL parsing and state management in `App.tsx` and can manipulate the initial `message` and `view` states quickly.

### 2. Embeddable Chess Widget (Growth)
- **Repo:** chesski
- **Area / surface:** Build Config / App Container
- **Relevant file(s):** `src/App.tsx`, `index.html`, `src/App.css`
- **What the gap looks like today:** Chesski is a standalone destination site. To play it, users must navigate directly to the main URL.
- **The specific feature:** Add support for an `?embed=true` URL parameter. When present, `App.tsx` hides the header (`<header>`) and standard body padding, forcing the `ChessBoard` and essential controls to fill 100% of the viewport. Provide a small "Copy Embed Code" button that gives users an `<iframe>` snippet.
- **Why this is a good small, focused task:** It leverages basic CSS and a simple boolean state derived from existing URL parsing logic to turn the entire app into a portable widget.
- **Expected user impact:** Enables chess bloggers, educators, and other websites to easily embed Chesski, driving referral traffic back to the main site.
- **Effort level:** `small`
- **Why it is a good fit:** It builds directly upon the URL search param parsing pattern I just reviewed, and I can implement the layout tweaks without altering any complex game logic.

### 3. Premium "Dinosaur" Theme (Monetization)
- **Repo:** chesski
- **Area / surface:** Header Theme Selector / Piece Rendering
- **Relevant file(s):** `src/App.tsx`, `src/components/Piece.tsx`
- **What the gap looks like today:** The `pieceTheme` state easily toggles between 'zoo' and 'standard', but there is no monetization strategy tied to this highly extensible system.
- **The specific feature:** Introduce a 'dinosaur' theme option to `pieceTheme`. Render it with a lock icon in the UI. When clicked, redirect to a Stripe Checkout payment link. Upon a successful return (via a success URL param), persist `hasDinoTheme: true` to `localStorage` and unlock the theme.
- **Why this is a good small, focused task:** The app's architecture already perfectly supports hot-swapping piece themes by passing down the `pieceTheme` prop. Adding a third state and a payment link is purely additive.
- **Expected user impact:** Validates willingness-to-pay immediately with a highly desirable cosmetic upgrade for the target demographic.
- **Effort level:** `medium`
- **Why it is a good fit:** I know exactly how the theme strings map to piece components in `Piece.tsx` and `App.tsx` and can easily implement the gated state logic.

### 4. Freemium Puzzle Mode (Retention / Monetization)
- **Repo:** chesski
- **Area / surface:** Main Navigation / Tutorial View
- **Relevant file(s):** `src/App.tsx`, `src/components/Tutorial.tsx` (or new `src/components/Puzzle.tsx`)
- **What the gap looks like today:** The app has a "Tutorials" view and open-ended play, but it misses the highly sticky "Daily Puzzle" retention loop common in popular chess apps.
- **The specific feature:** Create a third view state: 'puzzles'. Render a hardcoded list of 3 classic "Mate in 1" scenarios by feeding specific FEN strings into the `ChessBoard`. Lock the final "Puzzle of the Day" behind a simple email capture form (e.g., Mailchimp) to build a newsletter list.
- **Why this is a good small, focused task:** It reuses the `ChessBoard` component's ability to accept a FEN string and the existing game mechanics. We just need to manage an array of FENs and validation logic (checking `game.isCheckmate()`).
- **Expected user impact:** Significantly increases Daily Active Users (DAU) and builds a highly valuable email list for future monetization.
- **Effort level:** `medium`
- **Why it is a good fit:** The structure would be incredibly similar to the `Tutorial.tsx` component. I can duplicate and modify that pattern efficiently while applying my recent optimizations around FEN handling.

### 5. Piece Promotion UI Dialog (Core User Value)
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap looks like today:** In `ChessBoard.tsx`, pawn promotion is hardcoded to Queen (`promotion: 'q'`). This breaks standard chess rules by preventing necessary underpromotions (e.g., to Knight to avoid stalemate).
- **The specific feature:** When a move triggers a promotion, intercept it before committing. Display a small modal or floating popover near the promotion square allowing the user to select Queen, Rook, Bishop, or Knight, then submit the move with the selected piece.
- **Why this is a good small, focused task:** It fixes a critical mechanical gap. It requires purely frontend state management (intercepting the drag-drop action) and utilizes existing piece images.
- **Expected user impact:** Allows advanced players to play legally and removes friction and frustration from the endgame.
- **Effort level:** `medium`
- **Why it is a good fit:** Having just worked on performance optimizations for `ChessBoard.tsx` (optimizing `game.get(square)` access), I have deep context on the component's state management and how it interacts with the `onMove` callback.

### 6. Click-to-Move Support (UX/Accessibility)
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/components/Piece.tsx`
- **What the gap looks like today:** The app only supports Drag-and-Drop (via `react-dnd`). On mobile devices or trackpads, drag-and-drop can be extremely clunky or inaccessible.
- **The specific feature:** Implement a two-click move system. Click a piece to select it (highlight its square and valid moves), then click an empty square or enemy piece to move. This can co-exist seamlessly with the drag-and-drop functionality.
- **Why this is a good small, focused task:** It builds on the existing `onMove` prop and square highlighting logic (`highlight` prop in `BoardSquare`). It doesn't require new UI elements, just new local state and event handlers.
- **Expected user impact:** Vastly improves accessibility, mobile playability, and overall user friction.
- **Effort level:** `small`
- **Why it is a good fit:** Because I recently optimized the board rendering loop in `ChessBoard.tsx`, I can confidently add click event listeners and manage local selected square state without introducing performance regressions.
