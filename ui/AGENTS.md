# Frontend (ui/) — AI Agent Ruleset

> **Scope**: `@template/web` — Next.js 15 App Router application

> **Skills Reference**: For detailed patterns, invoke these skills:
> - [`react-19`](../skills/react-19/SKILL.md) - No useMemo/useCallback, React Compiler
> - [`nextjs-15`](../skills/nextjs-15/SKILL.md) - App Router, Server Actions
> - [`tailwind-4`](../skills/tailwind-4/SKILL.md) - cn() utility, no var() in className
> - [`zod-4`](../skills/zod-4/SKILL.md) - Schema validation
> - [`zustand-5`](../skills/zustand-5/SKILL.md) - State management (useShallow)
> - [`ai-sdk-5`](../skills/ai-sdk-5/SKILL.md) - useChat, streaming, SSE
> - [`typescript`](../skills/typescript/SKILL.md) - Const types, flat interfaces
> - [`playwright`](../skills/playwright/SKILL.md) - E2E testing
>
> **Architecture**: See [`lighthouse-architecture.mdx`](../docs/developer-guide/lighthouse-architecture.mdx) for detailed component specs.

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding contract test fixtures | `contract-testing` |
| Adding new API request/response schemas | `shared-contracts` |
| Adding streaming endpoints or SSE | `template-bff` |
| App Router / Server Actions | `nextjs-15` |
| Building AI chat features | `ai-sdk-5` |
| Changing field names, types, or required status in contracts | `shared-contracts` |
| Contract compliance, import validation, DTO enforcement | `contract-enforcement` |
| Contract parity tests, schema validation tests | `contract-testing` |
| Creating Zod schemas | `zod-4` |
| Creating new contracts | `contract-testing` |
| Creating/modifying Server Actions or Route Handlers | `template-bff` |
| Creating/modifying shared data contracts | `shared-contracts` |
| Creating/modifying template UI components | `template-ui` |
| Designing visually distinctive UI or landing pages | `frontend-design` |
| Detecting inline DTO or schema definitions | `contract-enforcement` |
| Implementing dashboard, chat, profile, portfolio, or auth UI | `template-ui` |
| Implementing data fetching or mutation logic | `template-bff` |
| Modifying existing contract fields | `contract-testing` |
| Reviewing code for contract compliance | `contract-enforcement` |
| Server Actions, API routes, Route Handlers, data fetching, mutations, BFF | `template-bff` |
| Shared data contracts, Zod schemas, DTOs | `shared-contracts` |
| Styling/beautifying web interfaces with creative direction | `frontend-design` |
| Suspecting contract drift or breaking changes | `contract-testing` |
| UI components, page components, styling, frontend patterns | `template-ui` |
| Using Zustand stores | `zustand-5` |
| Validating Server Action request/response models | `contract-enforcement` |
| Working on frontend UI structure (components/hooks/stores) | `template-ui` |
| Working with Tailwind classes | `tailwind-4` |
| Writing Playwright E2E tests | `playwright` |
| Writing React components | `react-19` |
| Writing TypeScript types/interfaces | `typescript` |
| Installing shadcn/ui components | `shadcn` |

---

## CRITICAL RULES — NON-NEGOTIABLE

### React 19
- ✅ `import { useState, useEffect } from "react"`
- ❌ NEVER: `import React` or `useMemo`/`useCallback` (React Compiler handles it)

### Styling (Tailwind 4)
- ✅ `className="..."` or `cn()` for conditionals
- ❌ NEVER: `var()` in className, hardcoded hex colors
- ✅ Use Tailwind theme variables and design tokens

### State Management (Zustand 5)
- ✅ Use `useShallow` for multi-property selectors
- ✅ Define stores in `stores/` directory
- ❌ NEVER: Subscribe to entire store without `useShallow`

### Component Library
- ✅ ALWAYS: `@template/ui` components (shadcn/ui + Radix)
- ❌ NEVER: External UI libraries (no MUI, Chakra, Ant Design) without approval

### Imports
- ✅ Use workspace package imports: `@template/contracts`, `@template/core`, `@template/ui`
- ❌ NEVER: Relative imports reaching into `packages/` internals

