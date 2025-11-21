# API Test Suite Improvement Plan

> Scope: `playwright_tests_new/api` directory (current branch: `test/EXUI-3710_migrate_api_test`).
> Goal: Elevate tests to HMCTS engineering standards: security, reliability, maintainability, observability.
> Status: Planning only – no code changes applied.

---
## 1. Current Strengths
- Broad surface coverage: authentication, role access, case sharing, global search, ref data, work allocation.
- Use of Playwright API contexts with captured logs aids traceability.
- Session bootstrap via `auth.ts` avoids repeated login logic.
- Negative status coverage (401/403) present across guarded routes.

## 2. Key Issues & Anti‑Patterns
| Category | Issue | Example File(s) | Impact |
|----------|-------|-----------------|--------|
| Typing | Heavy use of `any` / `unknown` with inline casting | `search-and-refdata.api.ts`, `work-allocation.api.ts` | Weak compile‑time safety; fragile refactors |
| Status Assertions | Repeated magic arrays (`[200,401,403,...]`) scattered | Most test files | Duplication; risk of inconsistency |
| XSRF Handling | Manual retrieval (`ensureStorageState` + `getStoredCookie`) repeated | Many tests needing mutation or protected endpoints | Boilerplate; risk of forgetting header |
| Hard‑coded IDs | Literal case/task IDs: `1234567890123456`, placeholder UUID | Multiple role-access & work allocation tests | Limits semantic clarity; may mask data issues |
| Inline Schemas | Custom `expect.objectContaining` blocks duplicated | Case share, role access, task lists | Maintenance overhead; inconsistent fields |
| Conditional Assertions | Guard logic often only checks presence; no shape validation when rich payload returned | Global search results, searchCases proxy | Lower confidence; potential silent regressions |
| Lack of Negative Assertions | Few tests assert absence of sensitive fields (e.g. passwords, secrets) | User details endpoints | Security blind spot |
| Mixed Responsibility | Tests perform both data extraction and validation; lack utility layer | `work-allocation.api.ts` complex loops | Harder to reuse; more noise per test |
| Error Differentiation | `[401,403,404,500]` grouped without rationale | Role access endpoints | Ambiguous expectation; missing scenario labeling |
| Repeated XSRF Guard Patterns | Each action has its own test block; similar setup | Role access / task actions | Unnecessary duplication |

## 3. Guiding Principles (Target State)
1. Declarative: Tests read like contracts ("Given session, when GET /roles, then returns role assignments or guarded status").
2. Typed: Shared interfaces for recurring payload shapes (UserDetails, Task, RoleAssignment, CaseShare entities, Address lookup).
3. DRY Status Expectations: Central dictionary for allowed status sets with semantic names.
4. Uniform XSRF: Single helper to provide/cycle XSRF headers (`withXsrf(role, fn)`).
5. Minimal Noise: Extraction helpers for list wrappers (e.g. case share entries, task lists).
6. Security Minded: Assertions for absence of sensitive keys & explicit verification of authorization boundaries.
7. Observability: Consistent logging, optional structured attachments for complex responses.
8. Gradual Migration: Non‑breaking phased refactor to avoid large diff risk.

## 4. Proposed Utilities & Types (New Files – Not Yet Implemented)
| File | Purpose | Notes |
|------|---------|-------|
| `utils/types.ts` | Interfaces, guards (Task, TaskListResponse, RoleAssignment, CaseShare*, AddressLookup) | Permissive optional fields to avoid brittle tests |
| `utils/apiTestUtils.ts` | `StatusSets`, `expectStatus()`, `buildXsrfHeaders()`, `withXsrf()` | Reduces repetition & magic arrays |
| `utils/payloadExtractors.ts` | Functions: `extractCaseShareEntries()`, `extractTaskList()`, `safeArray()` | Simplifies test body logic |
| `utils/assertions.ts` | Common `expectRoleShape()`, `expectTaskShape()`, `expectNoSensitiveFields()` | Central schema; easier updates |
| `data/testIds.ts` | Central source for test fixture IDs (case IDs, UUID fallbacks) | Enables environment conditional overrides |

## 5. Detailed Recommendations
### 5.1 Typing & Interfaces
- Introduce interfaces with optional properties to handle varied environments.
- Replace inline `as any` casts with guarded type helpers (`isTaskList`, `isAddressLookup`).
- Use generics in API client calls where shape is stable (e.g. `apiClient.get<UserDetailsResponse>(...)`).

### 5.2 Status Code Management
- Create `StatusSets` enum-like object:
  - `guardedBasic`: `[200, 401, 403]`
  - `guardedExtended`: `[200, 401, 403, 404]`
  - `actionWithConflicts`: `[200, 204, 400, 401, 403, 404, 409]`
  - Domain-specific sets (e.g. `allocateRole` includes `201`).
- Replace arrays with `expectStatus(res.status, StatusSets.guardedBasic)` for consistency.

