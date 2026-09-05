🔒 Security Vulnerability Fix: Add Regular Expression Validation for FEN Input

🎯 What:
The application suffered from a lack of strict input validation when extracting the `fen` parameter from the URL. Before this change, the `fen` input was blindly passed to `validateFen` and the `Chess` constructor, which only provided a basic structure check internally and couldn't protect against specifically crafted massive payloads effectively.

⚠️ Risk:
A malicious user could construct a URL with an extremely large or malformed `fen` query parameter. Although a length limit of 100 characters was checked prior, ensuring the string structurally resembles a valid FEN *before* attempting potentially heavy string operations provides defense in depth. An invalid FEN passed directly into chess engine functions might lead to unpredictable behavior, Regular Expression Denial of Service (ReDoS) during piece parsing, or unnecessary processing overhead.

🛡️ Solution:
Implemented a strict regex `^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+ [wb] (-|[KkQq]+) (-|[a-h][36])( \d+ \d+)?$` that verifies the general structure of the FEN string before it is passed to `chess.js`'s `validateFen` or the `Chess` constructor. This early validation ensures only strings matching the expected FEN schema are parsed, drastically minimizing the attack surface.