# 📝 [documentation] Add Prioritized Feature Suggestions

## 🎯 What
Adds `FEATURE_SUGGESTIONS.md`, containing a ranked list of 5 well-scoped, actionable feature suggestions tailored to the Chesski codebase.

## 💡 Why
The user requested a specific set of high-value feature ideas that leverage existing infrastructure to improve core user value without introducing new external dependencies or requiring large platform rebuilds.

## 📝 Documented Suggestions
1. **Material Advantage / Captured Pieces Display:** Utilizing the existing `captured-area` placeholder in `App.tsx` to show piece differences.
2. **Implement Last Move Highlighting:** Wiring up the currently hardcoded `lastMove` prop in `ChessBoard.tsx`.
3. **Tutorial Navigation Controls:** Adding Next/Previous buttons to `Tutorial.tsx` to iterate through the existing `tutorials` array.
4. **Proper Pawn Promotion Selection UI:** Intercepting the hardcoded `promotion: 'q'` in `ChessBoard.tsx` with a selection modal.
5. **Fix Black Animal Assets in Zoo Theme:** Removing the CSS filter hack in `Piece.tsx` and using the actual `b` (black) asset files.

## ✅ Verification
- Ensured the document format matches user constraints (Repo, Area, File, Gap, Feature, Impact, Effort, Fit).
- Confirmed suggestions are firmly grounded in the actual codebase state (e.g. referencing specific unused props and placeholders).
- Verified `npm run lint`, `npm run build`, and tests still pass.