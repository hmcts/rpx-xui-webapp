import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { CookieUtils } from '../E2E/utils/cookie.utils.js';
import { UserUtils } from '../E2E/utils/user.utils.js';
import { IdamPage } from '@hmcts/playwright-common';
import { Cookie } from 'playwright-core';
import config from '../E2E/utils/config.utils.js';

export interface LoadedSession {
  email: string;
  cookies: Cookie[];
  storageFile: string;
}

/**
 * Load persisted session cookies for a given userIdentifier.
 * Returns empty cookies array if file missing or invalid.
 */
export function loadSessionCookies(userIdentifier: string): LoadedSession {
  const userUtils = new UserUtils();
  const creds = userUtils.getUserCredentials(userIdentifier);
  const email = creds.email;
  const storageFile = path.join(process.cwd(), '.sessions', `${email}.storage.json`);
  let cookies: Cookie[] = [];
  if (fs.existsSync(storageFile)) {
    try {
      const state = JSON.parse(fs.readFileSync(storageFile, 'utf8'));
      if (Array.isArray(state.cookies)) {
        cookies = state.cookies as Cookie[];
        console.log(`SessionUtils: loaded ${cookies.length} cookies for ${userIdentifier} (${email}).`);
      } else {
        console.warn(`SessionUtils: cookies missing/invalid in ${storageFile}`);
      }
    } catch (e) {
      console.warn(`SessionUtils: failed parsing storage state for ${userIdentifier}:`, e);
      throw new Error(`Storage file missing for ${userIdentifier} for ${storageFile}`);
    }
  } else {
    console.warn(`SessionUtils: storage file missing for ${userIdentifier}: ${storageFile}`);
    throw new Error(`Failed parsing storage file ${userIdentifier}`);
  }
  return { email, cookies, storageFile };
}


 //Return true if sessionPath exists and its mtime is within maxAgeMs.
export function isSessionFresh(sessionPath: string, maxAgeMs = 5 * 60 * 1000): boolean {
    try {
        if (!fs.existsSync(sessionPath)) return false;        
        const stat = fs.statSync(sessionPath);
        const ageMs = Date.now() - stat.mtimeMs;
        return ageMs < maxAgeMs;
    } catch (err) {
        console.warn(`GlobalSetup: failed to stat session file ${sessionPath}`, err);
        return false;
    }
}

// local helper to persist session: write session file, add cookies to context and save storageState
async function persistSession(localSessionPath: string, localCookies: any[], ctx: any, uid: string) {
    const cookieUtils = new CookieUtils();
    try {
        cookieUtils.writeManageCasesSession(localSessionPath, localCookies);
        const augmented = JSON.parse(fs.readFileSync(localSessionPath, 'utf8')).cookies;
        await ctx.addCookies(augmented);
        await ctx.storageState({ path: localSessionPath });
        console.log(`GlobalSetup: Stored storage state for ${uid} at ${localSessionPath}`);
    } catch (err) {
        console.warn(`GlobalSetup: failed to persist storageState for ${uid}`, err);
        throw err;
    }
}

export async function sessionCapture(identifiers: string[]) {
    const userUtils = new UserUtils();

    const sessionsDir = path.join(process.cwd(), '.sessions');
    if (!fs.existsSync(sessionsDir)) {
        fs.mkdirSync(sessionsDir, { recursive: true });
    }

    for (const id of identifiers) {
        const { email, password } = userUtils.getUserCredentials(id);
        const sessionPath = path.join(sessionsDir, `${email}.storage.json`);

        if (isSessionFresh(sessionPath)) {
            console.log(`GlobalSetup: session for ${id} (${email}) is fresh, skipping capture`);
            continue;
        }

        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        const idamPage = new IdamPage(page);
        console.log(`GlobalSetup: Logging in as ${id} (${email}) to ${process.env.TEST_URL || config.urls.exuiDefaultUrl}`);
        try {
            await page.goto(process.env.TEST_URL || config.urls.exuiDefaultUrl);
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
            throw e;
        }

        const cookies = await context.cookies();
        await persistSession(sessionPath, cookies, context, id);
        await browser.close();
    }
}