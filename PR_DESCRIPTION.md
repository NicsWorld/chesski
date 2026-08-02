## 🧪 [Add missing FEN URL tests]

**🎯 What:** The `App.test.tsx` file was updated to comprehensively test URL FEN parsing logic, adding a missing test for valid FEN strings and refactoring the location mocking to support multiple test cases.
**📊 Coverage:** Tests now cover both the happy path (valid FEN) and the error path (invalid FEN) when initializing the App state via URL parameters.
**✨ Result:** Increased reliability and confidence in the initialization logic, ensuring that valid URLs load properly without error logs, while invalid URLs gracefully fall back and log appropriately.