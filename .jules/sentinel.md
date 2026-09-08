## 2026-09-08 - ReDoS Vulnerability in chess.js validateFen
**Vulnerability:** The built-in `validateFen` function in `chess.js` (v1.x) uses `.split(/\s+/)` internally, which can be vulnerable to Regular Expression Denial of Service (ReDoS) if exposed to unvalidated user input.
**Learning:** External libraries may contain regex vulnerabilities in their validation functions.
**Prevention:** Pre-validate user inputs (like FEN strings) with a strict, safe regular expression (e.g., ensuring limits on length and format without nested quantifiers) before passing them to the library.
