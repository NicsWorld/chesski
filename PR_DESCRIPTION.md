🎨 Palette: Improve Screen Reader Accessibility for Game Status & Controls

💡 What: Added `aria-live="polite"` and `aria-atomic="true"` to the dynamic game status and tutorial info panels. Added `aria-pressed` states to all view, theme, and tutorial selection toggle buttons.
🎯 Why: Without these attributes, screen reader users miss crucial game state updates (like "Checkmate", "Invalid Move", or "Link copied!") since they occur without page reloads. The toggle buttons previously provided visual cues for their active states, but no semantic indication for assistive technologies.
📸 Before/After: Visuals remain unchanged, but screen readers will now announce game state changes and active button states.
♿ Accessibility: Ensures that dynamic text updates are announced to assistive technologies and complex toggle controls convey their pressed state effectively.