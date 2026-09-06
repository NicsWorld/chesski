## 🔒 Fix: Add Regex Validation for FEN Parameter

### 🎯 What
This PR fixes a missing input validation vulnerability by adding a regular expression to validate the FEN parameter from the URL before passing it to `chess.js`'s `validateFen` function.

### ⚠️ Risk
Without pre-validation, the `validateFen` function in `chess.js` (v1.x) uses `.split(/\s+/)` internally. This can be vulnerable to Regular Expression Denial of Service (ReDoS) if exposed to unvalidated, maliciously crafted user input via the `fen` URL parameter. A specially crafted, very long string containing many spaces or crafted sequences could potentially cause the browser to freeze or become unresponsive when parsing the URL parameter.

### 🛡️ Solution
The solution addresses the vulnerability by:
1. Adding a strict regular expression `FEN_REGEX` that enforces the structural constraints of a valid FEN string (including optional fields for halfmove and fullmove counts).
2. Updating the conditional check in `src/App.tsx` to ensure `FEN_REGEX.test(fenParam)` passes *before* invoking `validateFen(fenParam).ok`. This ensures that malformed input is rejected outright and never reaches the potentially vulnerable splitting logic within the library.
