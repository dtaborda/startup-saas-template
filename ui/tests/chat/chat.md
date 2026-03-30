### E2E Tests: Chat

**Suite ID:** `CHAT-E2E`
**Feature:** Protected Growth AI chat workflow.

---

## Test Case: `CHAT-E2E-001` - Authenticated user opens chat and gets streamed response

**Priority:** `critical`

**Tags:**
- type → @e2e
- feature → @chat

**Description/Objective:** Verify the authenticated user can open `/chat`, send a prompt, and receive a streamed assistant response.

**Preconditions:**
- The user can authenticate with the demo account.

### Flow Steps:
1. Sign in with the demo credentials.
2. Open `/chat`.
3. Send one prompt.
4. Wait for the assistant stream to complete.

### Expected Result:
- The prompt is rendered in the transcript.
- An assistant reply is added after streaming.

### Key verification points:
- `Message input` is available.
- The transcript log shows the user prompt.
- A second transcript item contains assistant content.

---

## Test Case: `CHAT-E2E-002` - Chat session persists after reload

**Priority:** `high`

**Tags:**
- type → @e2e
- feature → @chat

**Description/Objective:** Validate persisted chat state remains visible after a page reload.

**Preconditions:**
- The user is authenticated.
- A chat prompt has been sent and answered.

### Flow Steps:
1. Reload `/chat` after a completed exchange.
2. Wait for the transcript to rehydrate.

### Expected Result:
- The browser stays on `/chat`.
- The previously sent prompt remains visible.

### Key verification points:
- The chat log is visible after reload.
- The exact user prompt is still present.
