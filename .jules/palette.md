## 2023-10-27 - [Initialize Palette Journal]
**Learning:** [Setting up the palette journal]
**Action:** [I will document my findings in this file moving forward.]
## 2026-09-20 - Confirm Destructive Actions
**Learning:** Users can accidentally lose game progress by clicking the "New Game" button. It's crucial to implement a confirmation dialog for actions that result in irreversible data loss.
**Action:** Always add a safety net, like `window.confirm`, for destructive UI actions such as resetting state or deleting data.
