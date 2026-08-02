# 🔒 [Security] Fix Missing Radix in parseInt

## 🎯 What
Added the missing radix parameter (base 10) to `parseInt` function calls in `src/components/Tutorial.tsx`.

## ⚠️ Risk
When `parseInt` is called without a radix parameter, the base is determined dynamically based on the input string format. This can lead to unexpected behaviors or vulnerabilities if an input starts with "0x" (interpreted as hex) or "0" (interpreted as octal in older JS engines), which could be manipulated maliciously. Furthermore, omitting the radix is flagged by modern security/linting tools as a poor practice since untrusted inputs can result in non-base-10 interpretations and potential logic flaws.

## 🛡️ Solution
Explicitly provided the base 10 radix parameter (`parseInt(char, 10)`) to explicitly instruct JavaScript to parse all numerical characters natively as base-10 integers. This eliminates ambiguity and prevents unintended radix interpretation.
