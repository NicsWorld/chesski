# 🔒 Fix Information Exposure via Console Error

## 🎯 What
This pull request addresses an information exposure vulnerability where the raw `Error` object was being logged to `console.error` when an invalid FEN parameter was provided in the URL.

## ⚠️ Risk
Logging raw error objects to the console can inadvertently expose sensitive internal details about the application's state, execution flow, or the `chess.js` library's validation logic to users or potential attackers inspecting the browser console.

## 🛡️ Solution
The `console.error` calls in `src/App.tsx` have been updated to log only the generic message `"Invalid FEN in URL"`, omitting the raw error object. In the `catch` block, ES2019 optional catch binding (`catch { ... }`) is now used since the error parameter is no longer needed. The corresponding unit test in `src/App.test.tsx` has also been updated to assert only the generic message.