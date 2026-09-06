🧹 [code health improvement] Remove unused setFen state and ESLint disable comment in Tutorial.tsx

🎯 What:
Removed the unused `setFen` state variable and its accompanying explicitly ignored `_` state, along with the `eslint-disable-next-line` directive from `src/components/Tutorial.tsx`.

💡 Why:
The `setFen` variable was tracking the FEN string but never used for rendering. Removing it cleans up dead code, reduces cognitive load, and eliminates the need for an ESLint disable comment, improving code health and maintainability without changing any functionality.

✅ Verification:
I ran `git diff` to ensure that only the unused variable and its updates were removed. I also executed `npm run lint` and `npx vitest run` to verify that there are no remaining linting errors and that all tests continue to pass successfully.

✨ Result:
The `Tutorial` component is now cleaner, with unused state and redundant ESLint disable comments completely removed.