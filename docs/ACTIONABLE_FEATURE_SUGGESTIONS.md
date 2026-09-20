# Actionable Feature Suggestions

### 1. "Challenge a Friend" Viral Loop
- **Repo:** chesski
- **Area / surface:** Game Header / Action Buttons
- **Relevant file(s):** `src/App.tsx`
- **What the gap or opportunity looks like today:** The "Share Game" button only copies the current game state via FEN. There is no clear call-to-action (CTA) to invite a new player to start a brand new game against the user.
- **The specific feature to build:** Add a prominent "Challenge a Friend" button next to "Play Game". Clicking it generates a URL like `?challenge=white` (using the same pattern as the `fen` param), copies it to the clipboard, and shows a success toast. When a second user opens the link, the app reads the `challenge` param and defaults their view to 'game' with a custom welcome message: "You've been challenged! You play Black."
- **Why this is a good small, focused task:** It perfectly mirrors the existing URL parameter reading logic and clipboard writing pattern used for `fen`, requiring no new dependencies.
- **Expected user impact:** Creates a direct viral loop. Users will naturally distribute the app to friends, driving user acquisition.
- **Effort level:** `small`
- **Why it is a good fit for me specifically, based on my recent contributions:** I recently worked on accessibility attributes for status messages, so I understand how the `message` state is announced and updated, which is crucial for making the "You've been challenged!" toast accessible.

### 2. Premium "Dinosaur" Theme
- **Repo:** chesski
- **Area / surface:** Header Theme Selector / Piece Rendering
- **Relevant file(s):** `src/App.tsx`, `src/components/Piece.tsx`
- **What the gap or opportunity looks like today:** The `pieceTheme` state easily toggles between 'zoo' and 'standard', but there is no monetization strategy tied to this extensible system.
- **The specific feature to build:** Introduce a 'dinosaur' theme to the `pieceTheme` type. In the UI, render it with a small lock icon. When clicked, instead of switching the theme, open a lightweight Stripe Checkout modal (or a simple "Buy Now" `window.location.href` redirect to a payment link). Upon successful return (via a success URL param), persist `hasDinoTheme: true` to `localStorage` and unlock the theme.
- **Why this is a good small, focused task:** The app's architecture already perfectly supports hot-swapping piece themes by passing down the `pieceTheme` string. Adding a third state and a payment link is purely additive and leverages existing components.
- **Expected user impact:** Validates willingness-to-pay immediately with a highly desirable cosmetic upgrade for the target demographic.
- **Effort level:** `medium`
- **Why it is a good fit for me specifically, based on my recent contributions:** My recent work adding `aria-pressed` to the theme toggle buttons gives me deep familiarity with the `pieceTheme` state management and how theme buttons are currently rendered in `App.tsx`.

### 3. Share to X / Twitter Intent
- **Repo:** chesski
- **Area / surface:** Game Status / Checkmate Screen
- **Relevant file(s):** `src/App.tsx`, `src/utils/gameStatus.ts`
- **What the gap or opportunity looks like today:** When a user achieves checkmate, the message simply updates to "Checkmate! ...". There is no prompt to capitalize on the user's moment of triumph to drive social sharing.
- **The specific feature to build:** Modify the checkmate UI state. When `evaluateGameStatus(game)` returns a checkmate string, dynamically render a "Brag on X" button alongside the message. This button opens a standard Twitter Web Intent URL (`https://twitter.com/intent/tweet?text=I just won a game on Chesski!...&url=...`).
- **Why this is a good small, focused task:** It requires zero external libraries—just standard anchor tags with specifically formatted query parameters, triggered by an existing state condition.
- **Expected user impact:** Generates free, organic social media impressions from highly engaged users experiencing a positive emotional peak.
- **Effort level:** `small`
- **Why it is a good fit for me specifically, based on my recent contributions:** I recently enhanced the `status-card` with `aria-live="polite"` and `aria-atomic="true"`. I know exactly how this component updates on checkmate and how to safely inject a share button without disrupting the accessible status announcements.

