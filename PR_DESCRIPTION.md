Title: 🧪 Add tests for evaluateGameStatus utility

🎯 **What:**
Added comprehensive tests for the `evaluateGameStatus` utility function to address the testing gap.

📊 **Coverage:**
The tests now cover all possible game states evaluated by the utility, including:
- Checkmate scenarios for both White and Black.
- Draw conditions.
- Check warnings.
- Normal turn indicators for both White and Black.

✨ **Result:**
Improved test coverage and reliability for game status evaluations by explicitly validating state string transformations without needing complex FEN setups.