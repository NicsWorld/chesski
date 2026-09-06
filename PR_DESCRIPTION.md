Title: 🔒 [Fix Missing Input Validation on FEN Parameter]

🎯 What
Added strict regex pre-validation for the FEN string in `src/App.tsx` before passing it to `chess.js`'s `validateFen()` method.

⚠️ Risk
The `chess.js` `validateFen` function uses `.split(/\s+/)` internally, which can be vulnerable to Regular Expression Denial of Service (ReDoS) attacks. Without pre-validation, a maliciously crafted FEN string could cause the application to consume excessive CPU resources when loaded via the URL parameter.

🛡️ Solution
Implemented a strict regex pre-validation `^([pPnNbBrRqQkK1-8]+\/){7}[pPnNbBrRqQkK1-8]+ [bw] (-|[KQkq]{1,4}) (-|[a-h][36])( \d+ \d+)?$` that ensures the FEN string structurally matches expected inputs before delegating to `validateFen()`. This regex ensures that only potentially valid FEN configurations (up to the required 4 fields, and optional halfmove and fullmove fields) are ever processed by `chess.js`, avoiding the ReDoS vector.