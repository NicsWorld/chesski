# 🧪 Test: Add test coverage for CapturedPieces

## 🎯 **What:**
Added comprehensive testing for the `CapturedPieces` React component which was missing test coverage.

## 📊 **Coverage:**
The newly added tests now cover:
- Initial state rendering (no captured pieces at the start of a game).
- Rendering of captured white pieces when missing from the board.
- Rendering of captured black pieces when missing from the board.
- Rendering of multiple captured pieces including different piece types across both colors concurrently.

## ✨ **Result:**
Improved test coverage and established safety nets for refactoring visual captured piece renderings and underlying chess piece calculation logic.