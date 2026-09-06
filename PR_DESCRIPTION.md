Title: 🔒 Fix ReDoS vulnerability in FEN parsing

🎯 **What**: Added strict regex pre-validation for FEN strings from URL parameters before passing them to `chess.js`'s `validateFen` function.
⚠️ **Risk**: The `validateFen` function in `chess.js` (v1.x) uses `.split(/\s+/)` internally, which can be vulnerable to Regular Expression Denial of Service (ReDoS) if exposed to unvalidated, extremely long or malformed user input from URL parameters.
🛡️ **Solution**: Implemented a strict Regular Expression (`/^[a-zA-Z0-9/]+ [wb] (?:-|[KkQq]+) (?:-|[a-h][36])(?: \d+ \d+)?$/`) to pre-validate the FEN format before passing it to `chess.js`, effectively preventing malformed strings from triggering the vulnerable internal split operation.
