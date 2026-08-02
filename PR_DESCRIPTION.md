# 🔒 Security Fix: Mitigate FEN parsing vulnerability

## 🎯 What
This PR fixes a security vulnerability in `src/App.tsx` where an untrusted FEN string obtained from a URL parameter (`fen`) was passed directly to the `chess.js` constructor without sufficient validation. The fix introduces a strict length limit (<= 100 characters) and utilizes the `chess.js` `validateFen` utility to ensure the payload is correctly formatted before instantiation.

## ⚠️ Risk
If left unfixed, the application is vulnerable to Regular Expression Denial of Service (ReDoS) or memory exhaustion attacks. A malicious actor could craft an excessively long or malformed FEN string and distribute the URL. When a victim opens the link, the unsafe parsing by `chess.js` could cause severe performance degradation, hang the application, or exhaust browser memory.

## 🛡️ Solution
The issue was addressed by implementing the following pre-validation steps before passing the FEN parameter to the `Chess` constructor:
- **Length Constraint**: Enforced a strict boundary check that verifies the `fenParam.length` is 100 characters or less.
- **Format Verification**: Added `validateFen(fenParam).ok` from `chess.js` to securely validate the structural integrity of the FEN string.
- If the FEN string fails these checks, an error is logged to the console ("Invalid FEN in URL", "FEN string failed validation"), and the application gracefully falls back to the default `game.fen()`, ensuring no exceptions disrupt the user experience.