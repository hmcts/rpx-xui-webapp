import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { CookieUtils } from './utils/cookieUtils';
import { UserUtils } from './utils/userUtils';
import { IdamPage } from '@hmcts/playwright-common';

// Global setup captures storageState for multiple users so tests can reuse sessions.
async function globalSetup(_full: FullConfig) {
  const identifiers = ['SOLICITOR'];
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
    console.log(`GlobalSetup: Logging in as ${id} (${email}) to ${process.env.TEST_URL}`);
    try {
      await page.goto(process.env.TEST_URL);
      await page.waitForSelector('#username', { timeout: 60000 });
      await idamPage.login({ username: email, password });
      // Wait for presence of the standard EXUI header component to confirm the app shell loaded.
      try {
        await page.waitForSelector('exui-header', { timeout: 60000 });
        console.log(`GlobalSetup: EXUI header detected for ${id}`);
      } catch (headerErr) {
        console.warn(`GlobalSetup: EXUI header not detected for ${id} within timeout`, headerErr);
      }
    } catch (e) {
      console.warn(`GlobalSetup: login failed for ${id}`, e);
      throw e
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
      throw err
    }
    await browser.close();
  }
}

export default globalSetup;