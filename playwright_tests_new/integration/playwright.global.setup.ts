import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { CookieUtils } from '../E2E/utils/cookie.utils.js';
import { UserUtils } from '../E2E/utils/user.utils.js';
import config from '../E2E/utils/config.utils.js';
import { IdamPage } from '@hmcts/playwright-common';

// Global setup captures storageState for multiple users so tests can reuse sessions.
async function globalSetup(_full: FullConfig) {
  const identifiers = ['SOLICITOR', 'STAFF_ADMIN', 'IAC_CaseOfficer_R2'];
  const userUtils = new UserUtils();
  const cookieUtils = new CookieUtils();
  const sessionsDir = path.join(process.cwd(), '.sessions');
  if (!fs.existsSync(sessionsDir)) {
    fs.mkdirSync(sessionsDir, { recursive: true });
  }

  for (const id of identifiers) {
    const { email, password } = userUtils.getUserCredentials(id);
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const idamPage = new IdamPage(page);
    console.log(`GlobalSetup: Logging in as ${id} (${email})`);
    try {
      await page.goto(config.urls.exuiDefaultUrl);
      await page.waitForSelector('#username', { timeout: 30000 });
      await idamPage.login({ username: email, password });
      await page.waitForURL(/manage-case.*\/cases/, { timeout: 60000 });
    } catch (e) {
      console.warn(`GlobalSetup: login failed for ${id}`, e);
    }
    const cookies = await context.cookies();
    const sessionPath = path.join(sessionsDir, `${email}.storage.json`);
    try {
      cookieUtils.writeManageCasesSession(sessionPath, cookies);
      const augmented = JSON.parse(fs.readFileSync(sessionPath, 'utf8')).cookies;
      await context.addCookies(augmented);
      await context.storageState({ path: sessionPath });
      console.log(`GlobalSetup: Stored storage state for ${id} at ${sessionPath}`);
    } catch (err) {
      console.warn(`GlobalSetup: failed to persist storageState for ${id}`, err);
    }
    await browser.close();
  }
}

export default globalSetup;
