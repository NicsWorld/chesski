## 2024-05-24 - Chessboard Grid Accessibility
**Learning:** When improving accessibility for complex 2D grids (like chessboards), use role="grid" and role="gridcell" with descriptive labels. Do not add tabIndex={0} to every cell without complete grid keyboard navigation, as it severely pollutes the document's tab sequence.
**Action:** Apply grid roles for screen readers, but omit tabIndex until full keyboard arrow navigation is implemented.
