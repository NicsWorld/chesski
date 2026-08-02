# 🧹 [Code Health] Remove redundant `shouldHidePiece` logic from Tutorial and ChessBoard

## 🎯 What
The `shouldHidePiece` function in `Tutorial.tsx` and the associated optional prop in `ChessBoard.tsx` (including its interface, variable declaration, and conditional rendering logic) have been removed.

## 💡 Why
The logic for removing kings during tutorials was explicitly marked in code comments as physically removing the pieces (`removeKings` function), making the React-level rendering check (`shouldHidePiece`) redundant. Removing dead/redundant code improves codebase readability, reduces complexity in the `ChessBoard` component props, and prevents potential confusion for future contributors.

## ✅ Verification
I created Python scripts using Regex/String replacement to surgically target and remove only the `shouldHidePiece` code. After removing it, I ran `npm run lint` and `npm run build` without any errors. The test suite (`npx vitest run`) also passed, confirming that no existing functionality was broken by removing this prop.

## ✨ Result
A cleaner, simpler `Tutorial` and `ChessBoard` component. The `ChessBoard` component no longer carries an unused optional prop and conditional rendering check, making it more focused and maintainable.