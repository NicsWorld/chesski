# Chesski High-Value Feature Suggestions

Here are 8 high-value, small-to-medium scoped feature suggestions focused on driving user growth, monetization, and core user value. These suggestions leverage existing patterns in the codebase to minimize new infrastructure while maximizing impact.

### 1. "Challenge a Friend" Viral Loop
- **Repo:** chesski
- **Area / surface:** Game Header / Action Buttons
- **Relevant file(s):** `src/App.tsx`
- **What the gap looks like today:** The "Share Game" button only copies the current game state via FEN. There is no clear call-to-action (CTA) to invite a new player to start a brand new game against the user.
- **The specific feature:** Add a prominent "Challenge a Friend" button next to "Play Game". Clicking it generates a URL like `?challenge=white` (using the same pattern as the `fen` param), copies it to the clipboard, and shows a success toast. When a second user opens the link, the app reads the `challenge` param and defaults their view to 'game' with a custom welcome message.
- **Why this is a good small, focused task:** It perfectly mirrors the existing URL parameter reading logic and clipboard writing pattern used for `fen`, requiring no new dependencies.
- **Expected user impact:** Creates a direct viral loop, significantly aiding growth.
- **Effort level:** `small`
- **Why it is a good fit:** I already understand the URL parsing in `App.tsx` and how to manipulate the initial state based on search parameters.

### 2. Premium "Dinosaur" Theme
- **Repo:** chesski
- **Area / surface:** Header Theme Selector / Piece Rendering
- **Relevant file(s):** `src/App.tsx`, `src/components/Piece.tsx`
- **What the gap looks like today:** The `pieceTheme` state easily toggles between 'zoo' and 'standard', but there is no monetization strategy tied to this extensible system.
- **The specific feature:** Introduce a 'dinosaur' theme to the `pieceTheme` type. Render it with a lock icon. When clicked, instead of switching the theme, open a lightweight Stripe Checkout modal (or a simple "Buy Now" redirect to a payment link). Upon successful return, persist `hasDinoTheme: true` to `localStorage` and unlock the theme.
- **Why this is a good small, focused task:** The app's architecture already perfectly supports hot-swapping piece themes. Adding a third state and a payment link is purely additive.
- **Expected user impact:** Validates willingness-to-pay immediately with a highly desirable cosmetic upgrade.
- **Effort level:** `medium`
- **Why it is a good fit:** I know how the theme strings map to piece SVGs/images in `Piece.tsx` and can implement the gated state logic cleanly.

### 3. Embeddable Chess Widget
- **Repo:** chesski
- **Area / surface:** Build Config / App Container
- **Relevant file(s):** `src/App.tsx`, `index.html`
- **What the gap looks like today:** Chesski is a destination site. To play it, users must navigate to the main URL.
- **The specific feature:** Add support for a `?embed=true` URL parameter. When present, `App.tsx` hides the header and standard body padding, forcing the `ChessBoard` and essential controls to fill 100% of the viewport. Provide a small text snippet in the UI: `<iframe src="https://chesski.app/?embed=true"></iframe>` for users to copy.
- **Why this is a good small, focused task:** It leverages CSS and a simple boolean state derived from existing URL parsing logic. It turns the entire app into a portable widget.
- **Expected user impact:** Enables chess bloggers, educators, and other websites to embed Chesski, driving massive amounts of referral traffic.
- **Effort level:** `small`
- **Why it is a good fit:** It builds directly upon the exact same URL search param parsing pattern in `App.tsx`.

