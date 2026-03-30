# startup-saas-template Agent Rules & Skills Index

Welcome to the `startup-saas-template` AI Agent index. This document provides core rules, architecture guidelines, and context-specific skills for AI agents.

## Core Directives

1. **English-Only Rule**: All code, technical documentation, commits, and PRs MUST be in English.
2. **Skill First**: Before starting any task, check the Auto-invoke table below. If a task matches a skill, you MUST load and follow it.
3. **No Assumptions**: Do not assume the existence of a package or tool. Check `package.json` or `pnpm-workspace.yaml` first.

## Quick Reference

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15 | App Router, Server Actions, SSR |
| **React** | 19 | UI layer (React Compiler — no useMemo/useCallback) |
| **Tailwind CSS** | 4 | Styling (cn() utility, theme variables) |
| **Zustand** | 5 | Client state management (useShallow, persist) |
| **Zod** | 3.24+ | Runtime schema validation |
| **Drizzle ORM** | 0.38+ | Type-safe database schema |
| **Supabase** | 2.49+ | Auth, DB, Storage (abstract provider) |
| **Biome** | 2.4+ | Linting and formatting (single tool) |
| **Turborepo** | 2.3+ | Monorepo build orchestration |
| **TypeScript** | 5.7+ | Strict mode everywhere |

### Build, Lint & Test Commands

```bash
pnpm install              # Install all workspace dependencies
pnpm dev                  # Start all dev servers (Turborepo)
pnpm build                # Production build (all packages)
pnpm lint                 # Biome check (all files)
pnpm lint:fix             # Biome auto-fix
pnpm format               # Biome format
pnpm typecheck            # TypeScript check (all packages)
pnpm test                 # Run all tests
pnpm clean                # Clean build artifacts
pnpm db:generate          # Generate Drizzle migrations
```

### Package Overview

| Package | Name | Purpose |
|---------|------|---------|
| `ui/` | `@template/web` | Next.js 15 App Router — user-facing application |
| `packages/contracts/` | `@template/contracts` | Zod schemas — shared data contracts (DTOs) |
| `packages/core/` | `@template/core` | Business logic, auth provider, Supabase client, stores |
| `packages/db/` | `@template/db` | Drizzle ORM schema and migration generation |
| `packages/ui/` | `@template/ui` | Shared UI components (shadcn/ui + Radix + CVA) |

---

## Skill Naming Policy (Mandatory)

Use these categories to avoid naming conflicts and keep portability clear:

- **Generic skill** (library/technical practice): use neutral names like `react-19`, `typescript`, `tailwind-4`.
- **`template-*`**: Project-specific skills tied to this template (auth rules, domain constraints).

When creating a new skill:

1. Pick prefix by intent (`template-*` for project-specific, generic otherwise).
2. Register the skill in this file and run `bash skills/skill-sync/assets/sync.sh`.

---

## Architecture & Folder Structure

This is a Turborepo monorepo. Follow this decision tree for file placement:

```
New code to write?
├── Is it a user-facing web page/route?
│   └── ui/app/
├── Is it a React component specific to a feature?
│   └── ui/components/{feature}/
├── Is it a shared UI primitive (Button, Input, Dialog)?
│   └── packages/ui/src/components/
├── Is it a Zod schema or shared DTO?
│   └── packages/contracts/src/
├── Is it business logic, auth, or a Zustand store?
│   └── packages/core/src/
├── Is it a database schema or migration?
│   └── packages/db/src/
└── Is it a Server Action?
    └── ui/app/ (co-located with route) or ui/actions/
```

---

## QA Checklist (Before Commits)

Before executing a `git commit`, you MUST verify:
- [ ] Code compiles without TypeScript errors (`pnpm typecheck`).
- [ ] Linter passes (`pnpm lint`).
- [ ] No secrets or API keys are hardcoded.
- [ ] Commit message follows Conventional Commits (e.g., `feat(ui): add dashboard layout`).
- [ ] English is used for the commit message and code.
- [ ] NEVER add "Co-Authored-By" or any AI attribution to commits.

## Commit Conventions

