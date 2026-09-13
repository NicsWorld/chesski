Title: 🛡️ Sentinel: [CRITICAL/HIGH] Fix unhandled promise rejection in clipboard API

🎯 **What:**
Added a `.catch()` block to the `navigator.clipboard.writeText` promise chain in `shareGame`.

⚠️ **Risk:**
Without error handling, if the clipboard API fails (e.g. lack of permissions), it throws an unhandled promise rejection, which can crash the application or leave it in an inconsistent state.

🛡️ **Solution:**
Implemented a `.catch()` block that gracefully handles the failure by updating the UI message, preventing unhandled rejections.