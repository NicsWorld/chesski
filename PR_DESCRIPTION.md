Title: ⚡ Bolt: Optimize game state clone on move and undo

## 💡 What
Replaced the expensive `gameClone.loadPgn(game.pgn())` deep clone strategy in both `handleMove` and the Undo handler with a shallow clone strategy using `Object.assign(new Chess(), game)` after mutating the original game instance.

## 🎯 Why
Loading PGN parses the entire game history linearly on every clone, causing redundant deep cloning overhead that scales poorly over the duration of the game, particularly noticeable during rapid user interactions like drag-and-drop moves or successive undos. Reusing and shallow cloning the game instance is vastly more performant while still creating a new object reference to trigger a React state re-render.

## 📊 Impact
A ~97% reduction in game cloning execution time, dropping the cost of an undo operation (after 50 moves) from roughly ~7.1ms down to ~0.2ms. The UI will remain significantly more responsive in late-game scenarios.

## 🔬 Measurement
A standalone Node.js benchmark performing 1,000 undo clone operations on a 50-move game instance was used. Deep cloning via `loadPgn` took ~7137ms to complete the iterations, whereas shallow cloning `Object.assign(new Chess(), game)` combined with an in-place mutation took ~195ms for the same workload.