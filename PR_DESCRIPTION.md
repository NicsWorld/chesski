# 🧪 Testing: MoveHistory improvements

🎯 **What:** The testing gap addressed
This PR addresses missing tests for the `MoveHistory` component. Specifically, it ensures that DOM state does not leak between test cases by explicitly calling `cleanup()` in the `afterEach` block. It also adds an additional test case for rendering a large number of moves.

📊 **Coverage:** What scenarios are now tested
- Empty history rendering ("No moves yet").
- Rendering an even number of moves.
- Rendering an odd number of moves.
- Auto-scrolling behavior when history updates.
- Rendering a large number of moves (100 moves) to ensure it renders correctly and lists the expected number of moves.

✨ **Result:** The improvement in test coverage
Test coverage is improved by adding the large move history test and explicitly calling `cleanup()` in the `afterEach` block, resulting in more robust tests that do not interfere with one another.
