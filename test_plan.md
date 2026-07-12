1. **Goal**: Test the `handleMove` logic in `App.tsx` specifically for invalid moves. This handles the `catch` block that sets the message to "Oops! You can't move there." and resets it after 2000ms.
2. **Current state**: We don't have any tests yet. We just installed vitest and testing libraries.
3. **Approach**:
   - Create `src/App.test.tsx`
   - Render `<App />`
   - Mock `ChessBoard` component because we just want to trigger `onMove` and test `App.tsx` state changes without dealing with complex drag-and-drop.
   - The `App` component sets the initial view based on `?fen=` in URL, or defaults to "tutorial". We can override this by either clicking the "Play Game" button or mocking `window.location.search`. Let's just click "Play Game" button or use `window.history.pushState` to set `fen` parameter so it renders `game` view.
   - Alternatively, we can just click "Play Game" button.
   - Find the mocked `ChessBoard` or trigger its `onMove` directly. Actually, since `App` passes `handleMove` as `onMove` to `ChessBoard`, if we mock `ChessBoard` like this:
     ```tsx
     vi.mock('./components/ChessBoard', () => ({
       default: ({ onMove }: { onMove: Function }) => (
         <button onClick={() => onMove({ from: 'e2', to: 'e5' })} data-testid="invalid-move-btn">
           Invalid Move
         </button>
       )
     }));
     ```
     We can easily trigger it.
   - After clicking, we assert that the text "Oops! You can't move there." is in the document.
   - Then, use `vi.advanceTimersByTime(2000)` to trigger the `setTimeout`.
   - Assert that the message reverts to the game status (e.g., "White's turn (Cute Animals)").

4. Let's write the test file.
