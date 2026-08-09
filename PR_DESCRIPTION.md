# 🧪 [Add comprehensive unit tests for MoveHistory component]

## 🎯 What
The `MoveHistory` component was lacking unit tests, creating a testing gap for a crucial part of the UI that displays the ongoing game state to users. This PR introduces a complete test suite for the component using Vitest and React Testing Library.

## 📊 Coverage
The new tests cover the following scenarios:
* **Empty State:** Verifies that "No moves yet" is rendered correctly when the history array is empty, and the table is hidden.
* **Single Move:** Confirms that a single move renders properly (1. e4) with the black column intentionally left blank.
* **Multiple Moves:** Validates the grouping logic that splits a linear array of moves into row pairs (White/Black) handling both even and odd length arrays accurately.
* **Auto-Scroll Behavior:** Safely mocks DOM properties (`scrollHeight` and `scrollTop` on `HTMLDivElement.prototype`) to assert that the component correctly auto-scrolls to the bottom whenever the move history updates.

## ✨ Result
The test suite reliability has improved by ensuring the `MoveHistory` component's presentation logic and side-effects (auto-scrolling) are verified on every test run. Future refactors to this component's DOM structure or lifecycle effects are now protected by a safety net.