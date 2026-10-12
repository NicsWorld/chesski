## 2025-03-05 - Added aria-pressed to toggle buttons
**Learning:** For sets of buttons acting as mutually exclusive toggles (like tutorial selection), using `aria-pressed` based on the active state comparison is a crucial micro-UX accessibility pattern that ensures screen readers can identify the currently selected option.
**Action:** Always verify that toggle buttons or selection lists utilize `aria-pressed` (or equivalent ARIA state attributes) that dynamically match their active visual state to provide correct semantic context for assistive technologies.
