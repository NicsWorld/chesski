## PR_DESCRIPTION
🎨 Palette: Add linear navigation to tutorials

### 💡 What
Added "Previous" and "Next" buttons to the tutorial view to allow users to navigate through the tutorials sequentially.

### 🎯 Why
Previously, users could only navigate the tutorials by clicking the individual tutorial buttons. Providing explicit "Previous" and "Next" buttons improves the flow for users going through the tutorials in order.

### 📸 Before/After
Before: The tutorial view only had buttons for each individual tutorial.
After: The tutorial view now features prominent "Previous" and "Next" buttons below the tutorial description, which are appropriately disabled when at the beginning or end of the tutorial list.

### ♿ Accessibility
Added `aria-label` attributes (`aria-label="Previous tutorial"` and `aria-label="Next tutorial"`) to the new buttons to ensure screen reader users have clear context for these controls. The buttons also use proper `disabled` states when no further navigation in that direction is possible, preventing confusion and following standard interactive patterns.