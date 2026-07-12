# 🔒 Fix Raw Exception Exposure in App.tsx

## 🎯 What
Removed the exposure of the raw exception object in a `console.error` block inside `src/App.tsx`. The raw exception variable (`e`) was previously logged directly to the browser console when an invalid FEN was parsed from the URL.

## ⚠️ Risk
Logging raw error objects to the console can inadvertently leak internal stack traces or implementation details, creating an information disclosure vulnerability. This information could be exploited by an attacker attempting to understand internal workings or looking for known vulnerabilities in the stack.

## 🛡️ Solution
Modified the `catch` block on line 29 of `src/App.tsx` to use optional catch binding (`catch { ... }`), eliminating the local `e` variable and ensuring the raw exception object is not captured or passed to `console.error()`. A sanitized error string is now logged without exposing any internal state.