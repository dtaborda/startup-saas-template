---
name: contract-enforcement
description: >
  Enforce mandatory usage of @template/contracts across all packages.
  Prevents inline DTOs, schema drift, and inconsistent request/response handling.
  Trigger: When reviewing code for contract compliance or detecting inline schema definitions.
license: Apache-2.0
metadata:
  author: anyoneAI
  version: "1.0.0"
  scope: [root, ui, packages]
  auto_invoke:
    - "Contract compliance, import validation, DTO enforcement"
    - "Reviewing code for contract compliance"
    - "Detecting inline DTO or schema definitions"
    - "Validating Server Action request/response models"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Related Skills

- `shared-contracts` - Contract definitions
- `contract-versioning` - SemVer and changelog
- `contract-testing` - Fixture-based testing
- `zod-4` - Schema validation
- `typescript` - Type safety patterns

---

## Purpose

Ensure every package strictly uses the `@template/contracts` package for shared data types. No inline DTOs allowed anywhere data crosses package boundaries.

---

## CRITICAL RULES

- ✅ ALWAYS import contracts from `@template/contracts`
- ✅ ALWAYS validate inputs with Zod schemas from contracts
- ✅ ALWAYS use `ActionResult<T>` in Server Actions
- ❌ NEVER define inline DTOs inside `ui/`, `packages/core/`, or other consumers
- ❌ NEVER define schemas locally when a shared version exists in contracts
- ❌ NEVER bypass validation for "quick" implementations
- ❌ NEVER duplicate type definitions across packages

---

## ❌ Forbidden Patterns

### Inline Schema in Server Action

```typescript
// ❌ FORBIDDEN — schema defined inline instead of from contracts
"use server";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function login(input: unknown) {
  const parsed = LoginSchema.safeParse(input);
  // ...
}
```

### Inline Interface in Component

```typescript
// ❌ FORBIDDEN — interface defined inline instead of from contracts
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  // ...
}
```

### Inline Type in Core Package

```typescript
// ❌ FORBIDDEN — type defined locally in core
type UserProfile = {
  id: string;
  email: string;
  name: string;
};

export function getUserProfile(): Promise<UserProfile> {
  // ...
}
```

---

## ✅ Required Patterns

### Server Action with Contract Import

```typescript
// ✅ REQUIRED — schema from @template/contracts
"use server";

import { LoginRequestSchema, type LoginResponse } from "@template/contracts";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function login(
  input: unknown
): Promise<ActionResult<LoginResponse>> {
  const parsed = LoginRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid credentials" };
  }
  // ...
}
```

### Component with Contract Import

```typescript
// ✅ REQUIRED — type from @template/contracts
import { type ChatMessage } from "@template/contracts";

export function MessageBubble({ message }: { message: ChatMessage }) {
  // ...
}
```

### Core Package with Contract Import

```typescript
// ✅ REQUIRED — type from @template/contracts
import { type UserProfile } from "@template/contracts";

export function getUserProfile(): Promise<UserProfile> {
  // ...
}
```

---

## Violation Detection Signs

Look for these patterns that indicate contract violations:

| Sign | Where | Problem |
|------|-------|---------|
| `z.object({...})` | In `ui/` files | Inline schema — should be in contracts |
| `interface ...Request` | In action files | Inline DTO — should be in contracts |
| `interface ...Response` | In core files | Inline DTO — should be in contracts |
| `type ... = {` | In component files (for API data) | Inline type — should be in contracts |
| Missing `@template/contracts` import | Any file handling API data | Not using shared contracts |

**Exception**: Local component props (`type ButtonProps`) and UI-only state types are NOT violations — they don't cross package boundaries.

---

## When to Invoke

| Action | Invoke? |
|--------|---------|
| New Server Action created | ✅ Yes |
| New component consuming API data | ✅ Yes |
| Code review for contracts | ✅ Yes |
| Inline DTO detected | ✅ Yes |
| Local UI-only types | ❌ No |

---

## Checklist

- [ ] No inline DTOs in Server Actions
- [ ] No inline DTOs in core package
- [ ] No inline schemas in components
- [ ] All Server Actions validate with contract schemas
- [ ] All API data types imported from `@template/contracts`
- [ ] Contracts exist in shared location

---

## Resources

- **Contract Definitions**: See `shared-contracts` skill
- **Package Location**: [packages/contracts/](../../packages/contracts/)
