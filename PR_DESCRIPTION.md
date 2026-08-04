# 📝 [Documentation] Draft targeted refactor suggestions

## 🎯 What
This PR adds `docs/REFACTOR_SUGGESTIONS.md`, which contains a best-first ranked list of 6 small, low-risk, and actionable refactor tasks for the codebase.

## 💡 Why
To provide a curated roadmap of high-leverage cleanup tasks that improve maintainability, reduce duplication, and tighten local design without altering product behavior. These suggestions are specifically tailored to areas recently touched, ensuring they are familiar and safe to implement.

## ✅ Verification
- Confirmed the markdown file was correctly generated and formatted.
- Ran `npm run lint`, `npm run build`, and `npx vitest run` to ensure no build or linting pipelines were broken by the addition of the new documentation file.

## ✨ Result
A clear, prioritized list of refactoring tasks is now available in `docs/REFACTOR_SUGGESTIONS.md`, ready to be converted into actionable tickets.
