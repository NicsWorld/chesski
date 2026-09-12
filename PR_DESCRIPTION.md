🎨 Palette: Added confirmation dialog for New Game

💡 What: Added a native browser `window.confirm` dialog to prompt the user before starting a new game, but only if they have already made moves in the current game.
🎯 Why: It's easy to accidentally click the "New Game" button. For users deep into a game, this accidental click previously resulted in irreversible loss of their progress. This simple confirmation adds a safety net.
📸 Before/After: Visual change is simply a browser-native confirmation popup.
♿ Accessibility: Uses the native `window.confirm`, which is natively supported by screen readers and keyboard navigation.