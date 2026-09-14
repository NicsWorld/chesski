# 🛡️ Sentinel: [security improvement]

## 🚨 Severity: MEDIUM

## 💡 Vulnerability:
The application was exposing internal stack traces to the client console by passing raw Error objects to `console.error` and `console.debug`.

## 🎯 Impact:
Stack traces can leak internal implementation details, potentially aiding attackers in understanding the application structure and identifying further vulnerabilities.

## 🔧 Fix:
Updated the catch blocks to omit the error variable and replaced the raw Error object logging with sanitized string messages, along with explanatory security comments.

## ✅ Verification:
Verified by running `pnpm lint` and `npx vitest run` to ensure no linting errors were introduced and that all tests pass.
