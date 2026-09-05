# 🔒 Fix: Add Regex FEN Validation

## 🎯 What
Added Regex validation to the FEN string parsing logic in `src/App.tsx`. The FEN string from the URL is now validated against a regular expression before it is passed to the `chess.js` library for evaluation.

## ⚠️ Risk
The application read a `fen` URL parameter and passed it directly to `chess.js`'s `validateFen` and `new Chess()` functions without first ensuring it adheres to a basic structure. Malicious actors could inject malformed strings that could potentially exploit vulnerabilities in the FEN parsing logic of `chess.js`, leading to unexpected behavior, errors, or application crashes (Denial of Service).

## 🛡️ Solution
Implemented a straightforward Regex pattern `^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+ [wb] (-|[KQkq]+) (-|[a-h][36])( \d+ \d+)?$` to validate the structure of the FEN string prior to any processing by `chess.js`.
Also changed `console.error` to `console.warn` for invalid FENs.
