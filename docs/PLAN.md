# EXUI-4213 Plan

## Problem

The Playwright test framework in `rpx-xui-webapp` had adjacent Work Allocation coverage, but it did not clearly deliver the EXUI-4213 story:

- mocked Work Allocation task payloads were not validated against the mandatory ticket fields
- malformed mocked payloads did not fail with field-specific errors
- access-rule behaviour, including `EXCLUDED` handling, was not modelled as explicit scenario coverage
- the three access-query shapes from the ticket were not represented as deterministic Playwright-era tests

That left the new framework below the intended mocked integration standard and below the story acceptance criteria.

## Scope

- Add shared mandatory-field validation for mocked Work Allocation task-list and case-task payloads.
- Make shared route bootstrap fail early when mocked task payloads are missing or mis-shaping mandatory attributes.
- Add direct lightweight coverage for field-specific validation failures.
- Add pure scenario helpers for mocked access-rule evaluation covering:
  - `user + entity`
  - `user -> entities`
  - `entity -> users`
- Add targeted Playwright integration coverage proving:
  - case-task mocks now pass through shared validation
  - `user -> entities` excludes conflicting assignments from `My access`
  - `entity -> users` separates active roles from `EXCLUDED` users on `Roles and access`
- Keep the work limited to Playwright test/support code and traceability artefacts.

## Non-scope

- Live Work Allocation backend integration.
- Production Angular feature changes.
- Full regression reruns across every Playwright project.
- Rebuilding the older Codecept access-rule implementation in full.

## Acceptance Criteria Mapping

1. Mandatory mocked task attributes are validated for Playwright-owned mocked task responses.
2. Missing or malformed mandatory attributes fail with clear field-specific messages that name the relevant ticket field.
3. Matching and exclusion behaviour, including `EXCLUDED`, is covered in deterministic scenario helpers/tests.
4. The three access scenarios are represented in current Playwright-era coverage, using targeted unit/integration tests where each shape belongs.

## Risk

`Medium`

The change only affects test/support code, but it hardens shared mock bootstrap used by existing integration tests. A mistake here would break otherwise-valid mocked journeys, so targeted validation is required before handoff.

## Handoff

Agent: Planner

Consumed

- EXUI-4213 ticket statement and acceptance criteria
- Existing Playwright Work Allocation helpers and specs
- Current mocked task/access coverage gaps already identified in the repo

Produced

- Ticket-scoped plan for EXUI-4213 delivery in Playwright
- Medium-risk classification
- Minimal implementation slice covering validation, scenario modelling, and targeted UI proof

Notes / Risks

- The repo already had stale branch traceability docs for another ticket, so these artefacts must be replaced, not incrementally appended.
- Shared mock-route changes need targeted regression runs because they affect existing manage-tasks tests.

Next Instructions (to next agent)

1. Implement shared Work Allocation mock validation in the Playwright helper layer.
2. Add scenario helpers and tests for access-rule behaviour, including `EXCLUDED`.
3. Run targeted unit and integration validation, then document the real evidence boundary.

## Retirement Extension

### Problem

Even after the EXUI-4213 Playwright hardening, a set of legacy Work Allocation Codecept features was still executed for list and tab views that the new Playwright suite either already covered or could cover with small, low-risk additions.

### Scope

- Add quick-win Playwright parity for legacy Work Allocation list and tab coverage in:
  - `My cases`
  - `Available tasks`
  - `All work`
  - `Roles and access`
- Retire only the matched legacy Codecept features by marking them ignored with explicit replacement notes.
- Keep the work limited to deterministic mocked coverage and branch traceability artefacts.

### Non-scope

- Retiring workflow-heavy legacy Codecept features such as assignment workflows, filters with distinct behaviour, task completion, or exclusions-management journeys.
- Replacing every remaining Work Allocation Codecept test in one branch.
- Product-side Angular changes.

### Acceptance Criteria Mapping

1. Playwright covers the legacy list or tab behaviour being retired, with equal or stronger assertions.
2. Retired Codecept features are marked explicitly and remain reviewable in the repo history.
3. Workflow-heavy legacy features without real Playwright parity stay active.

### Risk

`Medium`

The product code is unchanged, but retiring legacy tests too aggressively would reduce effective coverage. Every retirement therefore needs direct Playwright proof and an explicit explanation of what stayed active.
