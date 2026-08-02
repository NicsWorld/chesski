Title: 🧹 [code health] Remove unused variable and eslint-disable comment in Tutorial.tsx

Description:
* 🎯 **What:** Removed the unused `_` variable assignment and its associated `/* eslint-disable-next-line @typescript-eslint/no-unused-vars */` comment in `src/components/Tutorial.tsx` by using array destructuring syntax with an empty slot: `const [, setFen] = useState(...)`.
* 💡 **Why:** This change improves code cleanliness and readability by removing an unnecessary variable and a distracting linter suppression comment, utilizing standard JavaScript array destructuring features.
* ✅ **Verification:** Confirmed the change was correctly applied and ran the full suite of validations including `npm run lint`, `npm run build`, and `npx vitest run`, which all passed successfully, ensuring no regressions.
* ✨ **Result:** A cleaner component implementation with zero changes to existing functionality, making it easier for future developers to read and maintain the code.