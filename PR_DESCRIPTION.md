🧹 Clean up unused memoization comment in App.tsx

🎯 **What:** Removed an outdated developer thought process comment block regarding memoization of the Chess game instance in `src/App.tsx`.
💡 **Why:** The comment is unused dead code that clutters the component body and discusses an optimization that wasn't implemented because it was unnecessary. Removing it improves codebase readability.
✅ **Verification:** Verified by checking the Git diff, ensuring no executable code was changed, and running linting and tests to confirm zero functionality breakage.
✨ **Result:** A cleaner `App.tsx` component with less noise and improved maintainability.