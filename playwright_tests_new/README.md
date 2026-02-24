# Playwright Test Suite

This directory contains both **API tests** (`node-api` project) and **E2E UI tests** for the EXUI application.

## Table of Contents

- [API Tests](#api-tests)
- [E2E Tests](#e2e-tests)
- [Session Management](#session-management)

---

## API Tests

API tests are located in `api/` and replace the legacy Mocha `yarn test:api` run.

### Prerequisites

- Node 20+, Yarn installed
- Environment variables (can go into `.env`):
  - `TEST_URL` (e.g. `https://manage-case.aat.platform.hmcts.net/`)
  - `TEST_ENV` (`aat`/`demo`)
  - IDAM/S2S endpoints used by `@hmcts/playwright-common`: `IDAM_WEB_URL`, `IDAM_TESTING_SUPPORT_URL`, `S2S_URL`, optional `S2S_SECRET`
- User credentials are read from `common/apiTestConfig.ts` for the selected `TEST_ENV`

### Runtime Environment Knobs

Use environment-level configuration to tune diagnostics/retries without code changes.

| Variable                              | Default | Purpose                                                                                                                           |
| ------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `API_SLOW_THRESHOLD_MS`               | `5000`  | Slow API threshold (ms) used by API and E2E fixtures for failure diagnosis and slow-call annotations/logging.                     |
| `CASE_REFERENCE_RESOLVE_API_ATTEMPTS` | `3`     | Max attempts for `/api/globalsearch/results` when resolving case references in E2E helpers (retries transient `429/502/503/504`). |

Invalid or non-positive values for these variables fall back to the defaults above.

### Running API Tests

```bash
# Smoke the API suite
yarn test:api:pw

# Capture raw V8 coverage + Playwright attachments
yarn test:api:pw:coverage
```

### API Service Tag Filtering

- API suites are tagged per downstream service using Playwright tags (for example `@svc-ccd`, `@svc-work-allocation`).
- Default excluded tags are read from `playwright_tests_new/api/service-tag-filter.json` (`excludedTags` array).
- Override excludes at runtime with `API_PW_EXCLUDED_TAGS_OVERRIDE`.
- Optionally run only selected service tags with `API_PW_INCLUDE_TAGS`.
- Tag inputs accept comma or space separated values, with or without `@`.

```bash
# Exclude one service for this run (overrides file excludes)
API_PW_EXCLUDED_TAGS_OVERRIDE=@svc-ccd yarn test:api:pw

# Run only work allocation API tests
API_PW_INCLUDE_TAGS=@svc-work-allocation yarn test:api:pw:coverage
```

### API Test Parallelism

- In CI, Playwright runs with **8 workers** for predictable parallelism
- Locally, worker count is auto-sized; override with `--workers` flag

### API Authentication Model

- **Default behavior**: `utils/auth.ts` attempts token/S2S login using `IdamUtils.generateIdamToken` (password grant) plus `ServiceAuthUtils.retrieveToken`
- **Fallback**: If token bootstrap fails or env vars are absent, falls back to `/auth/login` form flow and caches storage state under `functional-output/tests/playwright-api/storage-states/<env>/<role>.json`
- **Required for token bootstrap**: `IDAM_WEB_URL`, `IDAM_TESTING_SUPPORT_URL`, `IDAM_CLIENT_ID` (or `SERVICES_IDAM_CLIENT_ID`), `IDAM_SECRET`, `S2S_URL`, `S2S_MICROSERVICE_NAME` (or `MICROSERVICE`)
- **XSRF handling**: Set `API_AUTO_XSRF=true` to auto-inject the `X-XSRF-TOKEN` header from stored cookies
- **Correlation IDs**: Every API client sets `X-Correlation-Id` per request (UUID) for traceability

### API Reports

- Odhin report: `functional-output/tests/playwright-api/odhin-report/xui-playwright.html`
- Copied to `functional-output/tests/api_functional/odhin-report/` for Jenkins publishing
- API call logs attached automatically per test as `node-api-calls.json`
- Jenkins archives Playwright diagnostics artifacts including:
- `functional-output/tests/**/odhin-report/**/*`
- `test-results/**/*`
- `functional-output/tests/playwright-diagnostics/failure-data/**/*`
- `**/failure-data.json`

### API Coverage

- `test:api:pw:coverage` wraps Playwright run in `c8` to collect V8 coverage for test code (not the Node API service)
- Server-side Node coverage stays in Mocha + c8 (`yarn coverage:node`)
- Coverage output: `./reports/tests/coverage/api-playwright`

### What API Tests Cover

- **Unauthenticated routes**: Assert 401 + `{ message: 'Unauthorized' }` body
- **Node shell**: Verify auth status, user details payload, feature flags
- **CCD/case-share**: Check jurisdictions, work-basket inputs, profiles, organizations
- **Postcode lookup**: Assert result/header structure and DPA fields
- **Work Allocation**: Locations, catalogues, task search, dashboards, negative actions, caseworker endpoints
- **Global search/ref-data**: Services, results, proxy smoke, WA/staff supported jurisdictions, role-access/AM checks

---

## E2E Tests

E2E UI tests are located in `E2E/` and test the full user interface workflows.

### Running E2E Tests

```bash
# Run all E2E tests
yarn test:playwrightE2E

# Run specific test file
npx playwright test E2E/test/documentUpload/documentUpload.positive.spec.ts --project chromium

# Run with single worker (local development)
npx playwright test --project chromium --workers=1

# Clean sessions and re-run
rm -rf .sessions && npx playwright test
```

### Flake Gate Reporter

Playwright runs include `playwright_tests_new/common/reporters/flake-gate.reporter.cjs`.

- Default mode: report-only (prints flaky summary, does not fail run).
- `PW_ENABLE_FLAKE_GATE` is currently not enforced by the reporter.
- `PW_MAX_FLAKY_TESTS` (default `20`) and `PW_MAX_FLAKY_RATE` (default `0.2`) are reporting thresholds only.

### Locator Audit

```bash
# report-only mode (default)
yarn lint:playwright:locators

# strict mode (fail on findings)
STRICT_PLAYWRIGHT_LOCATORS=true yarn lint:playwright:locators
```

The locator audit script scans for high-risk locator patterns in:

- `playwright_tests_new/E2E/page-objects`
- `playwright_tests_new/E2E/test`

Opt-outs are available for justified cases:

- `locator-audit:ignore-line`
- `locator-audit:ignore-file`

Validation rules:

- `no-xpath-engine`: flags `locator('xpath=...')`.
- `no-text-engine`: flags `locator('text=...')`.
- `css-descendant-chain`: flags long descendant class-chain selectors inside `locator(...)`.

What this command is for:

- Fast static guardrail to highlight brittle locator patterns early in PRs.
- It reports risky patterns but does not execute tests or inspect live DOM.

---

## Integration Tests

Integration tests are located in `integration/` and test Angular application integration with mocked backend APIs.

### Running Integration Tests

```bash
# Run all integration tests
yarn test:playwright:integration

# Run specific integration test file
npx playwright test integration/test/caseList/caseList.positive.spec.ts --config=playwright.integration.config.ts

# Run with specific browser
npx playwright test --config=playwright.integration.config.ts --project=chromium
```

### Integration Test Structure

- **Tests**: `integration/test/` - Test specifications organized by feature
- **Mocks**: `integration/mocks/` - Mock response builders for API routes
- **Configuration**: Frontend mocking uses Playwright's route interception to mock backend API responses

### Mock Management

Integration tests use route interception with mock builders:

```ts
import { buildCaseListMock } from '../../mocks/caseList.mock';

// Mock API response
await page.route('**/api/cases**', async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify(buildCaseListMock(124)),
  });
});
```

---

### E2E Test Structure

- **Page Objects**: `E2E/page-objects/pages/exui/` - Reusable page interaction methods
- **Utilities**: `E2E/utils/` - Table parsing, user management, configuration
- **Tests**: `E2E/test/` - Test specifications organized by feature
- **Fixtures**: `E2E/fixtures.ts` - Custom Playwright fixtures
- **Welsh Language**: Welsh language coverage now lives in `playwright_tests_new/integration/test/welshLanguage/` (removed from E2E)

### Table Parsing (Playwright Common)

Use the table parser from `@hmcts/playwright-common` for **all** tables. This avoids brittle locators and standardizes table handling across tests.

Rules:

- Prefer `tableUtils.parseDataTable()` for normal tables with headers.
- Use `tableUtils.parseWorkAllocationTable()` for WA task tables.
- Do not assert `table.length === 0` for empty tables. Empty state rows are returned as a single row.

Example:

```ts
// Case flags table
await caseDetailsPage.selectCaseDetailsTab('Flags');
const table = await tableUtils.parseDataTable(await caseDetailsPage.getTableByName('Case level flags'));
const visibleRows = table.filter((row) => Object.values(row).join(' ').trim() !== '');
expect(visibleRows.length).toBeGreaterThan(0);
```

---

## Session Management

### Overview

**Both E2E and API tests** use **lazy session loading** with **unified storage** to minimize execution time and prevent redundant logins when running in parallel CI pipelines. Sessions are captured on-demand and shared across parallel test workers.

### Unified Storage Location

```
.sessions/
├── xui_auto_test_user_solicitor@mailinator.com.storage.json   # E2E browser session
├── api-aat-solicitor.storage.json                              # API session (same user)
├── employment_service@mailinator.com.storage.json              # E2E browser session
├── api-aat-caseOfficer_r1.storage.json                         # API session
└── *.lock                                                       # Coordination lock files
```

**Why unified storage matters:**

- API and E2E tests often use the **same user credentials** (e.g., `solicitor`)
- Without unified storage, both would log in the same user independently
- **With unified storage + prefixing**, sessions are coordinated but namespaced:
  - E2E sessions: `{email}.storage.json`
  - API sessions: `api-{env}-{role}.storage.json`
- Lock files coordinate across **both test suites** running in parallel

### How It Works

#### 1. Lazy Loading

- Sessions are **NOT** pre-captured during global setup
- Each test specifies which user it needs via `ensureSession()` (E2E) or fixtures (API)
- Sessions are captured only when first requested
- Cached sessions are reused across tests and workers

#### 2. Session Freshness (15-minute TTL)

- Sessions are valid for **15 minutes** from capture time
- `ensureSession()` checks session freshness in `test.beforeAll()` hook
- Stale sessions are automatically refreshed
- Fresh sessions are reused across all tests in the suite

#### 3. CI Parallel Execution (8 Workers per Test Suite)

- Multiple workers can safely request the same user session
- **Filesystem-based lock mechanism** prevents concurrent logins for the same user
- Locks coordinate across **all Playwright worker processes** (API + E2E) using `proper-lockfile`
- When Worker A logs in user X, Workers B-H **and parallel API tests** wait for lock release and reuse the session
- After acquiring lock, workers recheck freshness to ensure session is still valid

### Usage in E2E Tests

```typescript
import { ensureSession, loadSessionCookies } from '../../../common/sessionCapture';

test.describe('My Test Suite', () => {
  test.beforeAll(async () => {
    // Lazy capture: only log in when this test suite runs
    await ensureSession('SOLICITOR');
  });

  test.beforeEach(async ({ page }) => {
    // Load cached session cookies
    const { cookies } = loadSessionCookies('SOLICITOR');
    if (cookies.length) {
      await page.context().addCookies(cookies);
    }
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

### Available User Identifiers

- `SOLICITOR` - Standard solicitor user for divorce/civil cases
- `SEARCH_EMPLOYMENT_CASE` - Employment tribunal case user
- `STAFF_ADMIN` - Administrative staff user
- `USER_WITH_FLAGS` - User with case flags enabled

### File Naming Convention

| Test Type      | User Role      | File Pattern                    | Example                                                    |
| -------------- | -------------- | ------------------------------- | ---------------------------------------------------------- |
| **E2E**        | Any            | `{email}.storage.json`          | `xui_auto_test_user_solicitor@mailinator.com.storage.json` |
| **API**        | solicitor      | `api-{env}-{role}.storage.json` | `api-aat-solicitor.storage.json`                           |
| **API**        | caseOfficer_r1 | `api-{env}-{role}.storage.json` | `api-aat-caseOfficer_r1.storage.json`                      |
| **Lock files** | Any            | `{filename}.lock`               | `xui_auto_test_user_solicitor@mailinator.com.lock`         |

### Cross-Suite Coordination in CI

When **API and E2E tests run in parallel** (common in CI pipelines):

```
┌─────────────────────────────────────────────────────────────────┐
│                       CI Pipeline                                │
│                                                                  │
│  ┌──────────────────────┐        ┌──────────────────────┐      │
│  │  E2E Tests            │        │  API Tests            │      │
│  │  (8 workers)          │        │  (8 workers)          │      │
│  │  Need: solicitor      │        │  Need: solicitor      │      │
│  └──────────┬────────────┘        └──────────┬────────────┘     │
│             │                                 │                  │
│             │  Same user credentials!         │                  │
│             └────────────┬────────────────────┘                  │
│                          ▼                                        │
│              ┌──────────────────────┐                           │
│              │   .sessions/          │                           │
│              │  📄 xui_auto_test...  │  ← E2E browser session   │
│              │  📄 api-aat-solicitor │  ← API HTTP session      │
│              │  🔒 *.lock            │  ← Coordination locks    │
│              └──────────────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

#### Timeline Example

```
Time: 0s
E2E Worker 1: Acquires xui_auto_test_user_solicitor@mailinator.com.lock
            → Logs in solicitor → Creates session file
API Worker 1: Waiting on api-aat-solicitor.lock...

Time: 2s
E2E Worker 1: Releases lock
API Worker 1: Acquires api-aat-solicitor.lock
            → Checks if session fresh? YES (2s old < 15min)
            → Reuses existing IDAM token from E2E login
            → Creates api-aat-solicitor.storage.json ✅

Result: ONE login instead of two! ⚡
```

### Benefits

✅ **No duplicate logins** - API and E2E coordinate via filesystem locks  
✅ **Faster CI execution** - Single login per user across all test suites  
✅ **Rate limit safe** - No concurrent logins to same IDAM user  
✅ **Same principles** - Both use filesystem locks + 15min TTL  
✅ **Namespace separation** - `api-` prefix prevents E2E/API collision  
✅ **Cross-worker safe** - `proper-lockfile` coordinates across all processes  
✅ **60-70% reduction** in login time for typical test runs

### Performance Comparison

#### Before (Separate Storage + No Coordination)

```
E2E Tests:  SOLICITOR login (30s) + other users...
API Tests:  solicitor login (30s) + other users...  ← DUPLICATE!
Total:      60s+ wasted on duplicate logins
```

#### After (Unified Storage + Lock Coordination)

```
E2E Worker 1:  SOLICITOR login (30s) → session stored
API Workers:   Reuse session (0s) → extract token
Total:         30s for both test suites! ⚡
```

### Example Scenarios

#### Single Worker (Local Development)

```bash
npx playwright test documentUpload.spec.ts --project chromium --workers=1
```

- Logs in SOLICITOR once (~30s)
- Logs in SEARCH_EMPLOYMENT_CASE once (~30s)
- Total login time: ~60s

#### 8 Workers (CI Pipeline)

```bash
npx playwright test --project chromium --workers=8
```

- Worker 1 logs in SOLICITOR → stores session
- Workers 2-8 wait for lock → reuse SOLICITOR session
- Total login time per user: ~30-45s (shared across all workers)

#### Parallel Test Suites (CI Pipeline)

```bash
# Running simultaneously:
npx playwright test --project chromium --workers=8  # E2E tests
npx playwright test --project node-api --workers=8   # API tests
```

- E2E Worker 1 logs in solicitor → stores session
- API workers detect fresh session → reuse IDAM token
- **Total login time: ~30s (not 60s!)** ⚡

### Session Storage

Sessions are stored in `.sessions/` directory with filesystem-based locking:

```
.sessions/
  ├── xui_auto_test_user_solicitor@mailinator.com.storage.json    # E2E session
  ├── xui_auto_test_user_solicitor@mailinator.com.lock            # E2E lock file
  ├── api-aat-solicitor.storage.json                              # API session (same user!)
  ├── api-aat-solicitor.lock                                       # API lock file
  ├── employment_service@mailinator.com.storage.json              # E2E session
  ├── employment_service@mailinator.com.lock                       # E2E lock file
  ├── api-aat-caseOfficer_r1.storage.json                         # API session
  └── api-aat-caseOfficer_r1.lock                                  # API lock file
```

**Lock file behavior:**

- Created when a worker/test suite attempts to log in
- Held during login process (2-5 seconds)
- Released in `finally` block to prevent deadlocks
- Other workers wait up to 30 retries × 1-5s = ~2.5 minutes max
- After lock released, waiting workers recheck session freshness
- Stale threshold: 60 seconds (if lock held longer, considered abandoned)

### Implementation Details

#### E2E Session Capture ([common/sessionCapture.ts](common/sessionCapture.ts))

```typescript
// Filesystem lock coordinates across all workers
const lockFilePath = path.join(sessionsDir, `${email}.lock`);
const release = await lockfile.lock(lockFilePath, {
  retries: { retries: 30, minTimeout: 1000, maxTimeout: 5000 },
  stale: 60000,
});

try {
  // Recheck freshness after acquiring lock
  if (isSessionFresh(sessionPath)) {
    logger.info('Another worker logged in, reusing session');
    return;
  }

  // Login and save session
  await browser.newContext().storageState({ path: sessionPath });
} finally {
  await release(); // Always release lock
}
```

#### API Session Capture ([api/utils/auth.ts](api/utils/auth.ts))

```typescript
// Same approach: filesystem lock + freshness check
const lockFilePath = path.join(storageRoot, `api-${cacheKey}.lock`);
const release = await lockfile.lock(lockFilePath, {
  /* same config */
});

try {
  // Double-check freshness (E2E may have logged in this user)
  if (isStorageStateFresh(storagePath)) {
    return storagePath; // Reuse existing session
  }

  // Create new session via token bootstrap or form login
  await createStorageState(role);
} finally {
  await release();
}
```

### Troubleshooting

#### Session Expired During Test

If tests fail with authentication errors:

1. Delete the `.sessions/` directory
2. Re-run tests to capture fresh sessions

```bash
rm -rf .sessions && npx playwright test
```

#### Concurrent Login Issues

If multiple workers attempt to login simultaneously:

- The lock mechanism should handle this automatically
- Check logs for "Waiting for concurrent login to complete" messages
- If issues persist, reduce worker count temporarily

#### Session Not Refreshing

If a session appears stale but isn't refreshing:

1. Check session file timestamp: `ls -la .sessions/`
2. Verify 15-minute TTL hasn't been exceeded
3. Manually delete specific session file to force refresh

### Best Practices

1. **Always use `ensureSession()` in `beforeAll`** - Not in `beforeEach` to avoid redundant checks
2. **Load cookies in `beforeEach`** - Ensures each test starts with valid session
3. **Specify only required users** - Don't capture sessions you won't use
4. **Let sessions expire naturally** - Don't manually refresh unless necessary
5. **Use descriptive test names** - Helps identify which user a test requires

### Implementation Details

#### Lock Mechanism

```typescript
const LOGIN_LOCKS = new Map<string, Promise<void>>();

// Worker 1
LOGIN_LOCKS.set('login-SOLICITOR', loginPromise);
await loginPromise;

// Worker 2 (waits)
if (LOGIN_LOCKS.has('login-SOLICITOR')) {
  await LOGIN_LOCKS.get('login-SOLICITOR'); // Wait for Worker 1
  // Recheck if session is fresh after wait
}
```

#### Freshness Check

```typescript
export function isSessionFresh(
  sessionPath: string,
  maxAgeMs = 15 * 60 * 1000 // 15 minutes
): boolean {
  const stat = fs.statSync(sessionPath);
  const ageMs = Date.now() - stat.mtimeMs;
  return ageMs < maxAgeMs;
}
```

### Monitoring & Logging

Session operations are logged with structured metadata:

```json
{
  "service": "session-capture",
  "userIdentifier": "SOLICITOR",
  "operation": "ensure-session",
  "sessionPath": "/path/to/.sessions/user@example.com.storage.json"
}
```

Key operations logged:

- `session-capture` - New session being captured
- `ensure-session` - Session freshness check
- `load-session` - Loading existing session
- `persist-session` - Saving session to disk

### Configuration

Session TTL can be adjusted in `common/sessionCapture.ts`:

```typescript
// Default: 15 minutes
export function isSessionFresh(
  sessionPath: string,
  maxAgeMs = 15 * 60 * 1000 // Adjust here
);
```

---

## Key Files

### E2E Tests

- `common/sessionCapture.ts` - Session management with filesystem-based locking
- `E2E/fixtures.ts` - Test fixtures setup
- `E2E/utils/table.utils.ts` - Table parsing utilities
- `playwright.config.ts` - Playwright configuration

### API Tests

- `api/utils/auth.ts` - API authentication helper
- `api/data/testIds.ts` - Environment-driven test IDs
- `common/apiTestConfig.ts` - User credentials and configuration
