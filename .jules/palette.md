## 2024-05-24 - ARIA Grid Hierarchy in CSS Grid Layouts
**Learning:** When using CSS Grid for complex 2D grids like chessboards, adding ARIA `role="row"` wrappers can break the visual layout because the `row` wrapper becomes a grid item instead of the cells.
**Action:** Apply `style={{ display: 'contents' }}` to the `role="row"` wrapper. This maintains the valid ARIA hierarchy for nested `gridcell` elements while passing the grid layout flow down to the individual cells.
