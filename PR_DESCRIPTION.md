🧹 Remove unused variables and eslint-disable comments in `Tutorial.tsx` and `App.tsx`

🎯 **What:**
- Changed `const [_, setFen]` to `const [, setFen]` in `src/components/Tutorial.tsx`.
- Changed `const [_fen, setFen]` to `const [, setFen]` in `src/App.tsx`.
- Removed the accompanying `eslint-disable-next-line @typescript-eslint/no-unused-vars` comments.

💡 **Why:**
- Improves code cleanliness and readability by removing dead code.
- Reduces reliance on `eslint-disable` comments, enforcing stricter linting rules by leveraging array destructuring syntax appropriately to skip unused initial tuple elements natively in JavaScript/TypeScript.

✅ **Verification:**
- Ran `npm run lint` successfully with no errors or warnings.
- Built the project with `npm run build` and verified the build succeeds.
- Verified test suite passes successfully with `npx vitest run`.

✨ **Result:**
- Cleaner, more maintainable code with fewer linter-suppression comments and slightly reduced boilerplate.