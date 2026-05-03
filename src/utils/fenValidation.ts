import { validateFen } from 'chess.js';

export function isValidFen(fen: string): boolean {
  if (!fen || typeof fen !== 'string' || fen.length > 100) {
    return false;
  }
  return validateFen(fen).ok;
}
