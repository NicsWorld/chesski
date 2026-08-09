## PR Description

**Title:** 💡 [feature suggestions] Document 5 high-value, self-contained feature ideas

**🎯 What:**
This PR introduces a `FEATURE_SUGGESTIONS.md` document containing a ranked list of 5 concrete, well-scoped feature suggestions for the Chesski application.

**💡 Why:**
The team requested a set of actionable tickets to improve core user value and extend the product without requiring large platform rebuilds or external dependencies. These suggestions identify and address existing gaps in the UI and state management that can be completed with `small` to `medium` effort.

**✅ Verification:**
The suggestions are grounded in actual codebase context, specifically targeting:
- The commented-out `<div className="captured-area">...</div>` in `App.tsx`
- The hardcoded `lastMove={false}` prop in `ChessBoard.tsx`
- The hardcoded `promotion: 'q'` logic in `handleDrop`
- The lack of navigation in `Tutorial.tsx`
- The static table structure in `MoveHistory.tsx`

**✨ Result:**
The repository now has a clear roadmap of actionable, low-friction tasks that directly leverage the existing `chess.js` and React architecture to improve the player experience.