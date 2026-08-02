🎯 **What:** The testing gap addressed is the lack of unit tests for the `MoveHistory` component, leaving its parsing, rendering, and auto-scroll behaviors untested.

📊 **Coverage:** The new tests cover rendering the empty state ("No moves yet"), rendering complete move pairs for an even number of moves, rendering incomplete pairs (with a blank black move) for an odd number of moves, and the correct auto-scrolling behavior when new moves are added to the history array.

✨ **Result:** Enhanced the overall project testing coverage by ensuring `MoveHistory.tsx` handles valid history arrays accurately, auto-scrolls appropriately, and preventing regressions in its rendering logic.