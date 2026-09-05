# 🔒 [Security] Add Regex Validation to FEN URL Parameter

## 🎯 What
The application previously accepted a FEN string parameter directly from the URL and passed it to `validateFen` and the `Chess` constructor without structurally validating it first. A regex check has now been added to ensure the `fen` URL parameter matches the standard FEN string format.

## ⚠️ Risk
Without structural validation, malformed or excessively complex FEN inputs could be evaluated by the underlying `chess.js` library. While the library's `validateFen` function exists to identify valid configurations, it does not guarantee safe handling of maliciously crafted inputs designed to cause excessive processing or potential injection attacks when evaluated.

## 🛡️ Solution
A strict Regular Expression (`/^[a-zA-Z0-9/]+\s+[bw]\s+[KQkq-]+\s+[a-h36-]+( \d+ \d+)?$/`) was added to ensure the FEN parameter structurally represents a standard chess position *before* it is passed to `validateFen`. This pre-validation prevents potentially dangerous malformed input from ever reaching the `chess.js` engine for processing.
