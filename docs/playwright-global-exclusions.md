# Playwright Global Test Exclusions

EXUI-4584 adds a single Key Vault-backed exclusion switch for Playwright API, E2E, integration, and cross-browser E2E runs.

Use it when one failing tagged area is blocking every PR and the failure cannot be fixed immediately. It is a temporary operational control, not a replacement for fixing or improving the test.

## How It Works

- Key Vault secret: `xui-playwright-global-excluded-tags`
- Runtime env var: `PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS`
- Clear/no-op value: `@none`
- Bypass env var: `PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES=true`

The global value is additive:

1. The suite reads its checked-in default excludes.
2. The suite applies any suite-specific runtime override.
3. The suite adds matching tags from `PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS`.

Existing suite controls keep their current behavior:

- `API_PW_EXCLUDED_TAGS_OVERRIDE`
- `E2E_PW_EXCLUDED_TAGS_OVERRIDE`
- `INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE`

Those suite-specific override variables still replace that suite's checked-in defaults. The global exclusions are then added on top.

## Suite Scope

The global value can contain tags for multiple suites. Each suite only applies tags in its own namespace.

| Suite             | Applied global tags              | Ignored by that suite                    |
| ----------------- | -------------------------------- | ---------------------------------------- |
| API               | `@svc-*`, `@wa-action`           | `@e2e-*`, `@integration-*`               |
| E2E               | `@e2e`, `@e2e-*`                 | `@svc-*`, `@wa-action`, `@integration-*` |
| Integration       | `@integration`, `@integration-*` | `@svc-*`, `@wa-action`, `@e2e-*`         |
| Cross-browser E2E | `@e2e`, `@e2e-*`                 | `@svc-*`, `@wa-action`, `@integration-*` |

If a tag appears to belong to the current suite but is not declared in that suite's tag-filter JSON, Playwright fails fast during config loading. This catches typoed global exclusions before CI silently skips the wrong scope.

## Add A Temporary Global Exclusion

Pick the narrowest tag that covers the failing test area.

Examples:

```bash
# API work allocation failures
az keyvault secret set \
  --vault-name rpx-aat \
  --name xui-playwright-global-excluded-tags \
  --value '@svc-work-allocation' \
  --tags e2e=PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS purpose=playwright-global-exclusions jira=EXUI-4584

# Multiple suites while an incident is active
az keyvault secret set \
  --vault-name rpx-aat \
  --name xui-playwright-global-excluded-tags \
  --value '@svc-work-allocation,@e2e-manage-tasks,@integration-manage-tasks' \
  --tags e2e=PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS purpose=playwright-global-exclusions jira=EXUI-4584
```

Repeat the same update for each affected non-prod vault, for example `rpx-aat`, `rpx-demo`, `rpx-ithc`, and `rpx-perftest`.

## Remove The Global Exclusion

Set the value back to `@none` after the failing test is fixed and verified.

```bash
az keyvault secret set \
  --vault-name rpx-aat \
  --name xui-playwright-global-excluded-tags \
  --value '@none' \
  --tags e2e=PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS purpose=playwright-global-exclusions jira=EXUI-4584
```

## Bypass For A Fixing PR

When a PR is fixing the excluded test, run Jenkins with:

```text
PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES=true
```

This disables only the Key Vault-backed global layer. Checked-in defaults and suite-specific run parameters still apply.

Local equivalent:

```bash
PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES=true yarn test:api:pw
PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES=true yarn test:playwrightE2E
PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES=true yarn test:playwright:integration
```

## Local Testing

You can test the behavior without changing Key Vault:

```bash
# Add an API global exclusion locally
PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS=@svc-work-allocation yarn test:api:pw

# Add one E2E and one integration exclusion. Each suite applies only its own tag.
PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS='@e2e-manage-tasks @integration-manage-tasks' yarn test:playwrightE2E
PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS='@e2e-manage-tasks @integration-manage-tasks' yarn test:playwright:integration

# Bypass the global layer
PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS=@svc-work-allocation PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES=true yarn test:api:pw
```

Set `PLAYWRIGHT_LOG_TAG_FILTERS=true` locally to print the resolved include/exclude state during config load. CI prints the same summary automatically.

## Developer Rules

- Always create or reuse a Jira ticket for the failing test before adding a global exclusion.
- Prefer feature/service tags such as `@svc-work-allocation` or `@e2e-manage-tasks`.
- Do not use broad suite tags unless there is explicit test-lead approval.
- Keep the global list short and remove entries as soon as fixes merge.
- If a new area needs global exclusion support, add the tag to that suite's `tag-filter.json` and extend the suite scope pattern in the Playwright config.

## Files That Own This

- Resolver: `playwright-config-utils.ts`
- API config: `playwright.config.ts`
- E2E config: `playwright.e2e.config.ts`
- Integration config: `playwright.integration.config.ts`
- Cross-browser E2E config: `playwright-nightly.config.ts`
- API tag catalog: `playwright_tests_new/api/service-tag-filter.json`
- E2E tag catalog: `playwright_tests_new/E2E/tag-filter.json`
- Integration tag catalog: `playwright_tests_new/integration/tag-filter.json`
- Jenkins wiring: `Jenkinsfile_CNP`, `Jenkinsfile_nightly`
