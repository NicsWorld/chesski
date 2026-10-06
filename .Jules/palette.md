## 2025-03-05 - Added linear navigation to tutorials
**Learning:** For a view with sequential steps, using an index and navigating by calculating the previous and next states with explicit boundary disabling is a helpful pattern. Added `aria-label`s directly to standard `button` elements instead of generic empty strings is simple and standardizes accessibility for the user interaction.
**Action:** Always provide explicit navigation controls for linear sequences (like tutorials or wizards), with appropriately disabled boundary states, and ensure icon-only or generic labels (if any, like simply "Next" or "Previous") are supported by explicit `aria-label` properties.
## 2024-05-14 - Aria-Live for Status Messages
**Learning:** React components that manage dynamic textual game state updates without page reloads (e.g., status messages, checkmate alerts) should wrap the text container with `aria-live="polite"` and `aria-atomic="true"` to ensure screen readers announce the changes. Also, use `aria-pressed` to semantically indicate the active state of UI toggle buttons.
**Action:** Always add `aria-live` and `aria-atomic` to dynamic status messages, and `aria-pressed` to toggle buttons.
## 2025-03-05 - Added grid roles to chessboard
**Learning:** Making 2D grids (like chessboards) accessible is best achieved by applying `role="grid"` on the parent container and `role="gridcell"` on the individual square elements along with descriptive `aria-label`s. This informs screen readers about the layout without cluttering the sequential tab navigation with `tabIndex={0}` on every cell (unless full grid keyboard navigation is implemented).
**Action:** Always add `role="grid"` to the parent and `role="gridcell"` with descriptive `aria-label`s to child cells for complex 2D visual grids.
