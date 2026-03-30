---
name: template-bff
description: >
  Backend-for-Frontend (BFF) patterns using Next.js Server Actions and Route Handlers.
  Governs data fetching, mutations, streaming, and API routes in the ui/ application.
  Trigger: Server Actions, API routes, Route Handlers, data fetching, mutations, BFF patterns.
license: Apache-2.0
metadata:
  author: anyoneAI
  version: "1.0.0"
  scope: [root, ui]
  auto_invoke:
    - "Server Actions, API routes, Route Handlers, data fetching, mutations, BFF"
    - "Creating/modifying Server Actions or Route Handlers"
    - "Implementing data fetching or mutation logic"
    - "Adding streaming endpoints or SSE"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Related Skills

- `template-ui` - Frontend UI patterns
- `shared-contracts` - Zod schemas for validation
- `contract-enforcement` - Enforce contract usage
- `nextjs-15` - App Router, Server Actions
- `typescript` - Type safety patterns
- `zod-4` - Schema validation

---

## Purpose

Governs the backend-for-frontend layer in the Next.js 15 App Router. ALL server-side logic in `ui/` goes through either Server Actions or Route Handlers — never through direct database or Supabase calls from components.

---

## DECISION TREE: Server Action vs Route Handler

| Question | Answer | Pattern |
|----------|--------|---------|
| Is it streaming (SSE)? | Yes | Route Handler |
| Is it a webhook callback? | Yes | Route Handler |
| Is it a mutation (create/update/delete)? | Yes | Server Action |
| Is it data fetching for a page? | Yes | Server Action (RSC) |
| Is it a third-party API proxy? | Yes | Route Handler |
| Is it form submission? | Yes | Server Action |

**Default**: If unsure, use a **Server Action**. Route Handlers are reserved for streaming, webhooks, and cases where Server Actions cannot work.

---

## CRITICAL RULES

- ✅ ALWAYS validate input with Zod schemas from `@template/contracts`
- ✅ ALWAYS use `@template/core` for Supabase access — NEVER direct `createClient()` in actions
- ✅ ALWAYS return `ActionResult<T>` from Server Actions
- ✅ ALWAYS co-locate or group actions by feature
- ❌ NEVER put business logic in Route Handlers — delegate to `@template/core`
- ❌ NEVER import Supabase client directly in Server Actions — use core abstractions
- ❌ NEVER define inline schemas — import from `@template/contracts`
- ❌ NEVER call Server Actions from Route Handlers or vice versa

---

## File Locations

| Type | Location | Example |
|------|----------|---------|
| Server Action (feature-scoped) | `ui/app/(app)/{feature}/actions.ts` | `ui/app/(app)/chat/actions.ts` |
| Server Action (shared) | `ui/actions/{feature}.ts` | `ui/actions/auth.ts` |
| Route Handler | `ui/app/api/{route}/route.ts` | `ui/app/api/chat/stream/route.ts` |

---

## Server Action Pattern

```typescript
"use server";

import { SomeSchema, type SomeType } from "@template/contracts";
import { someService } from "@template/core";

// Standardized result type for ALL Server Actions
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function doSomething(
  input: unknown
): Promise<ActionResult<SomeType>> {
  // 1. Validate input with contracts
  const parsed = SomeSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  try {
    // 2. Delegate business logic to @template/core
    const result = await someService.execute(parsed.data);

    // 3. Return standardized result
    return { success: true, data: result };
  } catch (error) {
    console.error("[doSomething] Failed:", error);
    return { success: false, error: "Operation failed" };
  }
}
```

### Key Points:
- `"use server"` directive at the top of the file
- Input is `unknown` — validated via Zod before use
- Business logic via `@template/core` — never inline
- `ActionResult<T>` return type — consumers always get a discriminated union

---

## Route Handler Pattern (SSE Streaming)

```typescript
import { type NextRequest } from "next/server";
import { streamService } from "@template/core";

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Delegate to @template/core for actual streaming logic
        for await (const chunk of streamService.stream()) {
          const data = `data: ${JSON.stringify(chunk)}\n\n`;
          controller.enqueue(encoder.encode(data));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        console.error("[stream] Error:", error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

### Key Points:
- Route Handlers go in `ui/app/api/{route}/route.ts`
- Stream logic comes from `@template/core` — Route Handler only orchestrates the HTTP response
- Always set SSE headers: `Content-Type`, `Cache-Control`, `Connection`
- End stream with `[DONE]` sentinel

---

## Route Handler Pattern (Webhook)

```typescript
import { type NextRequest, NextResponse } from "next/server";
import { WebhookPayloadSchema } from "@template/contracts";
import { webhookService } from "@template/core";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate webhook payload
  const parsed = WebhookPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    await webhookService.process(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[webhook] Error:", error);
    return NextResponse.json(
      { error: "Processing failed" },
      { status: 500 }
    );
  }
}
```

---

## Consuming Server Actions in Components

```typescript
"use client";

import { doSomething } from "./actions";
import { useState, useTransition } from "react";

export function SomeForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await doSomething(Object.fromEntries(formData));
      if (!result.success) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      <input name="field" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
```

---

## When to Invoke

| Action | Invoke? |
|--------|---------|
| Creating a new Server Action | ✅ Yes |
| Creating a new Route Handler | ✅ Yes |
| Adding data fetching to a page | ✅ Yes |
| Adding a streaming endpoint | ✅ Yes |
| Creating a webhook handler | ✅ Yes |
| UI-only state changes (no server) | ❌ No |

---

## Checklist

- [ ] Input validated with `@template/contracts` schema
- [ ] Business logic delegated to `@template/core`
- [ ] `ActionResult<T>` used for Server Action return
- [ ] `"use server"` directive present
- [ ] No direct Supabase imports in actions
- [ ] No inline DTO definitions
- [ ] Error handling with try/catch
- [ ] Loading states handled in consuming component

---

## Resources

- **Related Skills**: `template-ui`, `shared-contracts`, `nextjs-15`
- **Root Agent**: `AGENTS.md`
- **UI Agent**: `ui/AGENTS.md`
