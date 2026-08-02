# 📝 [Documentation] Draft feature suggestions based on codebase context focusing on growth and monetization

## 🎯 What
This PR adds a new documentation file `docs/GROWTH_FEATURE_SUGGESTIONS.md` that contains 6 focused, high-value feature suggestions. These suggestions are specifically tailored to drive user growth and generate revenue while adhering to the constraints of leveraging existing infrastructure (like URL parsing, UI state, and themes) and avoiding external dependencies or large rewrites.

## 📝 Details
The document includes the following well-scoped, ranked suggestions:
1. **"Challenge a Friend" Viral Loop (Growth):** Reusing the `fen` URL param pattern to create a `challenge` param for inviting new players.
2. **Premium "Dinosaur" Theme (Monetization):** Adding a lock-gated third option to the existing `pieceTheme` state linked to a payment gateway.
3. **Share to X / Twitter Intent (Growth):** Adding a dynamic social sharing button triggered by the existing checkmate string from `evaluateGameStatus`.
4. **"Support the Developer" Endgame Hook (Monetization):** A subtle tip jar button that pulses when a game ends naturally.
5. **Embeddable Chess Widget (Growth):** Utilizing a new `embed=true` URL parameter to hide padding/headers, allowing external sites to embed the app.
6. **Freemium Puzzle Mode (Growth/Retention):** Reusing the `ChessBoard` component to render static FEN puzzles, gating the daily puzzle behind an email capture.

## ✨ Result
Product owners and contributors now have a clear, strictly-formatted, and highly actionable backlog of small-to-medium scoped tasks that directly target growth and monetization without requiring major architectural shifts.