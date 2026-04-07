---
title: "SalaTicket Monorepo Architecture Blueprint"
description: "Target architecture, route topology, and file-by-file scaffolding for building the SalaTicket MVP on top of startup-saas-template."
---

# SalaTicket Monorepo Architecture Blueprint

## Purpose

This document defines the target monorepo architecture for building the SalaTicket MVP on top of startup-saas-template.

It answers three questions:

* What the application looks like at a system level
* How the Next.js application is organized by user experience and route groups
* How the repository should be scaffolded file by file to support the MVP and future scale

## Scope

This document covers:

* The target runtime architecture
* The route group strategy for the Next.js App Router
* The workspace package responsibilities
* The recommended repository scaffolding for `ui/`, `packages/contracts/`, `packages/core/`, `packages/db/`, and `packages/ui/`
* The main business flows: backoffice event management, public checkout, and door check-in

This document does not cover:

* Detailed database DDL or migration SQL
* UI mockups or visual design decisions
* Full API payload definitions for every feature
* Release, deployment, or infrastructure automation

## Architecture

### System Overview

```mermaid
flowchart TB
    U1[Final Customer]
    U2[Corporate Admin or Venue Manager]
    U3[Door Staff]

    subgraph UI["Next.js Application"]
        MKT["(marketing)\nProduct Landing"]
        AUTH["(auth)\nLogin Register Invite"]
        PUB["(public)\nEvent Landing Checkout Ticket"]
        BO["(backoffice)\nDashboard Venues Events Reports Team"]
        CI["/check-in/[eventId]\nMobile-first Check-in"]
        API["/api/*\nWebhooks and Operational Endpoints"]
    end

    subgraph PACKAGES["Workspace Packages"]
        CONTRACTS["Contracts Package\nSchemas and DTOs"]
        CORE["Core Package\nAuth Permissions Payments Email QR CSV"]
        DB["Database Package\nDrizzle Schema"]
        UILIB["UI Package\nShared UI Primitives"]
    end

    subgraph EXTERNAL["External Services"]
        SUPABASE[Supabase\nAuth DB Storage RLS]
        MP[Mercado Pago]
        EMAIL[Resend or SMTP]
    end

    U1 --> PUB
    U2 --> AUTH
    U2 --> BO
    U3 --> CI

    MKT --> UILIB
    AUTH --> UILIB
    PUB --> UILIB
    BO --> UILIB
    CI --> UILIB

    AUTH --> CONTRACTS
    PUB --> CONTRACTS
    BO --> CONTRACTS
    CI --> CONTRACTS
    API --> CONTRACTS

    AUTH --> CORE
    PUB --> CORE
    BO --> CORE
    CI --> CORE
    API --> CORE

    CORE --> DB
    CORE --> SUPABASE
    CORE --> MP
    CORE --> EMAIL
```

### Route Group Topology

Route groups exist to organize the application and share layouts. They do not change the URL and they do not enforce authentication by themselves.

```mermaid
flowchart TD
    APP["ui/app"]

    APP --> ROOT["layout.tsx"]
    APP --> G1["(marketing)"]
    APP --> G2["(auth)"]
    APP --> G3["(public)"]
    APP --> G4["(backoffice)"]
    APP --> G5["check-in"]
    APP --> G6["api"]

    G1 --> HOME["/"]
    G2 --> LOGIN["/login"]
    G2 --> REGISTER["/register"]
    G2 --> INVITE["/invite/[token]"]

    G3 --> EVENT["/evento/[slug]"]
    G3 --> BUY["/evento/[slug]/comprar"]
    G3 --> CONFIRM["/evento/[slug]/confirmacion"]
    G3 --> TICKET["/ticket/[ticketId]"]

    G4 --> DASH["/dashboard"]
    G4 --> VENUES["/venues"]
    G4 --> EVENTS["/events"]
    G4 --> REPORTS["/reports"]
    G4 --> TEAM["/team"]

    G5 --> CHECKIN["/check-in/[eventId]"]
    G6 --> WEBHOOK["/api/webhooks/mercadopago"]
    G6 --> SCAN["/api/check-in/scan"]
```

### Application Zones

```mermaid
flowchart LR
    subgraph MARKETING[Marketing Experience]
        M1[Product Landing]
        M2[Platform Messaging]
    end

    subgraph AUTHX[Authentication Experience]
        A1[Login]
        A2[Register Tenant]
        A3[Accept Invite]
    end

    subgraph PUBLICX[Public Ticketing Experience]
        P1[Event Landing]
        P2[Checkout and Reservation]
        P3[Ticket View]
    end

    subgraph BACKOFFICEX[Backoffice Experience]
        B1[Dashboard]
        B2[Venue Management]
        B3[Event Management]
        B4[Reporting]
        B5[Team Management]
    end

    subgraph OPERATIONS[Operations Experience]
        O1[Check-in Screen]
        O2[QR Scan Result]
        O3[Manual Check-in Fallback]
    end
```

