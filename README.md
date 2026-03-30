# 🚀 startup-saas-template

**A production-ready monorepo template for building modern SaaS applications.** Built with Next.js 15, React 19, TypeScript 5.7, Tailwind CSS 4, and Turborepo — designed for speed, scalability, and AI-first development.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.3-EF4444?logo=turborepo&logoColor=white)](https://turbo.build/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

- **🏗️ Monorepo Architecture** — Turborepo + pnpm workspaces with 4 shared packages and optimized build caching
- **🔐 Pluggable Authentication** — Abstract AuthProvider powered by Supabase (easily swappable to Clerk, Kinde, or custom)
- **💬 AI Chat Streaming** — Real-time AI chat with Vercel AI SDK and OpenAI integration via SSE streaming
- **📊 Analytics Dashboard** — KPI metric cards, activity feeds, and charts with glassmorphism design
- **📚 Portfolio Management** — Project catalog with filters, search, and grid layout
- **👤 User Profile** — Settings, security, and preferences management
- **🌙 Dark-First Design** — Glassmorphism aesthetic inspired by Linear and Vercel
- **🤖 AI Agent System** — 28+ curated skills for AI-assisted development with auto-invoke triggers
- **📝 Developer Documentation** — MDX-based architecture guides and developer references
- **🗄️ Database Ready** — Drizzle ORM schema with PostgreSQL via Supabase
- **📦 Shared Contracts** — Zod schemas as the single source of truth for DTOs across the entire stack
- **🎨 Component Library** — shadcn/ui + Radix primitives with CVA for variant management

---

## 📦 Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | ^15.1.6 | App Router, Server Actions, SSR |
| **UI Library** | React | ^19.0.0 | UI layer (React Compiler — no useMemo/useCallback) |
| **Language** | TypeScript | ^5.7.3 | Strict mode everywhere |
| **Styling** | Tailwind CSS | ^4.0.6 | Utility-first CSS with theme variables |
| **Components** | shadcn/ui | latest | Copy-paste component system (Radix + CVA) |
| **State** | Zustand | ^5.0.3 | Client state management |
| **Validation** | Zod | ^3.24.1 | Runtime schema validation |
| **Database** | Drizzle ORM | ^0.38.4 | Type-safe PostgreSQL schema |
| **Backend** | Supabase JS | ^2.49.1 | Auth, Database, Storage |
| **SSR Auth** | Supabase SSR | ^0.5.2 | Server-side auth helpers |
| **AI SDK** | Vercel AI SDK | ^4.1.54 | AI chat streaming |
| **AI Provider** | @ai-sdk/openai | ^1.2.0 | OpenAI integration |
| **Animation** | Framer Motion | ^12.4.7 | UI animations and transitions |
| **Charts** | Recharts | ^2.15.1 | Data visualization |
| **Icons** | Lucide React | ^0.475.0 | Icon system |
| **Themes** | next-themes | ^0.4.4 | Dark/light mode switching |
| **Markdown** | react-markdown | ^9.0.3 | Markdown rendering in chat |
| **Variants** | class-variance-authority | ^0.7.1 | Component variant management |
| **Class Merge** | clsx + tailwind-merge | ^2.1.1 / ^3.0.1 | Conditional class utilities |
| **Monorepo** | Turborepo | ^2.3.3 | Build orchestration with caching |
| **Linting** | Biome | ^2.0.0-beta.1 | Single tool for linting + formatting |
| **Package Manager** | pnpm | 9.15.4 | Fast, disk-efficient package management |

---

## 🏛️ Architecture

startup-saas-template follows a **contract-first monorepo** architecture. Zod schemas in `@template/contracts` serve as the single source of truth for data shapes across all packages.

```
┌─────────────────────────────────────────────────────────┐
│                    @template/web (ui/)                   │
│              Next.js 15 · App Router · SSR               │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │(marketing)│  │  (auth)  │  │  (app)   │              │
│  │  Landing  │  │  Login   │  │Dashboard │              │
│  │  page     │  │  page    │  │Chat, etc.│              │
│  └──────────┘  └──────────┘  └──────────┘              │
│         │              │             │                   │
├─────────┼──────────────┼─────────────┼───────────────────┤
│         ▼              ▼             ▼                   │
│  ┌─────────────────────────────────────────────────┐    │
│  │            @template/contracts                    │    │
│  │         Zod Schemas · Shared DTOs                │    │
│  └─────────────────────────────────────────────────┘    │
│         │              │             │                   │
│         ▼              ▼             ▼                   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │@template/  │ │@template/  │ │@template/  │          │
│  │  core      │ │  db        │ │  ui        │          │
│  │Auth, Stores│ │Drizzle ORM │ │shadcn/ui   │          │
│  └────────────┘ └────────────┘ └────────────┘          │
└─────────────────────────────────────────────────────────┘
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

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** 9.15.4 (`corepack enable && corepack prepare pnpm@9.15.4 --activate`)
- **Supabase** account (for auth and database)

### Installation

```bash
# Clone the repository
git clone <repo-url> my-saas-app
cd my-saas-app

# Install all workspace dependencies
pnpm install
```

### Environment Setup

Create a `.env.local` file in the `ui/` directory:

```bash
# ui/.env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

> **Note:** Never commit `.env.local` to version control. The `.gitignore` already excludes it.

### Running Locally

```bash
# Start all dev servers (Turborepo)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Database Setup

```bash
# Generate Drizzle migrations
pnpm db:generate

# Apply migrations via Supabase CLI
supabase db push
```

---

## 📁 Project Structure

```
startup-saas-template/
│
├── ui/                              # @template/web — Next.js 15 Application
│   ├── app/
│   │   ├── (marketing)/             # Public marketing pages (landing)
│   │   ├── (auth)/                  # Authentication pages (login)
│   │   ├── (app)/                   # Protected app pages (dashboard, chat, etc.)
│   │   ├── api/
│   │   │   └── chat/                # AI Chat streaming API route
│   │   ├── layout.tsx               # Root layout
│   │   └── middleware.ts            # Auth route protection
│   ├── components/
│   │   ├── auth/                    # Login form components
│   │   ├── chat/                    # Chat input, messages, panel
│   │   ├── dashboard/               # Metric cards, grid, activity feed
│   │   ├── layout/                  # App shell, sidebar, topbar, notifications
│   │   ├── marketing/               # Hero, features, CTA, footer, navbar
│   │   ├── portfolio/               # Filters, grid, project cards
│   │   ├── profile/                 # Form, header
│   │   └── notifications/           # Notification list
│   └── actions/                     # Server Actions
│
├── packages/
│   ├── contracts/                   # @template/contracts — Shared Zod schemas
│   │   └── src/
│   │       ├── auth/                # Auth DTOs (login, session, user)
│   │       ├── chat/                # Chat DTOs (messages, sessions)
│   │       ├── portfolio/           # Portfolio DTOs (projects, filters)
│   │       └── user/                # User DTOs (profile, settings)
│   │
│   ├── core/                        # @template/core — Business logic
│   │   └── src/
│   │       ├── auth/                # AuthProvider (React context)
│   │       ├── supabase/            # Supabase client (browser + server)
│   │       └── stores/              # Zustand stores (auth, chat)
│   │
│   ├── db/                          # @template/db — Database layer
│   │   └── src/
│   │       └── schema/              # Drizzle schemas (users, chat, projects)
│   │
│   └── ui/                          # @template/ui — Component library
│       └── src/
│           ├── components/          # shadcn/ui components (20+ primitives)
│           ├── lib/                  # cn() utility
│           └── globals.css          # Theme tokens (CSS custom properties)
│
├── docs/                            # Developer documentation (MDX)
│   └── developer-guide/
│       ├── index.mdx                # Developer guide entry point
│       ├── lighthouse-architecture.mdx  # Full architecture document
│       └── testing-strategy.mdx     # Testing strategy
│
├── skills/                          # AI Agent skills (28+)
├── .agents/                         # Agent skill configurations
├── AGENTS.md                        # Root agent rules and skills index
├── turbo.json                       # Turborepo pipeline configuration
├── biome.json                       # Biome linter + formatter config
├── pnpm-workspace.yaml              # Workspace package definitions
└── tsconfig.json                    # Root TypeScript configuration
```

---

## 🖥️ UI Application

The `ui/` package is a Next.js 15 application using the App Router with three route groups for layout isolation:

### Route Groups

| Route Group | Purpose | Layout | Auth Required |
|-------------|---------|--------|---------------|
| `(marketing)` | Public landing page, features, pricing | Marketing layout with navbar and footer | No |
| `(auth)` | Login and authentication flows | Minimal centered layout | No |
| `(app)` | Dashboard, chat, portfolio, profile | App shell with sidebar and topbar | Yes |

### Middleware

Route protection is handled via Next.js middleware. Unauthenticated users accessing `(app)` routes are redirected to the login page. The middleware integrates with Supabase SSR for server-side session validation.

### AI Chat

The `/api/chat` route implements Server-Sent Events (SSE) streaming using the Vercel AI SDK with OpenAI as the provider. The chat UI supports:

- Real-time token streaming
- Markdown rendering in messages
- Chat session management
- Persistent message history

### Component Architecture

Components are organized by feature domain following a co-location pattern:

```
components/
├── auth/          → Login form, auth guards
├── chat/          → ChatInput, ChatMessages, ChatPanel
├── dashboard/     → MetricCard, DashboardGrid, ActivityFeed
├── layout/        → AppShell, Sidebar, Topbar, SessionList
├── marketing/     → Hero, FeatureSection, CTA, Footer
├── portfolio/     → PortfolioGrid, ProjectCard, Filters
├── profile/       → ProfileForm, ProfileHeader
└── notifications/ → NotificationList
```

---

## 📦 Packages

### @template/contracts

The **contracts** package is the single source of truth for all data shapes in the monorepo. Every request/response DTO is defined as a Zod schema here and imported by other packages.

```typescript
// packages/contracts/src/auth/index.ts
import { z } from "zod";

export const loginRequestSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
```

**Domains covered:** auth, chat, portfolio, user

### @template/core

The **core** package contains business logic, authentication, and state management — decoupled from the UI framework.

- **AuthProvider** — React context wrapping Supabase Auth with session management
- **Supabase Client** — Separate browser and server clients for optimal SSR
- **Zustand Stores** — `auth-store` (session state) and `chat-store` (messages, sessions)

### @template/db

The **db** package defines the database schema using Drizzle ORM targeting PostgreSQL via Supabase.

**Tables:**
- `users` — User profiles and settings
- `chat_sessions` — Chat conversation containers
- `chat_messages` — Individual chat messages
- `projects` — Portfolio project entries

```bash
# Generate migrations after schema changes
pnpm db:generate
```

### @template/ui

The **ui** package provides the shared component library built on shadcn/ui, Radix primitives, and class-variance-authority.

**Available components:**

| Component | Component | Component | Component |
|-----------|-----------|-----------|-----------|
| Avatar | Badge | Button | Card |
| Dialog | Dropdown Menu | Input | Label |
| Scroll Area | Select | Separator | Sheet |
| Sidebar | Skeleton | Switch | Tabs |
| Textarea | Toast / Toaster | Tooltip | — |

**Utilities:**
- `cn()` — Combines `clsx` and `tailwind-merge` for conflict-free class composition
- Theme tokens via CSS custom properties in `globals.css`

---

## 🤖 AI Agent System

startup-saas-template includes a comprehensive AI agent skill system with **28+ skills** designed to ensure consistent, high-quality development when working with AI assistants.

### How It Works

1. The `AGENTS.md` file at the project root defines core rules, architecture guidelines, and an **auto-invoke table** mapping 40+ development actions to specific skills.
2. Each skill lives in the `skills/` or `.agents/skills/` directory and contains:
   - `SKILL.md` — Detailed instructions, patterns, and rules
   - `metadata.yaml` — Auto-invoke triggers and scope definitions
   - `assets/` — Optional scripts, templates, and reference files
3. AI agents load the relevant skill **before** writing any code, ensuring adherence to project conventions.

### Skill Categories

| Category | Skills | Purpose |
|----------|--------|---------|
| **Framework** | `react-19`, `nextjs-15`, `tailwind-4`, `typescript`, `zod-4`, `zustand-5` | Library-specific patterns and best practices |
| **AI** | `ai-sdk-5` | Vercel AI SDK integration patterns |
| **Testing** | `playwright` | End-to-end testing with Page Objects |
| **Template** | `template-overview`, `template-ui`, `template-bff` | Project-specific conventions and patterns |
| **Contracts** | `shared-contracts`, `contract-enforcement`, `contract-testing`, `contract-versioning` | Data contract management and compliance |
| **Documentation** | `documentation` | Writing standards and style guide |
| **Design** | `frontend-design`, `shadcn` | UI design quality and component management |
| **API** | `jsonapi` | JSON:API specification compliance |
| **Infrastructure** | `skill-creator`, `skill-sync` | Skill authoring and registry management |
| **GitHub** | `branch-pr`, `issue-creation`, `pr-review` | Git workflow automation |

### Auto-invoke Example

When an AI agent detects it needs to create a Server Action, it automatically loads `template-bff` before writing code. When modifying a Zod schema, it loads `shared-contracts` and `contract-versioning`. This ensures every code change follows project standards.

---

## ⚙️ Available Scripts

All scripts are run from the project root using pnpm:

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all workspace dependencies |
| `pnpm dev` | Start all dev servers via Turborepo |
| `pnpm build` | Production build for all packages |
| `pnpm lint` | Run Biome linter on all files |
| `pnpm lint:fix` | Auto-fix linting issues with Biome |
| `pnpm format` | Format all files with Biome |
| `pnpm typecheck` | TypeScript type checking across all packages |
| `pnpm test` | Run all tests |
| `pnpm clean` | Clean build artifacts and caches |
| `pnpm db:generate` | Generate Drizzle ORM migrations |

### Code Style

This project uses **Biome** as the single tool for both linting and formatting (replaces ESLint + Prettier):

- **Indentation:** Tabs
- **Quotes:** Single quotes
- **Semicolons:** Always
- **Strict TypeScript:** Enabled across all packages

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-side only) |

> **Security:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. The `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed to the client.

---

## 🧭 Architecture Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | **Turborepo Monorepo** | Build orchestration with intelligent caching, parallel execution, and shared configurations |
| 2 | **Contract-First Design** | Zod schemas in `@template/contracts` as the single source of truth prevents schema drift across packages |
| 3 | **Provider Abstraction** | Auth and DB access via Supabase but abstracted behind interfaces for future provider swaps |
| 4 | **shadcn/ui Components** | Copy-paste component system — own the code, customize freely, no version lock-in |
| 5 | **Dark Theme by Default** | Growth AI brand identity with glassmorphism aesthetic (Linear/Vercel inspired) |
| 6 | **AI-First Architecture** | Vercel AI SDK for streaming chat, plus 28+ agent skills for AI-assisted development |
| 7 | **Biome over ESLint+Prettier** | Single tool for linting and formatting — faster, simpler configuration, no plugin conflicts |
| 8 | **Route Groups** | `(marketing)`, `(auth)`, `(app)` for layout isolation without affecting URL structure |
| 9 | **Zustand for Client State** | Lightweight, TypeScript-native state management with minimal boilerplate |
| 10 | **Drizzle ORM** | Type-safe SQL with zero abstraction cost — migrations generated from TypeScript schema |

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [`docs/developer-guide/index.mdx`](docs/developer-guide/index.mdx) | Developer Guide entry point |
| [`docs/developer-guide/lighthouse-architecture.mdx`](docs/developer-guide/lighthouse-architecture.mdx) | Full system architecture document |
| [`docs/developer-guide/testing-strategy.mdx`](docs/developer-guide/testing-strategy.mdx) | Testing strategy and patterns |
| [`AGENTS.md`](AGENTS.md) | AI agent rules, skills index, and auto-invoke table |

---

## 🔌 Extending

### Connect Supabase

1. Create a [Supabase](https://supabase.com) project
2. Copy the project URL and keys to `ui/.env.local`
3. Run `pnpm db:generate` to generate migrations
4. Apply migrations with `supabase db push`

### Swap Auth Provider

1. Install the new auth provider package
2. Create a class implementing `AuthProvider` from `@template/core`
3. Register the new provider in the app layout

### Add AI Provider

1. Update `ui/app/api/chat/route.ts` with your AI provider configuration
2. The SSE streaming format from Vercel AI SDK is compatible with OpenAI, Anthropic, Google, and more

---

## 📄 License

[MIT](LICENSE) — Use it freely for personal and commercial projects.

---

<p align="center">
  Built with 🖤 using Next.js 15, React 19, and TypeScript
</p>
