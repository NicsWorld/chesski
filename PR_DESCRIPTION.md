🎨 Palette: Add ARIA live regions and toggle states

💡 **What:** Added `aria-live="polite"` to status messages, `role="group"` and `aria-pressed` to mode and theme toggles, and updated piece cursor to use `grab`/`grabbing`.
🎯 **Why:** To ensure screen readers announce dynamic game state changes (like "Checkmate"), to communicate which game mode or theme is currently active, and to give immediate visual feedback to pointer users when dragging pieces.
📸 **Before/After:** No major visual changes except the cursor changing from a generic move icon to a hand (grab/grabbing) when interacting with pieces.
♿ **Accessibility:**
- Added `aria-live="polite"` and `aria-atomic="true"` to status cards.
- Added `role="group"` and `aria-label` to control groups.
- Added `aria-pressed` to navigation and theme buttons.
