## 🎨 Palette: Improve Move History Empty State

### 💡 What
Updated the "No moves yet" state in the Move History panel to be more visually engaging and helpful. Added a decorative pawn icon, improved typography with a title and subtitle, and applied appropriate contrast colors for better readability. Added `aria-hidden="true"` to the decorative icon to ensure screen readers skip it.

### 🎯 Why
The previous empty state was a plain, small text string ("No moves yet") that didn't provide enough guidance and looked slightly detached from the rest of the polished UI. A good empty state should guide the user and look intentional.

### 📸 Before/After
See screenshots above.

### ♿ Accessibility
- Added `aria-hidden="true"` to the decorative pawn emoji so screen readers don't read out "black chess pawn" unnecessarily.
- Used high contrast colors (`var(--color-text-muted)` for the container, full opacity for the title, and 80% opacity for the subtitle) to maintain readability while keeping the empty state distinct from active content.