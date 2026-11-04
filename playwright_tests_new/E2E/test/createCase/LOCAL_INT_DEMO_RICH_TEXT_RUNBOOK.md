# Run the rich-text create-case test locally against int-demo

This runbook is for PR #5387 and:

```text
playwright_tests_new/E2E/test/createCase/createCaseWithRichTextFeature.spec.ts
```

The test creates data in shared int-demo. Do not use real case data, commit credentials, or paste passwords into tickets, chat, screenshots, traces, or reports.

## 1. Prerequisites

- Node.js and Yarn versions required by the repository
- GitHub access to `hmcts/rpx-xui-webapp`
- Approved HMCTS demo Key Vault access or an approved int-demo test account
- Chromium installed locally, or permission to run `yarn test:setup:playwright-install-chromium`
- A clean or safely backed-up working tree

```bash
cd /path/to/rpx-xui-webapp
git status --short
git branch --show-current
```

Stop if the working tree contains changes you have not saved.

## 2. Check out the PR branch

Use a separate worktree if you already work on another branch:

```bash
cd /path/to/PROJECTS
git -C rpx-xui-webapp fetch origin pull/5387/head
PR_WORKTREE="$(mktemp -d /tmp/rpx-xui-webapp-pr5387.XXXXXX)"
git -C rpx-xui-webapp worktree add "$PR_WORKTREE" FETCH_HEAD
cd "$PR_WORKTREE"
```

Alternatively, use an existing checkout after saving local work:

```bash
git fetch origin pull/5387/head
git switch --detach FETCH_HEAD
```

Confirm the expected test exists:

```bash
test -f playwright_tests_new/E2E/test/createCase/createCaseWithRichTextFeature.spec.ts
rg -n 'richTextMinArea:.*RichTextAreaMinField' playwright_tests_new/E2E/page-objects/pages/exui/createCase.locators.ts
rg -n 'maxAttempts: 1' playwright_tests_new/E2E/test/createCase/createCaseWithRichTextFeature.spec.ts
git log -1 --oneline
```

The `rg` check must find the actual rich-text contenteditable locator and the bounded single-attempt setup. If it does not, the checked-out PR head is stale and must not be used as validation evidence.

## 3. Install dependencies and Chromium

```bash
yarn install --immutable
```

If Chromium is not already installed:

```bash
yarn test:setup:playwright-install-chromium
```

## 4. Create the local demo environment file

Generate a local demo file using the repository Key Vault helper:

```bash
yarn env:populate:playwright:demo .env.demo
```

The generated file must contain these int-demo endpoint values:

```dotenv
TEST_ENV=demo
TEST_URL=https://manage-case-int.demo.platform.hmcts.net
IDAM_WEB_URL=https://idam-web-public.demo.platform.hmcts.net
IDAM_API_URL=https://idam-api.demo.platform.hmcts.net/o/token
IDAM_TESTING_SUPPORT_URL=https://idam-testing-support-api.demo.platform.hmcts.net
S2S_URL=http://rpe-service-auth-provider-demo.service.core-compute-demo.internal/testing-support/lease
ORG_USER_ASSIGNMENT_OAUTH2_SCOPE="openid profile roles"
```

Do not copy AAT secrets into `.env.demo`; use demo-specific secrets and users only.

The file must also contain approved int-demo credentials under these names:

```dotenv
BEFTA_MASTER_CASE_USERNAME=<approved-demo-test-user>
BEFTA_MASTER_CASE_PASSWORD=<approved-demo-test-password>
```

Check required keys without printing secrets:

```bash
node -e "const fs=require('fs'); const dotenv=require('dotenv'); const e=dotenv.parse(fs.readFileSync('.env.demo')); for (const k of ['TEST_ENV','TEST_URL','IDAM_WEB_URL','IDAM_API_URL','IDAM_TESTING_SUPPORT_URL','S2S_URL','BEFTA_MASTER_CASE_USERNAME','BEFTA_MASTER_CASE_PASSWORD']) console.log(k, e[k] ? 'set' : 'MISSING');"
```

Never commit `.env.demo`, `.env.aat`, or any local environment file.

## 5. Load demo configuration for each command

Define this function in the shell used for the commands below. It parses `.env.demo` as data, overrides inherited environment values for the child command, and preserves the command's exit status. Credentials remain in the child environment; do not source the generated file. Values in `.env.demo` take precedence over inherited values. Set the diagnostic flags on the commands below and leave those flags out of `.env.demo`.

```bash
run_demo() {
  node - "$@" <<'NODE'
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');
const dotenv = require('dotenv');
const demo = dotenv.parse(fs.readFileSync('.env.demo'));
const result = spawnSync('yarn', process.argv.slice(2), {
  env: { ...process.env, ...demo },
  stdio: 'inherit',
  shell: false,
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
NODE
}
run_demo node -e 'console.log("TEST_ENV=" + process.env.TEST_ENV); console.log("TEST_URL=" + process.env.TEST_URL);'
```

