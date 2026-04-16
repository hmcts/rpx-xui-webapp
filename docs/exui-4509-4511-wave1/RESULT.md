# EXUI-4509 and EXUI-4511 Wave 1 Result

## Changes

- booking guard negative-path test now listens for `/am/getBookings` before navigation
- booking existing-bookings coverage now exercises three rendered cards with date details
- work-filters coverage now proves organisation-only service scoping for IA and SSCS after clearing selected locations and searching by text
- Wave 1 traceability artefacts are reviewable in the branch under `docs/exui-4509-4511-wave1/`

## Validation

- `PW_INTEGRATION_SESSION_WARMUP_USERS=STAFF_ADMIN yarn test:playwright:integration --workers 8 playwright_tests_new/integration/test/bookingUI/booking-ui.positive.spec.ts playwright_tests_new/integration/test/bookingUI/booking-ui.negative.spec.ts playwright_tests_new/integration/test/manageTasks/workFilters.positive.spec.ts playwright_tests_new/integration/test/manageTasks/workFilters.negative.spec.ts`
- result: `12 passed`
- `yarn lint:prettier:fix`
- formatter completed with no `.gitignore` changes
- `PW_INTEGRATION_SESSION_WARMUP_USERS=STAFF_ADMIN yarn test:playwright:integration --workers 8 playwright_tests_new/integration/test/bookingUI/booking-ui.positive.spec.ts playwright_tests_new/integration/test/bookingUI/booking-ui.negative.spec.ts playwright_tests_new/integration/test/manageTasks/workFilters.positive.spec.ts playwright_tests_new/integration/test/manageTasks/workFilters.negative.spec.ts`
- post-format result: `12 passed (50.2s)`

## Pending

- none
