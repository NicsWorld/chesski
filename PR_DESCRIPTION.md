# 🛡️ Sentinel: [CRITICAL] Fix Missing Input Validation on FEN Parameter

**🎯 What:**
Added pre-validation for the `fen` URL parameter using a strict regular expression (`FEN_REGEX`) and a length check before passing the input to `chess.js`.

**⚠️ Risk:**
Without pre-validation, the `chess.js` (v1.x) `validateFen` function processes unvalidated user input. Internally, it uses `.split(/\s+/)` which is susceptible to Regular Expression Denial of Service (ReDoS), potentially leading to application unresponsiveness if malformed FEN strings are provided.

**🛡️ Solution:**
We apply strict bounds by checking `fenParam.length <= 100` and `FEN_REGEX.test(fenParam)` before calling `validateFen`. This ensures only well-structured inputs are processed by the vulnerable internal regex.
