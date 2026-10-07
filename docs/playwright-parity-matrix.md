# Playwright parity matrix and migration closure gate

Snapshot date: 2026-06-10

Primary delivery PR: [hmcts/rpx-xui-webapp#5191](https://github.com/hmcts/rpx-xui-webapp/pull/5191)

Latest verified Playwright-code evidence for this snapshot:

- PR head: `8ec132e4c758a23c3599e1229d1aa39cc094454c`
- Jenkins PR build: [PR-5191 build 29](https://build.hmcts.net/job/HMCTS_j_to_z/job/rpx-xui-webapp/job/PR-5191/29/display/redirect)
- Functional preview: [build 29 test report](https://build.hmcts.net/job/HMCTS_j_to_z/job/rpx-xui-webapp/job/PR-5191/29/display/redirect?page=tests)
- Smoke AKS preview: [build 29 test report](https://build.hmcts.net/job/HMCTS_j_to_z/job/rpx-xui-webapp/job/PR-5191/29/display/redirect?page=tests)

This document adds closure evidence only. If it is committed after the build above, the PR still needs the standard Jenkins rerun to complete on the new merge candidate before merge.

## Closure position

PR #5191 can close the Manage Tasks parity tickets once it is reviewed and merged:

- `EXUI-4534` shared manage-tasks Playwright integration foundation
- `EXUI-4535` All Work cases tests
- `EXUI-4536` All Work task-navigation tests
- `EXUI-4537` My Cases pagination tests
- `EXUI-4538` My Work filter tests

PR #5191 materially advances, but does not by itself retire every legacy runner in the repo:

- `EXUI-4684` can close only when this matrix, the gate below, the live Jenkins evidence, and team sign-off are accepted as the migration closure record.
- `EXUI-4685` can close only when the rows marked `Mapped outside PR #5191` or `Waiver required` below have an agreed owner, linked PR, or explicit waiver.

## Objective retirement gate

Use this gate before retiring Codecept or treating Playwright as complete parity for this repo.

| Gate                    | Required evidence                                                                                                                                                                                                  | Current PR #5191 position                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| CI health               | PR-head, functional preview, and smoke AKS preview green on the reviewed SHA.                                                                                                                                      | Met for build 29 on `8ec132e4c758a23c3599e1229d1aa39cc094454c`.                                                 |
| Lint                    | `yarn lint` exits with `0` errors. Existing unrelated warnings must be called out.                                                                                                                                 | Met locally: `0` errors, existing warning baseline.                                                             |
| Security audit evidence | `yarn npm audit --recursive --environment production --json > yarn-audit-known-issues` has been run on the branch and the output validates as JSON-lines. Exit code `1` is acceptable when advisories are present. | Met locally: 39 valid JSON-lines.                                                                               |
| API/support stability   | Changed API/support specs pass with no retries; full `node-api` project has no failures or retry-passed tests before merge.                                                                                        | Met locally: changed API slice passed; full node-api project passed `584` tests with `0` retry-passed tests.    |
| Integration stability   | Touched integration journeys pass without retry masking in local targeted evidence and pass in Jenkins preview.                                                                                                    | Met locally for focused Manage Tasks / Share Case slice: `18` passed with `--retries=0`; Jenkins preview green. |
| Flake threshold         | No new critical flake in touched scope. Local targeted runs should show `flaky=0`, `passed-on-retry=0`, `failed=0`; Jenkins must not show repeated retry failure for the touched tests.                            | Met for local targeted evidence and build 29.                                                                   |
| Report artifacts        | Odhín HTML, Playwright diagnostics, JUnit where configured, traces/screenshots/videos on failure, and Jenkins HTML Publisher links are available for the run being used as evidence.                               | Met through existing Playwright reporting and Jenkins build 29 links.                                           |
| Scope and ownership     | Product/runtime, `src/**`, root `api/**`, Jenkins, package, and lockfile changes are either absent or explicitly approved outside the SDET scope.                                                                  | Met: PR #5191 is Playwright test/support scope plus mandated audit artifact and this closure document.          |
| Waivers                 | Any legacy journey not mapped to Playwright has a rationale, owner, and follow-up link before closure.                                                                                                             | Partially met: see rows below that need owner/waiver confirmation.                                              |

## Parity matrix

| Legacy / migration scenario                                                                                 | Ticket      | Playwright coverage                                                                                                                                                                                                                                                                            | Status                        | Evidence                                                                                                                                                          | Closure decision                                                                  |
| ----------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Shared Manage Tasks app-shell, task-list routing, route setup, and reusable integration foundation          | `EXUI-4534` | `playwright_tests_new/integration/helpers/manageTasksMockRoutes.helper.ts`, `playwright_tests_new/integration/helpers/xuiAppShellMockRoutes.helper.ts`, `playwright_tests_new/api/unit/task-list-bootstrap.unit.api.ts`, `playwright_tests_new/api/unit/xui-app-shell-mock-routes.unit.api.ts` | Covered by PR #5191           | Helper/unit API slice: `23` passed; Jenkins build 29 green                                                                                                        | Close when PR #5191 merges.                                                       |
| All Work cases filtering, backend request payload capture, page summary, row rendering, and pagination      | `EXUI-4535` | `playwright_tests_new/integration/test/manageTasks/allWork/allWorkCases.positive.spec.ts`, `playwright_tests_new/integration/helpers/allWorkCasesRequest.helper.ts`, `playwright_tests_new/api/unit/all-work-cases-request-helper.unit.api.ts`                                                 | Covered by PR #5191           | Focused integration slice: `18` passed with `--retries=0`; Jenkins build 29 green                                                                                 | Close when PR #5191 merges.                                                       |
| All Work task list, task link navigation, pagination, role date-column behaviour, and task-search contracts | `EXUI-4536` | `playwright_tests_new/integration/test/manageTasks/allWork/allWorkTasks.positive.spec.ts`, `playwright_tests_new/api/work-allocation.api.ts`, `playwright_tests_new/api/search-and-refdata.api.ts`                                                                                             | Covered by PR #5191           | Changed API specs: `111` passed; focused integration slice passed; Jenkins build 29 green                                                                         | Close when PR #5191 merges.                                                       |
| My Cases pagination and page replacement behaviour                                                          | `EXUI-4537` | `playwright_tests_new/integration/test/manageTasks/myCases/myCases.pagination.positive.spec.ts`                                                                                                                                                                                                | Covered by PR #5191           | Focused integration slice passed; Jenkins build 29 green                                                                                                          | Close when PR #5191 merges.                                                       |
| My Work filters, location route precedence, full-location filtering, and filter validation                  | `EXUI-4538` | `playwright_tests_new/integration/test/manageTasks/myWorkFilters.positive.spec.ts`, `playwright_tests_new/integration/helpers/myWorkFiltersMockRoutes.helper.ts`, `playwright_tests_new/api/unit/my-work-filters-mock-routes.unit.api.ts`                                                      | Covered by PR #5191           | My Work route-helper retest: `1` passed; focused integration slice passed; Jenkins build 29 green                                                                 | Close when PR #5191 merges.                                                       |
| Share Case selection, selected-case routing, and share-case mock contracts                                  | `EXUI-4685` | `playwright_tests_new/integration/test/shareCase/shareCase.positive.spec.ts`, `playwright_tests_new/integration/test/shareCase/caseListSelection.positive.spec.ts`, `playwright_tests_new/api/unit/share-case-mock-routes.unit.api.ts`, `playwright_tests_new/api/caseshare.api.ts`            | Covered by PR #5191           | Focused integration slice passed; Jenkins build 29 green                                                                                                          | Can be counted toward EXUI-4685 once PR #5191 merges.                             |
| Work Allocation cancellation and task-search API contracts used by Manage Tasks journeys                    | `EXUI-4685` | `playwright_tests_new/api/work-allocation-cancellation.api.ts`, `playwright_tests_new/api/work-allocation.api.ts`, `playwright_tests_new/api/coverage-helpers.api.ts`                                                                                                                          | Covered by PR #5191           | Full node-api project: `584` passed, `0` retry-passed tests                                                                                                       | Can be counted toward EXUI-4685 once PR #5191 merges.                             |
| Pending decision / access request workflows                                                                 | `EXUI-4685` | `playwright_tests_new/integration/test/accessRequests/*.spec.ts`, `playwright_tests_new/api/unit/challenged-access-request.unit.api.ts`, `playwright_tests_new/api/unit/work-allocation-access-scenarios.unit.api.ts`                                                                          | Mapped outside PR #5191       | Existing Playwright integration/API coverage is present, but not changed by PR #5191                                                                              | Needs owner confirmation or separate PR evidence before closing EXUI-4685.        |
| Hearings tab-load, request, view/edit, resilience, actuals, and back-link/navigation behaviour              | `EXUI-4685` | `playwright_tests_new/integration/test/hearings/*.spec.ts`, including `hearingCreate.navigationControls.positive.spec.ts` and `hearingDetails.cr84.positive.spec.ts`                                                                                                                           | Mapped outside PR #5191       | Existing Playwright integration coverage is present, but not changed by PR #5191                                                                                  | Needs owner confirmation or separate PR evidence before closing EXUI-4685.        |
| Search, query, find-case, and global search regressions                                                     | `EXUI-4685` | `playwright_tests_new/integration/test/searchCase/*.spec.ts`, `playwright_tests_new/E2E/test/searchCase/*.spec.ts`, `playwright_tests_new/api/search-and-refdata.api.ts`                                                                                                                       | Mapped outside PR #5191       | Existing Playwright E2E/integration/API coverage is present, but only API support changed in PR #5191                                                             | Needs owner confirmation or separate PR evidence before closing EXUI-4685.        |
| Case list tab load and selected-case behaviour                                                              | `EXUI-4685` | `playwright_tests_new/integration/test/caseList/caseList.positive.spec.ts`, `playwright_tests_new/integration/test/caseList/caseList.negative.spec.ts`, `playwright_tests_new/integration/test/shareCase/caseListSelection.positive.spec.ts`                                                   | Partially covered by PR #5191 | PR #5191 adds selected-case Share Case coverage; existing case-list specs remain outside the PR diff                                                              | Needs owner confirmation if this is required for EXUI-4685 closure.               |
| Organisation search and registration regressions                                                            | `EXUI-4685` | `playwright_tests_new/api/unit/organisation-assignment.unit.api.ts`, `playwright_tests_new/E2E/utils/professional-user/organisationAssignment.ts`                                                                                                                                              | Waiver required for PR #5191  | This PR is scoped to `rpx-xui-webapp` Manage Tasks / Share Case parity. Organisation registration/search ownership may sit in adjacent XUI organisation services. | Do not close EXUI-4685 on this row without a linked owning PR or explicit waiver. |

## Coverage totals snapshot

Current PR #5191 evidence package:

- Production recursive Yarn audit: 39 valid JSON-lines, exit code `1` expected because advisories exist.
- Helper/unit API slice: `23` passed.
- Changed API specs: `111` passed.
- Full node-api project after remediation: `584` passed, `0` retry-passed tests.
- My Work route-helper retest: `1` passed.
- Focused Manage Tasks / Share Case integration slice: `18` passed with `--retries=0`; rerun after rebase also passed.
- `yarn lint`: `0` errors, existing warning baseline.
- Scope scan: no `_helpers` directories introduced.
- Jenkins build 29: PR-head, functional preview, and smoke AKS preview green.

## Closure checklist

Use this checklist before transitioning the Jira tickets:

- [ ] PR #5191 is reviewed and merged.
- [ ] Jenkins PR-head, functional preview, and smoke AKS preview are green on the merge candidate SHA.
- [ ] `yarn-audit-known-issues` has been regenerated by the mandatory production recursive audit command on the branch.
- [ ] `yarn lint` has `0` errors.
- [ ] Focused local Manage Tasks / Share Case integration evidence is retry-free.
- [ ] Full node-api evidence is green after any API/support changes.
- [ ] PR body links to this matrix and the latest Jenkins run.
- [ ] Jira comments for `EXUI-4534` to `EXUI-4538` state that closure is merge-gated only.
- [ ] `EXUI-4684` comment links this matrix and records the accepted retirement gate.
- [ ] `EXUI-4685` comment either links follow-up evidence for mapped outside-PR rows or records explicit waivers.
- [ ] QA and engineering agree that any rows marked `Mapped outside PR #5191` or `Waiver required` do not block the ticket being closed.

## Residual risks

- This matrix is a closure artifact, not a product/runtime change.
- PR #5191 does not remove Codecept or change Jenkins execution. Retirement must happen only after the closure checklist is accepted.
- Existing Playwright coverage outside PR #5191 has been mapped by file evidence, but it has not all been rerun as part of this PR validation package.
- Organisation registration/search parity needs explicit owner confirmation because it may belong to adjacent XUI organisation repositories rather than this webapp PR.
