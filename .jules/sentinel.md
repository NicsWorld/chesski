## 2026-09-19 - Prevent stack trace leakage in client logs
**Vulnerability:** Raw error objects (which contain sensitive stack traces) were being passed to `console.error` and `console.debug`.
**Learning:** Even in frontend applications, exposing stack traces can leak internal implementation details and dependency structures to potential attackers.
**Prevention:** Catch clauses should avoid capturing the error object entirely (e.g., `catch {`) if not strictly needed, and log generic string messages instead of the raw error instance.
