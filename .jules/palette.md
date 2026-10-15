## 2026-10-15 - ARIA gridcell within CSS grid
**Learning:** When assigning `role="gridcell"` to elements generated within a single CSS Grid container (e.g. board squares), you must still preserve the ARIA parent hierarchy by wrapping groups of grid cells with a `role="row"` parent. To do this without breaking the CSS Grid template, wrap the elements and apply `style={{ display: 'contents' }}` to the row container.
**Action:** Always wrap `gridcell`s inside a `row` and apply `display: 'contents'` to satisfy both screen readers and CSS layouts for flat component structures.
