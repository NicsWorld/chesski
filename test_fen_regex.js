const regex = /^([pPnNbBrRqQkK1-8]+\/){7}[pPnNbBrRqQkK1-8]+ [wb] (-|[KQkq]+) (-|[a-h][36])( \d+ \d+)?$/;
const validFens = [
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -",
  "8/8/8/8/8/8/8/8 w - -",
  "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
];

for (const fen of validFens) {
  console.log(`"${fen}" ->`, regex.test(fen));
}
