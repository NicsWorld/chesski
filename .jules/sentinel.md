## 2024-10-11 - Add Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) headers in Vite/React setup.
**Learning:** In Vite apps, CSPs must include `'unsafe-inline'` and `'unsafe-eval'` for styles and scripts to support Vite's Hot Module Replacement (HMR). You also need to explicitly whitelist `ws:` and `wss:` in `connect-src` to allow the HMR WebSocket connection.
**Prevention:** Ensure new front-end projects define a development-friendly CSP from the start to catch any inline script or third-party inclusion violations early without breaking developer tooling.
