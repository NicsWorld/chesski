## 2025-02-27 - Added Content Security Policy (CSP)
**Vulnerability:** The application was missing security headers, specifically a Content Security Policy (CSP), which left it more vulnerable to Cross-Site Scripting (XSS) and unauthorized resource loading.
**Learning:** Modern Vite/React applications require specific CSP directives like `script-src 'unsafe-inline' 'unsafe-eval'` and `connect-src ws: wss:` to allow Hot Module Replacement (HMR) to function during development, along with whitelisting necessary external fonts (Google Fonts).
**Prevention:** Include a tailored CSP in `index.html` by default on new front-end projects, balancing strict security with development tooling requirements.
