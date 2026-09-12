🎨 Palette: Add multi-theme color palette support

💡 What:
Added support for three new color palettes (Ocean, Forest, Sunset) alongside the Default theme. Introduced a new "Color" theme selector in the header to allow users to toggle and test out the new palettes.

🎯 Why:
To provide users with more visual variety and to allow testing of different color schemes to touch up the UI. The CSS-variable based implementation ensures smooth and efficient switching without reloading or layout shifts.

📸 Before/After:
Added a new theme selector in the app header controls. The background, board colors, and primary button colors now update dynamically based on the selected theme.

♿ Accessibility:
Ensured the new theme selector buttons utilize `aria-pressed` to clearly indicate the currently active color theme to screen readers, matching the pattern used by the piece theme selector.
