# 🔒 Fix Regular Expression Denial of Service (ReDoS) vulnerability

🎯 **What:**
Added explicit FEN format regex validation for URL parameter inputs before processing them via `chess.js`'s `validateFen` function.

⚠️ **Risk:**
The `validateFen` function inside the `chess.js` v1.x uses regular expressions that can be susceptible to Regular Expression Denial of Service (ReDoS). When malformed strings are passed into this function, the internal regex can be tricked into performing extensive backtracking and consuming large amounts of computing resources (CPU), potentially causing application unresponsiveness and Denial of Service (DoS) for users visiting the URL with the malformed parameter.

🛡️ **Solution:**
Added a custom RegExp `FEN_REGEX` that validates the FEN parameter string strictly to ensure it structurally matches the basic FEN configuration format before we call `validateFen(fenParam).ok`. This regex (`/^([pnbrqkPNBRQK1-8]+\/){7}[pnbrqkPNBRQK1-8]+ [wb] (-|[KQkq]+) (-|[a-h][36])( \d+ \d+)?$/`) limits the length and characteristics of the input being tested and prevents invalid FEN strings from triggering slow regex execution in the internal library call.