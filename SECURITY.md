# Security Policy

## Reporting a Vulnerability

The Midnight 911 Frontend Plugin is the configuration panel for a life-safety alerting system. If you believe you have found a security vulnerability, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, email **engineering@midnight.security** with:

- A description of the vulnerability and its potential impact
- Steps to reproduce, including affected versions
- Any proof-of-concept code or screenshots (if applicable)
- Your contact information for follow-up

We aim to acknowledge reports within **3 business days** and will work with you on a coordinated disclosure timeline.

## Important: Do Not Test With Real Alerts

This panel arms, disarms, and reconfigures the real `midnight_alerts` integration it's paired with, which can result in emergency monitoring or 911 dispatch. **Never test vulnerabilities against a live setup or trigger real alerts.** Use a development environment with a test API key on the `midnight_alerts` side when possible, and describe theoretical or code-level issues in your report instead.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest release | Yes |
| Older releases | No |

We recommend running the latest release available from this repository or HACS.

## Scope

The following are **in scope**:

- Vulnerabilities in the `midnight_911_frontend_plugin` Home Assistant integration code
- Issues in the frontend panel (XSS, injection, or other flaws reachable through the UI)
- Improper authentication/authorization in the panel's websocket handlers
- Flaws in the "Import from Alarmo" migration flow that could corrupt or leak configuration
- Issues that could let this panel drive `midnight_alerts` in unintended or unauthorized ways

The following are **out of scope**:

- Vulnerabilities in the `midnight_alerts` integration or the Midnight Alerts backend API — report those via [midnight-homeassistant-911's SECURITY.md](https://github.com/midnight-security/midnight-homeassistant-911/blob/master/SECURITY.md) or security@midnight.security, they will be routed appropriately
- Vulnerabilities in Home Assistant core or other third-party integrations
- Vulnerabilities inherited from the upstream [Alarmo](https://github.com/nielsfaber/alarmo) project that are unrelated to this fork's changes — report those upstream
- Social engineering, physical security, or denial-of-service attacks
- Missing security features in unsupported or end-of-life versions

## Safe Harbor

We consider security research conducted in good faith, consistent with this policy, to be authorized. We will not pursue legal action against researchers who follow these guidelines.

## Recognition

We appreciate responsible disclosure. With your permission, we are happy to acknowledge your contribution when we publish a fix.
