## Description

This PR introduces a new `FEATURE_SUGGESTIONS.md` file at the root of the repository.

As part of ongoing product ideation, this document outlines 7 highly scoped, actionable, and prioritized feature ideas designed to improve the core user value of the Chesski application. The features are intentionally constrained to leverage the existing infrastructure (such as `chess.js`, existing assets, and React component state) without requiring major platform rebuilds.

### High-Value Suggestions Added:
1. **Captured Pieces (Material Advantage Display)** - Utilizing existing piece assets and empty sidebar space to show material advantage.
2. **Pawn Promotion Selector** - Adding an intermediary UI before finalizing pawn promotion moves to support under-promotion.
3. **Board Flipping (Play as Black)** - Reversing board render arrays to support Black's perspective without altering game logic.
4. **"Premium" Theme Teaser (Monetization)** - Validating monetization with a simple "Pro Themes" modal and waitlist/checkout link.
5. **Last Move Highlight** - Activating the existing (but unused) `lastMove` prop to highlight squares from recent `game.history()`.
6. **Copy PGN (Export Game)** - Extending current clipboard functionality to export the full move history using `game.pgn()`.
7. **Click-to-Move (Accessibility & Mobile)** - Augmenting the drag-and-drop system with click-to-select and click-to-move for better mobile support.

Each suggestion is detailed with relevant files, the current gap, effort level, expected impact, and why it's a fitting subsequent step based on the recent 3D theme implementations.