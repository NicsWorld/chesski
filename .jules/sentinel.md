## 2025-02-14 - Add Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) headers leaving the application vulnerable to XSS and data injection attacks.
**Learning:** Modern Vite/React applications require specific CSP directives like `script-src 'unsafe-inline' 'unsafe-eval'` for tooling, but still benefit massively from restricting `default-src`, `connect-src` (to `ws:` for HMR), and external assets (fonts, images).
**Prevention:** Always implement a baseline CSP in `index.html` (or server headers) for front-end apps to enforce Defense in Depth.
