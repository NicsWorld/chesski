# 🔒 Security: Validate FEN string with regex to prevent injection or ReDoS

### 🎯 What
The `fen` URL parameter was being passed to the `chess.js` library's `validateFen` function before structural validation. This could potentially expose the application to denial of service or unexpected parsing behaviors if `validateFen` has performance issues with certain malformed strings (like ReDoS) or if `chess.js` constructor is exposed to malformed input. This PR adds strict structural validation using a Regular Expression before parsing the FEN string.

### ⚠️ Risk
Without structural validation, malformed or excessively long/complex FEN strings supplied via the URL parameter (`?fen=...`) could be evaluated by the underlying chess library. This increases the risk of Regular Expression Denial of Service (ReDoS) or other injection vulnerabilities where the parsing library might hang or fail unexpectedly, leading to application unavailability or crashes for the user loading the crafted URL.

### 🛡️ Solution
Added a strict Regular Expression (`fenRegex`) to validate the structure of the `fen` URL parameter before passing it to `validateFen(fenParam).ok` or the `Chess` constructor. The regex `^([pPnNbBrRqQkK1-8]+\/){7}[pPnNbBrRqQkK1-8]+ [wb] (-|[KQkq]+) (-|[a-h][36])( \d+ \d+)?$` ensures that the string strictly matches the standard 4- or 6-part FEN format, rejecting malformed input early and preventing it from being processed by the library.
