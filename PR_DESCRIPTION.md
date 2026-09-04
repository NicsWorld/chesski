## 🎨 Palette: Accessibility and UX Polish

💡 **What**: Added meaningful `alt` text to piece images (e.g. "White Knight" instead of "w n"), and added a disabled state for the "Undo" button when there is no move history. Also added proper focus indicators for keyboard navigation and disabled styles for buttons.
🎯 **Why**: Ensures screen reader users can identify the pieces being rendered on the board and in the captured pieces section. Improves user experience by giving clear visual feedback when "Undo" is not possible, and allows keyboard users to see which interactive element has focus.
📸 **Before/After**: Visually, the disabled state on the Undo button is now clear when the game starts. Screen readers will read "White Knight" instead of "w n".
♿ **Accessibility**: Enhanced image ARIA roles via detailed `alt` text and improved focus states for keyboard users.
