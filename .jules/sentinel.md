## 2026-09-18 - Prevent Stack Trace Leakage in Client Logging
**Vulnerability:** Raw Error objects were being passed to `console.error` during FEN URL parsing, which can leak internal stack traces to the client console.
**Learning:** Even client-side application state initialization can inadvertently expose internal engine/logic details if unhandled exceptions or new Error objects are logged directly.
**Prevention:** Always sanitize error messages before logging to the console and remove the variable binding in catch blocks if unused to prevent linting errors.
