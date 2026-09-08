## 2026-09-08 - Unvalidated FEN Parameter ReDoS Vulnerability
**Vulnerability:** The FEN parameter from the URL was being passed directly to `validateFen` in `chess.js`, which uses a vulnerable regex (`.split(/\s+/)`). This could lead to a Regular Expression Denial of Service (ReDoS) attack.
**Learning:** Unvalidated external input (like URL parameters) should not be passed directly to complex third-party library functions, especially those doing regex processing on strings, without prior sanitization or structural validation.
**Prevention:** Always pre-validate complex string inputs (like FEN strings) with strict, bounded regular expressions before processing them or passing them to libraries.
