## 2025-03-05 - Prevent Stack Trace Leakage
**Vulnerability:** Error objects were being passed directly to `console.error` and `console.debug`, exposing sensitive internal stack traces to the client side.
**Learning:** Client-side logging should never include full Error objects, as they contain stack traces revealing internal application paths and potentially sensitive configuration context.
**Prevention:** Always log generic error messages or explicitly sanitized properties instead of the raw `Error` object on the client side.