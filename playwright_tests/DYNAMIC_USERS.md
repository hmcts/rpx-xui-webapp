# Playwright Dynamic User Provisioning

This project can now create IDAM/SIDAM users on the fly for Playwright E2E tests. The
feature is disabled by default so existing smoke tests keep using the legacy shared mailboxes.

## Enabling the feature

1. Export `USE_DYNAMIC_PLAYWRIGHT_USERS=true`.
2. Provide the following environment variables (usually via your `.env` file or Jenkins credential bindings):

| Purpose | Variable | Notes |
| --- | --- | --- |
| IDAM token client | `IDAM_WEB_URL`, `IDAM_TESTING_SUPPORT_URL` | Consumed by the local Playwright test helpers. |
| OAuth client | Any of `CREATE_USER_CLIENT_ID`, `CCD_DATA_STORE_CLIENT_ID`, `CLIENT_ID`, `IDAM_OAUTH2_CLIENT_ID` plus the matching secret (`CREATE_USER_CLIENT_SECRET`, `CCD_DATA_STORE_SECRET`, `IDAM_SECRET`, or `IDAM_OAUTH2_CLIENT_SECRET`) and `CREATE_USER_SCOPE`/`IDAM_OAUTH2_SCOPE` (defaults to `profile roles`). | Used to mint `CREATE_USER_BEARER_TOKEN` automatically if it is not supplied. |
| Optional resource owner creds | `IDAM_OAUTH2_USERNAME`, `IDAM_OAUTH2_PASSWORD`, `IDAM_OAUTH2_REDIRECT_URI` | Only required when a password grant is needed. |
| Direct bearer token (optional) | `CREATE_USER_BEARER_TOKEN` | If omitted, the global Playwright setup will call IDAM to obtain one using the OAuth vars above. |
| Persona passwords | `IDAM_SOLICITOR_USER_PASSWORD`, `IDAM_IAC_CASEOFFICER_PASSWORD`, `IDAM_STAFF_ADMIN_PASSWORD` | Used when creating the solicitor, WA case officer and staff personas respectively. Falls back to `DEFAULT_TEST_USER_PASSWORD`, then to the per-persona default noted in the code. |
| Role assignment cleanup | `S2S_URL`, `S2S_SECRET`, `ROLE_ASSIGNMENT_BASE_URL` (optional) | Required only when the role assignment manager is used. |

Dynamic users are now enabled by default. Run `yarn test:playwrightE2E` as normal; the `global.setup.ts` hook will mint `CREATE_USER_BEARER_TOKEN` before the tests start. Set `USE_DYNAMIC_PLAYWRIGHT_USERS=false` if you need to fall back to the legacy static accounts temporarily.

## Available personas

The following Codecept/Playwright `userIdentifier`s currently have dynamic equivalents:

- `POC_SOLICITOR` (used only by `dynamic-user-login-poc.test.ts`)
- `STAFF_ADMIN`

Other identifiers will fall back to the static `appTestConfig` credentials. `SOLICITOR`, `PROD_LIKE`, and `IAC_CaseOfficer_R2` remain static for now because those journeys rely on pre-seeded data or downstream WA roles. The `signIn` helper logs a warning whenever it takes the fallback path; remove the `enableDynamic: false` flag from the relevant entry in `playwright_tests/support/dynamic-user-definitions.ts` once their prerequisites are addressed.

## Runtime behaviour

- Users are created through a lightweight Axios-based helper and cached for the duration of the test run. The helper will mint `CREATE_USER_BEARER_TOKEN` automatically via the OAuth client vars above if the env var is not already set.
- A small audit file is stored at `functional-output/tests/playwright-e2e/dynamic-users.json` so failed runs can be correlated with the temporary accounts that were created.
- The `playwright_tests/E2E/fixtures/dynamic-users.ts` file exposes a typed fixture you can opt into for journeys that want direct access to the provisioned credentials.
- `signIn` in `playwright_tests/E2E/steps/login-steps.ts` automatically switches to dynamic credentials when the flag is enabled, so existing tests need no further changes.

## Cleaning up role assignments

`playwright_tests/support/role-assignment-manager.ts` mirrors the existing Codecept cleanup helper. Call `trackAssignment(id)` whenever you allocate a role via the Role Assignment API, then invoke `cleanup(userBearerToken)` in `afterAll` to delete anything that was created. The helper requires `S2S_URL` and (optionally) `ROLE_ASSIGNMENT_BASE_URL` to talk to the AM service.
