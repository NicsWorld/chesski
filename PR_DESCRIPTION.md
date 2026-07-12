# 🧪 [testing improvement] Add test for ChessBoard drop handler

## 🎯 What
This PR addresses a testing gap in the `ChessBoard` component by adding a dedicated unit test for the `handleDrop` functionality. Specifically, it verifies that dropping a piece onto a target square correctly invokes the `onMove` callback with the correct payload (including the default "q" queen promotion rule).

Because `react-dnd` interactions are notoriously complex to test in a DOM environment without a specialized backend, this PR introduces a smart Vitest mock for the `react-dnd` module. The mock intercepts the `useDrop` and `useDrag` hooks, directly attaching the spec payload to the underlying DOM node references, allowing us to invoke the `drop` handler programmatically without needing a full drag-and-drop backend.

## 📊 Coverage
* Added `src/components/__tests__/ChessBoard.test.tsx`
* Added coverage for the `handleDrop` interaction triggered when a piece is dropped on a square.
* Added coverage verifying the payload structure (`from`, `to`, `promotion`) dispatched to `onMove`.

## ✨ Result
* We now have deterministic and fast verification that user drop interactions trigger the expected game updates.
* Future refactoring of the board or drag-and-drop logic is protected by this unit test.