### Domain Model

```mermaid
erDiagram
    TENANT ||--o{ VENUE : has
    TENANT ||--o{ PROFILE : has
    VENUE ||--o{ EVENT : hosts
    EVENT ||--o{ ORDER : receives
    EVENT ||--o{ TICKET : issues
    ORDER ||--o{ TICKET : contains
    EVENT ||--o{ EVENT_STAFF_ASSIGNMENT : has
    PROFILE ||--o{ EVENT_STAFF_ASSIGNMENT : assigned_to

    TENANT {
        uuid id
        string name
        string slug
    }

    PROFILE {
        uuid id
        uuid tenant_id
        uuid venue_id
        string role
        string full_name
        string email
    }

    VENUE {
        uuid id
        uuid tenant_id
        string name
        string city
        int capacity
    }

    EVENT {
        uuid id
        uuid venue_id
        string title
        string slug
        string status
        int capacity
        decimal price
    }

    ORDER {
        uuid id
        uuid event_id
        string buyer_email
        string status
        decimal total
    }

    TICKET {
        uuid id
        uuid event_id
        uuid order_id
        string type
        string status
        boolean checked_in
    }

    EVENT_STAFF_ASSIGNMENT {
        uuid id
        uuid event_id
        uuid profile_id
    }
```

### Runtime Flows

#### Backoffice Event Creation Flow

```mermaid
sequenceDiagram
    participant Admin as Admin or Manager
    participant UI as Backoffice UI
    participant Contracts as Contracts Package
    participant Core as Core Package
    participant Supabase as Supabase

    Admin->>UI: Submit event form
    UI->>Contracts: Validate request schema
    UI->>Core: createEvent()
    Core->>Supabase: Insert event and upload cover image
    Supabase-->>Core: Persisted event
    Core-->>UI: Typed result
    UI-->>Admin: Success and redirect
```

#### Paid Checkout Flow

```mermaid
sequenceDiagram
    participant Buyer as Final Customer
    participant PublicUI as Public Checkout UI
    participant Core as Core Package
    participant MP as Mercado Pago
    participant API as Payment Webhook API
    participant DB as Supabase Postgres
    participant Mail as Email Provider

    Buyer->>PublicUI: Start purchase
    PublicUI->>Core: createCheckout()
    Core->>MP: Create checkout preference
    MP-->>Buyer: External payment flow

    MP->>API: Payment approved webhook
    API->>Core: handlePaymentWebhook()
    Core->>DB: Create order and tickets
    Core->>Mail: Send ticket email with QR
```

#### Door Check-in Flow

```mermaid
sequenceDiagram
    participant Staff as Door Staff
    participant CheckinUI as Check-in UI
    participant API as Scan API
    participant Core as Core Package
    participant DB as Supabase Postgres

    Staff->>CheckinUI: Scan QR code
    CheckinUI->>API: Submit QR payload
    API->>Core: validateAndCheckInTicket()
    Core->>DB: Validate ticket and event context
    DB-->>Core: Valid Used Invalid or Wrong Event
    Core-->>API: Typed scan result
    API-->>CheckinUI: Display operational result
```

## Implementation

### Target Repository Scaffolding

```text
startup-saas-template/
├── docs/
│   ├── developer-guide/
│   └── tickets/
│       └── salaticket-monorepo-architecture.md
├── ui/
│   ├── app/
│   ├── components/
│   ├── modules/
│   ├── hooks/
│   ├── stores/
│   ├── lib/
│   └── types/
└── packages/
    ├── contracts/
    ├── core/
    ├── db/
    └── ui/
```

### File-by-File Blueprint

#### `ui/` — Next.js Application

