## 2026-09-16 - Add Confirmation Dialog to Destructive Actions
**Learning:** Resetting or starting a new game instantly without confirmation leads to frustrating data loss for users who misclick. Destructive actions need a safety net.
**Action:** Always implement a confirmation dialog (e.g., `window.confirm`) for destructive actions like starting a new game to prevent accidental data loss.
