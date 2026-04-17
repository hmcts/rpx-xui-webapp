# Branch Delivery Result

## Status

Complete for the targeted EXUI-4213 Playwright slice.

## Scope Summary

This branch closes the specific gaps previously identified against EXUI-4213:

- mandatory Work Allocation mocked task attributes are now validated centrally
- malformed task mocks fail with field-specific validation messages
- access scenarios are modelled in reusable helpers that follow the current repo contract
- the `user + entity`, `user -> entities`, and `entity -> users` ticket scenarios now have current Playwright-era coverage

It also adds a focused retirement extension for legacy Work Allocation Codecept coverage:

- list and tab scenarios now have enough Playwright parity to retire a first batch of legacy `ngIntegration` Work Allocation `.feature` files
- the retirement is limited to view/list/manage-link behaviour that is now owned by Playwright
- workflow-heavy legacy features remain active where this branch did not yet add equivalent Playwright depth

## Implementation

- Added shared mandatory Work Allocation mock validation in `playwright_tests_new/integration/helpers/workAllocationMockValidation.helper.ts`.
- Extended shared route support in `playwright_tests_new/integration/helpers/taskListMockRoutes.helper.ts` with validated task-list and case-task route setup.
- Hardened `playwright_tests_new/integration/helpers/manageTasksMockRoutes.helper.ts` so shared manage-tasks bootstrap validates mocked task-list payloads before fulfillment.
- Exported the new helper surface via `playwright_tests_new/integration/helpers/index.ts`.
- Added pure access-scenario support in `playwright_tests_new/integration/helpers/workAllocationAccessScenarios.helper.ts`.
- Corrected the access-scenario helper so `My access` mirrors the repo's current specific-access subset and keeps challenged records out of that view.
- Corrected the access-scenario helper so requested and denied `My access` rows keep the right labels, status fields, and access flags instead of inheriting granted-state defaults.
- Corrected the entity-to-users scenario modelling so active roles and exclusions remain independently visible, matching the current application wiring.
- Tightened mandatory date validation so impossible calendar timestamps fail instead of being accepted via `Date.parse(...)` overflow.
- Added direct validation tests in `playwright_tests_new/api/unit/work-allocation-mock-validation.unit.api.ts`.
- Added direct access-scenario tests in `playwright_tests_new/api/unit/work-allocation-access-scenarios.unit.api.ts`.
- Added `My access` scenario coverage in `playwright_tests_new/integration/test/manageTasks/myAccess/myAccess.positive.spec.ts`.
- Moved the larger Work Allocation scenario datasets into `playwright_tests_new/integration/mocks/workAllocationAccessScenarios.mock.ts` so the touched specs stay assertion-focused.
- Moved case-task setup in `playwright_tests_new/integration/test/manageTasks/caseTaskList/caseTaskList.positive.spec.ts` onto the shared validated case-task route helper.
- Added `Roles and access` scenario coverage in `playwright_tests_new/integration/test/caseDetails/rolesAndAccess.positive.spec.ts`, including proof of the outgoing judicial-user lookup payload.
- Added deterministic `Roles and access` route setup in `playwright_tests_new/integration/helpers/rolesAndAccessMockRoutes.helper.ts` and exported it via `playwright_tests_new/integration/helpers/index.ts`.
- Extended `playwright_tests_new/integration/test/manageTasks/myCases/myCases.positive.spec.ts` to cover multi-row allocator actions plus the single-page/no-sort behaviour still carried by legacy Codecept `My cases` features.
- Extended `playwright_tests_new/integration/test/manageTasks/availableTasks/availableTaskList.positive.spec.ts` to cover the legacy available-task action-menu contract on multiple rows.
- Extended `playwright_tests_new/integration/test/manageTasks/allWork/allWorkTasks.positive.spec.ts` to cover task-title deep linking to the case-details task tab, reset-sort behaviour, and single-page pagination hiding.
- Reworked `playwright_tests_new/integration/test/caseDetails/rolesAndAccess.positive.spec.ts` to cover allocator empty state, allocator populated state, and non-allocator read-only behaviour.
- Retired the matched legacy Codecept features under `test_codecept/ngIntegration/tests/features/workallocation2/` for:
  - `myCases/myCases.feature`
  - `myCases/myCases_negativeCases.feature`
  - `myCases/myCases_manageLinks.feature`
  - `myCases/myCases_pagination.feature`
  - `allWork/allwork.feature`
  - `allWork/allwork_manageLinks.feature`
  - `allWork/allwork_paginationSorting.feature`
  - `rolesAccess/rolesAndAccessTabPage.feature`
  - `taskActions.feature`
