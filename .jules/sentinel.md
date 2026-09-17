## 2026-09-17 - Prevent Stack Trace Leakage in Client Logs
**Vulnerability:** Raw Error objects were being passed to console.error and console.debug.
**Learning:** Passing raw Error objects in client-side code exposes stack traces and internal application structure to the user via the browser console.
**Prevention:** Always log sanitized strings or generic error messages rather than the direct Error object, and use `catch {` when the error object is unused to prevent linting errors.
