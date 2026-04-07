---
name: contract-versioning
description: >
  Manage semantic versioning and changelog discipline for @template/contracts.
  Ensures coordinated version bumps when schemas change.
  Trigger: When contract fields change, new contracts are introduced, or breaking changes occur.
license: Apache-2.0
metadata:
  author: anyoneAI
  version: "1.0.0"
  scope: [root, packages]
  auto_invoke:
    - "Contract versioning, SemVer, breaking changes"
    - "Changing contract field names or types"
    - "Adding new contracts or fields"
    - "Deprecating or removing contract fields"
    - "Evaluating contract compatibility"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Related Skills

- `shared-contracts` - Contract definitions
- `contract-testing` - Fixture-based testing
- `contract-enforcement` - Enforce contract usage

---

## Purpose

Enforce **semantic versioning (SemVer)** for the `@template/contracts` package. All consumers in the monorepo depend on this package — version discipline prevents breaking changes from cascading silently.

---

## Version Location

| File | Field |
|------|-------|
| `packages/contracts/package.json` | `"version"` |

---

## CRITICAL RULES

- ✅ ALWAYS bump version when contracts change
- ✅ ALWAYS update CHANGELOG.md
- ✅ ALWAYS analyze breaking change impact
- ✅ ALWAYS coordinate major bumps with all consuming packages
- ❌ NEVER skip version bump for "small" changes
- ❌ NEVER make breaking changes without coordination
- ❌ NEVER remove required fields without a major bump

---

## SemVer Quick Reference

| Change | Bump | Safe? |
|--------|------|-------|
| Add optional field | MINOR | ✅ |
| Add new contract/schema | MINOR | ✅ |
| Add enum value | MINOR | ✅ |
| Fix validation bug | PATCH | ✅ |
| Update description/docs | PATCH | ✅ |
| **Rename field** | MAJOR | ❌ |
| **Remove field** | MAJOR | ❌ |
| **Change field type** | MAJOR | ❌ |
| **Optional → Required** | MAJOR | ❌ |
| **Remove enum value** | MAJOR | ❌ |

---

## Version Bump Procedure

1. **Determine** change type (PATCH / MINOR / MAJOR)
2. **Update** version in `packages/contracts/package.json`
3. **Update** `CHANGELOG.md` with changes
4. **Summarize** impact:
   - ✅ Safe — consumers can upgrade without changes
   - ⚠️ Migration — consumers need code updates
   - 🚨 Breaking — coordinated rollout required across all packages

### Impact Assessment

For MAJOR bumps, check all consumers:

```bash
# Find all imports of @template/contracts
grep -r "@template/contracts" --include="*.ts" --include="*.tsx" ui/ packages/
```

---

## Changelog Format

```markdown
# @template/contracts Changelog

## [1.3.0] - 2026-03-26

### Added
- Optional `context` field to `ChatMessageSchema`
- New `CourseEnrollmentSchema` contract

## [2.0.0] - 2026-04-01

### Breaking
- Renamed `sessionId` to `conversationId` in `ChatSessionSchema`

### Migration
- Update all `sessionId` references to `conversationId`
- Affected packages: `@template/web`, `@template/core`
```

---

## When to Invoke

| Action | Invoke? |
|--------|---------|
| Contract field changed | ✅ Yes |
| New contract introduced | ✅ Yes |
| Field deprecated/removed | ✅ Yes |
| Internal refactor only (no API change) | ❌ No |
| Fixture-only changes | ❌ No |

---

## Checklist

- [ ] Change type determined (PATCH / MINOR / MAJOR)
- [ ] Version bumped in `package.json`
- [ ] `CHANGELOG.md` updated
- [ ] Breaking impact analyzed (if MAJOR)
- [ ] Migration guide provided (if MAJOR)
- [ ] All consuming packages tested against new version

---

## Resources

- **Contract Definitions**: See `shared-contracts` skill
- **SemVer Spec**: [semver.org](https://semver.org/)
- **Changelog**: [packages/contracts/CHANGELOG.md](../../packages/contracts/CHANGELOG.md) — Create this file on the first version bump if it doesn't exist.
