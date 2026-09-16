## 2026-09-16 - Prevent Stack Trace Leakage in Client Logs
**Vulnerability:** Raw `Error` objects were passed directly to `console.error` and `console.debug`.
**Learning:** This exposes internal stack traces and application details to the client console, which is a security risk.
**Prevention:** Always log explicit, sanitized strings instead of raw error objects on the client side. Remove unused error variables from catch blocks to prevent linting errors.
