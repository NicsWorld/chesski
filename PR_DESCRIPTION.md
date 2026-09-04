# 🔒 [Security] Fix information exposure via console error

🎯 **What:**
Fixed an information exposure vulnerability in `src/App.tsx` where a raw error object was being passed directly to `console.error` during FEN validation and parsing.

⚠️ **Risk:**
Exposing raw error objects to the browser console can potentially reveal sensitive application state, stack traces, or internal error structures to malicious users, facilitating further attacks or information gathering.

🛡️ **Solution:**
Replaced the logging of raw error objects with generic, safe string messages. The `console.error` calls now provide enough context for debugging without exposing sensitive details.
