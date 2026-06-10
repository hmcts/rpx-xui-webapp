# Hearings Orchestration Migration

## Current Case Context Contract

Hearings stores the active case context in `hearingValues.caseInfo`. The context is populated through `StoreJurisdictionAndCaseRef`, read through the hearings reducer selectors, and consumed by guards and effects that need jurisdiction, case type, case reference, and hearing id values.

The case context should remain the single store-owned source for hearing management navigation. Components should not keep parallel copies of these route values beyond local form state, and effects should tolerate partial payloads by resolving them against the stored context before calling hearing APIs.

## Live Update Direction

Live updates during hearing management should enter the store through typed actions. Route-derived updates should refresh `hearingValues.caseInfo` before orchestration effects run, while API responses should update feature-specific slices rather than mutating case context indirectly.

This keeps the current route and selector contracts stable while giving future live-update work a clear hand-off point:

1. Resolve route parameters and hearing id into `HearingValuesCaseContext`.
2. Store that context through `StoreJurisdictionAndCaseRef`.
3. Let API and orchestration effects read the selector-owned context.
4. Keep service payload models separate from internal store context models.

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
