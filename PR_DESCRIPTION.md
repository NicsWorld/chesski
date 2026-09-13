🔒 Fix Missing Error Handling for Clipboard API

🎯 **What:** Fixed an unhandled promise rejection vulnerability in the `shareGame` function when calling `navigator.clipboard.writeText`.
⚠️ **Risk:** If the clipboard API call fails (e.g., due to missing permissions or unsupported browser), it causes an unhandled promise rejection which could potentially crash the execution context or leave the application in an unexpected state.
🛡️ **Solution:** Added a `.catch()` block to the promise chain to gracefully handle errors, log a sanitized generic error message to prevent information leakage, and provide appropriate UI feedback to the user.
