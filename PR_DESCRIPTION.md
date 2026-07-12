🧹 [code health: remove unused variable in Tutorial.tsx]

🎯 **What:** Removed the unused `_` variable returned by `useState` and the corresponding `eslint-disable-next-line` comment in `src/components/Tutorial.tsx`.
💡 **Why:** Skipping the unused variable in array destructuring (`const [, setFen]`) is a standard, cleaner approach that eliminates the need for an eslint disable directive. This reduces noise and improves maintainability.
✅ **Verification:** Ran `npm run lint` and `npm run build` locally. The build succeeded and the linter passed, confirming no regressions.
✨ **Result:** A cleaner component file without unnecessary linter bypass comments.