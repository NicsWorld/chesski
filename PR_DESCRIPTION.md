# 🧹 [Code Health] Remove unnecessary unused variable and eslint-disable in App.tsx

### 🎯 What:
In `src/App.tsx`, the `useState` hook for initializing `fen` was capturing the state value into a variable `_fen` which was never used. This required an accompanying `eslint-disable-next-line @typescript-eslint/no-unused-vars` comment. This PR removes the unused variable using array destructuring (`,`) and removes the unnecessary ESLint disable comment.

### 💡 Why:
Removing unused variables and their associated linting overrides improves code readability, reduces noise, and keeps the code strictly adhering to linter rules without exceptions.

### ✅ Verification:
- Code was manually inspected to ensure `_fen` was not used anywhere else in the file.
- Ran `npm run lint` and confirmed no errors are present.
- Ran the test suite `npx vitest run` to ensure functionality remains unchanged.
- Ran the build `npm run build` which succeeded.

### ✨ Result:
The codebase is cleaner, standard array destructuring for unused state variables is used (`const [, setFen] = useState(...)`), and one less ESLint exception is present in the codebase.
