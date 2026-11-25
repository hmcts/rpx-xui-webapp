/* global require, module, process, __filename, setTimeout, clearTimeout, URL, console */
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node worker intentionally uses CommonJS. */
const { spawn } = require('node:child_process');

// Credential-bearing browser actions must not run inside the Playwright test runner:
// even with traces disabled its reporters retain fill arguments in step titles.
async function runIsolatedRealLogin(input) {
  return new Promise((resolve) => {
    const env = Object.fromEntries(
      ['PATH', 'HOME', 'TMPDIR', 'PLAYWRIGHT_BROWSERS_PATH']
        .filter((key) => process.env[key])
        .map((key) => [key, process.env[key]])
    );
    const child = spawn(process.execPath, [__filename], { env, stdio: ['pipe', 'pipe', 'ignore'] });
    let output = '';
    const timer = setTimeout(() => child.kill(), 90_000);
    child.stdout.on('data', (chunk) => {
      output += chunk;
      if (output.length > 100_000) child.kill();
    });
    child.stdin.on('error', () => {});
    child.on('error', () => {});
    child.on('close', () => {
      clearTimeout(timer);
      try {
        const result = JSON.parse(output);
        resolve(result);
      } catch {
        resolve({ receipts: [], failureStage: 'isolated-browser', failureStatus: 'blocked' });
      }
    });
    child.stdin.end(JSON.stringify(input));
  });
}

function summariseLoginAudit(violations) {
  return violations.map(({ id, impact, nodes }) => ({ rule: id, impact, count: nodes.length }));
}

async function auditLogin({ baseURL, email, password }) {
  const { chromium } = require('playwright');
  const AxeBuilder = require('@axe-core/playwright').default;
  const { IdamPage } = await import('@hmcts/playwright-common/dist/page-objects/pages/idam.po.js');
  const receipts = [];
  let stage = 'idam-entry';
  let failureStatus = 'blocked';
  let browser;
  process.once('SIGTERM', async () => {
    await browser?.close().catch(() => {});
    process.exit(1);
  });
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ baseURL, storageState: { cookies: [], origins: [] } });
    const page = await context.newPage();
    page.setDefaultTimeout(20_000);
    const idam = new IdamPage(page);
    const submit = page.getByRole('button', { name: /^(continue|sign in)$/i }).first();
    await page.goto('/');
    await idam.usernameInput.waitFor({ state: 'visible' });
    await submit.waitFor({ state: 'visible' });
    const audit = async () => {
      failureStatus = 'error';
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
        .analyze();
      const rules = summariseLoginAudit(violations);
      receipts.push({ stage, status: rules.length ? 'issues-found' : 'passed', rules });
      failureStatus = 'blocked';
    };
    await audit();
    stage = 'credential-configuration';
    if (typeof email !== 'string' || !email || typeof password !== 'string' || !password) throw new Error('configuration');
    stage = 'credential-submit';
    await idam.usernameInput.fill(email);
    if (!(await idam.passwordInput.isVisible())) {
      await submit.click();
      await idam.passwordInput.waitFor({ state: 'visible' });
      stage = 'idam-password';
      await audit();
    }
    stage = 'credential-submit';
    await idam.passwordInput.fill(password);
    await submit.click();
    stage = 'authenticated-handoff';
    await page.waitForURL((url) => url.origin === new URL(baseURL).origin);
    await page.locator('exui-header').waitFor({ state: 'visible' });
    const response = await page.request.get('/auth/isAuthenticated');
    if (response.status() !== 200) throw new Error('handoff');
    const auth = await response.json();
    if (auth !== true && auth?.isAuthenticated !== true) throw new Error('handoff');
    receipts.push({ stage, status: 'passed', rules: [] });
    return { receipts };
  } catch {
    return { receipts, failureStage: stage, failureStatus };
  } finally {
    await browser?.close().catch(() => {});
  }
}

if (require.main === module) {
  // Only the safe receipt reaches stdout. Discard all library console output.
  console.log = console.info = console.warn = console.error = console.debug = () => {};
  let input = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    input += chunk;
  });
  process.stdin.on('end', async () => {
    let result;
    try {
      result = await auditLogin(JSON.parse(input));
    } catch {
      result = { receipts: [], failureStage: 'isolated-browser', failureStatus: 'blocked' };
    }
    process.stdout.write(JSON.stringify(result));
  });
}

module.exports = { runIsolatedRealLogin, summariseLoginAudit };
