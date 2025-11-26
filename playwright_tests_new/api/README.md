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
- Default behaviour: the `auth.ts` helper will first attempt token/S2S login using `IdamUtils.generateIdamToken` (password grant) plus `ServiceAuthUtils.retrieveToken` when the required env vars exist. If token bootstrap fails or the env vars are absent, it falls back to the `/auth/login` form flow and caches storage state under `functional-output/tests/playwright-api/storage-states/<env>/<role>.json`.
- Required for token bootstrap: `IDAM_WEB_URL`, `IDAM_TESTING_SUPPORT_URL`, `IDAM_CLIENT_ID` (or `SERVICES_IDAM_CLIENT_ID`), `IDAM_SECRET`, `S2S_URL`, `S2S_MICROSERVICE_NAME` (or `MICROSERVICE`), optional `IDAM_OAUTH2_SCOPE`, `IDAM_RETURN_URL`. Opt out with `API_AUTH_MODE=form`.
- XSRF handling: set `API_AUTO_XSRF=true` to auto-inject the `X-XSRF-TOKEN` header from stored cookies. By default the header is not injected so negative/CSRF tests can opt-in explicitly (via `withXsrf` or manual headers).
- Correlation IDs: every API client sets `X-Correlation-Id` per request (UUID) for traceability.
- Deterministic IDs are defined in `playwright_tests_new/api/data/test-manifest.json` (overridable via env): `WA_SAMPLE_TASK_ID`, `WA_SAMPLE_ASSIGNED_TASK_ID`, `ROLE_ACCESS_CASE_ID`, `EM_DOC_ID`. Update the manifest to point to real entities in your environment; tests now prefer manifest values and avoid best-effort guessing.

## Reports
- Odhin report for node-api: `functional-output/tests/playwright-api/odhin-report/xui-playwright.html` (copied to `functional-output/tests/api_functional/odhin-report/` for Jenkins publishing).
- When raising PRs, you can link the API Odhin report from the build artifacts for quick access.

## Outputs
- API call logs are attached automatically per test as `node-api-calls.json`.
- Coverage output from `test:api:pw:coverage` is written to `./reports/tests/coverage/api-playwright` (raw V8 data).

## What we assert (vs the old Mocha smoke checks)
- Unauthenticated sweep (`authenticated-routes.api.ts`) asserts 401 **and** body `{ message: 'Unauthorized' }` for every protected route.
- Node shell (`node-app-endpoints.api.ts`) verifies `auth/isAuthenticated` true/false behaviour, `/api/user/details` payload shape (user info, role assignments, timeout metadata) and feature flag responses, not just status codes.
- CCD and case-share suites check required keys/arrays (jurisdictions, work-basket inputs, profile, organisations/users/cases/assignments) with `expect.objectContaining` schema checks.
- Postcode lookup asserts result/header structure and sample DPA fields when present.
- Work Allocation covers locations (list/id), catalogues (task names/types of work), task search for `MyTasks`/`AvailableTasks`/`AllWork`, my-work dashboards, negative task actions (unauthenticated / missing XSRF / guarded statuses for claim/unclaim/assign/unassign/complete/cancel), basic caseworker/person endpoints, and best-effort action state checks when APIs permit.
- Global search and ref-data: `/api/globalSearch/services` + `/api/globalSearch/results`, `/data/internal/searchCases` proxy smoke, WA/staff supported jurisdictions, locations, staff-ref-data, and role-access/AM smoke checks (roles/access-get, valid roles, specific/allocate/delete/reallocate, exclusions/confirm, roles/post/manageLabelling) plus basic OPTIONS/CORS coverage.
- Every spec captures the underlying API calls via `ApiClient` so failures include the request/response log for debugging.
