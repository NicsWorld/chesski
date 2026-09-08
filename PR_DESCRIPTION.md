🛡️ Sentinel: [security improvement] Remove Error objects from console output to prevent stack trace leakage

🎯 **What:**
Removed the exposure of raw `Error` objects and exception details in `console.error` and `console.debug` logs across `App.tsx` and `Tutorial.tsx`. Tests were updated accordingly.

⚠️ **Risk:**
Printing raw exception objects (like `e` or `new Error()`) directly to the console exposes internal stack traces, system information, and execution paths. This is a common medium-severity risk where information leakage can assist attackers in understanding the app's internal structure or discovering vulnerabilities.

🛡️ **Solution:**
Modified error handling to log generic fallback messages (`console.error("Invalid FEN in URL")` and `console.debug("Invalid move")`) without passing the raw error object, successfully suppressing stack trace exposure while retaining operational visibility.
