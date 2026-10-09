## 2023-10-09 - Memoizing React Components in List Iterations
**Learning:** React elements passed as `children` to a `React.memo` component create new references on every render loop, breaking the memoization.
**Action:** Extract the rendering logic into a separate `React.memo` wrapper component to prevent this issue. Callbacks should also be memoized using `useCallback` or bound safely.
