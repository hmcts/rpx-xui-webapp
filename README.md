# Manage Cases

To run the application locally, populate the repo-root `.env` from `.env.example` first.

Quick setup:

```bash
yarn env:populate:aat
```

The generated `.env` keeps safe placeholders for local-only values and fills only secrets tagged with `e2e=<ENV_VAR_NAME>` in Azure Key Vault. Review any remaining blank values before you run local-only flows.

Then follow:

## How environment loading works now

This repo now uses the repo-root [`.env.example`](./.env.example) as the single template for local environment setup, and the repo-root [`.env`](./.env) as the generated runtime file.

The design goal is simple:

- one local `.env` file for the repo
- one template that shows the full supported env catalogue
- Azure Key Vault as the source of truth for secret values used by local setup and Jenkins
- deterministic loading for Node, Pact, and Playwright commands regardless of whether they start from the repo root or from `api/`

### Source of truth

There are four important files:

- [`.env.example`](./.env.example)
  The full env template. It contains every supported key, safe defaults, and placeholders only. No live secrets should be committed here.
- [`.env`](./.env)
  The generated local runtime file. This is ignored by git and is populated from Azure Key Vault plus local defaults.
- [`api/.env.defaults`](./api/.env.defaults)
  Fallback defaults for the Node/API layer. This file is still used by `dotenv-extended` for API and Pact commands.
- [`api/setup-runtime-env.js`](./api/setup-runtime-env.js)
  The small bootstrap file that makes sure Node-side commands always load the correct `.env`, `.env.defaults`, and config directory.

### Populate flow

Use one of the repo-level commands:

```bash
yarn env:populate:aat
yarn env:populate:demo
```

These call [`scripts/populate-env-from-keyvault.sh`](./scripts/populate-env-from-keyvault.sh), which:

1. uses [`.env.example`](./.env.example) as the template
2. looks up Azure Key Vault secrets tagged with `e2e=<ENV_VAR_NAME>`
3. writes the resulting values into the repo-root [`.env`](./.env)
4. preserves blank values for keys that are intentionally local-only
5. derives a few aliases/defaults after secret retrieval so the generated `.env` is complete enough for current test and API flows

The older compatibility commands:

```bash
yarn env:populate:playwright:aat
yarn env:populate:playwright:demo
```

still work, but they now point at the same repo-root template and generated `.env`.

### Why the API and Pact layer need special handling

The Node/API layer does not read only one file from one directory:

- the real runtime values should come from the repo-root [`.env`](./.env)
- the fallback defaults still live in [`api/.env.defaults`](./api/.env.defaults)

That becomes awkward because some commands run from the repo root and some run from inside `api/`.

Without explicit setup, `dotenv-extended/config` resolves files relative to the current working directory. That means:

- a command started in the repo root naturally sees `./.env`
- a command started in `api/` naturally looks for `api/.env`
- this repo does not use `api/.env` as the source of truth

So if we did nothing, local behaviour would depend on where the process started, which is exactly the kind of drift that leads to “works locally but not in Jenkins” failures.

### How Node, API, and Pact commands resolve env now

For Node-side commands, the scripts first preload [`api/setup-runtime-env.js`](./api/setup-runtime-env.js), then load `dotenv-extended/config`.

The bootstrap file sets:

- `DOTENV_CONFIG_PATH` to the repo-root [`.env`](./.env)
- `DOTENV_CONFIG_DEFAULTS` to [`api/.env.defaults`](./api/.env.defaults)
- `NODE_CONFIG_DIR` to [`config/`](./config)
- `NODE_CONFIG_ENV=development` if not already set
- `FEATURE_APP_INSIGHTS_ENABLED=false` if not already set

After that, `dotenv-extended/config` loads env values in the normal way, but now with the right paths already defined.

This gives us the best balance for this repo:

- the scripts still look close to the historical `dotenv-extended/config` pattern
- the path logic is kept in one place
- the same setup works from the repo root and from `api/`
- we avoid scattering `DOTENV_CONFIG_PATH=... DOTENV_CONFIG_DEFAULTS=...` across `package.json`

### Command behaviour summary

Repo-level env generation:

- `yarn env:populate:aat` generates repo-root [`.env`](./.env) from AAT Key Vault using [`.env.example`](./.env.example)
- `yarn env:populate:demo` does the same for demo

Node/API startup and tests:

