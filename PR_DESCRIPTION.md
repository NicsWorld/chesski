Title: 🔒 Fix missing input validation on FEN parameter

Description:
🎯 **What:** Added strict regex validation before processing the FEN string from URL parameters.
⚠️ **Risk:** Missing input validation allowed potentially malformed FEN strings to be passed to `chess.js`'s `validateFen` function, which internally uses `.split(/\s+/)`. This could lead to a Regular Expression Denial of Service (ReDoS) vulnerability.
🛡️ **Solution:** Added a strict `FEN_REGEX` check to protect the library from processing malformed strings and explicitly ensure only well-structured FEN input is evaluated.