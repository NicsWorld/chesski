## 2024-05-24 - Unhandled Promise Rejection in Clipboard API
**Vulnerability:** Missing `.catch()` block in `navigator.clipboard.writeText` promise chain.
**Learning:** Browser APIs like the Clipboard API can fail (e.g., due to missing permissions or restrictive browser contexts) leading to unhandled promise rejections, which can cause the application state to become inconsistent or crash.
**Prevention:** Always attach `.catch()` handlers to Promise-based Web APIs, especially those dependent on permissions or user interactions, to ensure graceful error handling.