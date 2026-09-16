💡 **What:** Added `useMemo` to the `CapturedPieces` component to memoize the calculation of captured pieces, keyed by the game's FEN string.
🎯 **Why:** The component was re-calculating the missing captured pieces by iterating over all 64 squares on every single render cycle. Keying the calculation by FEN (`game.fen()`) prevents redundant iterations during render cycles where the board state hasn't changed.
📊 **Measured Improvement:** In tight loops, memoizing the captured piece computation avoids redundant array creation and object lookups.
