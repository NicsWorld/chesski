🧪 [Add component tests for CapturedPieces]

🎯 **What:**
Added a comprehensive test suite for `CapturedPieces.tsx` using Vitest and React Testing Library. This fills a testing gap identified in the project for tracking and rendering captured pieces correctly.

📊 **Coverage:**
The tests now verify:
- Initial state rendering (no captured pieces shown at the start of a game).
- Correct mapping and rendering of missing pieces (by removing specific pieces from a `chess.js` instance and ensuring the corresponding images/icons appear).
- Standard piece theme rendering as a baseline for the component.

✨ **Result:**
Improved testing reliability and safety net for the component, ensuring that refactoring piece capture logic will not silently introduce regressions.
