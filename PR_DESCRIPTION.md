🔒 Fix missing input validation on FEN parameter

🎯 **What:**
Added a regular expression validation step for the FEN parameter in the URL before it is processed by `chess.js` (either via `validateFen` or instantiation `new Chess()`).

⚠️ **Risk:**
Without this validation, malformed or excessively complex string inputs supplied via the URL parameter can be passed directly to the library's parsing logic. This can lead to uncontrolled resource consumption, causing memory exhaustion or ReDoS (Regular Expression Denial of Service) vulnerabilities if the underlying library uses complex regexes for parsing untrusted input. An attacker could craft a specific malicious URL that causes the application to crash or become unresponsive.

🛡️ **Solution:**
Implemented a basic regex validation (`/^([pnbrqkPNBRQK1-8]+\/){7}[pnbrqkPNBRQK1-8]+ [wb] (-|[KkQq]+) (-|[a-h][36])( \d+ \d+)?$/`) to check the structure of the `fen` string before evaluating it. This ensures that only structurally sound inputs reach the library, thereby preventing processing of malicious inputs. The fix was applied in `src/App.tsx`.
