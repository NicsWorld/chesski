## 2025-03-08 - Added accessible live regions and state toggles
**Learning:** Screen readers need `aria-live` on status elements that change dynamically (like game messages). State toggles (like "Play" vs "Tutorial" or "Zoo" vs "Standard" buttons) should use `aria-pressed` or `aria-current` to communicate their active state, as well as `role="group"` to tie related toggles together.
**Action:** Use `aria-live="polite"` for dynamic text updates, and ensure toggle buttons communicate state to screen readers.
