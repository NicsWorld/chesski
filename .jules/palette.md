## 2026-09-24 - Add selected state indication to tutorial buttons
**Learning:** Currently, active tutorial buttons lack the `aria-current` or `aria-pressed` state to inform screen readers of the selected state, while the App.tsx already uses `aria-pressed` for main view and theme switching. Using `aria-current="true"` is a good practice for lists of links/tutorials to show the active one.
**Action:** Always verify `aria-pressed` or `aria-current` attributes are used on custom state selector buttons, similar to App.tsx's theme/view selectors.