Expected output:

```text
TEST_ENV=demo
TEST_URL=https://manage-case-int.demo.platform.hmcts.net
```

Do not override only `TEST_URL` while retaining AAT values from `.env`; that mixes AAT IDAM/S2S configuration with int-demo.

## 6. Run the focused test

Run once with one worker and no test retry while diagnosing failures:

```bash
HEAD=true \
PLAYWRIGHT_SKIP_INSTALL=true \
PW_E2E_RETRIES=0 \
run_demo test:playwrightE2E -- \
playwright_tests_new/E2E/test/createCase/createCaseWithRichTextFeature.spec.ts \
--workers=1
```

If int-demo is known to take longer to populate the jurisdiction, case-type, or event dropdowns, increase only this create-case journey's load budget:

```bash
PW_CREATE_CASE_LOAD_TIMEOUT_MS=120000 \
HEAD=true PLAYWRIGHT_SKIP_INSTALL=true PW_E2E_RETRIES=0 \
run_demo test:playwrightE2E -- \
playwright_tests_new/E2E/test/createCase/createCaseWithRichTextFeature.spec.ts \
--workers=1
```

The default is 30 seconds. This setting applies to the three dropdown readiness waits and the navigation after Start; it does not increase the global test timeout or retry failed setup.

Expected successful result when the checked-out PR head and int-demo definition are available:

```text
2 passed
```

If the form is missing either rich-text field, stop with the schema/environment failure described below; do not count a timeout as a successful run.

The two tests validate rich-text markup surviving case creation, the create-case history event, and minimum-length validation.

## 7. Run one scenario

Minimum-length validation:

```bash
HEAD=true PLAYWRIGHT_SKIP_INSTALL=true PW_E2E_RETRIES=0 \
run_demo test:playwrightE2E -- \
playwright_tests_new/E2E/test/createCase/createCaseWithRichTextFeature.spec.ts \
-g "minimum length" --workers=1
```

Rich-text persistence:

```bash
HEAD=true PLAYWRIGHT_SKIP_INSTALL=true PW_E2E_RETRIES=0 \
run_demo test:playwrightE2E -- \
playwright_tests_new/E2E/test/createCase/createCaseWithRichTextFeature.spec.ts \
-g "formatting is retained" --workers=1
```

## 8. Interpret common failures

### Missing credentials

```text
User "BEFTA_MASTER_CASE" credentials are missing
```

Check that the command uses `run_demo` and that the two `BEFTA_MASTER_CASE_*` variables are present in `.env.demo`.

### Authentication/session unavailable

Check that all endpoint values are int-demo values. Do not override only `TEST_URL` while retaining AAT values from `.env`.

### Rich-text field missing

```text
Create-case form did not render the rich-text fields
```

This is a fail-fast page/schema failure. Inspect the screenshot and trace. Do not increase the timeout or add retries until confirming that the live page actually contains the rich-text fields. The expected live field ID is `RichTextAreaMinField`.

### Slow caseworker jurisdiction API

```text
/aggregated/caseworkers/:uid/jurisdictions
SLOW_API_RESPONSE
```

Record the response duration and whether the page eventually renders the expected form. A longer timeout may provide more observation time, but must not hide a page that never contains the rich-text fields.

### Organisation API 403

```text
GET /api/organisation 403
```

This response is currently treated as benign for this journey. If organisation policy selection fails, the demo account needs the correct organisation access; do not suppress that failure in the test.

## 9. Inspect evidence

```bash
find test-results -maxdepth 2 -type f \( -name 'test-failed-*.png' -o -name 'error-context.md' -o -name 'trace.zip' \) -print
open functional-output/tests/playwright-e2e/odhin-report/xui-playwright-e2e.html
yarn playwright show-trace test-results/<failed-test-directory>/trace.zip
```

On non-macOS systems, open the Odhín HTML file with the local browser instead of using `open`.

Never share screenshots, traces, URLs, cookies, tokens, passwords, or live case details outside approved HMCTS channels.

## 10. Clean up

Inspect generated session markers first. Remove only files confirmed to belong to this run:

```bash
find .sessions -maxdepth 1 -type f \( -name '*capture-failed.json' -o -name '*.lock' \) -print
# After confirming the exact generated paths, remove those paths explicitly.
# Example: rm -f .sessions/<confirmed-capture-marker> .sessions/<confirmed-lock>
```

Keep `.env.demo` local. To stop using demo configuration, start a new shell rather than switching environment variables in the same shell.
