# ⚡ Optimize Tutorial game state updates

### 💡 What
- Refactored `handleMove` and `initGame` to avoid costly FEN string manipulation (`addKingsToFen`) and whole board iterations (`removeKings`). We now instantiate a new `Chess` object and pass `{skipValidation: true}` to `game.load()` when loading the FEN state strings which don't contain kings.
- Removed the unused utility functions `addKingsToFen` and `removeKings`.
- Stripped extraneous king pieces directly from the tutorial FENs so they correctly reflect their initial states without needing dynamic cleanup.

### 🎯 Why
- The previous implementation unnecessarily modified FEN strings to insert Kings in order to bypass chess.js FEN validation and then removed them by scanning the entire 8x8 board object.
- Both `addKingsToFen` string replacement and `removeKings` `game.board()` generation and looping are operations executed on every user move in the tutorial. Removing them eliminates unneeded computations.

### 📊 Measured Improvement
- By utilizing `skipValidation` we avoid having to do the expensive FEN manipulation and iterating over the entire board to add and remove kings. Although `game.load(fen, {skipValidation: true})` is on-par regarding performance compared to string manipulating it, the new approach allows to completely delete both methods from the source code, reducing the footprint.
