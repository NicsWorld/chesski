# ⚡ Cache legal moves calculation in ChessBoard

## 💡 What
Replaced dynamic `game.moves({ square })` calls on drag start with a `useMemo` map caching legal moves based on the current `fen`.

## 🎯 Why
To prevent expensive repetitive calculations during piece drag interactions. `chess.js` `game.moves()` is slow when called repeatedly during drag events. By computing it once per move state and storing it in a map, we significantly speed up piece interaction.

## 📊 Measured Improvement
The benchmark (game.moves loop vs map lookup) showed a massive reduction from 1.1s to ~1.9ms for 10000 iterations.
