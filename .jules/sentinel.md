## 2026-09-26 - Information Leakage in Error Logs
**Vulnerability:** Raw error objects, including stack traces and system internals, were being logged directly to the browser console (`console.error` and `console.debug`).
**Learning:** Catching exceptions blindly and passing the raw `Error` objects out via UI logs can leak stack details that could help malicious actors map internal configurations or bypass defenses. Unused exception variables also trigger TypeScript linter failures if not discarded gracefully.
**Prevention:** Always sanitize UI/console error outputs to provide clear, safe strings without attached exception objects. Use `catch { ... }` blocks to drop unused variables completely if the exception details aren't needed.
