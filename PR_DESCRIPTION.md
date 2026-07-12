## 🧪 Testing improvement: App.tsx invalid move handling

🎯 **What:**
Added missing test coverage for the try-catch block in `App.tsx`'s `handleMove` function, which handles invalid moves thrown by `chess.js` (v1.0.0+).

📊 **Coverage:**
- Configured the project to run tests using Vitest and testing-library.
- Created `src/App.test.tsx` to verify `App.tsx`.
- Mocked `ChessBoard` to simulate emitting an invalid move payload.
- Verified that the "Oops! You can't move there." message is immediately displayed when the try-catch catches an error.
- Verified that the error message clears exactly after 2000ms using fake timers, restoring the previous game state message.

✨ **Result:**
Increased code coverage and confidence that the application elegantly handles invalid moves instead of crashing or showing misleading feedback.
