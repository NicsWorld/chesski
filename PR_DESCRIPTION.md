# ✨ Feature: Share Game with Full Move History (PGN via URL)

## 🎯 What
This PR updates the "Share Game" functionality to export the full move history using the standard PGN format in the URL instead of just the FEN string. It also updates the app initialization logic to parse and load this PGN, falling back to FEN for backwards compatibility.

## 💡 Why
The previous implementation only shared a snapshot of the current board state (FEN). By sharing the entire PGN, the recipient can now see the history of previous moves, analyze how the game reached its current state, and use the "Undo" button, significantly improving the viral sharing loop and user experience.

## ✅ Verification
- The app successfully initializes from URLs containing `?pgn=` (base64/URI encoded).
- The app still safely falls back to FEN strings if `pgn` is not provided.
- Malformed PGN strings are safely caught in a try/catch block and logged without crashing the app.
- "Share Game" correctly removes the old `fen` parameter and injects the new `pgn` parameter.
- All existing tests pass.

## ✨ Result
Players can now share full game histories with friends to review mistakes or show off brilliant moves, making shared links highly engaging.
