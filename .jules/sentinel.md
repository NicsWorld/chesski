
## 2026-09-20 - Prevent Stack Trace Leakage in Client Console
**Vulnerability:** Raw Error objects were being passed directly to console.error, potentially leaking internal implementation details or stack traces to the client side.
**Learning:** Raw Error objects contain stack traces and other potentially sensitive execution context. Exposing them in the client console is a form of information leakage that can aid attackers in reconnaissance.
**Prevention:** Catch clauses should omit the variable binding (catch {}) when the error object itself is not safely used, and explicit, sanitized string literals should be logged instead of raw Error objects.
