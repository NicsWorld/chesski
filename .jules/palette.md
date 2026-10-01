## YYYY-MM-DD - [Title]
**Learning:** [UX/a11y insight]
**Action:** [How to apply next time]

## 2026-10-01 - Board Squares Accessibility
**Learning:** For a complex 2D grid like a chessboard in a React app using DnD, screen readers struggle without explicit grid semantics.
**Action:** When creating grid-based interactables (like chessboards), use `role="grid"` on the parent container and `role="gridcell"` on individual interactive squares along with clear `aria-label`s for screen reader announcements.
