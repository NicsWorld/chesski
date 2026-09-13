# High-Value Feature Suggestions for Chesski

Based on the codebase review, here are 8 concrete, high-value feature suggestions ranked from highest to lowest impact, focusing on growth, monetization, and core user value.

### 1. "Challenge a Friend" Viral Loop
- **Repo:** chesski
- **Area / surface:** Game Header / Action Buttons
- **Relevant file(s):** `src/App.tsx`
- **What the gap looks like today:** The "Share Game" button only copies the current game state via FEN. There is no clear call-to-action (CTA) to invite a new player to start a brand new game against the user.
- **The specific feature:** Add a prominent "Challenge a Friend" button next to "Play Game". Clicking it generates a URL like `?challenge=white`, copies it to the clipboard, and shows a success toast. When a second user opens the link, the app reads the parameter and defaults to a game view with a custom welcome message.
- **Why this is a good small, focused task:** It perfectly mirrors the existing URL parameter reading logic and clipboard writing pattern used for `fen`, requiring no new dependencies.
- **Expected user impact:** Creates a direct viral loop, lowering customer acquisition cost by encouraging users to distribute the app to friends.
- **Effort level:** `small`
- **Why it is a good fit for me:** It builds perfectly on my recent UI/accessibility updates by extending existing React state management and button components.

### 2. Premium "Dinosaur" Theme
- **Repo:** chesski
- **Area / surface:** Header Theme Selector / Piece Rendering
- **Relevant file(s):** `src/App.tsx`, `src/components/Piece.tsx`
- **What the gap looks like today:** The `pieceTheme` state toggles between 'zoo' and 'standard', but there is no monetization strategy tied to this extensible system.
- **The specific feature:** Introduce a 'dinosaur' theme. Render it with a lock icon in the UI. When clicked, redirect to a simple Stripe Checkout or payment link. Upon successful return (via a URL param), persist `hasDinoTheme: true` to `localStorage` and unlock the theme.
- **Why this is a good small, focused task:** The app's architecture already perfectly supports hot-swapping piece themes. Adding a third state and a payment link is purely additive and leverages existing components.
- **Expected user impact:** Validates willingness-to-pay immediately with a cosmetic upgrade, generating revenue without altering core gameplay.
- **Effort level:** `medium`
- **Why it is a good fit for me:** I am intimately familiar with how the `pieceTheme` state maps to SVG images in `Piece.tsx` and can easily manage the conditional rendering.

### 3. Piece Promotion UI Dialog
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/App.tsx`
- **What the gap looks like today:** Pawn promotion is hardcoded to Queen (`promotion: 'q'`). This breaks standard chess rules by preventing underpromotion.
- **The specific feature:** Intercept the move before committing it if it triggers a promotion. Display a small modal/popover near the promotion square allowing the user to select Queen, Rook, Bishop, or Knight, then submit the move.
- **Why this is a good small, focused task:** It fixes a mechanical gap in the game logic using purely frontend state management and utilizes existing piece images.
- **Expected user impact:** Allows advanced players to play legally, improving the core value and credibility of the application.
- **Effort level:** `medium`
- **Why it is a good fit for me:** My recent work adding semantic HTML and accessibility attributes positions me perfectly to build a compliant, accessible modal component.

### 4. "Support the Developer" Endgame Hook
- **Repo:** chesski
- **Area / surface:** Action Buttons / Game Over State
- **Relevant file(s):** `src/App.tsx`
- **What the gap looks like today:** The action buttons are static. There is no passive monetization or tip jar.
- **The specific feature:** Add a subtle "☕ Buy me a coffee" button to the action buttons panel. Highlight or pulse this button (via a CSS class) when the game ends in a draw or checkmate, capturing the user at a natural pause.
- **Why this is a good small, focused task:** It is a pure UI addition linking out to a service like Ko-fi or BuyMeACoffee, requiring no complex state or backend logic.
- **Expected user impact:** Creates a low-friction revenue stream driven by goodwill from users who enjoy the product.
- **Effort level:** `small`
- **Why it is a good fit for me:** I can quickly style this using the existing `.btn-secondary` classes and integrate it into the flex layout seamlessly.

### 5. Share to X / Twitter Intent
- **Repo:** chesski
- **Area / surface:** Game Status / Checkmate Screen
- **Relevant file(s):** `src/App.tsx`, `src/utils/gameStatus.ts`
- **What the gap looks like today:** When a user achieves checkmate, the message updates, but there is no prompt to capitalize on their moment of triumph.
- **The specific feature:** When `evaluateGameStatus(game)` returns a checkmate string, dynamically render a "Brag on X" button alongside the message that opens a standard Twitter Web Intent URL.
- **Why this is a good small, focused task:** It requires zero external libraries—just standard anchor tags with formatted query parameters, triggered by an existing state condition.
- **Expected user impact:** Generates free, organic social media impressions from highly engaged users experiencing a positive emotional peak.
- **Effort level:** `small`
- **Why it is a good fit for me:** I recently updated the status messages with ARIA live regions, so I know exactly where and how to cleanly inject this conditional CTA.

### 6. "Copy PGN" Button
- **Repo:** chesski
- **Area / surface:** Game Info Panel / Action Buttons
- **Relevant file(s):** `src/App.tsx`
- **What the gap looks like today:** There is no way to export the full move history for analysis in external tools like Lichess or Chess.com.
- **The specific feature:** Add an "Export PGN" button next to "Share Game". It should call `game.pgn()` and use `navigator.clipboard.writeText()` to copy it, utilizing the existing temporary success message pattern.
- **Why this is a good small, focused task:** It's practically a one-liner API call wired up to an existing clipboard utility pattern.
- **Expected user impact:** Power users can easily analyze their completed games elsewhere, closing a critical feature gap.
- **Effort level:** `small`
- **Why it is a good fit for me:** I am familiar with the existing `shareGame` implementation and its promise handling, ensuring a robust integration.

### 7. Show Captured Pieces
- **Repo:** chesski
- **Area / surface:** Game Info Panel
- **Relevant file(s):** `src/App.tsx`, `src/components/CapturedPieces.tsx`
- **What the gap looks like today:** The `App.tsx` file has a commented-out section for captured pieces. Players cannot easily see material advantage during a game.
- **The specific feature:** Implement and integrate the `CapturedPieces` component that calculates captured pieces by analyzing the current board state and renders small SVGs of captured pieces grouped by color.
- **Why this is a good small, focused task:** It fulfills a standard chess application expectation and fills an explicitly marked gap in the UI using already-present `chess.js` state.
- **Expected user impact:** Reduces cognitive load by allowing users to quickly assess who is winning based on material.
- **Effort level:** `medium`
- **Why it is a good fit for me:** It involves React component composition and layout matching, leveraging my UI skills to seamlessly introduce the missing element.

### 8. Click-to-Move Support
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/components/Piece.tsx`
- **What the gap looks like today:** The app only supports Drag-and-Drop (via `react-dnd`), which can be clunky on mobile or trackpads.
- **The specific feature:** Implement a two-click move system. Click a piece to select it (highlight its square), then click an empty square or enemy piece to move.
- **Why this is a good small, focused task:** It builds on the existing `onMove` prop and square highlighting logic without requiring new UI elements, just new event handlers.
- **Expected user impact:** Vastly improves accessibility and mobile playability, directly tying to overall growth and user retention.
- **Effort level:** `small`
- **Why it is a good fit for me:** Improving interaction accessibility aligns perfectly with my recent focus on ARIA states and keyboard-friendly UI improvements.
