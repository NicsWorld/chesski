Title: "🧹 Refactor to use imported Square type"

Description:
🎯 **What:** The code health issue addressed is inline type casting of `import('chess.js').Square` in `ChessBoard.tsx`. We replaced it with an imported `Square` type.
💡 **Why:** It improves readability by moving type imports to the top of the file rather than relying on inline `import()` casts in render methods.
✅ **Verification:** Ran `pnpm lint` and `npx vitest run` to ensure no functionality is broken and code is clean.
✨ **Result:** Cleaner code that is easier to read and maintain.