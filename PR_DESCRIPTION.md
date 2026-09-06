# 🔒 Fix ReDoS Vulnerability in FEN Validation

## 🎯 What
Added pre-validation of FEN strings using a strict Regular Expression before passing them to `chess.js`'s `validateFen` function.

## ⚠️ Risk
The `validateFen` function in `chess.js` (v1.x) uses string splitting which can be vulnerable to Regular Expression Denial of Service (ReDoS) when processing maliciously crafted, extremely long, or malformed FEN strings. This could lead to application hangs or crashes if a malicious URL is shared or opened.

## 🛡️ Solution
Implemented a strict regex `FEN_REGEX` that enforces the structural format of a valid FEN string. The application now verifies that `fenParam` matches this regex before invoking `validateFen`, thereby preventing malformed input from reaching the potentially vulnerable library code and mitigating the ReDoS risk.