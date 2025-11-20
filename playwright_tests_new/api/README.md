# Playwright API tests (node-api project)

This folder contains the Playwright API suite that replaces the legacy Mocha `yarn test:api` run.

## Prerequisites
- Node 20+, Yarn installed.
- Environment variables (can go into `.env`):
  - `TEST_URL` (e.g. `https://manage-case.aat.platform.hmcts.net/`)
  - `TEST_ENV` (`aat`/`demo`)
  - IDAM/S2S endpoints used by `@hmcts/playwright-common`: `IDAM_WEB_URL`, `IDAM_TESTING_SUPPORT_URL`, `S2S_URL`, optional `S2S_SECRET`.
- User credentials are read from `test_codecept/integration/tests/config/config.ts` for the selected `TEST_ENV`.

## Running
- Smoke the API suite:  
  `yarn test:api:pw`
- Capture raw V8 coverage + Playwright attachments:  
  `yarn test:api:pw:coverage`

## Authentication model
- The `auth.ts` helper now signs in via HTTP (no browser). It follows the `/auth/login` → IDAM form flow with the configured username/password, stores the resulting Playwright storage state under `functional-output/tests/playwright-api/storage-states/<env>/<role>.json`, and reuses it for all tests.
- Helper methods (`ensureStorageState`, `getStoredCookie`) expose the session/XSRF cookies so tests can add CSRF headers when needed. No Puppeteer/Chromium login is used.

## Outputs
- API call logs are attached automatically per test as `node-api-calls.json`.
- Coverage output from `test:api:pw:coverage` is written to `./reports/tests/coverage/api-playwright` (raw V8 data).

## What we assert (vs the old Mocha smoke checks)
- Unauthenticated sweep (`authenticated-routes.api.ts`) asserts 401 **and** body `{ message: 'Unauthorized' }` for every protected route.
- Node shell (`node-app-endpoints.api.ts`) verifies `auth/isAuthenticated` true/false behaviour, `/api/user/details` payload shape (user info, role assignments, timeout metadata) and feature flag responses, not just status codes.
- CCD and case-share suites check required keys/arrays (jurisdictions, work-basket inputs, profile, organisations/users/cases/assignments) with `expect.objectContaining` schema checks.
- Postcode lookup asserts result/header structure and sample DPA fields when present.
- Work Allocation covers locations (list/id), catalogues (task names/types of work), task search for `MyTasks`/`AvailableTasks`/`AllWork`, my-work dashboards, negative task actions (unauthenticated / missing XSRF / guarded statuses for claim/unclaim/assign/unassign/complete/cancel), and basic caseworker/person endpoints.
- Global search and ref-data: `/api/globalSearch/services` + `/api/globalSearch/results`, WA/staff supported jurisdictions, and locations endpoint with auth/XSRF where needed.
- Every spec captures the underlying API calls via `ApiClient` so failures include the request/response log for debugging.
- Global search and ref-data: `/api/globalSearch/services` + `/api/globalSearch/results`, `/data/internal/searchCases` proxy smoke, WA/staff supported jurisdictions, locations, staff-ref-data, and role-access/AM smoke checks.
