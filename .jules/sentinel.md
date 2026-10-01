
## 2026-10-01 - Prevented basic XSS and injection vulnerabilities
**Vulnerability:** Missing Content Security Policy (CSP) allowed potentially malicious inline scripts or third-party resources.
**Learning:** Modern frontend apps (like Vite/React) often omit CSP by default, leaving the application surface unprotected against basic injections.
**Prevention:** Always add a baseline, robust CSP via a `<meta>` tag (e.g., `default-src 'self'`) in the `index.html` file, taking care to whitelist necessary assets (like Google Fonts) and development tooling (`unsafe-inline`, `unsafe-eval`).