### 5.3 XSRF & Auth Simplification
- Implement `withXsrf('solicitor', async (headers) => { /* request */ })` pattern.
- Internally cache XSRF token; refresh on failure.
- Provide fallback warning if no token (skip rather than fail for ephemeral env outages).

### 5.4 Schema & Assertion Centralisation
- Move `expectRoleShape`, task shape, case share shape to `utils/assertions.ts`.
- Add negative assertion: ensure user details response does NOT include secret keys (`password`, `secret`, etc.).
- Add `expectMinimalList(list, itemShape?)` helper to unify list validation.

### 5.5 Data Fixture Abstraction
- Replace hard-coded case IDs with semantic constants (`CASE_ID_SAMPLE`, `CASE_ID_FOR_ROLE_ASSIGNMENT`).
- Load from environment config or test data file for flexibility.

### 5.6 Test Structure Refinement
- Break large files (e.g. `work-allocation.api.ts`) into domain-focused sub-describes or separate files if exceeding readability threshold.
- Introduce grouping tags (e.g. `@role-access`, `@work-allocation`) for selective execution.

### 5.7 Security & Reliability Enhancements
- Add tests verifying 403 for unauthorized role actions using alternative roles (e.g. `citizen` vs `solicitor`).
- Add CSRF negative test explicitly sending mismatched token.
- Assert absence of PII fields in case share and role assignment responses.

### 5.8 Observability & Reporting
- Attach structured JSON only when response shape complex or debugging flag enabled.
- Add summary attachment per test file listing endpoint coverage & statuses seen.

### 5.9 Evaluation & Metrics Alignment
- Coverage Metric: Track unique endpoint paths executed (automatic enumeration).
- Reliability: Capture per-endpoint status volatility (count distinct statuses observed). Flag if >3 distinct codes in stable endpoints.
- Latency: Record duration; warn if p95 > threshold (e.g. 2s for internal APIs).
- Flakiness: Re-run small set of critical endpoints (user details, role access confirm) nightly; diff structural schema hashes.

### 5.10 Migration Strategy (Phased)
| Phase | Scope | Actions | Success Criteria |
|-------|-------|--------|------------------|
| 0 | Planning | Create utilities & types (no test refactor yet) | New files compile; no existing tests changed |
| 1 | Low-Risk Refactors | Apply `withXsrf` + status sets to 1–2 files | Green tests; smaller diffs |
| 2 | Typing Expansion | Introduce interfaces into role-access & case share tests | >50% reduction in `any` usage |
| 3 | Consolidation | Refactor large `work-allocation.api.ts` using helpers | File complexity reduced (function count, lines) |
| 4 | Security Hardening | Add negative/absence assertions, multi-role permutations | New tests pass consistently across envs |
| 5 | Metrics Layer | Add endpoint coverage summary & volatility tracking | Attachment produced; stable pipeline |

### 5.11 Risk Mitigation
- Perform refactors in small batches (<200 LOC change per PR).
- Keep legacy arrays for first pass alongside new helper until confidence gained, then remove.
- Use feature flag (`USE_API_HELPERS=1`) to toggle new utilities if rollback needed.

## 6. Prioritized Backlog
1. Add `utils/types.ts` & `utils/apiTestUtils.ts` (foundational).
2. Refactor postcode lookup & one role access test to demonstrate helpers.
3. Roll out status sets + XSRF abstraction across remaining files.
4. Introduce domain interfaces & replace inline schemas.
5. Implement security negative tests & sensitive field absence checks.
6. Add evaluation attachments & volatility analysis.

## 7. Acceptance Criteria (Definition of Done)
- No `any` used where stable shape known (target: <10 remaining occurrences, all justified).
- All status arrays replaced by named sets or documented custom sets.
- A single helper handles XSRF retrieval across tests; no direct cookie lookups outside helpers.
- Domain interfaces defined & reused in >70% of endpoint assertions.
- Security negative & absence assertions exist for user details & role access endpoints.
- Endpoint coverage and response volatility attachments generated on CI.

## 8. Open Questions
- Should role-based permutations (citizen / system user) be included now or later?
- Do we need data seeding hooks to ensure stable sample tasks/cases? (May require upstream fixture APIs.)
- Confirm threshold for latency warning (1s vs 2s) with team.

## 9. Next Step
Review this plan. On approval, proceed with Phase 0 (adding utilities *without modifying existing tests*). Provide a follow-up PR with those files only for quick feedback.

---
## 10. Quick Reference (Glossary)
- Guarded Status: Endpoint may return success or an auth-related error (401/403/404) depending on session & data.
- Volatility: Count of distinct statuses observed for the same endpoint within a test run; high volatility may indicate instability.
- Negative Assertion: Test verifying absence of data (e.g. secret fields) rather than presence.

---
Prepared by: Automation Refactor Plan
Date: 2025-11-21
