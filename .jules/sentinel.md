## 2026-09-20 - Prevent Information Leakage in Console Logs
**Vulnerability:** Raw error objects (which include stack traces and potentially sensitive internal execution details) were being passed directly to `console.error` and `console.debug` on the client side.
**Learning:** Error objects expose too much internal context to end users or potential attackers observing the browser console.
**Prevention:** Always log sanitized, generic error strings instead of raw error objects. Also omit unused error variables in catch blocks (e.g. `catch {`) to satisfy ESLint.
