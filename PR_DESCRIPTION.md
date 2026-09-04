🧹 [code health improvement: remove dead pieceTheme state and prop drilling]

🎯 What: Removed `pieceTheme` state and the associated Theme selector buttons from `App.tsx` and removed the `pieceTheme` prop from `ChessBoard`, `Piece`, `Tutorial`, and `CapturedPieces`.
💡 Why: The `pieceTheme` state is no longer used by the components since the animal assets have been removed, making the state and the prop drilling dead code.
✅ Verification: Ran `npm run lint` and `npx vitest run` and all checks passed.
✨ Result: Cleaned up unused state and eliminated prop drilling across 5 components.
