🎯 **What:**
The application was directly passing unvalidated `fen` URL parameters to the `validateFen` function from `chess.js` and subsequently attempting to instantiate `new Chess(fenParam)`. The `validateFen` function internally uses regex and `.split(/\s+/)` operations which can be vulnerable to Regular Expression Denial of Service (ReDoS) or cause unexpected behavior if exposed to completely unvalidated user input strings.

⚠️ **Risk:**
An attacker could craft malicious URLs with extremely long or specifically formatted `fen` parameters designed to exploit regex processing inefficiencies (ReDoS) within `chess.js`, leading to degraded performance, freezing, or crashing of the client's browser or any server-side rendering processes evaluating the input.

🛡️ **Solution:**
Implemented strict regex validation for the FEN string format *before* it is processed by the `chess.js` library. The FEN parameter must now pass a strict regex check (`FEN_REGEX.test(fenParam)`) that ensures it matches standard FEN structure before being evaluated, thus mitigating the ReDoS vulnerability by strictly bounding the format of acceptable input.