```text
ui/
├── middleware.ts
├── app/
│   ├── layout.tsx
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── invite/[token]/page.tsx
│   ├── (public)/
│   │   ├── evento/[slug]/page.tsx
│   │   ├── evento/[slug]/comprar/page.tsx
│   │   ├── evento/[slug]/confirmacion/page.tsx
│   │   └── ticket/[ticketId]/page.tsx
│   ├── (backoffice)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── venues/page.tsx
│   │   ├── venues/new/page.tsx
│   │   ├── venues/[venueId]/page.tsx
│   │   ├── venues/[venueId]/edit/page.tsx
│   │   ├── events/page.tsx
│   │   ├── events/new/page.tsx
│   │   ├── events/[eventId]/page.tsx
│   │   ├── events/[eventId]/edit/page.tsx
│   │   ├── events/[eventId]/tickets/page.tsx
│   │   ├── events/[eventId]/courtesies/page.tsx
│   │   ├── events/[eventId]/reports/page.tsx
│   │   ├── reports/page.tsx
│   │   └── team/page.tsx
│   ├── check-in/
│   │   └── [eventId]/page.tsx
│   └── api/
│       ├── health/route.ts
│       ├── check-in/scan/route.ts
│       └── webhooks/mercadopago/route.ts
├── components/
│   ├── layout/
│   ├── shared/
│   ├── auth/
│   ├── venues/
│   ├── events/
│   ├── checkout/
│   ├── tickets/
│   ├── check-in/
│   └── reports/
├── modules/
│   ├── auth/
│   ├── tenancy/
│   ├── venues/
│   ├── events/
│   ├── checkout/
│   ├── tickets/
│   ├── check-in/
│   └── reports/
├── hooks/
├── stores/
├── lib/
└── types/
```

#### `ui/modules/` — Application Logic by Feature

Each feature module owns the application-specific actions, queries, mappers, serializers, and utilities for that domain.

```text
ui/modules/
├── auth/
│   ├── actions/
│   │   ├── login.ts
│   │   ├── register-tenant.ts
│   │   └── accept-invite.ts
│   ├── queries/
│   │   └── get-session-user.ts
│   ├── guards/
│   │   ├── require-session.ts
│   │   └── require-role.ts
│   └── utils/
│       └── post-login-redirect.ts
├── tenancy/
│   ├── queries/
│   │   ├── get-current-tenant.ts
│   │   └── get-current-scope.ts
│   └── utils/
│       └── tenant-scope.ts
├── venues/
│   ├── actions/
│   │   ├── create-venue.ts
│   │   ├── update-venue.ts
│   │   └── deactivate-venue.ts
│   ├── queries/
│   │   ├── list-venues.ts
│   │   └── get-venue-by-id.ts
│   └── mappers/
│       └── venue-list-item.ts
├── events/
│   ├── actions/
│   │   ├── create-event.ts
│   │   ├── update-event.ts
│   │   ├── publish-event.ts
│   │   ├── cancel-event.ts
│   │   └── archive-event.ts
│   ├── queries/
│   │   ├── list-events.ts
│   │   ├── get-event-by-id.ts
│   │   └── get-event-by-slug.ts
│   ├── mappers/
│   │   ├── event-form-defaults.ts
│   │   └── event-status-badge.ts
│   └── serializers/
│       └── event-public-view.ts
├── checkout/
│   ├── actions/
│   │   ├── create-free-reservation.ts
│   │   └── create-paid-checkout.ts
│   ├── queries/
│   │   └── get-checkout-summary.ts
│   ├── services/
│   │   └── enforce-capacity.ts
│   └── utils/
│       └── ticket-quantity.ts
├── tickets/
│   ├── actions/
│   │   ├── issue-courtesy.ts
│   │   └── resend-ticket-email.ts
│   ├── queries/
│   │   ├── list-event-tickets.ts
│   │   └── get-ticket-by-id.ts
│   └── services/
│       └── build-ticket-view-model.ts
├── check-in/
│   ├── actions/
│   │   └── manual-check-in.ts
│   ├── queries/
│   │   ├── list-attendees.ts
│   │   └── get-check-in-counter.ts
│   └── services/
│       └── scan-ticket.ts
└── reports/
    ├── queries/
    │   ├── get-event-report.ts
    │   ├── get-venue-report.ts
    │   └── get-consolidated-report.ts
    └── serializers/
        └── report-summary.ts
```

#### `packages/contracts/` — Shared Schemas

```text
packages/contracts/src/
├── index.ts
├── common.ts
├── auth.ts
├── tenancy.ts
├── venues.ts
├── events.ts
├── orders.ts
├── tickets.ts
├── checkin.ts
├── reports.ts
└── payments.ts
```

Recommended responsibilities:

* `auth.ts`: login, register, invite acceptance, session user
* `tenancy.ts`: tenant, profile, role, and scope schemas
* `venues.ts`: create, update, list, and detail view schemas
* `events.ts`: create, update, publish, cancel, and public event view schemas
* `orders.ts`: reservation and order lifecycle schemas
* `tickets.ts`: ticket, courtesy issuance, and public ticket view schemas
* `checkin.ts`: QR validation, scan result, and manual check-in schemas
* `reports.ts`: report filters and aggregate response schemas
* `payments.ts`: checkout request, checkout result, and normalized webhook schemas

#### `packages/core/` — Cross-Cutting Infrastructure and Adapters

