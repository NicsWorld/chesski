## 🧹 [Code Health Improvement] Log Invalid Moves in Tutorial

### 🎯 What
Updated the empty `catch` block in `src/components/Tutorial.tsx` (`handleMove` function) to log a console warning (`console.warn("Invalid move attempted during tutorial.");`) instead of silently swallowing the error when an invalid move occurs.

### 💡 Why
Silently catching exceptions is an anti-pattern. While invalid moves during the tutorial are expected, acknowledging them via a console warning improves code maintainability and aids in debugging. It clarifies that the exception is intentionally caught and provides visibility into the application's runtime behavior.

### ✅ Verification
- Checked the file using `sed -n '140,146p' src/components/Tutorial.tsx` to ensure the console warning was correctly added.
- Ran `npm run lint` and `npm run build` to confirm no syntax or build errors were introduced.
- Verified that the core logic of `handleMove` and the tutorial component remains unchanged.

### ✨ Result
Improved maintainability and debuggability in the tutorial component without changing the product behavior. Developers can now trace when and why moves fail during tutorials.
