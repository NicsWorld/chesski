## 2026-09-18 - Confirmation for destructive actions
**Learning:** Destructive actions like resetting game state without a warning can lead to irreversible data loss. Adding a native confirmation dialog significantly improves safety without adding complex UI dependencies.
**Action:** Always implement a confirmation dialog (e.g. `window.confirm`) before executing irreversible reset or delete actions.
