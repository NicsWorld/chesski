# 🧹 Remove unused setFen state in Tutorial.tsx

🎯 **What:** Removed the unused `setFen` state variable (which was ignored by an eslint directive) and all its setter calls (`setFen(...)`) in `src/components/Tutorial.tsx`.
💡 **Why:** The `game` object holds the current state natively. Duplicating `fen` causes extra renders, and the variable `_` was unused and just adding dead code/complexity. Removing it improves performance by avoiding unnecessary re-renders when the game state updates, and cleans up the code.
✅ **Verification:** Verified by running the `pnpm lint` and `npx vitest run` commands to ensure no linting or test issues were introduced, and by visually inspecting `git diff`.
✨ **Result:** A cleaner component without duplicate state and unnecessary rendering cycles.
