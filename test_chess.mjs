import { Chess } from 'chess.js';

const chess = new Chess();
// Try loading a FEN without kings
const fenNoKings = '8/8/8/8/4P3/8/8/8 w - - 0 1';
try {
    chess.load(fenNoKings);
    console.log("Loaded FEN without kings successfully");
} catch (e) {
    console.log("Failed to load FEN without kings:", e.message);
}

// Try loading a FEN with kings
const fenWithKings = '7k/8/8/8/8/8/4P3/K7 w - - 0 1';
chess.load(fenWithKings);
console.log("Loaded FEN with kings");

// Move pawn
const move = chess.move({ from: 'e2', to: 'e4' });
console.log("Move result:", move);
console.log("Turn after move:", chess.turn());

// Try to force turn back to white
const fenAfterMove = chess.fen();
const fenParts = fenAfterMove.split(' ');
fenParts[1] = 'w'; // Set turn to white
const newFen = fenParts.join(' ');
chess.load(newFen);
console.log("Turn after forcing white:", chess.turn());

// Check if we can move again
const move2 = chess.move({ from: 'e4', to: 'e5' });
console.log("Second move result:", move2);
