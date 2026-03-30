# UI Architecture Reference

## Overview

The `ui/` application is a Next.js 15 App Router application that serves as the user-facing frontend for the startup-saas-template.

## Layer Architecture

```
┌─────────────────────────────────────────────┐
│                  Browser                     │
├─────────────────────────────────────────────┤
│        Next.js 15 App Router (ui/)          │
│  ┌──────────────┐  ┌────────────────────┐   │
│  │ Server        │  │ Client Components  │   │
│  │ Components    │  │ ("use client")     │   │
│  │ (RSC)        │  │  + Zustand stores   │   │
│  └──────┬───────┘  └────────┬───────────┘   │
│         │                    │               │
│  ┌──────┴────────────────────┴───────────┐   │
│  │       Server Actions / Route Handlers │   │
│  └──────────────────┬───────────────────┘   │
├─────────────────────┼───────────────────────┤
│          @template/contracts (Zod)          │
│          @template/core (Business Logic)    │
│          @template/db (Drizzle ORM)         │
│          @template/ui (Shared Components)   │
├─────────────────────┼───────────────────────┤
│              Supabase (Auth + DB)           │
└─────────────────────────────────────────────┘
```

## Route Groups

| Group | Path | Purpose | Auth |
|-------|------|---------|------|
| `(auth)` | `/login` | Authentication pages | Public |
| `(app)` | `/dashboard`, `/chat`, `/portfolio`, `/profile` | Main application | Protected |

## Component Organization

Components are organized by **feature domain**, not by technical type:

```
components/
├── auth/         # Login, signup, auth guard components
├── chat/         # Chat interface, messages, composer
├── dashboard/    # Dashboard widgets, metrics, charts
├── layout/       # Sidebar, header, navigation
├── portfolio/    # Portfolio display, project cards
└── profile/      # Profile form, settings
```

## State Management

- **Server state**: Fetched via Server Actions, cached by Next.js
- **Client state**: Zustand stores in `stores/` directory
- **Form state**: React Hook Form (when needed)
- **URL state**: Next.js searchParams

## Key Decisions

- **No `actions/` directory at root** — Server Actions are co-located with routes or in `ui/app/`
- **shadcn/ui in packages/ui/** — Shared components live in the UI package, not in `ui/components/`
- **Middleware for auth** — `ui/middleware.ts` handles authentication redirects
