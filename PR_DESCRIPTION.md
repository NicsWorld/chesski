# 🧪 Add error path test for invalid moves in Tutorial component

## 🎯 What
This PR addresses a missing test gap in the `Tutorial` component where the error path for invalid moves was not being thoroughly tested.

## 📊 Coverage
The `handleMove` error catch block now logs a warning (instead of just debugging output which can be filtered), and a new test has been added to ensure the component appropriately catches and warns on invalid moves without throwing exceptions.

## ✨ Result
Test coverage and reliability have been improved. The test suite now explicitly covers error paths when the `chess.js` engine throws on illegal move attempts.
