# Manage Cases

To generate a local repo-root `.env` from Azure Key Vault, use the checked-in
template [`.env.example`](./.env.example) with the population script:

```bash
yarn env:populate:aat
```

Use `demo` instead of `aat` when needed:

```bash
yarn env:populate:demo
```

This writes `.env` in the repo root using `.env.example` plus any Azure Key
Vault secrets tagged with `e2e=<ENV_VAR_NAME>`. The generated `.env` is
gitignored and must not be committed.

Then follow:

## Startup the Node service locally

1. Make sure you have local-development.json within /config, if you do not you can get this from an XUI team member.
2. Start the Node service locally using:
   `export IDAM_SECRET=* && export S2S_SECRET=* && export NODE_CONFIG_DIR=../config && export NODE_CONFIG_ENV=development
&& export ALLOW_CONFIG_MUTATIONS=1 && npm run start:node`

Explanation:

NODE_CONFIG_DIR tells the machine where the configuration for the Node application is located.
NODE_CONFIG_ENV=development sets the machine so that the config that is used is local-development.json

@see https://github.com/lorenwest/node-config/wiki/Configuration-Files

## Startup the Angular service locally

Run `yarn start:ng` to start up the UI.

## Fully mocked local setup (no downstream environments)

Use this mode when AAT/downstream services are unavailable and you want local integration development.

### Ports used

- `3000` Angular UI
- `3001` Node API
- `8080` Backend mock (includes local IDAM/OAuth routes)

### 1) Prerequisites

```bash
node -v   # requires >= 20.19.0
yarn install
```

### 2) Start services (three terminals)

Terminal A (mock backend + local IDAM on `8080`):

```bash
yarn test:backendMock
```

Terminal B (Node API on `3001`):

```bash
yarn start:node
```

Terminal C (Angular UI on `3000`):

```bash
yarn start:ng
```

### 3) Quick health checks

```bash
curl -sS -D - -o /dev/null http://localhost:3000/auth/login | grep -i '^location:'
curl -sS -D - -o /dev/null http://localhost:3000/ | grep -Ei 'HTTP/|location:|set-cookie:'
```

Expected:

- `/auth/login` redirects to `http://localhost:8080/o/authorize...` (not AAT IDAM).
- `/` returns `HTTP/1.1 200 OK`.

### 4) Run Playwright integration tests in local mocked mode

```bash
TEST_URL=http://localhost:3000 \
EXUI_BASE_URL=http://localhost:3000 \
MANAGE_CASES_BASE_URL=http://localhost:3000/cases \
IDAM_WEB_URL=http://localhost:8080 \
IDAM_TESTING_SUPPORT_URL=http://localhost:8080 \
FUNCTIONAL_TESTS_WORKERS=4 \
PLAYWRIGHT_SKIP_INSTALL=true \
yarn test:playwright:integration
```

Why these env vars are required:

- `TEST_URL` / `EXUI_BASE_URL` force Playwright target to local UI.
- `IDAM_WEB_URL` / `IDAM_TESTING_SUPPORT_URL` prevent session capture from attempting AAT IDAM login.

### Troubleshooting

- `EADDRINUSE: ... 3001`:
  - Another Node API process is running. Stop it, then restart `yarn start:node`.
- Browser says `ERR_TOO_MANY_REDIRECTS`:
  - Clear site cookies for `localhost`.
  - Verify `/auth/login` points to `localhost:8080` and not `idam-web-public.aat...`.

## Local mock/auth changes implemented

The following code changes were made to support fully mocked local auth + integration flow:

1. `test_codecept/backendMock/services/idam/index.js`
   - OIDC discovery metadata now points to local mock endpoints on `http://localhost:8080`.

2. `test_codecept/backendMock/services/idam/routes.js`
   - Added `/login` route to redirect to local `/o/authorize`.
   - Added `/details` endpoint with role-bearing mock user profile.
   - Added shared token responder for both `/o/token` and `/oauth2/token`.
   - Corrected token response shape (`token_type: Bearer`, numeric `expires_in`, JWT `exp` in seconds).
   - Updated OAuth callback `iss` to local `http://localhost:8080/o`.

3. `test_codecept/backendMock/services/userApiData.js`
   - Added safe token normalization and null guards to avoid crashes when auth headers are absent/malformed.

4. `api/user/index.ts`
   - Hardened active role-assignment extraction to handle undefined role arrays without crashing.

## API docs (Swagger UI)

