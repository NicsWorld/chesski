# 🔒 Fix ReDoS and Unhandled Exception Vulnerability in FEN URL Parameter

## 🎯 What
Added input validation for the `fen` URL parameter before it is passed to the `Chess` constructor in `src/App.tsx`. Specifically, it limits the length to 100 characters and validates it using the `validateFen` function from `chess.js`.

## ⚠️ Risk
Without validation, a maliciously crafted FEN string could cause a Regular Expression Denial of Service (ReDoS) or cause the application to crash due to unhandled exceptions when `chess.js` tries to parse an absurdly long or structurally complex but invalid string. This would result in the application freezing or crashing for any user who clicks a crafted link.

## 🛡️ Solution
The code now explicitly checks the length of the string (`<= 100`) and calls `validateFen(fenParam).ok` before passing it to `new Chess(fenParam)`. If it fails validation, an error is logged to the console, and it gracefully falls back to the default board state without throwing an exception.
