# Packages — AI Agent Ruleset

> **Scope**: Workspace packages (`packages/*`)

> **Skills Reference**: For detailed patterns, use these skills:
> - [`typescript`](../skills/typescript/SKILL.md) - Type safety and strict TS patterns
> - [`zod-4`](../skills/zod-4/SKILL.md) - Shared validation contracts
> - [`zustand-5`](../skills/zustand-5/SKILL.md) - State management patterns

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Adding new API request/response schemas | `shared-contracts` |
| Adding new contracts or fields | `contract-versioning` |
| Changing contract field names or types | `contract-versioning` |
| Changing field names, types, or required status in contracts | `shared-contracts` |
| Contract compliance, import validation, DTO enforcement | `contract-enforcement` |
| Contract versioning, SemVer, breaking changes | `contract-versioning` |
| Creating/modifying shared data contracts | `shared-contracts` |
| Deprecating or removing contract fields | `contract-versioning` |
| Detecting inline DTO or schema definitions | `contract-enforcement` |
| Evaluating contract compatibility | `contract-versioning` |
| Reviewing code for contract compliance | `contract-enforcement` |
| Shared data contracts, Zod schemas, DTOs | `shared-contracts` |
| Validating Server Action request/response models | `contract-enforcement` |

---

## Mission

This agent orchestrates work inside `packages/` and delegates domain-specific changes to subagents:

| Package | Scope | Guide |
|---------|-------|-------|
| `packages/contracts/` | `@template/contracts` | [`packages/contracts/AGENTS.md`](contracts/AGENTS.md) |
| `packages/core/` | `@template/core` | [`packages/core/AGENTS.md`](core/AGENTS.md) |
| `packages/db/` | `@template/db` | [`packages/db/AGENTS.md`](db/AGENTS.md) |
| `packages/ui/` | `@template/ui` | Component conventions in root `AGENTS.md` |

---

## CRITICAL RULES — NON-NEGOTIABLE

1. **Package boundaries are strict.** No cross-domain leakage.
2. **Use workspace imports** (e.g., `@template/core`), NEVER relative imports across package roots.
3. **Never import from `ui/` app code.** Packages are consumed by apps, not the other way around.
4. **Always export from `index.ts`.** Every public API must be re-exported from the package barrel file.
5. **Use `workspace:*` for internal deps.** Package-to-package dependencies use workspace protocol.
6. Any new package under `packages/*` MUST include:
   - `package.json` with explicit `name` and `exports`
   - `src/index.ts` barrel export
   - `tsconfig.json`
   - `AGENTS.md` if the package has specific architecture rules

### Package Boundaries

```
@template/contracts ──→ zod (external only, no internal deps)
@template/core ────────→ @template/contracts, @supabase/*, zustand
@template/db ──────────→ drizzle-orm (external only, no internal deps)
@template/ui ──────────→ radix-ui, tailwind-merge, CVA, lucide-react
```

### Dependency Direction (NEVER violate)

```
ui/ (app) ──imports──→ @template/contracts
                       @template/core
                       @template/ui

packages/core ──imports──→ @template/contracts

packages/contracts ──imports──→ zod ONLY
packages/db ──imports──→ drizzle-orm ONLY
packages/ui ──imports──→ radix, CVA, clsx, tailwind-merge ONLY
```

---

*For package-specific rules, see each package's own `AGENTS.md`.*
