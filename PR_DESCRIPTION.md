# 🔒 [Security Fix] Add Content Security Policy (CSP) to index.html

## 🎯 What
Added a Content Security Policy (CSP) meta tag to the `index.html` file to restrict the origins of content that the browser is allowed to load.

## ⚠️ Risk
Without a CSP, the application is highly vulnerable to Cross-Site Scripting (XSS) attacks. If an attacker manages to inject malicious scripts or styles into the application, the browser would execute them, potentially leading to data theft, session hijacking, or defacement. Furthermore, malicious actors could embed unauthorized external resources (images, fonts, scripts) or exfiltrate data via unauthorized connections.

## 🛡️ Solution
Implemented a strict but functional CSP using the `<meta>` tag in `index.html`.

The policy configured is:
`default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' ws: wss:;`

This addresses the vulnerability by:
- **`default-src 'self'`**: Restricting all unhandled resource types to the application's own origin by default.
- **`script-src 'self' 'unsafe-inline'`**: Permitting scripts from the same origin. `'unsafe-inline'` is currently required for Vite's module injection/react-refresh during local development and for standard lightweight React apps without nonces.
- **`style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`**: Allowing styles from the same origin, inline styles (often used by CSS-in-JS or dynamic React components), and specifically whitelisting the Google Fonts API.
- **`font-src 'self' https://fonts.gstatic.com`**: Allowing fonts to load locally or from the Google Fonts CDN.
- **`img-src 'self' data:`**: Restricting images to the same origin and permitting `data:` URIs (useful for inline SVG icons or placeholders).
- **`connect-src 'self' ws: wss:`**: Limiting network requests (fetch, XHR) to the origin, while allowing WebSocket connections (`ws: wss:`) strictly required for Vite's Hot Module Replacement (HMR).

This significantly improves the security posture while maintaining developer experience and functional parity.
