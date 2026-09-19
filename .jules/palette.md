# Palette Journal
## 2026-09-19 - Add confirmation dialog for destructive actions
**Learning:** Adding a native confirmation dialog before resetting game state prevents accidental progress loss, especially when users have invested time into playing.
**Action:** Always implement a confirmation dialog (e.g., `window.confirm`) for destructive UI actions that reset state or result in irreversible data loss.
