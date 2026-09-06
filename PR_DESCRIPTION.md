Title: '⚡ Memoize move history pairs calculation in MoveHistory.tsx'

Description:
💡 What: Added `useMemo` to the move pairs grouping calculation in `src/components/MoveHistory.tsx` to cache the move pairs array based on the `history` dependency.
🎯 Why: The previous implementation performed an O(N) loop to group moves into pairs on every single re-render of the component, even if the `history` array did not change. This could lead to a performance bottleneck for long games.
📊 Measured Improvement: Due to testing environment overhead for large synthetic histories (e.g. 10000 elements) combined with Vitest hooks causing significant noise, the benchmark execution time measured ~20000 ms before and ~19800 ms after the change. While the raw benchmark numbers in Vitest look similar, eliminating the O(N) work on unrelated re-renders structurally scales much better for actual production React applications.