### 4. Embeddable Chess Widget
- **Repo:** chesski
- **Area / surface:** Build Config / App Container
- **Relevant file(s):** `src/App.tsx`, `index.html`
- **What the gap or opportunity looks like today:** Chesski is a destination site. To play it, users must navigate to the main URL. There is no way for other sites to embed the game.
- **The specific feature to build:** Add support for a `?embed=true` URL parameter. When present, `App.tsx` hides the header (`<header>`) and standard body padding, forcing the `ChessBoard` and essential controls to fill 100% of the viewport. Provide a small text snippet in the UI: `<iframe src="https://chesski.app/?embed=true"></iframe>` for users to copy.
- **Why this is a good small, focused task:** It leverages CSS and a simple boolean state derived from existing URL parsing logic. It turns the entire app into a portable widget with minimal code changes.
- **Expected user impact:** Enables chess bloggers, educators, and other websites to embed Chesski, driving referral traffic back to the main site.
- **Effort level:** `small`
- **Why it is a good fit for me specifically, based on my recent contributions:** I am familiar with the main `app-container` layout and how URL parameters dictate the initial state in `App.tsx`, making this a straightforward CSS and state extension.

### 5. Click-to-Move Support
- **Repo:** chesski
- **Area / surface:** Chessboard Interactions
- **Relevant file(s):** `src/components/ChessBoard.tsx`, `src/components/Piece.tsx`
- **What the gap or opportunity looks like today:** The app only supports Drag-and-Drop (via `react-dnd`). On mobile or trackpads, drag-and-drop can be clunky, causing friction in the core play loop.
- **The specific feature to build:** Implement a two-click move system. Click a piece to select it (highlight its square), then click an empty square or enemy piece to move. This can co-exist seamlessly with the drag-and-drop functionality.
- **Why this is a good small, focused task:** It builds on the existing `onMove` prop and square highlighting logic. It doesn't require new UI elements, just new event handlers.
- **Expected user impact:** Vastly improves accessibility and mobile playability, helping retain users on mobile devices.
- **Effort level:** `small`
- **Why it is a good fit for me specifically, based on my recent contributions:** My recent work on accessibility makes me highly attuned to interactions that don't rely solely on mouse drag-and-drop, making this a natural extension of improving the app's overall usability.

### 6. Freemium Puzzle Mode
- **Repo:** chesski
- **Area / surface:** Main Navigation / Tutorial View
- **Relevant file(s):** `src/App.tsx`, `src/components/Tutorial.tsx`
- **What the gap or opportunity looks like today:** The app has a "Tutorials" view and a "Play Game" view. Once tutorials are done, users only have open-ended play, missing the highly sticky "Daily Puzzle" retention loop common in chess apps.
- **The specific feature to build:** Create a third view state: 'puzzles'. Render a hardcoded list of 3 classic "Mate in 1" scenarios by feeding specific FEN strings into the `ChessBoard`. Lock the final "Puzzle of the Day" behind an email capture form to build a newsletter list.
- **Why this is a good small, focused task:** It perfectly reuses the `ChessBoard` component's ability to accept a FEN string. We just need to manage a new array of FENs and validation logic (checking if `game.isCheckmate()` after the move).
- **Expected user impact:** Significantly increases Daily Active Users (DAU) by giving them a quick, structured reason to return every day, while building a highly valuable email list.
- **Effort level:** `medium`
- **Why it is a good fit for me specifically, based on my recent contributions:** I am familiar with how `Tutorial.tsx` uses FEN strings and `ChessBoard` to create structured scenarios, allowing me to duplicate and adapt this pattern efficiently.

### 7. Sound Effects for Moves
- **Repo:** chesski
- **Area / surface:** Game Interactions
- **Relevant file(s):** `src/App.tsx`, `src/assets/`
- **What the gap or opportunity looks like today:** The game is completely silent, lacking visceral feedback on actions, reducing engagement.
- **The specific feature to build:** Add two small audio files: `move.mp3` and `capture.mp3`. In `App.tsx`, inside the move handler, play the appropriate sound based on whether the move involves a capture (checking if the target square had a piece using `game.get(to)` before moving, or parsing the FEN).
- **Why this is a good small, focused task:** It uses the standard HTML5 Audio API and taps into the existing centralized move logic in `App.tsx`.
- **Expected user impact:** Makes the game feel significantly more polished and engaging, providing clear feedback.
- **Effort level:** `small`
- **Why it is a good fit for me specifically, based on my recent contributions:** I have worked extensively in `App.tsx` and understand exactly where to inject the audio logic within the move lifecycle without disrupting the state updates.