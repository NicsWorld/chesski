🎯 What
This PR addresses ESLint unused variable warnings for the `pieceTheme` prop in `Piece.tsx` and `CapturedPieces.tsx` by applying it as a `data-theme` attribute on their root elements.

💡 Why
It improves code maintainability by ensuring the codebase is free of lint warnings and adheres to the project's strict ESLint rules.

✅ Verification
Confirmed that `npm run lint` now passes with zero errors, and `npx vitest run` executes cleanly without regressions.

✨ Result
The `pieceTheme` variable is now properly utilized in the DOM, and ESLint warnings are resolved.