---

## DECISION TREES

### Component Placement
```
New UI component? → shadcn/ui + Tailwind
Is it a primitive (Button, Input, Dialog)? → packages/ui/src/components/
Is it domain-specific (ChatBubble, PortfolioCard)? → ui/components/{domain}/
  Used in 1 feature? → feature-local
  Used in 2+ features? → ui/components/{domain}/
Needs state? → "use client"
Server component? → No directive needed
```

### Code Location
```
Server action       → ui/app/{route}/actions.ts (co-located)
Types (shared)      → packages/contracts/src/
Types (local)       → {feature}/types.ts
Utils (shared)      → packages/core/src/utils/
Hooks (shared)      → ui/hooks/
Hooks (local)       → {feature}/hooks.ts
Zustand stores      → ui/stores/ (feature-specific) or @template/core/stores/ (shared/infra)
shadcn components   → packages/ui/src/components/
```

### Styling
```
Need conditional classes? → cn() from @template/ui
Need component variants?  → CVA (class-variance-authority)
Need responsive design?   → Tailwind breakpoints (sm:, md:, lg:)
Need dark mode?           → Tailwind dark: variant
Need animation?           → Tailwind transition/animate utilities
```

### State Management
```
Server state (DB data)?      → Server Components + Server Actions
Client form state?           → React useState / useActionState
Cross-component client state? → Zustand store (ui/stores/)
URL state (filters, tabs)?   → searchParams (Next.js)
```

---

## PROJECT STRUCTURE

```
ui/
├── app/
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing / redirect
│   ├── (auth)/               # Public routes
│   │   ├── layout.tsx        # Auth layout (centered card)
│   │   └── login/            # Login page
│   ├── (app)/                # Protected routes (auth required)
│   │   ├── layout.tsx        # App shell (sidebar + header)
│   │   ├── loading.tsx       # Global loading state
│   │   ├── dashboard/        # Dashboard with KPIs
│   │   ├── chat/             # AI chat interface
│   │   ├── portfolio/        # Portfolio management
│   │   └── profile/          # User profile/settings
│   └── api/                  # Route handlers (webhooks, etc.)
├── components/               # Domain-specific components
│   ├── auth/                 # Auth components (login, signup)
│   ├── chat/                 # Chat UI components
│   ├── dashboard/            # Dashboard widgets
│   ├── layout/               # App shell, sidebar, header, navigation
│   ├── notifications/        # Notification components
│   ├── portfolio/            # Portfolio components
│   ├── profile/              # Profile components
│   └── shared/               # Shared cross-feature components
├── hooks/                    # Shared React hooks
├── stores/                   # Zustand stores
└── middleware.ts              # Auth middleware
```

## ROUTING TABLE

| Route | Group | Purpose | Auth |
|-------|-------|---------|------|
| `/` | — | Landing / redirect | No |
| `/login` | `(auth)` | User login | No |
| `/dashboard` | `(app)` | KPI dashboard | Yes |
| `/chat` | `(app)` | AI chat interface | Yes |
| `/portfolio` | `(app)` | Portfolio management | Yes |
| `/profile` | `(app)` | User profile & settings | Yes |

---

## TECH STACK

```
Next.js 15 | React 19 | TypeScript Strict | Tailwind CSS 4
shadcn/ui | Zustand 5 | Zod | AI SDK 5 | Biome
```

---

## COMMANDS

```bash
# Run from project root
pnpm dev                  # Start dev server
pnpm build                # Production build
pnpm lint                 # Biome check
pnpm typecheck            # TypeScript check
```

---

## QA CHECKLIST BEFORE COMMIT

- [ ] TypeScript compilation passes (`pnpm typecheck`).
- [ ] Linter passes (Biome).
- [ ] All UI states handled (loading, error, empty).
- [ ] English is used for all code, variables, and commit messages.
- [ ] No secrets or API keys are hardcoded.
- [ ] Accessibility: keyboard nav, ARIA labels.
- [ ] Optimistic UI: immediate feedback on user actions.

---

*For detailed patterns → invoke skills. For architecture → see `lighthouse-architecture.mdx`.*
