## 2026-09-22 - Sanitize Error Logging
**Vulnerability:** Information Disclosure (Leaking Stack Traces)
**Learning:** Client-side error logging was passing raw Error objects to console.error, exposing internal application state and stack traces.
**Prevention:** Always sanitize error messages logged to the client console by outputting generic strings instead of raw Error objects.
