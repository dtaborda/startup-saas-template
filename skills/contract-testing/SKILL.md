---
name: contract-testing
description: >
  Testing patterns for @template/contracts Zod schemas.
  Validates shared fixtures to ensure contract correctness and prevent regressions.
  Trigger: When contracts change, new contracts are created, or schema validation tests are needed.
license: Apache-2.0
metadata:
  author: anyoneAI
  version: "1.0.0"
  scope: [root, ui]
  auto_invoke:
    - "Contract parity tests, schema validation tests"
    - "Creating new contracts"
    - "Modifying existing contract fields"
    - "Adding contract test fixtures"
    - "Suspecting contract drift or breaking changes"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Related Skills

- `shared-contracts` - Contract definitions
- `contract-versioning` - SemVer and changelog
- `contract-enforcement` - Enforce contract usage

---

## Purpose

Ensure `@template/contracts` Zod schemas remain correct and backward-compatible by validating shared JSON fixtures against every schema.

---

## Test Structure

```
packages/contracts/
├── src/                    # Zod schemas (source of truth)
│   ├── auth.ts
│   ├── chat.ts
│   ├── common.ts
│   └── courses.ts
├── fixtures/               # Shared JSON fixtures
│   ├── auth/
│   │   ├── login-request.json
│   │   └── login-response.json
│   ├── chat/
│   │   ├── chat-message.json
│   │   └── chat-session.json
│   └── common/
│       └── pagination.json
└── tests/
    └── fixtures.test.ts    # Validates all fixtures against schemas
```

---

## CRITICAL RULES

- ✅ ALWAYS create a fixture for every contract
- ✅ ALWAYS validate fixtures against Zod schemas
- ✅ ALWAYS update fixtures when contracts change
- ✅ ALWAYS test both valid and invalid inputs
- ❌ NEVER commit contracts without corresponding fixtures
- ❌ NEVER skip fixture validation in CI
- ❌ NEVER "fix" only the schema without updating fixtures

---

## Test Pattern (Vitest + Zod)

### Valid Input Test

```typescript
import { describe, it, expect } from "vitest";
import { LoginRequestSchema } from "../src/auth";
import loginRequestFixture from "../fixtures/auth/login-request.json";

describe("LoginRequestSchema", () => {
  it("validates valid login request fixture", () => {
    const result = LoginRequestSchema.safeParse(loginRequestFixture);
    expect(result.success).toBe(true);
  });

  it("rejects invalid login request (missing email)", () => {
    const invalid = { password: "test123" };
    const result = LoginRequestSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
```

### Fixture-Based Batch Test

```typescript
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as schemas from "../src/index";

const FIXTURES_DIR = join(__dirname, "../fixtures");

function loadFixture(domain: string, filename: string): unknown {
  const path = join(FIXTURES_DIR, domain, filename);
  return JSON.parse(readFileSync(path, "utf-8"));
}

// Map fixture filenames to their corresponding schemas
const FIXTURE_SCHEMA_MAP: Record<string, keyof typeof schemas> = {
  "login-request.json": "LoginRequestSchema",
  "chat-message.json": "ChatMessageSchema",
  // Add new mappings here
};

describe("Contract Fixtures", () => {
  for (const [filename, schemaName] of Object.entries(FIXTURE_SCHEMA_MAP)) {
    const domain = filename.split("-")[0] === "login" ? "auth" : "chat";
    
    it(`${schemaName} validates ${filename}`, () => {
      const fixture = loadFixture(domain, filename);
      const schema = schemas[schemaName];
      const result = (schema as { safeParse: (d: unknown) => { success: boolean } }).safeParse(fixture);
      expect(result.success).toBe(true);
    });
  }
});
```

---

## Fixture Format

Fixtures are plain JSON files representing valid instances of each schema:

```json
// fixtures/auth/login-request.json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

```json
// fixtures/chat/chat-message.json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "role": "user",
  "content": "Hello, how can I invest?",
  "createdAt": "2026-03-01T12:00:00.000Z"
}
```

---

## Running Tests

```bash
# From root
pnpm test

# From contracts package
cd packages/contracts && pnpm test
```

---

## When to Invoke

| Action | Invoke? |
|--------|---------|
| Contract created | ✅ Yes |
| Contract field changed | ✅ Yes |
| Version bump requested | ✅ Yes |
| Breaking change suspected | ✅ Yes |
| UI-only type change | ❌ No |

---

## Checklist

- [ ] Fixture JSON file created for new contract
- [ ] Test validates fixture against schema
- [ ] Invalid input test covers edge cases
- [ ] Fixtures updated when contract changes
- [ ] All tests pass locally
- [ ] All tests pass in CI

---

## Resources

- **Contract Definitions**: See `shared-contracts` skill
- **Fixtures Location**: `packages/contracts/fixtures/`
