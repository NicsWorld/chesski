# 🧹 [Code Health] Remove redundant `shouldHidePiece` logic from Tutorial component

## 🎯 What
Removed the `shouldHidePiece` function and its usage within `src/components/Tutorial.tsx` and the `<ChessBoard>` component prop.

## 💡 Why
The `shouldHidePiece` logic was completely redundant. It was attempting to hide kings on the tutorial board based on their color and the active tutorial. However, an inline comment explicitly noted that kings were already being physically removed from the `chess.js` game state by the `removeKings` function. Because the pieces don't exist in the game state, this display logic was essentially dead code. Removing it cleans up the component, reducing cognitive load and improving maintainability.

## ✅ Verification
- Confirmed the file compiles without TypeScript errors.
- Ran the test suite (`npx vitest run`) and it passes (1/1).
- Ran ESLint (`npm run lint`) and it passes cleanly.
- Ran a production build (`npm run build`) and it succeeds.

## ✨ Result
A cleaner, simpler `Tutorial` component with fewer unnecessary props passed to the `ChessBoard` component, leading to improved code readability.
