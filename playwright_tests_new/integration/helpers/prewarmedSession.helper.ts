import type { Page } from '@playwright/test';
import { applySessionCookies, loadSessionCookies, type LoadedSession } from '../../common/sessionCapture';

export async function applyPrewarmedSessionCookies(page: Page, userIdentifier: string): Promise<LoadedSession> {
  try {
    const session = loadSessionCookies(userIdentifier);
    if (session.cookies.length > 0) {
      await page.context().addCookies(session.cookies);
    }
    return session;
  } catch {
    return applySessionCookies(page, userIdentifier);
  }
}
