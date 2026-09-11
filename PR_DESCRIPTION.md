🛡️ Sentinel: [MEDIUM] Fix information leakage in console logs

🚨 Severity: MEDIUM
💡 Vulnerability: Raw `Error` objects and exceptions were being directly logged to the console using `console.error` and `console.debug`. This exposes stack traces and internal application details to the client-side environment.
🎯 Impact: An attacker could inspect the client console to gather insights into the application's internal structure and dependencies, aiding in the discovery of further vulnerabilities (information leakage).
🔧 Fix: Replaced raw error object logging with explicit, sanitized string messages. Added inline comments to document the security reasoning.
✅ Verification: Run `pnpm lint` and `npx vitest run` to ensure all tests pass and verify that tests strictly check for the sanitized string output instead of any `Error` object.