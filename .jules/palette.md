## $(date +%Y-%m-%d) - Add ARIA Labels to Icon-only/Action Buttons
**Learning:** Found several action buttons missing `aria-label` or `aria-pressed` states, impacting screen reader navigation.
**Action:** Ensure all interactive elements have semantic labels or state indicators next time.
## 2026-09-22 - Missing confirmation for destructive actions
**Learning:** Found that resetting an active game has no confirmation, which can lead to accidental progress loss.
**Action:** Always verify if state exists and prompt user before allowing destructive actions like resets.
