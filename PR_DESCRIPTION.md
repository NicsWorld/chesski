🛡️ Sentinel: [MEDIUM] Fix stack trace leakage in error logging

🚨 Severity: MEDIUM
💡 Vulnerability: Raw `Error` objects were being passed directly to `console.error` and `console.debug`, which exposes internal stack traces and application structure to the client side.
🎯 Impact: An attacker or malicious user could inspect the browser console to gather internal implementation details (e.g. stack traces) that could aid in further attacks.
🔧 Fix: Removed raw `Error` objects from console logging. Changed the exception handling syntax to omit the error variable (`catch {`) to satisfy ESLint unused variable checks, and sanitized the error messages logged to the console.
✅ Verification: `pnpm lint` and `npx vitest run` will succeed, ensuring the application handles these gracefully without emitting raw error objects.