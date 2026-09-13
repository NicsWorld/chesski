## 2024-10-24 - Efficient React State Cloning for chess.js
**Learning:** Using `loadPgn(game.pgn())` parses the whole history string and scales O(N) with game length, taking ~2ms per clone.
**Action:** Mutate the game instance directly, then use `Object.assign(Object.create(Object.getPrototypeOf(game)), game)` to create a fast, shallow clone (~0.08ms) that triggers React's state update without expensive string parsing.
