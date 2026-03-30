---
name: shared-contracts
description: >
  Shared data contracts using Zod schemas in the @template/contracts package.
  Ensures consistent DTOs, schema validation, and type inference across the monorepo.
  Trigger: When creating/modifying shared data contracts, Zod schemas, or DTOs.
license: Apache-2.0
metadata:
  author: anyoneAI
  version: "1.0.0"
  scope: [root, ui, packages]
  auto_invoke:
    - "Shared data contracts, Zod schemas, DTOs"
    - "Creating/modifying shared data contracts"
    - "Adding new API request/response schemas"
    - "Changing field names, types, or required status in contracts"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Related Skills

- `contract-enforcement` - Enforce contract usage
- `contract-versioning` - SemVer and changelog
- `contract-testing` - Fixture-based testing
- `zod-4` - Zod schema validation
- `typescript` - Type safety patterns

---

## Purpose

Ensure every API request, response, and data transfer uses contracts defined in the `@template/contracts` package. This is the single source of truth for all shared data types in the monorepo.

---

## Contract Location

```
packages/contracts/
├── src/
│   ├── index.ts          # Re-exports all contracts
│   ├── auth.ts           # Auth: User, Login, Signup, Session
│   ├── chat.ts           # Chat: Message, Session, Stream
│   ├── common.ts         # Common: Error, Pagination, shared types
│   └── courses.ts        # Courses: Course, Enrollment, Progress
├── package.json
└── tsconfig.json
```

---

## CRITICAL RULES

- ✅ ALWAYS define contracts in `packages/contracts/src/`
- ✅ ALWAYS use `Schema` suffix for Zod schemas (e.g., `LoginRequestSchema`)
- ✅ ALWAYS infer types from schemas: `type LoginRequest = z.infer<typeof LoginRequestSchema>`
- ✅ ALWAYS re-export from `index.ts`
- ✅ ALWAYS use `as const` for enum-like values
- ❌ NEVER define inline DTOs in `ui/` or other packages
- ❌ NEVER change field types without version bump
- ❌ NEVER remove required fields (breaking change)
- ❌ NEVER duplicate schemas across packages

---

## Schema Conventions

### Naming

| Pattern | Example |
|---------|---------|
| Schema (Zod object) | `LoginRequestSchema` |
| Inferred type | `type LoginRequest = z.infer<typeof LoginRequestSchema>` |
| Enum-like constants | `export const MessageRole = { USER: "user", ASSISTANT: "assistant" } as const` |

### Schema Example

```typescript
import { z } from "zod";

// Enum-like constant
export const MessageRole = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
} as const;

// Zod schema
export const ChatMessageSchema = z.object({
  id: z.string().uuid(),
  role: z.enum([MessageRole.USER, MessageRole.ASSISTANT, MessageRole.SYSTEM]),
  content: z.string().min(1),
  createdAt: z.string().datetime(),
});

// Inferred type
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
```

---

## Subpath Exports

Import contracts using subpath exports:

```typescript
// Import from specific domain
import { LoginRequestSchema, type LoginRequest } from "@template/contracts/auth";
import { ChatMessageSchema, type ChatMessage } from "@template/contracts/chat";
import { PaginationSchema } from "@template/contracts/common";
import { CourseSchema } from "@template/contracts/courses";

// Or import from barrel export
import { LoginRequestSchema, ChatMessageSchema } from "@template/contracts";
```

---

## Adding New Contracts Checklist

1. **Determine domain** — which file does this belong in? (`auth.ts`, `chat.ts`, `common.ts`, `courses.ts`, or new file)
2. **Create schema** — use `z.object({...})` with `Schema` suffix
3. **Infer type** — `type MyType = z.infer<typeof MyTypeSchema>`
4. **Export** — add to the file's exports
5. **Re-export** — update `index.ts` if using barrel exports
6. **Use const enums** — for string literal unions, use `as const` objects
7. **Add JSDoc** — brief description on the schema
8. **Version bump** — if modifying existing contracts, follow `contract-versioning`

---

## When to Invoke

| Action | Invoke? |
|--------|---------|
| New API endpoint | ✅ Yes |
| Request/response shape change | ✅ Yes |
| New shared data type | ✅ Yes |
| UI-only state (no API crossing) | ❌ No |
| Local component props | ❌ No |

---

## Checklist

- [ ] Schema created with `Schema` suffix
- [ ] Type inferred from schema
- [ ] Exported from domain file
- [ ] Re-exported from `index.ts`
- [ ] No inline DTOs in consuming packages
- [ ] Version bumped if modifying existing contracts

---

## Resources

- **Contract Reference**: See [references/contracts-reference.md](references/contracts-reference.md)
- **Package Location**: [packages/contracts/](../../packages/contracts/)
- **Packages Agent**: [packages/AGENTS.md](../../packages/AGENTS.md)
