# Contracts Reference

## Package: `@template/contracts`

All shared data contracts (Zod schemas and inferred types) for the startup-saas-template monorepo.

## Schema Index

### `auth.ts` — Authentication Contracts

| Schema | Type | Purpose |
|--------|------|---------|
| `LoginRequestSchema` | `LoginRequest` | Login form data |
| `SignupRequestSchema` | `SignupRequest` | Registration form data |
| `UserProfileSchema` | `UserProfile` | User profile data |
| `SessionSchema` | `Session` | Auth session data |

### `chat.ts` — Chat Contracts

| Schema | Type | Purpose |
|--------|------|---------|
| `ChatMessageSchema` | `ChatMessage` | Individual chat message |
| `ChatSessionSchema` | `ChatSession` | Chat conversation session |
| `SendMessageSchema` | `SendMessage` | Send message request |

### `common.ts` — Common/Shared Contracts

| Schema | Type | Purpose |
|--------|------|---------|
| `PaginationSchema` | `Pagination` | Pagination parameters |
| `ApiErrorSchema` | `ApiError` | Standardized error shape |

### `courses.ts` — Course Contracts

| Schema | Type | Purpose |
|--------|------|---------|
| `CourseSchema` | `Course` | Course data |
| `EnrollmentSchema` | `Enrollment` | Course enrollment |

## Import Patterns

```typescript
// Barrel import
import { LoginRequestSchema, type ChatMessage } from "@template/contracts";

// Subpath import (preferred for tree-shaking)
import { LoginRequestSchema } from "@template/contracts/auth";
import { ChatMessageSchema } from "@template/contracts/chat";
import { PaginationSchema } from "@template/contracts/common";
import { CourseSchema } from "@template/contracts/courses";
```

## Notes

- All schemas follow `PascalCaseSchema` naming convention
- All types are inferred from schemas: `type X = z.infer<typeof XSchema>`
- Enum-like values use `as const` objects
- This reference should be updated whenever contracts are added or modified
