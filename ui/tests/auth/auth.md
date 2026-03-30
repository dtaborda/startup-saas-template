### E2E Tests: Auth

**Suite ID:** `AUTH-E2E`
**Feature:** Mock-auth login and logout flow.

---

## Test Case: `AUTH-E2E-001` - Protected dashboard redirects to login

**Priority:** `critical`

**Tags:**
- type → @e2e
- feature → @auth

**Description/Objective:** Confirm middleware protects `/dashboard` for unauthenticated users.

**Preconditions:**
- No auth cookie is set in the browser context.

### Flow Steps:
1. Open `/dashboard` directly.
2. Wait for the auth form.

### Expected Result:
- The user is redirected to `/login`.

### Key verification points:
- Login email and password fields are visible.

---

## Test Case: `AUTH-E2E-002` - Demo login reaches dashboard

**Priority:** `critical`

**Tags:**
- type → @e2e
- feature → @auth

**Description/Objective:** Validate the demo credentials exposed in the UI can enter the protected shell.

**Preconditions:**
- The login page is accessible.

### Flow Steps:
1. Open `/login`.
2. Submit `demo@startup.com / demo123`.

### Expected Result:
- The browser reaches `/dashboard`.
- The dashboard overview loads.

### Key verification points:
- `performance command overview` is visible.

---

## Test Case: `AUTH-E2E-003` - Logout returns to login

**Priority:** `critical`

**Tags:**
- type → @e2e
- feature → @auth

**Description/Objective:** Ensure account-menu logout clears access and routes back to `/login`.

**Preconditions:**
- The user is authenticated with the demo account.

### Flow Steps:
1. Open the account menu.
2. Click `Logout`.

### Expected Result:
- The browser returns to `/login`.

### Key verification points:
- The login form is visible again.
