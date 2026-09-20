## 2026-09-20 - Prevented Object Allocation on Render
**Learning:** Object allocation (`const pieceNames = {...}`) inside a component causes it to be recreated on every single render. Since `Piece` components are rendered up to 32 times on the board, avoiding object allocation can marginally speed up rendering by saving memory and GC pressure.
**Action:** Extract static variables/objects/arrays outside of component body scope whenever possible to ensure they are created only once per module evaluation.
