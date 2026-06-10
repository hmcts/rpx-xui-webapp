# Hearings Orchestration Migration

## Practical Delivery Boundary

This branch keeps the implementation deliberately incremental. It consolidates the hearing case context contract, protects the existing `LoadHearingValues` orchestration edge cases, and records the migration path for the larger reducer/orchestration work. It does not attempt a wholesale rewrite of Hearings models, reducers, effects, or page-flow classes.

The practical boundary for this PR is:

- Service payload DTOs stay in the existing service model files, with `serviceHearingValues.model.ts` remaining the single model source for service hearing values.
- Store-owned case context now lives in `hearingCaseContext.model.ts`.
- `hearingValuesStateData.ts` stays as the state wrapper that composes the service payload and internal context model.
- Existing route, selector, reducer, and API request contracts remain unchanged.

## Current Case Context Contract

Hearings stores the active case context in `hearingValues.caseInfo`. The context is populated through `StoreJurisdictionAndCaseRef`, read through the hearings reducer selectors, and consumed by guards and effects that need jurisdiction, case type, case reference, and hearing id values.

The case context should remain the single store-owned source for hearing management navigation. Components should not keep parallel copies of these route values beyond local form state, and effects should tolerate partial payloads by resolving them against the stored context before calling hearing APIs.

Current data flow:

1. Case route, resolver, or page-flow entry point derives jurisdiction, case type, case reference, and hearing id.
2. `StoreJurisdictionAndCaseRef` writes the typed context into `hearingValues.caseInfo`.
3. Reducer selectors expose the stored context to guards, effects, and page-flow consumers.
4. `LoadHearingValues` resolves any partial action payload against the stored context before calling hearing APIs.
5. Service response payloads update their own feature state without indirectly replacing the route-derived case context.

## Live Update Direction

Live updates during hearing management should enter the store through typed actions. Route-derived updates should refresh `hearingValues.caseInfo` before orchestration effects run, while API responses should update feature-specific slices rather than mutating case context indirectly.

This keeps the current route and selector contracts stable while giving future live-update work a clear hand-off point:

1. Resolve route parameters and hearing id into `HearingValuesCaseContext`.
2. Store that context through `StoreJurisdictionAndCaseRef`.
3. Let API and orchestration effects read the selector-owned context.
4. Keep service payload models separate from internal store context models.

Stale case-info risks identified for follow-on work:

- A long-running tab can keep an old `caseInfo` value while the user navigates between cases.
- A partial `LoadHearingValues` payload can rely on stored context, so the store must be refreshed before request/edit/view journeys start.
- Error routing needs a valid case type; missing or blank `caseType` must not wipe a stored value.
- Browser back, refresh, or deep-link entry can reach effects before a component has refreshed local state.
- Linked-hearing and actuals journeys can appear valid while using stale case context if only the API payload is refreshed.

Recommended next implementation step:

- Add a small hearings context facade around route entry points and selectors.
- Refresh `hearingValues.caseInfo` from route data before request, edit, view, linked, and actuals orchestration effects run.
- Keep polling or broader live resync out of this step unless product evidence proves the user journey needs it.

Follow-up engineering tickets should cover:

- Hearings context facade and selector migration.
- Route-context refresh before hearing orchestration effects.
- Browser smoke coverage for request, edit, view, linked, and actuals journeys after route refresh.

## Phased Reducer Orchestration Path

Phase 1 is the current consolidation step:

- Type the hearing case context in the state and actions.
- Retire duplicate case-info action definitions.
- Resolve missing or partial `LoadHearingValues` payloads against stored context.
- Add coverage for omitted payloads, partial payload fallback, and missing context routing.

Phase 2 should move route and case-context decisions behind selector or facade helpers:

- Add a small hearings context facade for route entry points.
- Keep selector contracts stable for existing components.
- Add unit coverage for context resolution without requiring browser tests.

Phase 3 should split reducer-heavy orchestration:

- Move cross-slice decisions from reducers into effects or focused orchestration services.
- Keep reducers as deterministic state transitions.
- Add API/effect integration coverage for failure routing, retry boundaries, and reset semantics.

Phase 4 should migrate component consumers:

- Replace direct feature-state plumbing with facade or selector calls.
- Remove any remaining component-level duplication of route case context.
- Validate the end-to-end request, edit, actuals, and view journeys before removing legacy selectors.

Each phase should keep the existing URL contracts and hearing API request shapes unchanged unless a separate product ticket approves a wider migration.

## Responsibility Matrix

| Area                             | Current responsibility                                                    | Target direction                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Actions                          | Carry route and API trigger payloads into the store and effects.          | Keep payloads typed and narrow; avoid action payloads becoming ad hoc DTO copies.                    |
| Reducers                         | Store hearing values, case context, reset state, and last errors.         | Keep reducers deterministic and limited to state transitions.                                        |
| Effects                          | Resolve context, call APIs, and route success or error branches.          | Move reusable orchestration decisions into focused helpers or a facade before wider reducer changes. |
| Selectors                        | Expose case context and hearing state to effects, guards, and components. | Keep selector contracts stable while consumers migrate behind a facade.                              |
| Resolvers and guards             | Seed route-derived values and protect route entry.                        | Refresh typed context before downstream effects run.                                                 |
| Page-flow classes and components | Coordinate request, edit, actuals, linked, and view journeys.             | Consume typed selectors/facade methods rather than duplicating context manipulation.                 |

## Existing Coverage Map

The branch adds direct Angular coverage for omitted, partial, and missing `LoadHearingValues` context, including `status: 0`, missing status, and blank or undefined `caseType` fallback.

The wider Playwright framework already contains relevant hearings coverage in:

- `playwright_tests_new/api/hearings-mock-builders.api.ts` for status mapping and linked-hearing mock aggregation.
- `playwright_tests_new/integration/test/hearings/hearingLifecycle.statusRouting.positive.spec.ts` for lifecycle status routing.
- `playwright_tests_new/integration/test/hearings/hearingLinked.positive.spec.ts` and `hearingLinked.negative.spec.ts` for linked-hearing success and partial failure.
- `playwright_tests_new/integration/test/hearings/hearingDetails.resilience.positive.spec.ts` and `hearingDetails.resilience.negative.spec.ts` for default details and controlled error branches.
- `playwright_tests_new/integration/test/hearings/hearingCreate.requestJourney.positive.spec.ts` and `hearingCreate.navigationControls.positive.spec.ts` for request journey hand-offs.
- `playwright_tests_new/integration/test/hearings/hearingViewEdit.summaryValidations.negative.spec.ts` for edit/view validation and error routing.
- `playwright_tests_new/integration/test/welshLanguage/welshLanguage.positive.spec.ts` and `welshLanguage.negative.spec.ts` for Welsh content success and failure branches.

Residual gap before treating the larger migration as complete:

- Add one real browser smoke path that refreshes case context across request, edit, view, linked, and actuals entry points under the target test environment. This is intentionally left as follow-up because it is broader than the safe model/effect consolidation in this PR.
