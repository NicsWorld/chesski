## 2026-09-21 - Fix Error Information Leakage and Unhandled Promise Rejections
**Vulnerability:** Leaking stack traces to console.error when FEN initialization failed and failing to handle navigator.clipboard.writeText Promise rejections securely.
**Learning:** React Error boundaries or try-catch blocks often default to passing full Error objects to loggers, potentially exposing internal implementation details. Unhandled promises related to browser APIs can cause silent failures or obscure application states.
**Prevention:** Always sanitize error messages logged to the client console to output generic strings instead of Error objects. Always attach `.catch()` blocks to Promise-based Web APIs, especially those depending on browser permissions or user interaction (like clipboard).
