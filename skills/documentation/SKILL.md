---
name: documentation
description: >
  Documentation style guide and writing standards for the startup-saas-template project.
  Trigger: When writing documentation, MDX docs, README files, or developer guides.
license: Apache-2.0
metadata:
  author: anyoneAI
  version: "1.0.0"
  scope: [root]
  auto_invoke: "Documentation writing, MDX docs, developer guides"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## When to Use

Use this skill when writing documentation for:
- Architecture documents
- README files
- Skills and agent guides (SKILL.md, AGENTS.md)
- Developer guides and tutorials
- MDX documentation pages

---

## Language Requirement

- **ALL documentation MUST be in English**
- Never write documentation in Spanish or other languages
- Code comments must also be in English

---

## Brand Voice

### Unbiased Communication
- Avoid gendered pronouns (use "you/your" or "they/them")
- Use inclusive alternatives: businessman → businessperson, mankind → humanity
- No generalizations about gender, race, nationality, culture
- Use neutral language: fight → address, attack → attempt

### Technical Terminology
- Define key terms and acronyms on first use: "Server-Side Rendering (SSR)"
- Prefer verbal over nominal constructions: "The response was generated" not "The generation of the response"
- Use clear, accessible language; minimize jargon

---

## Uniform Section Contract

ALL architecture and feature documents MUST follow this section order:

1. **Purpose** — What this document/feature is and why it exists
2. **Scope** — What is covered and what is explicitly NOT covered
3. **Architecture** — System design, diagrams, component relationships
4. **Implementation** — Code patterns, technical details, how it works
5. **Operational Playbook** — Commands, deployment, monitoring, troubleshooting
6. **Decision Log** — Key decisions made and why (with date)
7. **References** — Links to related documents, specs, and external resources

Not every document needs all sections — but sections that ARE present must follow this order.

---

## Formatting Standards

### Title Case Capitalization
Use Title Case for all headers:
- Good: "How to Configure Chat Streaming"
- Bad: "How to configure chat streaming"

### Hyphenation
- Prenominal position: "real-time streaming"
- Postnominal position: "updates in real time"

### Bullet Points
Use when information can be logically divided:
```markdown
startup-saas-template includes:
* **Frontend**: Next.js 15, React 19, Tailwind CSS 4
* **Contracts**: Zod schemas for shared DTOs
* **Core**: Business logic, auth, Supabase client
* **Database**: Drizzle ORM, PostgreSQL
```

### Interaction Verbs
- Desktop: Click, Double-click, Right-click, Drag, Scroll
- Touch: Tap, Double-tap, Press and hold, Swipe, Pinch

---

## MDX Conventions

### Frontmatter

Every MDX document must start with frontmatter:
```mdx
---
title: "Lighthouse Architecture"
description: "System architecture overview for the startup-saas-template"
---
```

### Callout Components

Use callout components for important information:
```mdx
<Callout type="info">
  This is informational content.
</Callout>

<Callout type="warning">
  This is a warning — pay attention.
</Callout>

<Callout type="danger">
  This is critical — breaking change ahead.
</Callout>
```

### Mermaid Diagrams

Use Mermaid for architecture and flow diagrams:
```mdx
```mermaid
graph TD
    A[Browser] --> B[Next.js 15]
    B --> C[@template/core]
    C --> D[Supabase]
```
```

---

## SEO Optimization

### Sentence Structure
Place keywords at the beginning:
- Good: "To create a new dashboard widget, add a component to..."
- Bad: "Navigate to the dashboard to create a new widget..."

### Headers
- H1: Primary (unique, descriptive)
- H2-H6: Subheadings (logical hierarchy)
- Include keywords naturally

---

## Code Blocks

### Always Specify Language
```typescript
// TypeScript example
const message: ChatMessage = { role: "user", content: "Hello" };
```

```bash
# Shell commands
pnpm dev
pnpm build
```

### Include Context
Add comments explaining what the code does:
```typescript
// Create a new chat session via Server Action
const result = await createChatSession({
  title: "Investment Planning",
});
```

---

## Document Types

### Architecture Documents (`lighthouse-*.mdx`)
- System boundaries and responsibilities
- Tech stack specifications
- Project structure
- Non-goals (explicit exclusions)

### README Files
- Package overview
- Quick start commands
- Project structure
- Related documentation links

### Skills (`SKILL.md`)
- When to use
- Critical rules
- Code patterns
- Checklists

### Agent Guides (`AGENTS.md`)
- Skills reference
- Auto-invoke mapping
- Decision trees
- Commands

---

## Documentation Structure

```
docs/
├── developer-guide/
│   ├── index.mdx                     # Developer guide entry point
│   └── lighthouse-architecture.mdx   # System architecture overview
└── ...
```

---

## Project Features (Proper Nouns)

Reference without articles:
- startup-saas-template
- Template UI
- Template Contracts
- Template Core
- Lighthouse Architecture

---

## Resources

- **Architecture**: `docs/developer-guide/lighthouse-architecture.mdx`
- **Root Agent**: `AGENTS.md`
