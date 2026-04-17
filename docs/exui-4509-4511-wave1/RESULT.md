# EXUI-4509 and EXUI-4511 Wave 1 Result

## Changes

- work-filters coverage now proves organisation-only service scoping for IA and SSCS after clearing selected locations and searching by text
- task-event-completion negative coverage now owns the legacy no-task-available failure-path parity
- Booking UI Playwright files were removed from this branch so PR `#5061` can remain the first-in owner for `EXUI-4131`
- the legacy booking feature tag was restored on this branch, while the ngIntegration result gate still handles the post-retirement zero-selection case for the later rebase
- Wave 1 traceability artefacts are reviewable in the branch under `docs/exui-4509-4511-wave1/`

## Validation

- `PW_INTEGRATION_SESSION_WARMUP_USERS=STAFF_ADMIN yarn test:playwright:integration --workers 8 playwright_tests_new/integration/test/manageTasks/workFilters.positive.spec.ts playwright_tests_new/integration/test/manageTasks/workFilters.negative.spec.ts playwright_tests_new/integration/test/manageTasks/caseTaskList/taskEventCompletion.negative.spec.ts`
- `yarn lint:prettier:fix`
- `EXTERNAL_SERVERS=true NODE_CONFIG_ENV=mock TEST_TYPE=ngIntegration PARALLEL=true npx codeceptjs run-workers --suites 8 --config ./test_codecept/codeceptCommon/codecept.conf.ts --features`

## Pending

- rebase this branch after PR `#5061` merges, then retire the legacy booking feature on top of the merged Booking UI implementation
