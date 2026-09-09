## 2024-05-15 - Information Leakage via Error Handling
**Vulnerability:** Raw Error objects were being logged directly to the browser console.
**Learning:** This exposes internal logic and stack traces to clients, increasing the attack surface.
**Prevention:** Catch blocks should sanitize error outputs and use optional catch binding (ES2019) to prevent unused variable linting errors.
