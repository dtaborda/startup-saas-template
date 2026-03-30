---
name: template-overview
description: >
  Main entry point for startup-saas-template development — quick reference for all components.
  Trigger: General project questions, architecture overview, component navigation.
license: Apache-2.0
metadata:
  author: anyoneAI
  version: "1.0.0"
  scope: [root]
  auto_invoke: "General project questions, architecture overview"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

# startup-saas-template

Turborepo monorepo starter for SaaS applications with Next.js 15, React 19, Tailwind CSS 4, and Supabase-ready backend.

## Architecture (Monorepo)

```
Browser → Next.js 15 (ui/) → Server Actions / Route Handlers
                             ↓
              @template/core → Supabase Client → Supabase (Auth + DB + Storage)
                             ↓
              @template/db   → Drizzle ORM → PostgreSQL
```

> **Reference**: See [lighthouse-architecture.mdx](../../docs/developer-guide/lighthouse-architecture.mdx) for full system architecture.

---

## Packages

| Package | Name | Purpose | Status |
|---------|------|---------|--------|
| `ui/` | `@template/web` | Next.js 15 App Router — user-facing application | ✅ IN PROGRESS |
| `packages/contracts/` | `@template/contracts` | Zod schemas — shared data contracts (DTOs) | ✅ IN PROGRESS |
| `packages/core/` | `@template/core` | Business logic, auth provider, Supabase client | ✅ IN PROGRESS |
| `packages/db/` | `@template/db` | Drizzle ORM schema and migration generation | ✅ IN PROGRESS |
| `packages/ui/` | `@template/ui` | Shared UI components (shadcn/ui + Radix + CVA) | ✅ IN PROGRESS |

---

## Quick Commands

```bash
# Development
pnpm install              # Install all workspace dependencies
pnpm dev                  # Start all dev servers (Turborepo)

# Code Quality
pnpm lint                 # Biome check (all files)
pnpm lint:fix             # Biome auto-fix
pnpm format               # Biome format
pnpm typecheck            # TypeScript check (all packages)

# Build & Test
pnpm build                # Production build (all packages)
pnpm test                 # Run all tests
pnpm clean                # Clean build artifacts

# Database
pnpm db:generate          # Generate Drizzle migrations
```

---

## Data Flow

### Server Action (Mutation)
```
1. Browser → Next.js Server Action (ui/actions/ or ui/app/)
2. Server Action → Validate input with @template/contracts (Zod)
3. Server Action → @template/core (business logic)
4. @template/core → Supabase Client → Database
5. Response → ActionResult<T> → Browser
```

### Route Handler (Streaming)
```
1. Browser → /api/{route} (ui/app/api/)
2. Route Handler → @template/core (business logic)
3. @template/core → External API / Supabase
4. Response → SSE Stream → Browser
```

---

## Key Contracts

| Contract | Package | Purpose |
|----------|---------|---------|
| Auth schemas | `@template/contracts/auth` | Login, signup, user profile |
| Chat schemas | `@template/contracts/chat` | Chat messages, sessions |
| Common schemas | `@template/contracts/common` | Error, pagination, shared types |
| Course schemas | `@template/contracts/courses` | Course-related data |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role (server-only) |
| `DATABASE_URL` | Direct PostgreSQL connection string |

---

## Commit Style

```
feat(ui): add dashboard streaming component
fix(core): prevent stale auth state
feat(contracts): add course enrollment schema
chore(db): update migration scripts
refactor(ui-lib): extract card component
```

---

## Related Skills

| Skill | Purpose |
|-------|---------|
| `template-ui` | Frontend Next.js/React patterns, UI structure |
| `template-bff` | Server Actions, Route Handlers, BFF layer |
| `shared-contracts` | Zod schemas, shared DTOs |
| `contract-enforcement` | Enforce contract usage, prevent inline DTOs |
| `contract-testing` | Fixture-based contract testing |
| `contract-versioning` | SemVer and changelog for contracts |
| `documentation` | Documentation style guide |

---

## Architecture Documents

| Document | Layer |
|----------|-------|
| [lighthouse-architecture.mdx](../../docs/developer-guide/lighthouse-architecture.mdx) | System Overview |

---

## Resources

- **Architecture**: `docs/developer-guide/lighthouse-architecture.mdx`
- **Root Agent**: `AGENTS.md`
- **UI Agent**: `ui/AGENTS.md`
- **Packages Agent**: `packages/AGENTS.md`
