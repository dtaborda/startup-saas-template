---
name: drizzle
description: >
  Drizzle ORM patterns for PostgreSQL/Supabase. Covers schema definition, RLS policies,
  relations, migrations, and Supabase-specific features (auth integration, pgvector).
  `packages/db/` is schema-only; queries live in `packages/core/` or Server Actions
  in `ui/`. Trigger: When working with packages/db/, creating database schemas,
  migrations, or queries.
license: Apache-2.0
metadata:
  author: anyoneAI
  version: "1.1.0"
  scope: [packages, packages/core, ui]
  auto_invoke:
    - "Creating database schemas"
    - "Defining table columns and types"
    - "Adding RLS policies"
    - "Creating database relations"
    - "Running migrations"
    - "Writing database queries"
    - "Working with Supabase auth"
    - "Implementing pgvector/embeddings"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, Task
---

# Drizzle ORM — PostgreSQL/Supabase

All database **schema** work lives in `packages/db/` (schema-only package).
All database **query** code lives in `packages/core/` or Server Actions / Route Handlers in `ui/`.
NEVER place query logic or client setup in `packages/db/`.

> **CURRENT STATE**: The existing `packages/db/src/schema.ts` does not yet export
> `$inferSelect`/`$inferInsert` types and does not yet include inline RLS policies or
> `enableRLS()` calls. RLS is currently managed at the Supabase dashboard level.
> When modifying the schema, follow the best practices below to add these incrementally.

## References

For detailed examples and code patterns, see:

- [Schema & RLS Patterns](./references/schema-rls-patterns.md) — Table definition, column types, RLS policies, Supabase auth, indexes
- [Query Patterns](./references/query-patterns.md) — Select, insert, update, delete, relations, pagination, transactions
- [pgvector & Migrations](./references/pgvector-migrations.md) — AI embeddings, similarity search, migration workflow, client setup

---

## Best Practices (MANDATORY)

### MUST DO

1. **UUID primary keys** — `uuid("id").primaryKey().defaultRandom()`, never serial
2. **snake_case columns** — `avatar_url`, Drizzle maps to camelCase `avatarUrl`
3. **Both timestamps** — `timestamp("created_at", { withTimezone: true }).defaultNow().notNull()` (exception: append-only tables like `chat_messages` may omit `updatedAt`)
4. **Export inferred types** — `export type User = typeof users.$inferSelect;` and `$inferInsert` for every table
5. **RLS policies on every table** — At minimum: select for authenticated, CRUD for owner. Use `enableRLS()` or ensure RLS is enabled at the Supabase project level.
6. **CASCADE on FKs** — `.references(() => parent.id, { onDelete: 'cascade' })`
7. **Use `returning()`** — Always return inserted/updated rows
8. **Connection pooler** — Use `DATABASE_URL` with Supabase pooler in production

### NEVER DO

1. ❌ Serial IDs — use UUID
2. ❌ Skip RLS — security risk
3. ❌ `any` in schema types
4. ❌ Timestamps without timezone
5. ❌ Hardcode connection strings — use env vars
6. ❌ Edit generated migration SQL — re-generate from schema

---

## Quick Reference

| Task | Pattern |
|------|---------|
| Create table | `pgTable('name', { columns }, (t) => ({ policies, indexes }))` |
| Add enum | `pgEnum('name', ['val1', 'val2'])` |
| Add RLS policy | `pgPolicy('name', { for, to, using })` |
| Add relation | `relations(parent, ({ many/one }) => ...)` |
| FK to auth.users | `foreignKey({ columns: [...], foreignColumns: [authUsers.id] })` |
| Select | `db.select().from(table).where(...)` |
| Insert | `db.insert(table).values(data).returning()` |
| Update | `db.update(table).set(data).where(...).returning()` |
| Delete | `db.delete(table).where(...)` |
| Vector column | `vector('name', { dimensions: 1536 })` |
| Similarity search | `cosineDistance(column, embedding)` |
| Generate migration | `pnpm db:generate` |
| Apply migration | `supabase db push` (after generate) |

---

## Imports Quick Reference

```typescript
// Supabase roles & entities (serviceRole bypasses RLS by default — rarely needed in policies)
import { authenticatedRole, anonRole, authUsers, authUid } from 'drizzle-orm/supabase';

// Schema & policies (packages/db)
import { pgTable, pgEnum, pgPolicy, uuid, text, timestamp, foreignKey } from 'drizzle-orm/pg-core';

// Relations (packages/db — co-located with schema)
import { relations } from 'drizzle-orm';

// Query operators (packages/core or ui/ — NOT in packages/db)
import { eq, and, or, desc, sql } from 'drizzle-orm';
```

> **Note**: `authUid` is a Supabase RLS helper for use in `pgPolicy` definitions only.
> Do NOT use it as an application-level query filter. For application queries, pass the
> user ID explicitly from your auth context.

---

## Project Locations

| Item | Path | Notes |
|------|------|-------|
| Schema | `packages/db/src/schema.ts` | Tables, relations, enums, types |
| Exports | `packages/db/src/index.ts` | Barrel export |
| Config | `packages/db/drizzle.config.ts` | No `dbCredentials` — generation-only, no DB connection needed |
| Migrations | `packages/db/migrations/` | Generated SQL files |
| Queries | `packages/core/src/` | Business logic, repositories |
| Server Actions | `ui/app/` or `ui/actions/` | Data mutations via BFF |

---

## Related Skills

- `template-bff` — Server Actions for data mutations
- `zod-4` — Contract validation (Zod schemas ↔ DB schema)
- `shared-contracts` — Shared DTOs between UI and DB
