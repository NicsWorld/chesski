## 🧹 [code health: remove unused fen variable and eslint-disable comment]

### 🎯 What
Removed the unused `_fen` variable and its associated `// eslint-disable-next-line @typescript-eslint/no-unused-vars` comment in `src/App.tsx`.

### 💡 Why
The initial destructuring `const [_fen, setFen] = useState(...)` assigned the state value to `_fen` only to be ignored. By adopting the standard JavaScript array destructuring pattern `const [, setFen] = useState(...)`, the code achieves the same result (omitting the unused value) without needing a named variable or an ESLint override. This improves code cleanliness and readability.

### ✅ Verification
- Read the modified file visually to confirm the exact `sed` replacement logic ran successfully and the destructuring syntax is correct.
- Executed `npm run lint` and confirmed 0 errors.
- Executed `npm run build` and confirmed the TypeScript compilation succeeded.
- Executed `npx vitest run` and all existing unit tests passed.

### ✨ Result
Cleaner destructuring in `src/App.tsx` and one fewer unnecessary ESLint disable comment.
