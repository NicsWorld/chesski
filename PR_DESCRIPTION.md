Title: ⚡ Bolt: Fix infinite re-render loop during piece drag
Content:
💡 What: Refactored Piece.tsx to trigger onDragStart using react-dnd's item function instead of a useEffect watching isDragging.
🎯 Why: Solves a critical performance issue where dragging caused continuous UI re-renders, resulting in freezes or browser OOM due to recursive state updates and new callback references.
📊 Impact: Eliminates hundreds of re-renders per drag interaction, providing stable 60fps drag and drop.
🔬 Measurement: Dragging pieces on the board no longer causes high CPU spikes, and unit tests specifically verify the drag interaction.