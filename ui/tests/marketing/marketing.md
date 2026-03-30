### E2E Tests: Marketing

**Suite ID:** `MARKETING-E2E`
**Feature:** Public Growth AI landing page.

---

## Test Case: `MARKETING-E2E-001` - Landing loads and CTA routes to login

**Priority:** `critical`

**Tags:**
- type → @e2e
- feature → @marketing

**Description/Objective:** Verify the rebuilt public landing is accessible and the primary CTA routes into the auth flow.

**Preconditions:**
- The Next.js UI app is running through the Playwright web server.

### Flow Steps:
1. Open `/`.
2. Verify the brand eyebrow, hero heading, and primary CTA are visible.
3. Click `Enter platform`.

### Expected Result:
- The marketing hero renders for unauthenticated users.
- The CTA navigates to `/login`.

### Key verification points:
- `growth ai / editorial command` is visible.
- The hero headline is visible.
- The browser reaches `/login`.
