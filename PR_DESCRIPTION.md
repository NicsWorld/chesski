## Title
🔒 Fix FEN Parameter ReDoS Vulnerability

## Description
🎯 **What:** The FEN parameter from the URL was being processed directly without sufficient structural validation, leading to potential Regular Expression Denial of Service (ReDoS) issues in the underlying `chess.js` library's `validateFen` function.
⚠️ **Risk:** An attacker could craft a malicious, overly long or complex FEN string in the URL that causes the server or client to hang while processing the regex, resulting in denial of service.
🛡️ **Solution:** Added a strict `FEN_REGEX` check and a length limit (`<= 100`) before calling `validateFen` or instantiating a new `Chess` game, ensuring only structurally valid strings are processed.