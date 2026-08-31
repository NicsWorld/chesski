🔒 [security fix] Fix Information Exposure via Console Error

🎯 **What:**
Fixed a vulnerability where the raw error object was being exposed in the console output when catching an invalid FEN in the URL.

⚠️ **Risk:**
Exposing raw error objects in the console can leak sensitive information about the application's internal state, stack traces, and environment details, which attackers could leverage to craft more targeted attacks.

🛡️ **Solution:**
Modified the `catch` block in `src/App.tsx` to log a generic message without exposing the raw error object, and updated the corresponding test in `src/App.test.tsx` to match this behavior.