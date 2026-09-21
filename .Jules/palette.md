## 2025-03-05 - Added linear navigation to tutorials
**Learning:** For a view with sequential steps, using an index and navigating by calculating the previous and next states with explicit boundary disabling is a helpful pattern. Added `aria-label`s directly to standard `button` elements instead of generic empty strings is simple and standardizes accessibility for the user interaction.
**Action:** Always provide explicit navigation controls for linear sequences (like tutorials or wizards), with appropriately disabled boundary states, and ensure icon-only or generic labels (if any, like simply "Next" or "Previous") are supported by explicit `aria-label` properties.
## 2024-05-14 - Aria-Live for Status Messages
**Learning:** React components that manage dynamic textual game state updates without page reloads (e.g., status messages, checkmate alerts) should wrap the text container with `aria-live="polite"` and `aria-atomic="true"` to ensure screen readers announce the changes. Also, use `aria-pressed` to semantically indicate the active state of UI toggle buttons.
**Action:** Always add `aria-live` and `aria-atomic` to dynamic status messages, and `aria-pressed` to toggle buttons.
## 2026-09-21 - Added confirmation dialog for New Game action
**Learning:** Destructive actions that lose user state or progress (like starting a new game) should always prompt for confirmation to avoid accidental data loss. This prevents frustration from misclicks and improves user trust. Bypassing the prompt when no progress has been made streamlines the experience.
**Action:** Always add a confirmation step (e.g. `window.confirm` or a modal) for any action that resets or deletes user progress, optionally conditionally skipping it if no meaningful state exists to lose.
