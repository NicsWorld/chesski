# 🎨 Palette: Add accessibility attributes to toggle buttons and status messages

## 💡 What:
Added semantic `aria-pressed` attributes to toggle buttons and ARIA live regions to dynamic status messages.

## 🎯 Why:
To improve accessibility for screen reader users by semantically indicating the active state of UI toggle buttons (Play Game vs Tutorials, Zoo vs Standard theme) and ensuring dynamic textual game state updates are announced.

## 📸 Before/After:
No visual changes. (Accessibility improvements only)

## ♿ Accessibility:
- Added `aria-pressed` to active toggle buttons.
- Wrapped the status message in an `aria-live="polite"` and `aria-atomic="true"` region.
