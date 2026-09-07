## 2025-03-05 - Added linear navigation to tutorials
**Learning:** For a view with sequential steps, using an index and navigating by calculating the previous and next states with explicit boundary disabling is a helpful pattern. Added `aria-label`s directly to standard `button` elements instead of generic empty strings is simple and standardizes accessibility for the user interaction.
**Action:** Always provide explicit navigation controls for linear sequences (like tutorials or wizards), with appropriately disabled boundary states, and ensure icon-only or generic labels (if any, like simply "Next" or "Previous") are supported by explicit `aria-label` properties.

## 2024-05-15 - [Missing ARIA live regions and aria-pressed states]
**Learning:** Dynamic game status messages and active selection buttons were not being announced correctly to screen reader users because they lacked `aria-live` and `aria-pressed` attributes.
**Action:** Ensure dynamic status updates are wrapped in `aria-live="polite"` regions and state toggle buttons have `aria-pressed` attributes to communicate their state effectively.