### 4. Freemium Puzzle Mode
- **Repo:** chesski
- **Area / surface:** Main Navigation / Tutorial View
- **Relevant file(s):** `src/App.tsx`, `src/components/Tutorial.tsx` (or new `Puzzle.tsx`)
- **What the gap looks like today:** Once tutorials are done, users only have open-ended play, missing the highly sticky "Daily Puzzle" retention loop common in chess apps.
- **The specific feature:** Create a third view state: 'puzzles'. Render a hardcoded list of 3 classic "Mate in 1" scenarios by feeding specific FEN strings into the `ChessBoard`. Lock the final "Puzzle of the Day" behind an email capture form to build a newsletter list.
- **Why this is a good small, focused task:** It reuses the `ChessBoard` component's ability to accept a FEN string. We just need to manage a new array of FENs and validation logic.
- **Expected user impact:** Increases Daily Active Users (DAU) by giving them a structured reason to return every day, while building a valuable email list.
- **Effort level:** `medium`
- **Why it is a good fit:** The structure would be incredibly similar to the existing `Tutorial.tsx` component, allowing me to duplicate and modify that pattern efficiently.

### 5. Share to X / Twitter Intent
- **Repo:** chesski
- **Area / surface:** Game Status / Checkmate Screen
- **Relevant file(s):** `src/App.tsx`, `src/utils/gameStatus.ts`
- **What the gap looks like today:** When a user achieves checkmate, the message simply updates. There is no prompt to capitalize on the user's moment of triumph.
- **The specific feature:** Modify the checkmate UI state. When checkmate occurs, dynamically render a "Brag on X" button alongside the message. This button opens a standard Twitter Web Intent URL (`https://twitter.com/intent/tweet?...`).
- **Why this is a good small, focused task:** It requires zero external libraries—just standard anchor tags with specifically formatted query parameters, triggered by an existing state condition.
- **Expected user impact:** Generates free, organic social media impressions from highly engaged users experiencing a positive emotional peak.
- **Effort level:** `small`
- **Why it is a good fit:** I'm familiar with how `evaluateGameStatus` drives the `message` state and can easily extend the rendering logic.

### 6. Click-to-Move Support
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/components/Piece.tsx`
- **What the gap looks like today:** The app only supports Drag-and-Drop (via `react-dnd`). On mobile or trackpads, drag-and-drop can be clunky.
- **The specific feature:** Implement a two-click move system. Click a piece to select it (highlight its square), then click an empty square or enemy piece to move. This can co-exist seamlessly with the drag-and-drop functionality.
- **Why this is a good small, focused task:** It builds on the existing `onMove` prop and square highlighting logic (`highlight` prop in `BoardSquare`).
- **Expected user impact:** Vastly improves accessibility and mobile playability.
- **Effort level:** `medium`
- **Why it is a good fit:** I have context on the `ChessBoard` component's state management and how it passes moves up to `App.tsx`.

### 7. "Support the Developer" Endgame Hook
- **Repo:** chesski
- **Area / surface:** Action Buttons / Game Over State
- **Relevant file(s):** `src/App.tsx`
- **What the gap looks like today:** The action buttons (New Game, Undo, Share) are static. There is no passive monetization or tip jar.
- **The specific feature:** Add a subtle "☕ Buy me a coffee" button to the action buttons panel. Temporarily highlight or pulse this button (via a CSS class) when the game ends in a draw or checkmate.
- **Why this is a good small, focused task:** It is a pure UI addition linking out to a service like Ko-fi or BuyMeACoffee, requiring no complex state or backend logic.
- **Expected user impact:** Creates a low-friction revenue stream driven by goodwill from users who enjoy the free product.
- **Effort level:** `small`
- **Why it is a good fit:** I can quickly style this using existing classes and integrate it into the flex layout without disrupting the core game loops.

### 8. Piece Promotion UI Dialog
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap looks like today:** In `ChessBoard.tsx`, pawn promotion is hardcoded to Queen (`promotion: 'q'`), preventing valid underpromotions.
- **The specific feature:** When a move triggers a promotion, intercept the move before committing it. Display a small modal near the promotion square allowing the user to select Queen, Rook, Bishop, or Knight, then submit the move.
- **Why this is a good small, focused task:** It fixes a mechanical gap in the game logic requiring purely frontend state management.
- **Expected user impact:** Allows advanced players to play legally and removes unexpected friction.
- **Effort level:** `medium`
- **Why it is a good fit:** I understand where to intercept the `handleDrop` event in `ChessBoard.tsx` and can implement the selection UI.