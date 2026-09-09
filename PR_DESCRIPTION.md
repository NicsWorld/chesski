🛡️ Sentinel: [MEDIUM] Fix information leakage in error handling

🚨 Severity: MEDIUM
💡 Vulnerability: Raw Error objects containing internal stack traces and logic were being directly output to the client console on invalid FENs and moves.
🎯 Impact: This exposes internal application structure and dependency details to potentially malicious users, increasing the attack surface.
🔧 Fix: Sanitized the error logging statements to output generic error strings instead of raw Error objects, and updated the associated Vitest spies.
✅ Verification: Ensure tests pass and the console output only contains generic strings during error states.
