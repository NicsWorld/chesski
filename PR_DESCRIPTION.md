# 📝 [Documentation] Draft feature suggestions based on codebase context focusing on growth and monetization

## 🎯 What
This PR adds a `FEATURE_SUGGESTIONS.md` document containing a prioritized list of 6 highly actionable, small-to-medium scoped feature ideas for the Chesski application.

## 💡 Why
The user requested a curated list of feature suggestions that leverage existing patterns in the codebase, prioritize growth/monetization/core value, and are concrete enough to become immediate engineering tickets.

## 🛠️ Details
The suggestions are heavily grounded in the current state of the codebase:
1. **Shareable "Wordle-style" Emoji Game Summary:** Leverages the existing `game.history()` to create a viral, clipboard-ready summary text. (Growth)
2. **Material Advantage / Captured Pieces Display:** Implements the currently commented-out `{/* <div className="captured-area">...</div> */}` placeholder in `App.tsx` by parsing FEN strings. (Core Value)
3. **Premium/Unlockable Piece Themes:** Replaces the hacky CSS brightness filter on the 'zoo' theme with the actual `animal_b*` assets and proposes adding a third, paid theme via a simple Stripe checkout link. (Monetization / Debt)
4. **Pawn Underpromotion UI:** Fixes the hardcoded `promotion: 'q'` in `ChessBoard.tsx` by introducing a simple piece selection UI for moves reaching the final rank. (Core Value)
5. **Interactive Tutorial Progression:** Wires up navigation buttons (Next/Previous) to the existing, static `activeTutorial` state in `Tutorial.tsx`. (Growth / Onboarding)
6. **Last Move Highlighting:** Wires up the existing, unused `lastMove` prop on `BoardSquareProps` by reading the latest move from the `chess.js` history. (Friction Reduction)

## ✅ Verification
- Document formatting conforms strictly to the user's requirements (Repo, Area, Relevant files, Gap, Specific feature, Why it's a good task, Impact, Effort, Fit).
- Contains exactly 6 suggestions, ranked best-first.
- All verifications (`npm run lint`, `npm run build`, `npx vitest run`) pass, confirming no code breakages.