- Updated the root lint scripts in `package.json` so Prettier and ESLint resolve through the local `node_modules` binaries in this Yarn environment.
- Removed the `docs/*.md` ignore entries from `.gitignore` so the required branch traceability artefacts can be reviewed and committed with the code changes.

## Review Verdict

Functionally sound in the targeted slice after the corrective review loops. The review pass surfaced four legitimate gaps in the implementation journey:

- the access-scenario helper invented a challenged and exclusion-override contract that the repo does not implement
- the access-scenario helper still left requested and denied `My access` rows on granted-state defaults
- the date validator was too permissive for a claimed ISO-only contract
- the `Roles and access` spec did not prove the judicial lookup request payload

Those issues were fixed before final handoff. The branch now follows the existing application semantics instead of extending them in test support, and it closes the Work Allocation Playwright gaps that the earlier repo analysis identified.

## Validation Evidence

Mandatory mock validation and access-scenario helper tests:

- `yarn playwright test --project=node-api playwright_tests_new/api/unit/work-allocation-mock-validation.unit.api.ts playwright_tests_new/api/unit/work-allocation-access-scenarios.unit.api.ts`
- Result: `9 passed`

Targeted Work Allocation integration coverage:

- `yarn test:playwright:integration playwright_tests_new/integration/test/manageTasks/myAccess/myAccess.positive.spec.ts playwright_tests_new/integration/test/manageTasks/caseTaskList/caseTaskList.positive.spec.ts playwright_tests_new/integration/test/caseDetails/rolesAndAccess.positive.spec.ts`
- Result: `8 passed, 1 skipped (43.0s)`

Follow-up review-fix validation:

- `yarn playwright test --project=node-api playwright_tests_new/api/unit/work-allocation-access-scenarios.unit.api.ts`
- Result: `5 passed (1.5s)`
- `yarn test:playwright:integration playwright_tests_new/integration/test/manageTasks/myAccess/myAccess.positive.spec.ts playwright_tests_new/integration/test/caseDetails/rolesAndAccess.positive.spec.ts`
- Result: `4 passed (47.0s)`

Retirement-extension validation:

- `yarn test:playwright:integration playwright_tests_new/integration/test/manageTasks/myCases/myCases.positive.spec.ts playwright_tests_new/integration/test/manageTasks/availableTasks/availableTaskList.positive.spec.ts playwright_tests_new/integration/test/manageTasks/allWork/allWorkTasks.positive.spec.ts playwright_tests_new/integration/test/caseDetails/rolesAndAccess.positive.spec.ts`
- Result: `20 passed, 1 flaky, 1 failed` before correction, which exposed:
  - a bad new all-work result-summary expectation
  - a flaky first-attempt navigation path in the new all-work task-link spec