```text
packages/core/src/
├── index.ts
├── auth/
│   ├── provider.ts
│   ├── types.ts
│   ├── mock-provider.ts
│   └── supabase-provider.ts
├── permissions/
│   ├── roles.ts
│   ├── ability.ts
│   └── guards.ts
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   └── middleware.ts
├── payments/
│   ├── provider.ts
│   ├── mercadopago.ts
│   └── types.ts
├── email/
│   ├── provider.ts
│   ├── resend.ts
│   └── types.ts
├── tickets/
│   ├── qr.ts
│   ├── signer.ts
│   └── parser.ts
├── csv/
│   └── export.ts
├── stores/
└── utils/
```

Responsibility rules:

* `core` provides capabilities such as permissions, payments, email, QR, CSV, and Supabase access
* `core` does not own feature orchestration such as `publish-event.ts` or `issue-courtesy.ts`
* Feature orchestration stays in `ui/modules/*`

#### `packages/db/` — Schema Only

```text
packages/db/src/
├── index.ts
└── schema.ts
```

MVP-first tables:

* `tenants`
* `profiles`
* `venues`
* `events`
* `orders`
* `tickets`
* `event_staff_assignments`
* `webhook_events` for idempotency

#### `packages/ui/` — Shared UI Primitives

```text
packages/ui/src/
├── index.ts
├── components/
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── table.tsx
│   ├── badge.tsx
│   ├── tabs.tsx
│   └── sidebar.tsx
├── lib/
└── styles/
```

Rule of thumb:

* `packages/ui` owns primitives
* `ui/components/*` owns business components such as `event-form.tsx`, `ticket-card.tsx`, or `scan-result.tsx`

### Concrete File Ownership Diagram

```mermaid
flowchart TD
    A["App Router Pages"] --> A1[Pages and Layouts]
    A --> A2[Route Handlers]
    A --> A3[Middleware Entry]

    B["Business Components"] --> B1[Feature UI]
    C["Feature Modules"] --> C1[Actions]
    C --> C2[Queries]
    C --> C3[Mappers and Serializers]

    D["Contracts Package"] --> D1[Request and Response Schemas]
    E["Core Package"] --> E1[Auth Permissions Payments Email QR CSV]
    F["Database Package"] --> F1[Drizzle Schema]
    G["UI Package"] --> G1[UI Primitives]

    A1 --> C
    A2 --> C
    C --> D
    C --> E
    E --> F
    B --> G
```

### Route Groups and Authentication Boundaries

Route groups are organizational and layout boundaries only.

| Route Group | URL Impact | Primary Purpose | Typical Auth State |
|------------|------------|-----------------|--------------------|
| `(marketing)` | None | Product marketing pages | Public |
| `(auth)` | None | Login, registration, invite acceptance | Public or redirect if logged in |
| `(public)` | None | Event landing, checkout, ticket lookup | Public |
| `(backoffice)` | None | Internal management console | Authenticated and role-based |
| `check-in` | Normal segment | Fast operational experience | Authenticated and scope-based |

Authentication and authorization must be enforced through middleware, server-side guards, and role checks. Folder names do not provide security.

## Operational Playbook

### How To Read This Blueprint

1. Start with **System Overview** to understand the main layers.
2. Read **Route Group Topology** to understand the application surface.
3. Use **File-by-File Blueprint** as the implementation scaffolding.
4. Build features in this order:
   * auth and tenancy
   * venues
   * events
   * checkout
   * tickets
   * check-in
   * reports

### Recommended Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
```

### Scaffolding Guardrails

* Keep `ui/` as the only application for the MVP
* Add new business data shapes only in `@template/contracts`
* Keep database definitions in `@template/db` only
* Keep infrastructure adapters in `@template/core`
* Keep feature orchestration in `ui/modules/*`
* Keep route groups focused on layout and user experience, not security

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-06 | Keep a single Next.js app for the MVP | Reduces delivery overhead while preserving a scaling path |
| 2026-04-06 | Use shared workspace packages for contracts, core, db, and UI primitives | Prevents schema drift and keeps infrastructure reusable |
| 2026-04-06 | Organize the App Router with `(marketing)`, `(auth)`, `(public)`, and `(backoffice)` | Separates user experiences and shared layouts without polluting URLs |
| 2026-04-06 | Keep `check-in` outside `(backoffice)` | Allows a fast, mobile-first operational flow with dedicated constraints |
| 2026-04-06 | Keep feature orchestration in `ui/modules/*` | Prevents `app/` from becoming a dumping ground for business logic |

## References

* `docs/developer-guide/lighthouse-architecture.mdx`
* `AGENTS.md`
* `ui/AGENTS.md`
* `packages/AGENTS.md`
