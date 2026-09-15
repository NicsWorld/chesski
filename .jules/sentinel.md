
## 2026-09-15 - Information Leakage via Unsanitized Error Logging
**Vulnerability:** The application logged raw Error objects (e.g., `console.error("...", e)`) to the console in `App.tsx` and `Tutorial.tsx`.
**Learning:** Catch blocks that pass the raw error to logging functions can inadvertently leak internal stack traces, system information, or internal module structures to the client-side console.
**Prevention:** Always log sanitized string messages instead of raw Error objects to the client console, and remove unused error variable bindings from catch clauses to prevent them from being logged and to satisfy linting rules.
