⚡ Bolt: Optimize game state cloning to prevent redundant parsing

💡 What
Replaced `new Chess().loadPgn(game.pgn())` with direct mutation and a prototype-preserving shallow clone via `Object.assign`.

🎯 Why
Loading PGN requires the chess engine to re-parse the entire move history string, which gets progressively slower as the game continues.

📊 Impact
Cloning the game state is now approximately 25x faster (0.08ms vs 2ms), significantly reducing main thread blockage during move rendering and dragging.

🔬 Measurement
A Node.js benchmark (`benchmark2.cjs`) simulated 1,000 clones. `loadPgn` took ~2322ms, while the mutate-and-shallow-clone approach took ~82ms.
