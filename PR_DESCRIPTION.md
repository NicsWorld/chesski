# Add Feature Suggestions Documentation

## 🎯 What
Added a new `FEATURE_SUGGESTIONS.md` file containing a prioritized, best-first list of 6 highly actionable, self-contained product feature ideas for the Chesski codebase.

## 💡 Why
To provide a concrete roadmap of well-scoped features that improve core user value, reduce friction, close functional gaps, and introduce monetization without requiring large rebuilds or external dependencies.

## 📝 Details
The generated suggestions include:
1.  **Interactive Pawn Promotion Picker:** Fixing a hardcoded underpromotion gap in `ChessBoard.tsx`.
2.  **Display Captured Pieces (Material Advantage):** Fulfilling an existing UI placeholder in `App.tsx`.
3.  **Highlight Last Move on Board:** Wiring up an existing boolean prop in `ChessBoard.tsx`.
4.  **PGN Export for Game Sharing:** Leveraging `chess.js` and clipboard API in `App.tsx`.
5.  **Sequential Tutorial Flow:** Adding navigation to the existing tutorials array in `Tutorial.tsx`.
6.  **Donation / Merch Call-out:** Adding a low-effort monetization link to the header.

## ✅ Verification
- Document created and verified locally.
- Content follows exact formatting guidelines, including explicit paths, specific implementation details, effort levels, and impact assessments.
- `npm run lint`, `npm run build`, and `npx vitest run` executed successfully to ensure no build regressions.