## 2024-05-18 - ARIA Grid on CSS Grid
**Learning:** When adding standard ARIA grid hierarchy to elements nested inside a 2D CSS grid, use `role="row"` wrappers with `style={{ display: 'contents' }}` around grid cells. This satisfies the ARIA hierarchy requirement for nested `gridcell` elements without disrupting the flat children list required by CSS Grid layout.
**Action:** Always wrap `gridcell`s in a `row` container with `display: 'contents'` when augmenting existing flat grid structures with grid roles.
