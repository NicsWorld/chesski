## 🚨 Severity: MEDIUM

## 💡 Vulnerability:
The application was logging raw `Error` objects directly to `console.error` and `console.debug`.

## 🎯 Impact:
This exposes sensitive internal stack traces to the client side, potentially revealing internal application structure, file paths, and implementation details to end users or malicious actors inspecting the browser console.

## 🔧 Fix:
Modified the logging statements to only output generic string messages, preventing the raw error objects from being serialized and leaked to the client console.

## ✅ Verification:
Run `pnpm test` and `pnpm lint` to verify that all functionality works correctly and the test suite has been updated to expect the sanitized log format.