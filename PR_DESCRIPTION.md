🎯 **What:** Removed unused state variable `_` and the associated `setFen` calls in `src/components/Tutorial.tsx`.
💡 **Why:** `setFen` was maintained alongside `game` and was merely used to force a re-render. Since `setGame` takes a new `Chess` instance directly, the component will re-render automatically. Removing it cleans up code health.
✅ **Verification:** Verified by running `pnpm lint` and `npx vitest run` and ensuring all unit tests pass.
✨ **Result:** A more maintainable component logic with unnecessary state management removed.