- `yarn test:playwright:integration playwright_tests_new/integration/test/manageTasks/allWork/allWorkTasks.positive.spec.ts`
- Result: `8 passed (26.2s)` after correcting the new all-work assertions
- `yarn test:playwright:integration playwright_tests_new/integration/test/manageTasks/myCases/myCases.positive.spec.ts playwright_tests_new/integration/test/manageTasks/availableTasks/availableTaskList.positive.spec.ts playwright_tests_new/integration/test/manageTasks/allWork/allWorkTasks.positive.spec.ts playwright_tests_new/integration/test/caseDetails/rolesAndAccess.positive.spec.ts`
- Result: `20 passed (38.6s)` on the first post-fix branch state
- `yarn test:playwright:integration playwright_tests_new/integration/test/manageTasks/allWork/allWorkTasks.positive.spec.ts`
- Result: `8 passed (37.9s)` after replacing the manual all-work tab request waiter with the hardened `clickTaskTabAndWaitForView` helper when a later combined rerun exposed a timeout in the persisted-sort scenario
- `yarn test:playwright:integration playwright_tests_new/integration/test/manageTasks/myCases/myCases.positive.spec.ts playwright_tests_new/integration/test/manageTasks/availableTasks/availableTaskList.positive.spec.ts playwright_tests_new/integration/test/manageTasks/allWork/allWorkTasks.positive.spec.ts playwright_tests_new/integration/test/caseDetails/rolesAndAccess.positive.spec.ts`
- Result: `20 passed (37.0s)` on the final post-fix branch state
- `yarn test:playwright:integration playwright_tests_new/integration/test/manageTasks/myCases/myCases.negative.spec.ts`
- Result: `5 passed (12.8s)`
- `rg -n "@functional_enabled @ignore" test_codecept/ngIntegration/tests/features/workallocation2/myCases test_codecept/ngIntegration/tests/features/workallocation2/allWork test_codecept/ngIntegration/tests/features/workallocation2/rolesAccess/rolesAndAccessTabPage.feature test_codecept/ngIntegration/tests/features/workallocation2/taskActions.feature`
- Result: retired feature markers present on the matched Work Allocation Codecept files

Touched-file lint:

- `./node_modules/.bin/eslint playwright_tests_new/integration/helpers/workAllocationMockValidation.helper.ts playwright_tests_new/integration/helpers/workAllocationAccessScenarios.helper.ts playwright_tests_new/api/unit/work-allocation-mock-validation.unit.api.ts playwright_tests_new/api/unit/work-allocation-access-scenarios.unit.api.ts playwright_tests_new/integration/test/manageTasks/myAccess/myAccess.positive.spec.ts playwright_tests_new/integration/test/caseDetails/rolesAndAccess.positive.spec.ts`
- Result: passed

Repo lint entrypoint:

- `yarn lint`
- Result: passed with `479 warnings, 0 errors`

## Residual Risk

- Validation is targeted to the touched Work Allocation slice, not a fresh full Playwright regression.
- Existing Work Allocation contract schemas under the broader API-contract test layer remain intentionally permissive; this branch hardens mocked integration coverage, not every contract definition in the repo.
- The new access-scenario helpers are still test-support abstractions rather than production service logic, so future product changes to access semantics will need the helpers and tests to be kept in sync deliberately.
- `yarn lint` is now runnable, but the repo still carries a large warning baseline outside this ticket slice.
- Several legacy Work Allocation Codecept features intentionally remain active because this branch did not migrate their workflow depth. The main retained areas are assignment workflows, filters with distinct behaviour, case-based all-work journeys, exclusions-management flows, and task-event completion.

## Handoff

Agent: Builder

Consumed

- EXUI-4213 gap analysis
- Existing Work Allocation Playwright helper/spec structure

Produced

- Shared validation helpers
- Shared access-scenario helpers
- Targeted unit and integration coverage for the ticket gaps

Notes / Risks

- Shared route bootstrap now rejects invalid mocked payloads by default, so future mocked tests will surface malformed fixtures earlier.

Next Instructions (to next agent)

1. Review the changed helper contracts and new scenario coverage for behavioural gaps.
2. Confirm the final summary stays within the targeted validation boundary.

Agent: Tester

Consumed

- Final EXUI-4213 helper and spec changes
- Targeted node-api and integration commands

Produced

- Passing evidence for the implemented EXUI-4213 slice

Notes / Risks

- Confidence is high for the touched paths, but broader suite confidence still depends on CI and wider regression runs.

Next Instructions (to next agent)

1. Present the work as targeted ticket delivery, not full-suite hardening.
2. Call out residual risk around broader untouched contract layers.
