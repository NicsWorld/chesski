## 2024-10-24 - Accessible ARIA Grid in CSS Grid Layout
**Learning:** Using `role="row"` wrappers in a CSS Grid breaks visual layout unless `style={{ display: 'contents' }}` is applied. `gridcell` elements must be wrapped in `row` elements for valid ARIA hierarchy.
**Action:** When adding grid ARIA roles to a CSS Grid chessboard, always use `display: 'contents'` on the row wrappers to satisfy both visual layout and screen reader hierarchy.
