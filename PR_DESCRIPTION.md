🎯 What
Extracted inline game cloning logic into a reusable `cloneGame` utility function in `src/App.tsx`.

💡 Why
The exact same logic for cloning a `chess.js` instance (`const gameClone = new Chess(); gameClone.loadPgn(game.pgn());`) was duplicated in `handleMove` and the undo functionality. Extracting it DRYs up the code and provides a single place for any future optimizations to this deep-clone pattern.

✅ Verification
Ran the test suite and confirmed tests still pass, meaning functionality remains identical.

✨ Result
A more maintainable App component with deduplicated state cloning.