---
name: template-ui
description: >
  startup-saas-template UI-specific patterns. For generic patterns, see: typescript, react-19, nextjs-15, tailwind-4.
  Trigger: When working inside ui/ on template-specific conventions (shadcn, folder placement, actions, shared types/hooks/stores).
license: Apache-2.0
metadata:
  author: anyoneAI
  version: "1.0.0"
  scope: [root, ui]
  auto_invoke:
    - "UI components, page components, styling, frontend patterns"
    - "Creating/modifying template UI components"
    - "Working on frontend UI structure (components/hooks/stores)"
    - "Implementing dashboard, chat, profile, portfolio, or auth UI"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

> **shadcn/ui**: For CLI commands, component installation, theming, composition patterns, and registry access, see the `shadcn` skill. This skill (`template-ui`) focuses on WHERE to place components in our monorepo.

## Related Generic Skills

- `typescript` - Const types, flat interfaces
- `react-19` - No useMemo/useCallback, React Compiler
- `nextjs-15` - App Router, Server Actions
- `tailwind-4` - cn() utility, styling rules
- `zod-4` - Schema validation
- `zustand-5` - State management
- `ai-sdk-5` - Chat/AI streaming features
- `playwright` - E2E testing

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15 | App Router, Server Actions, SSR |
| React | 19 | UI (React Compiler — no useMemo/useCallback) |
| TypeScript | 5.7+ strict | Type safety |
| Tailwind CSS | 4 | Styling (cn() utility, theme variables) |
| shadcn/ui | latest | Component library (packages/ui/) |
| Zustand | 5 | Client state management |
| Zod | 3.24+ | Validation |
| Biome | 2.4+ | Lint + format |
| Playwright | latest | E2E testing |

---

## CRITICAL: Component Library Rule

- **ALWAYS**: Use `shadcn/ui` components from `@template/ui` + Tailwind
- **NEVER**: Add external UI libraries without approval

---

## UI Capabilities

| Capability | Location | Purpose |
|------------|----------|---------|
| **Dashboard** | `components/dashboard/` | Main dashboard, metrics, overview |
| **Chat** | `components/chat/` | Chat interface, message thread, composer |
| **Profile** | `components/profile/` | User profile management |
| **Portfolio** | `components/portfolio/` | Portfolio display, projects |
| **Authentication** | `components/auth/` | Login, signup, auth guards |
| **Layout** | `components/layout/` | Sidebar, header, navigation |

---

## Project Structure

```
ui/
├── app/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing → redirect
│   ├── error.tsx                 # Global error boundary
│   ├── not-found.tsx             # 404 page
│   ├── globals.css               # Global styles
│   ├── (auth)/                   # Public auth routes group
│   │   ├── layout.tsx            # Auth layout
│   │   └── login/                # Login page
│   ├── (app)/                    # Protected routes group
│   │   ├── layout.tsx            # App layout (sidebar + header)
│   │   ├── loading.tsx           # Loading state
│   │   ├── dashboard/            # Dashboard page
│   │   ├── chat/                 # Chat page
│   │   ├── portfolio/            # Portfolio page
│   │   └── profile/              # Profile page
│   └── api/                      # Route Handlers
├── components/
│   ├── auth/                     # Auth components
│   ├── chat/                     # Chat components
│   ├── dashboard/                # Dashboard components
│   ├── layout/                   # Layout components (sidebar, header)
│   ├── portfolio/                # Portfolio components
│   └── profile/                  # Profile components
├── hooks/                        # Shared React hooks
│   └── use-chat-stream.ts        # Chat streaming hook
├── stores/                       # Zustand state stores
│   └── chat-store.ts             # Chat state management
├── middleware.ts                  # Next.js middleware (auth guards)
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

---

## Routing

| Route | Group | Type | Purpose |
|-------|-------|------|---------|
| `/` | — | Public | Landing → redirect |
| `/login` | `(auth)` | Public | Authentication |
| `/dashboard` | `(app)` | Protected | Main dashboard |
| `/chat` | `(app)` | Protected | Chat interface |
| `/portfolio` | `(app)` | Protected | Portfolio display |
| `/profile` | `(app)` | Protected | User profile/settings |

**Auth Flow:**
- Public routes → under `app/(auth)/`
- Protected routes → under `app/(app)/`
- Unauthenticated users → redirect to `/login` via middleware

---

## Page Layout Convention (MANDATORY)

Every `(app)` page MUST follow one of two layout modes:

ALL `(app)` pages MUST use `<PageContainer>` from `@/components/layout`.

```tsx
// Content page (default) — dashboard, portfolio, profile
import { PageContainer } from "@/components/layout";
import { DashboardContent } from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <PageContainer>
      <DashboardContent />
    </PageContainer>
  );
}

// Full-height page — chat, canvas, editor
import { PageContainer } from "@/components/layout";
import { ChatShell } from "@/components/chat/chat-shell";

export default function ChatPage() {
  return (
    <PageContainer fullHeight>
      <ChatShell />
    </PageContainer>
  );
}
```

| Prop | Effect |
|------|--------|
| (default) | `mx-auto max-w-7xl gap-6 p-4 md:p-6` |
| `fullHeight` | `h-full p-4 md:p-6` (no max-width, fills available space) |

**Rules**:
- `<main>` in AppShell has NO padding — `PageContainer` handles it.
- Content components MUST NOT add their own `mx-auto`/`max-w`/padding wrappers.
- NEVER create a page without `<PageContainer>`.

---

## DECISION TREES

### Component Placement

```
New UI component? → shadcn/ui from @template/ui + Tailwind
Used 1 feature?   → feature-local (e.g., components/chat/)
Used 2+ features? → components/{domain}/ or @template/ui
Needs state?      → "use client"
Server component? → No directive needed
```

### Code Location

```
Server action     → ui/app/{route}/actions.ts (co-located) or ui/actions/
Route handler     → ui/app/api/{route}/route.ts
Types (shared)    → packages/contracts/src/
Types (local)     → {feature}/types.ts
Utils (shared)    → packages/core/src/
Hooks (shared)    → hooks/
Hooks (local)     → {feature}/hooks.ts
Components (UI)   → packages/ui/src/components/
Components (feat) → components/{domain}/
Stores (Zustand)  → stores/
```

### Styling Decision

```
Tailwind class exists? → className
Dynamic value?         → style prop
Conditional styles?    → cn()
Static only?           → className (no cn())
```

### Scope Rule (ABSOLUTE)

- **Used 2+ places** → `packages/ui/`, `hooks/`, `packages/core/`
- **Used 1 place** → keep local in feature directory
- **This determines ALL folder structure decisions**

---

## Commands

```bash
# Development
pnpm dev                  # Start all dev servers

# Code Quality (from root)
pnpm typecheck            # TypeScript check
pnpm lint:fix             # Biome auto-fix
pnpm format               # Biome format

# Testing
pnpm test                 # Run all tests
```

---

## QA Checklist

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] All UI states handled (loading, error, empty)
- [ ] No secrets in code
- [ ] Accessibility: keyboard nav, ARIA labels
- [ ] Streaming UX: disable input while loading
- [ ] Error recovery: retry buttons, preserved input
- [ ] Contracts used from `@template/contracts` (no inline DTOs)

---

## Resources

- **UI Architecture Reference**: See [references/ui-architecture.md](references/ui-architecture.md)
- **Root Agent**: `AGENTS.md`
- **UI Agent**: `ui/AGENTS.md`
