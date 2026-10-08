## 2023-10-08 - Missing Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) in `index.html`.
**Learning:** The application lacked a basic defense-in-depth mechanism against Cross-Site Scripting (XSS) and data injection. Without a CSP, if an attacker injects a malicious script, the browser executes it without restriction.
**Prevention:** Always include a baseline Content Security Policy in the root HTML file of front-end applications to whitelist trusted sources (e.g., `default-src 'self'`). When adding CSP to modern setups like Vite/React, remember to allow necessary directives like `connect-src 'self' ws: wss:` for Hot Module Replacement (HMR).
