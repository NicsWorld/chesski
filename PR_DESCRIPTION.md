🔒 [Security] Add Regex Validation for FEN Input

🎯 What: Fixed a vulnerability where arbitrary strings passed in the `fen` URL parameter were evaluated by the `chess.js` library without strict preliminary formatting checks.
⚠️ Risk: If left unfixed, malicious or malformed FEN strings could be injected into the application state via URL, potentially leading to application crashes, unexpected behavior, or denial of service through computationally expensive invalid parsing within the library.
🛡️ Solution: Implemented a rigorous regex validation for the `fen` URL parameter to ensure it matches the strict structural requirements of a FEN string before passing it to `validateFen` or instantiating a new `Chess` object, preventing invalid inputs from being processed.