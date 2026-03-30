# 🚀 Startup SaaS Template

A production-ready monorepo template for modern SaaS applications. Built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and Turborepo.

## ✨ Features

- **🏗️ Monorepo Architecture** — Turborepo + pnpm workspaces with 4 shared packages
- **🔐 Pluggable Auth** — Abstract AuthProvider (mock included, plug in Clerk/Kinde/Supabase)
- **💬 AI Chat** — SSE streaming chat with mock AI responses (ready for real AI backend)
- **📊 Dashboard** — KPI cards, charts, and analytics with glassmorphism design
- **📚 Course Portfolio** — Course catalog with filters, search, and progress tracking
- **👤 User Profile** — Settings, security, and preferences
- **🌙 Dark Mode** — Dark-first design with glassmorphism (Linear/Vercel aesthetic)
- **🤖 AI Agent Skills** — 23 curated skills for AI-assisted development
- **📝 Developer Docs** — MDX documentation with architecture guides
- **🗄️ Supabase Ready** — Drizzle schema + Supabase client encapsulation (just add credentials)

## 🏛️ Architecture

```
startup-saas-template/
├── ui/                    # Next.js 15 App (5 pages)
├── packages/
│   ├── contracts/         # Zod schemas (shared DTOs)
│   ├── core/              # Auth, Supabase clients, stores
│   ├── db/                # Drizzle schema (PostgreSQL)
│   └── ui/                # shadcn/ui components
├── skills/                # AI agent skills (23)
├── docs/                  # Developer documentation
├── turbo.json             # Turborepo config
└── biome.json             # Linter + formatter
```

## 🚀 Quick Start

```bash
# Clone
git clone <repo-url> my-saas-app
cd my-saas-app

# Install
pnpm install

# Setup AI skills (optional)
cd skills && bash setup.sh --all && cd ..

# Run dev server
pnpm dev
```

Open http://localhost:3000 and login with:
- **Email:** demo@startup.com
- **Password:** demo123

## 📦 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 15.1+ |
| UI | React | 19 |
| Language | TypeScript | 5.7+ |
| Styling | Tailwind CSS | 4.0 |
| Components | shadcn/ui | latest |
| State | Zustand | 5.0 |
| Validation | Zod | 3.24+ |
| Database | Drizzle ORM | 0.38+ |
| Backend | Supabase | 2.49+ |
| Monorepo | Turborepo | 2.3+ |
| Linting | Biome | 2.x |
| Testing | Playwright + Vitest | latest |

## 🔌 Extending

### Add Supabase

1. Create a Supabase project
2. Copy credentials to `.env.local`
3. Run `pnpm --filter @template/db db:generate` for migrations
4. Apply migrations with Supabase CLI

### Add Clerk/Kinde Auth

1. Install the auth provider package
2. Create a class implementing `AuthProvider` from `@template/core`
3. Call `registerAuthProvider(new YourAuthProvider())` in the app layout

### Connect Real AI Backend

1. Update `ui/app/api/chat/route.ts` to proxy to your AI service
2. The SSE streaming format is already compatible with most AI backends

## 🤖 AI Skills

23 curated skills for AI-assisted development:

- **Framework:** typescript, react-19, nextjs-15, tailwind-4, zod-4, zustand-5, ai-sdk-5
- **Testing:** playwright
- **GitHub:** branch-pr, issue-creation, pr-review
- **Template:** template-overview, template-ui, template-bff, shared-contracts, contract-enforcement, contract-testing, contract-versioning, documentation
- **Meta:** skill-creator, skill-sync, frontend-design, jsonapi

## 📄 License

MIT
