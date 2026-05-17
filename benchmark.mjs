import { performance } from 'perf_hooks';
import { Chess } from 'chess.js';

const ITERATIONS = 10000;

console.log("Benchmarking new Chess()...");
const start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  new Chess();
}
const end = performance.now();
console.log(`Time to instantiate ${ITERATIONS} Chess objects: ${(end - start).toFixed(2)}ms`);
console.log(`Time per instantiation: ${((end - start) / ITERATIONS).toFixed(4)}ms`);