- Swagger UI is available on lower environments when the `feature.docsEnabled` flag is true and `environment` is not `production`.
- Locally: ensure `config/local-development.json` is in place (includes `docsEnabled: true`), start the Node service (`yarn start:node`), then browse to `http://localhost:3000/api/docs`.
- The raw OpenAPI document is served at `http://localhost:3000/api/docs/openapi.json`.

## Running unit tests

Run `yarn test` to execute the unit tests on both the Angular and Node layers. Note that
`yarn test` is run on the build pipelines.

Node API test commands (complementary):

- `yarn coverage:node` – full Mocha + c8 coverage run for the Node layer (uses `api` scripts and generates coverage reports). Use when you need coverage numbers.
- `yarn test:node:local` – quick Mocha run for Node with dev config (`NODE_CONFIG_DIR=../config`, `NODE_CONFIG_ENV=development`, `ALLOW_CONFIG_MUTATIONS=1`) and stubs for external calls; good for local iteration.
- `yarn test:api:pw:coverage` – Playwright API functional tests with `c8` coverage over live API flows; complements the unit coverage above by exercising end-to-end routes.

## Linting

Run `yarn lint` to execute all linting across both Angular and Node layers. Note that this
is run on the build pipelines.
Run `yarn lint:node` to execute note linting.

## PACT

Run `yarn test-pact` to run the PACT tests.

Run `yarn pact-stub` to run the PACT stub server.

# Branches, Environment and Deployment methods used

# Branches, Environment and Deployment methods used

```javascript
 |---------------------------------------|
 | Branch | Environment | Deployment via |
 |---------------------------------------|
 | local  | development | -              |
 | PR     | preview     | Jenkins        |
 | Master | aat         | Jenkins        |
 | Master | aat         | Flux           |
 | Master | ithc        | Flux           |
 | Master | production  | Flux           |
 |---------------------------------------|
```

## Preview testing

For PR builds deployed to `preview`, add the `enable_keep_helm` label to the pull request when you need the Helm release to stay available after Jenkins completes. This is useful when you want to continue testing against the preview environment without the release being cleaned up at the end of the pipeline run.

# Path to configuration

The application should point to the configuration folder that contains the .json configuration files. There
should only ever be three files within this folder:

`custom-environmental-variables.json` - Allows configuration values to be set by the machines environmental values.
Through the Jenkins pipelines they are overwritten by values.\*.template.yaml files for the Preview and AAT enviroments.
On AKS they are only overwritten by the values.yaml file
`default.json` - Should contain Production configuration values as per Reform standards.
`local-development.json` - Is used for local development

Adding new files into /config should be avoided, as it increases complexity.

It increases complexity if we were to add files to /config as we already have the Preview and AAT Jenkins enviromental
values contained within values.preview.template.yaml and values.aat.template.yaml.

# Setting up Secrets locally (Required)

Before you run local flows, generate a repo-root `.env` from Azure Key Vault.
This keeps the local env file aligned with the checked-in
[`.env.example`](./.env.example) template and avoids committing live secrets.

Prerequisites:

1. Install Azure CLI.
2. Run `az login`.
3. Make sure you can access the relevant vault:
   - `rpx-aat`
   - `rpx-demo`

Generate `.env` for AAT:

```bash
yarn env:populate:aat
```

Generate `.env` for demo:

```bash
yarn env:populate:demo
```

Optional custom output path and template:

```bash
bash ./scripts/populate-env-from-keyvault.sh aat /tmp/xui.env .env.example
```

What the script does:

- reads [`.env.example`](./.env.example)
- looks up secrets in Azure Key Vault using the `e2e=<ENV_VAR_NAME>` tag
- writes the resolved values into `.env`
- applies compatibility fills for `CLIENT_ID`, `CREATE_USER_CLIENT_ID`, `CREATE_USER_CLIENT_SECRET`, `IDAM_API_URL`, `MANAGE_CASE_REDIRECT_URI`, `SOLICITOR_CASE_TYPE`, and `SOLICITOR_JURISDICTION`
- leaves blank values in place when a value is intentionally local-only or no tagged secret exists

Notes:

- [`.env`](./.env) is gitignored and must not be committed
- if a generated value is blank, either add or fix the Key Vault tag/secret, or set the value locally if it is intentionally not stored in Key Vault
- this section replaces the old local mount-point secret setup instructions for this branch

### Adding new usernames and passwords to Azure Key Vault

If you add a new credential to [`.env.example`](./.env.example), you must add it
to the relevant Key Vault with the correct `e2e` tag so the population script
can write it into `.env`.

Use these vaults:

- AAT: `rpx-aat`
- DEMO: `rpx-demo`

Important rules:

