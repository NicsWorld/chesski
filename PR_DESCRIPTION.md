# 💡 [document improvement] Propose Targeted Refactor Tasks

## 🎯 What
Generated a prioritized list of 7 small, low-risk, high-leverage refactor tasks for the `chesski` repository. The suggestions focus on improving maintainability, reducing duplication, and tightening local design without altering product behavior.

## 📝 Details
The generated `REFACTOR_SUGGESTIONS.md` file includes the following concrete suggestions ranked best-first:
1. Extract `addKingsToFen` and `removeKings` domain logic from `Tutorial.tsx` into a separate helper module (`src/utils/fenHelpers.ts`).
2. Replace the CSS filter hack in `Piece.tsx` with native black zoo piece assets.
3. Consolidate FEN URL parsing in `App.tsx` and add validation/length limits to prevent ReDoS risks.
4. Wire up the currently hardcoded `lastMove` prop in `ChessBoard.tsx` to actually highlight the last move.
5. Utilize the `evaluateGameStatus(game)` utility for the initial game status message in `App.tsx`.
6. Extract the hardcoded `tutorials` data array from `Tutorial.tsx` into a dedicated constants file.
7. Clean up unused `captured-area` dead code placeholders in `App.tsx`.

## ✅ Verification
- The `REFACTOR_SUGGESTIONS.md` file was successfully written and verified locally.
- All suggestions explicitly include the required fields (Repo, Area, Relevant file(s), What looks off today, Specific refactor, Why it is a good small task, Expected impact, Risk level, Why it is a good fit).
- The existing codebase was successfully compiled (`npm run build`), linted (`npm run lint`), and tested (`npx vitest run`) to ensure it remains in a healthy state.

## ✨ Result
The project now contains a clear, actionable roadmap for low-risk refactoring efforts tailored to recent contribution context, ready to be converted into individual issues or tasks.