import * as fs from 'fs';
import * as path from 'path';
import { Cookie } from 'playwright-core';
import { UserUtils } from './userUtils';

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
    }
  } else {
    console.warn(`SessionUtils: storage file missing for ${userIdentifier}: ${storageFile}`);
  }
  return { email, cookies, storageFile };
}