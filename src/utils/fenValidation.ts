/**
 * Validates a FEN string for basic structural correctness and length.
 * This is to prevent malformed or excessively long strings from being processed
 * by the chess.js library, which could lead to performance issues or crashes.
 */
export const validateFen = (fen: string): boolean => {
  // 1. Check for maximum length (128 characters is standard for FEN)
  if (fen.length > 128) {
    return false;
  }

  // 2. Split into 6 mandatory fields
  const fields = fen.split(' ');
  if (fields.length !== 6) {
    return false;
  }

  const [position] = fields;

  // 3. Validate characters in the position field
  // Allowed: p, q, r, n, b, k (black), P, Q, R, N, B, K (white), 1-8 (empty), / (row separator)
  if (!/^[prnbqkPRNBQK1-8/]+$/.test(position)) {
    return false;
  }

  // 4. Validate that there are exactly 8 rows
  const rows = position.split('/');
  if (rows.length !== 8) {
    return false;
  }

  // 5. Validate that each row sums to exactly 8 squares
  for (const row of rows) {
    let sum = 0;
    for (const char of row) {
      if (/[1-8]/.test(char)) {
        sum += parseInt(char, 10);
      } else {
        sum += 1; // It's a piece
      }
    }
    if (sum !== 8) {
      return false;
    }
  }

  return true;
};
