## 2026-10-02 - Grid Accessibility for Chessboard
**Learning:** For complex 2D interactive spaces like a chessboard, native DOM order and screen reader reading order can be confusing. Using `role="grid"` on the container and `role="gridcell"` on the individual squares with detailed `aria-label` (including position and piece state) dramatically improves screen reader navigation and comprehension.
**Action:** Always apply `role="grid"` and `role="gridcell"` to 2D data or interaction grids (like game boards), ensuring each cell communicates its coordinate and current state via `aria-label`.
