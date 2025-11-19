import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import { CookieUtils } from '../E2E/utils/cookie.utils.js';
import { UserUtils } from '../E2E/utils/user.utils.js';
import config from '../E2E/utils/config.utils.js';
import { IdamPage } from '@hmcts/playwright-common';

// Global setup using existing utilities & page object for consistency.
async function globalSetup(_full: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const userUtils = new UserUtils();
  const { email, password } = userUtils.getUserCredentials('SOLICITOR');

  // Navigate to default EXUI (no /cases) to allow IdAM redirect
  await page.goto(config.urls.exuiDefaultUrl);
  const idamPage = new IdamPage(page);
  try {
    await page.waitForSelector('#username', { timeout: 20000 });
    await idamPage.login({ username: email, password });
    // Wait for post-login redirect to /cases
    await page.waitForURL(/manage-case.*\/cases/, { timeout: 45000 });
  } catch (e) {
    console.warn('GlobalSetup: idamPage.login encountered issue', e);
  }

  // Append analytics cookie then persist full storage state (cookies + origins)
  const cookies = await context.cookies();
  const sessionPath = `${process.cwd()}/.sessions/${email}.storage.json`;
  try {
    const cookieUtils = new CookieUtils();
    cookieUtils.writeManageCasesSession(sessionPath, cookies); // writes cookies file (legacy) first
    // Re-add augmented cookies to context so storageState captures them
    const augmented = JSON.parse(fs.readFileSync(sessionPath, 'utf8')).cookies;
    await context.addCookies(augmented);
    // Capture full storageState (will include cookies, localStorage if any)
    await context.storageState({ path: sessionPath });
  } catch (err) {
    console.warn('GlobalSetup: failed to write storageState with analytics cookie', err);
  }

  console.log(`GlobalSetup: Stored storage state at ${sessionPath}`);
  await browser.close();
}

export default globalSetup;
