## 2024-03-20 - Enhancing Chessboard Grid Accessibility
**Learning:** The main Chessboard component was missing `role="grid"` for the board container and `role="gridcell"` for the squares.
**Action:** When rendering 2D grid components that act conceptually like a table or grid, assign `role="grid"` to the wrapper and `role="gridcell"` with descriptive `aria-label` to individual cells.