- `yarn start:node:development` runs the API with `NODE_CONFIG_ENV=development`
- `yarn test:node:local` runs Node tests against the repo-root [`.env`](./.env) plus [`api/.env.defaults`](./api/.env.defaults)
- `yarn test-pact` and `yarn publish-pact` use the same bootstrap path resolution before Pact code runs
- `cd api && yarn start`, `cd api && yarn test`, and `cd api && yarn watch` also resolve the repo-root [`.env`](./.env) correctly

### Why this matters

This setup was introduced so that:

- the repo-root [`.env.example`](./.env.example), current test user catalogue, generated [`.env`](./.env), and Azure Key Vault all stay aligned
- local developers and Jenkins consume the same secret source
- API, Pact, and Playwright flows stop depending on accidental current-working-directory behaviour
- retiring older external env catalogues does not leave hidden credentials or config expectations behind elsewhere

### What this does not do

This setup does not change Angular application logic or production behaviour by itself.

It only changes how local and test-side commands discover environment variables and defaults.

### Troubleshooting env loading

- If `yarn env:populate:*` leaves a key blank, either the key is intentionally local-only or the matching Azure Key Vault secret/tag does not exist yet.
- If a Node/API/Pact command starts with unexpected config, check that the repo-root [`.env`](./.env) exists and was generated from the correct environment.
- If you are comparing values, compare the generated [`.env`](./.env) against [`.env.example`](./.env.example), not against an old `api/.env` pattern.
- If you add a new env key, update [`.env.example`](./.env.example) and ensure the Azure Key Vault secret is tagged with `e2e=<ENV_VAR_NAME>` if it should be populated automatically.

## Startup the Node service locally

1. Make sure you have `local-development.json` within `/config`; if you do not, get it from an XUI team member.
2. Start the Node service locally using:
   `yarn start:node:development`

Explanation:

The API package now reads the repo-root `.env`, with `api/.env.defaults` acting as the fallback defaults file.
`NODE_CONFIG_ENV=development` selects `config/local-development.json`.
See [How environment loading works now](#how-environment-loading-works-now) for the full bootstrap flow.

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

Use the repo-root `.env.example` as the local source of truth for developer setup.

Recommended flow:

```bash
yarn env:populate:aat
```

Alternative environments:

```bash
yarn env:populate:demo
yarn env:populate aat /tmp/xui.env .env.example
```

Notes:

- `yarn env:populate:*` fills only Key Vault secrets tagged with `e2e=<ENV_VAR_NAME>`.
- Blank values left in `.env` are local-only overrides and should be set manually only when your workflow needs them.
- `.env` is ignored by git and must not be committed.
- The older `yarn env:populate:playwright:*` commands are kept as compatibility aliases and now use the same repo-root `.env.example`.

You need to setup secrets locally before you run the project. Why? - When you push this application
up through AKS deployed through Flux to AAT, ITHC and Prod, the application will take in the secrets on these environments.

The developer needs to set these up locally, so that the developer can see any issues early in
the development process, and not when the application is placed up onto the higher AKS environments.

To setup the secrets locally do the following:

Note that Mac OS Catalina introduced a new feature that overlaps and reinforces the filesystem,
therefore you will not be able to make changes in the root directory of your file system, hence there are different
ways to setup secrets, Pre Catalina and Post Catalina, note that the Post Catalina way should work
for all operating system, but I have yet to try this.

####MAC OS - Pre Catalina

1. Create a Mount point on your local machine<br/>
   Create the folder: `/mnt/secrets/rpx`
2. In this folder we create a file per secret.
   ie.
   We create the file postgresql-admin-pw (no extension).
   Within the file we have one line of characters which is the secret.

####MAC OS - Post Catalina

1. Create a Mount point on your local machine within the Volumes folder<br/>
   Create the folder: `/Volumes/mnt/secrets/rpx`
2. In this folder we create a file per secret.
   ie.
   We create the file postgresql-admin-pw (no extension).
   Within the file we have one line of characters which is the secret.
3. If you want to test the secrets locally override the default mountPoint with the following additional option added to .addTo
   ie.
   `propertiesVolume.addTo(secretsConfig, { mountPoint: '/Volumes/mnt/secrets/' });`

Note that this is connected into the application via the following pieces of code:

```javascript
keyVaults: rpx: secrets: -postgresql - admin - pw - appinsights - instrumentationkey - tc;
```

which in turn uses `propertiesVolume.addTo()`

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
