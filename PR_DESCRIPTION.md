# 🔒 Fix FEN parameter vulnerability

## 🎯 What
Added validation to the FEN parameter parsed from the URL initialization payload in `src/App.tsx`. The code now ensures the FEN string length is less than or equal to 100 characters and uses `chess.js`'s built-in `validateFen` function before passing it to the `Chess` constructor.

## ⚠️ Risk
Without validation, passing an uncontrolled, large, or maliciously malformed FEN string directly into the `Chess` constructor could result in unexpected parsing behavior, potentially causing Denial of Service (DoS) via memory exhaustion or Regular Expression Denial of Service (ReDoS) depending on the internal parser's implementation. It also led to leaking internal error stack traces through the raw console error.

## 🛡️ Solution
We enforce a hard length limit (`<= 100`) on the FEN string parameter to prevent excessively large payload inputs. Then, we leverage `validateFen(fenParam).ok` to rigorously check the FEN formatting via the standard `chess.js` library prior to object instantiation. Additionally, we now use an optional catch block (`catch { ... }`) to sanitize the error logging by preventing the leakage of raw error objects.