## 2026-09-13 - Missing Error Handling for Clipboard API
**Vulnerability:** Unhandled promise rejection when calling `navigator.clipboard.writeText`.
**Learning:** Promise-based browser APIs can fail due to permissions or environment constraints, which without proper catching can cause unhandled rejections.
**Prevention:** Always attach a `.catch()` block to promise chains for native APIs and provide sanitized user feedback without logging raw error objects.