- Use Conventional Commits in English: `<type>(<scope>): <description>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- Scopes: `ui`, `core`, `contracts`, `db`, `ui-lib`, `docs`, `config`
- Examples:
  - `feat(ui): add chat streaming component`
  - `fix(core): prevent stale auth state`
  - `docs: add lighthouse architecture document`

---

## Agent Skills Reference

> **Skills Reference**: For detailed patterns, use these skills:
> - [`react-19`](skills/react-19/SKILL.md) - React 19 patterns, React Compiler
> - [`nextjs-15`](skills/nextjs-15/SKILL.md) - App Router, Server Actions
> - [`tailwind-4`](skills/tailwind-4/SKILL.md) - cn() utility, Tailwind 4
> - [`zod-4`](skills/zod-4/SKILL.md) - Zod schema validation
> - [`zustand-5`](skills/zustand-5/SKILL.md) - State management
> - [`typescript`](skills/typescript/SKILL.md) - Strict TypeScript patterns
> - [`playwright`](skills/playwright/SKILL.md) - E2E testing

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding contract test fixtures | `contract-testing` |
| Adding new API request/response schemas | `shared-contracts` |
| Adding new contracts or fields | `contract-versioning` |
| Adding streaming endpoints or SSE | `template-bff` |
| After creating/modifying a skill | `skill-sync` |
| App Router / Server Actions | `nextjs-15` |
| Auditing open pull requests or issues for attention | `pr-review` |
| Building AI chat features | `ai-sdk-5` |
| Changing contract field names or types | `contract-versioning` |
| Changing field names, types, or required status in contracts | `shared-contracts` |
| Contract compliance, import validation, DTO enforcement | `contract-enforcement` |
| Contract parity tests, schema validation tests | `contract-testing` |
| Contract versioning, SemVer, breaking changes | `contract-versioning` |
| Creating API endpoints | `jsonapi` |
| Creating Zod schemas | `zod-4` |
| Creating a GitHub issue, reporting a bug, or requesting a feature | `issue-creation` |
| Creating a pull request or preparing changes for review | `branch-pr` |
| Creating new contracts | `contract-testing` |
| Creating new skills | `skill-creator` |
| Creating/modifying Server Actions or Route Handlers | `template-bff` |
| Creating/modifying shared data contracts | `shared-contracts` |
| Creating/modifying template UI components | `template-ui` |
| Deprecating or removing contract fields | `contract-versioning` |
| Designing visually distinctive UI or landing pages | `frontend-design` |
| Detecting inline DTO or schema definitions | `contract-enforcement` |
| Documentation writing, MDX docs, developer guides | `documentation` |
| Evaluating contract compatibility | `contract-versioning` |
| Filing or triaging GitHub issues | `issue-creation` |
| General project questions, architecture overview | `template-overview` |
| Implementing dashboard, chat, profile, portfolio, or auth UI | `template-ui` |
| Implementing data fetching or mutation logic | `template-bff` |
| Modifying API responses | `jsonapi` |
| Modifying existing contract fields | `contract-testing` |
| Opening a PR or submitting branch for merge | `branch-pr` |
| Regenerate AGENTS.md Auto-invoke tables (sync.sh) | `skill-sync` |
| Reviewing GitHub PRs or analyzing PR/issue backlog | `pr-review` |
| Reviewing JSON:API compliance | `jsonapi` |
| Reviewing code for contract compliance | `contract-enforcement` |
| Server Actions, API routes, Route Handlers, data fetching, mutations, BFF | `template-bff` |
| Shared data contracts, Zod schemas, DTOs | `shared-contracts` |
| Styling/beautifying web interfaces with creative direction | `frontend-design` |
| Suspecting contract drift or breaking changes | `contract-testing` |
| Troubleshoot why a skill is missing from AGENTS.md auto-invoke | `skill-sync` |
| UI components, page components, styling, frontend patterns | `template-ui` |
| Using Zustand stores | `zustand-5` |
| Validating Server Action request/response models | `contract-enforcement` |
| Working on frontend UI structure (components/hooks/stores) | `template-ui` |
| Working with Tailwind classes | `tailwind-4` |
| Writing Playwright E2E tests | `playwright` |
| Writing React components | `react-19` |
| Writing TypeScript types/interfaces | `typescript` |

---

## Architecture Documentation

For the full architecture reference, see:
- [`docs/developer-guide/lighthouse-architecture.mdx`](docs/developer-guide/lighthouse-architecture.mdx) — Lighthouse Architecture Document
- [`docs/developer-guide/index.mdx`](docs/developer-guide/index.mdx) — Developer Guide entry point

---

*This is the Root Agent. Start here for all development requests.*