- The env var name must exist in [`.env.example`](./.env.example).
- The secret is matched by `tags.e2e`, not by the secret name.
- If the same key is needed in both environments, create or update it in both
  `rpx-aat` and `rpx-demo`.
- Username and password should normally be stored as two separate secrets.

Example: add a new username/password pair for `NEW_CASEWORKER_USERNAME` and
`NEW_CASEWORKER_PASSWORD`.

Create or update the AAT secrets:

```bash
az keyvault secret set \
  --vault-name rpx-aat \
  --name new-caseworker-username \
  --value 'user@example.com' \
  --tags e2e=NEW_CASEWORKER_USERNAME

az keyvault secret set \
  --vault-name rpx-aat \
  --name new-caseworker-password \
  --value 'SuperSecretPassword' \
  --tags e2e=NEW_CASEWORKER_PASSWORD
```

Create or update the DEMO secrets:

```bash
az keyvault secret set \
  --vault-name rpx-demo \
  --name new-caseworker-username \
  --value 'user@example.com' \
  --tags e2e=NEW_CASEWORKER_USERNAME

az keyvault secret set \
  --vault-name rpx-demo \
  --name new-caseworker-password \
  --value 'SuperSecretPassword' \
  --tags e2e=NEW_CASEWORKER_PASSWORD
```

Then regenerate your local env file:

```bash
yarn env:populate:aat
yarn env:populate:demo
```

Quick checklist when adding a new credential:

- add the placeholder key to [`.env.example`](./.env.example) if it is missing
- create or update the secret in `rpx-aat` and/or `rpx-demo`
- set `--tags e2e=<EXACT_ENV_VAR_NAME>`
- rerun the env population command for the target environment
- if the generated value is still blank, check the tag spelling and your vault access first

# How Application Configuration (Node Config) Works

The application picks up the configuration from the /config .json files.

The references within _.json ie. production.json are set by the /charts/xui-terms-and-conditions/values.yaml file ie.
POSTGRES_SERVER_PORT is set by POSTGRES_SERVER_PORT within values.yaml. <br><br>HOWEVER if there is a
values._.template.yaml file it will override the values within the values.yaml file, BUT this only happens on the JENKINS
pipelines, where values.\*.template.yaml are available to the build pipeline.

AKS uses a .json file in /config and the values.yaml from within charts/xui-terms-and-conditions ONLY.

AKS does not use values.aat.template.yaml and values.previews.template.yaml

DO NOT create a new .json file within /config as this increases the complexity of configuration.

The 3rd party Node config package selects the file within /config based on `NODE_ENV` which is always production on all environments,
due to Reform standards, this does not change on different environments, it is always `NODE_ENV=production`

If production.json is not within /config, it's not in the case of Manage Cases, it will use the files in the order specified by
@see https://github.com/lorenwest/node-config/wiki/Configuration-Files

We DO NOT need to leverage `NODE_CONFIG_ENV` on the Manage Cases project - All application code be written so that it's
not environment specific!

Note about secrets ie.

```javascript
keyVaults: rpx: secrets: -postgresql - admin - pw - appinsights - instrumentationkey - tc;
```

are set within the values.yaml and there should be NO REFERENCE to them within any /config/\*.json file.

The application pulls out the secrets directly using `propertiesVolume.addTo()`

## Issues and Solutions

Property 'cookies' does not exist on type 'EnhancedRequest' - you will need to make
sure @types/express-session is added ie.
`yarn add @types/express-session`

### The following is the legacy readme.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running pure playwright end-to-end tests

