# 🧹 Optimize board rendering in ChessBoard

🎯 **What:** Wrapped the `game.board()` call in `src/components/ChessBoard.tsx` with `useMemo`.

💡 **Why:** Prevents inefficient recalculation of the board matrix on every render, improving maintainability and rendering performance. The computation is now cached and only re-runs when the `game` object reference changes.

✅ **Verification:** Confirmed changes passed linting (`npm run lint`), building (`npm run build`), and tests (`npx vitest run`). Verified the hook dependencies conform to React standards.

✨ **Result:** Board rendering is optimized without altering existing behavior.