🧪 [testing improvement MoveHistory component]

🎯 What
Added missing unit tests for the MoveHistory component to improve overall test coverage.

📊 Coverage
- Empty history state rendering ("No moves yet").
- Populated history state properly grouped into table rows by White and Black moves.
- Auto-scroll behavior via useEffect using mocked HTMLElement layout properties (`scrollHeight` and `scrollTop`).

✨ Result
Improved component reliability by guaranteeing it correctly processes game histories and visually maintains proper scroll positioning, ensuring safe refactoring in the future.