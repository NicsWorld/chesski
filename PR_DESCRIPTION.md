# 🧪 [testing improvement] Add comprehensive tests for gameStatus.ts draw and check edge cases

## 🎯 What
This PR addresses a missing test gap for the `evaluateGameStatus` utility function in `src/utils/gameStatus.ts`. While the main functional paths might have been implicitly covered, specific edge case handling for draws, checks, and checkmates lacked explicit unit tests to ensure `chess.js` conditions were correctly evaluated and surfaced to the UI.

## 📊 Coverage
The new test suite explicitly verifies the following scenarios:
*   Standard turns for both White and Black.
*   Checkmate evaluation when either White or Black wins.
*   Check alerts.
*   All `chess.js` draw edge cases, including:
    *   Stalemate
    *   Insufficient material
    *   Threefold repetition
    *   50-move rule

## ✨ Result
The `gameStatus` utility function is now fully tested, preventing accidental regressions if the underlying `chess.js` conditions or the status string logic is updated in the future.