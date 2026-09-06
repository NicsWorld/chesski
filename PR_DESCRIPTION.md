# 🔒 Prevent ReDoS vulnerability in chess.js v1.x

## 🎯 What
This PR addresses a potential Regular Expression Denial of Service (ReDoS) vulnerability by adding strict regex pre-validation for FEN strings parsed from the URL parameters before they are passed to the `chess.js` library's `validateFen` function.

## ⚠️ Risk
The `validateFen` function in `chess.js` v1.x uses `.split(/\s+/)` internally. If it processes unvalidated or maliciously crafted input, it could be vulnerable to ReDoS attacks, leading to performance degradation or application crash.

## 🛡️ Solution
A regex validation (`fenRegex`) has been added in `src/App.tsx` that ensures the FEN string strictly adheres to the expected pattern of a FEN string before calling `validateFen`. This effectively sanitizes the input and neutralizes any malformed string before it reaches the vulnerable `split(/\s+/)` execution within `chess.js`.
