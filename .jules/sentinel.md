## 2026-10-02 - Add Content Security Policy (CSP)
**Vulnerability:** Missing Content Security Policy (CSP) header, increasing risk of Cross-Site Scripting (XSS) attacks.
**Learning:** Modern frontend applications (like Vite/React) should implement a baseline CSP to restrict resource loading to trusted origins, mitigating the impact of potential XSS vulnerabilities.
**Prevention:** Always include a strict Content Security Policy (CSP) via HTTP headers or HTML meta tags in frontend applications.