Run `HEAD=true TEST_URL=https://manage-case.aat.platform.hmcts.net yarn test:playwrightE2E` to execute the pure playwright end-to-end tests on aat via [Playwright](https://playwright.dev/).
Add `ENABLE_AXE_TESTS=true` to activate Axe Accessibility testing.

The `playwright_tests_new` folder contains the beginnings of the updated framework structure and test form. Tests are now structured by functionality with step containers for each stage of the test. A page object pattern has been introduced in place of using selectors in the tests themselves. Follow this pattern for any new tests, or ones you wish to migrate.
Detailed framework architecture (with diagrams): [`playwright_tests_new/TEST_FRAMEWORK_ARCHITECTURE.md`](playwright_tests_new/TEST_FRAMEWORK_ARCHITECTURE.md).

### Playwright reporting

Playwright E2E runs now emit an [Odhin report](https://playwright-odhin-reports-1f6b7a95ad42468d7d90f7962fbe172f83b229.gitlab.io/#/) under `functional-output/tests/playwright-e2e/odhin-report/xui-playwright-e2e.html`.  
Key behaviour:

- Suite-specific Odhin filenames are used: `xui-playwright-e2e.html`, `xui-playwright-api.html`, `xui-playwright-integration.html`.
- Jenkins automatically publishes the HTML artefact for preview/AAT functional and nightly cross-browser jobs.
- Run info shows project, release, environment, branch and worker count. Branch defaults to the current git branch (`git rev-parse --abbrev-ref HEAD`) and can be overridden via `PLAYWRIGHT_REPORT_BRANCH` or `GIT_BRANCH`. Other overrides: `PLAYWRIGHT_REPORT_PROJECT`, `PLAYWRIGHT_REPORT_RELEASE`, `TEST_TYPE`, `FUNCTIONAL_TESTS_WORKERS`.
- Skipped tests are included in totals; the reporter is patched locally so the dashboard reflects them even when retries are enabled.
- Chromium runs keep the Playwright trace, failure screenshot and video when a test fails; successful runs discard these artefacts to limit noise.
- A flake summary is printed at the end of Playwright runs by `playwright_tests_new/common/reporters/flake-gate.reporter.cjs` (counts flaky, retry-pass and failed tests).
- Flake gate is currently report-only in all environments; it does not fail the run.
- `PW_ENABLE_FLAKE_GATE` is currently not enforced by the reporter.
- Optional flake thresholds `PW_MAX_FLAKY_TESTS` (default `20`) and `PW_MAX_FLAKY_RATE` (default `0.2`, meaning 20%) are used for reporting output only.

### Playwright diagnostics artifacts in Jenkins

Playwright-capable pipeline stages archive diagnostics for troubleshooting and triage:

- `functional-output/tests/**/odhin-report/**/*`
- `test-results/**/*`
- `functional-output/tests/playwright-diagnostics/failure-data/**/*`
- `**/failure-data.json`

`failure-data.json` files attached by Playwright tests are also copied into
`functional-output/tests/playwright-diagnostics/failure-data/` with flattened filenames so they are easier to find in Jenkins artifacts.

### Playwright locator audit

Use `yarn lint:playwright:locators` to scan E2E page objects and tests for brittle selector patterns.

- Default mode is report-only and does not fail the run.
- To fail on findings, run with `STRICT_PLAYWRIGHT_LOCATORS=true`.
- Inline opt-out marker `locator-audit:ignore-line` is supported.
- File-level opt-out marker `locator-audit:ignore-file` is supported.

What it validates:

- `no-xpath-engine`: flags `locator('xpath=...')`.
- `no-text-engine`: flags `locator('text=...')`.
- `css-descendant-chain`: flags long descendant class chains used in `locator(...)`, for example selectors with repeated `.classA .classB .classC ...` patterns.

Scope:

- Scans TypeScript files under:
- `playwright_tests_new/E2E/page-objects`
- `playwright_tests_new/E2E/test`

What it does not validate:

- It does not parse runtime DOM.
- It does not verify selector correctness against the live app.
- It does not auto-fix selectors; it reports candidate high-risk patterns for manual review.

### Playwright stability conventions

- For CCD wizard/event flows that may require a variable number of steps, use `createCasePage.clickSubmitAndWait(...)` instead of hardcoded `clickContinueMultipleTimes(...)` + direct submit click.
- API diagnostics intentionally suppress known benign background client errors to reduce noise in failure reporting (for example `GET /api/organisation` `403` and `GET /data/internal/cases/:id` `400`).
- If branch metadata is wrong in local Odhin reports, override explicitly with `PLAYWRIGHT_REPORT_BRANCH=<your-branch> yarn test:playwrightE2E`.

### Parallelism

Playwright worker count scales with available CPU cores in both local and CI runs (approx. half of the logical cores, capped at 8).
Set `FUNCTIONAL_TESTS_WORKERS` to override this behaviour explicitly.

### Integration local progress timer

For Playwright integration runs outside CI, periodic live progress logging is enabled by default:

- `PW_LIVE_TEST_TIMER=1`
- `PW_LIVE_TEST_TIMER_INTERVAL_MS=30000`

You can override either variable explicitly in your local shell.

## Running Consumer Driven Contract tests (pact)

Run `yarn test-pact` to execute the Pact tests
For publishing the pacts to broker execute `yarn publish-pact`

## Integration Documentation

https://tools.hmcts.net/confluence/display/EUI/EXUI+Low+Level+Design

## Further help

To get more help on the Angular CLI use `ng help` or go and check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Logger errors and warnings

Extended version of script below:

(https://robferguson.org/blog/2017/09/09/a-simple-logging-service-for-angular-4/)

END
Trigger2 Trigger3 Trigger4
