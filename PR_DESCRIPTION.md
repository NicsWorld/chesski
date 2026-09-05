# 🔒 [Security] Fix: Add strict regex validation for FEN URL parameter

🎯 **What:**
Added a strict regular expression validation step for the `fen` URL parameter before it is passed to the `chess.js` library for initialization and validation.

⚠️ **Risk:**
Without strict string validation prior to passing it to the library, malformed or excessively long/complex input strings could potentially be evaluated, leading to unsafe execution paths or performance degradation (such as ReDoS if the library is vulnerable). This protects the client from evaluating unexpected payloads.

🛡️ **Solution:**
Introduced a rigid regex `FEN_REGEX` that enforces the structural shape of a valid FEN string (six space-separated fields with appropriate characters for piece placement, turn, castling, en passant, halfmove clock, and fullmove number) directly in `src/App.tsx`. The FEN string is now verified against this regex before `validateFen` or the `Chess` constructor is called. Also updated error handling from `console.error` to `console.warn` to track this handled boundary condition appropriately.
