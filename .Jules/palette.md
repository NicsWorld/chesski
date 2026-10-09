## 2025-03-05 - Added linear navigation to tutorials
**Learning:** For a view with sequential steps, using an index and navigating by calculating the previous and next states with explicit boundary disabling is a helpful pattern. Added `aria-label`s directly to standard `button` elements instead of generic empty strings is simple and standardizes accessibility for the user interaction.
**Action:** Always provide explicit navigation controls for linear sequences (like tutorials or wizards), with appropriately disabled boundary states, and ensure icon-only or generic labels (if any, like simply "Next" or "Previous") are supported by explicit `aria-label` properties.
## 2024-05-14 - Aria-Live for Status Messages
**Learning:** React components that manage dynamic textual game state updates without page reloads (e.g., status messages, checkmate alerts) should wrap the text container with `aria-live="polite"` and `aria-atomic="true"` to ensure screen readers announce the changes. Also, use `aria-pressed` to semantically indicate the active state of UI toggle buttons.
**Action:** Always add `aria-live` and `aria-atomic` to dynamic status messages, and `aria-pressed` to toggle buttons.
## 2025-03-05 - Chessboard Grid Accessibility
**Learning:** For complex 2D grids like a chessboard, using standard `role="grid"`, `role="row"`, and `role="gridcell"` is critical for screen reader compatibility, even if interactive tab navigation is not fully implemented on each cell.
**Action:** Always wrap grid items in `role="row"` groups if mapping over a two-dimensional space and apply descriptive `aria-label`s to the grid and its cells for proper contextual identification.
