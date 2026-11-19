import type { Locator, Page } from '@playwright/test';
import { remainingNavigationTimeout } from './navigationDeadline.js';

export interface CaseActionOptions {
  expectedLocator?: Locator;
  expectedPath?: string | RegExp;
  expectedTarget?: string;
  timeoutMs?: number;
  retry?: boolean; // Retained for callers; Go is never repeated.
}

export async function waitForCaseActionDestination(
  page: Page,
  action: string,
  options: CaseActionOptions,
  deadlineMs: number,
  eventError: Locator
): Promise<void> {
  const remaining = () => remainingNavigationTimeout(deadlineMs, `waiting for case action "${action}"`);
  const waitForExpected = async () => {
    const path = options.expectedPath;
    if (path) {
      const matcher =
        typeof path === 'string' ? (url: URL) => url.pathname.includes(path) : (url: URL) => path.test(url.pathname);
      await page.waitForURL(matcher, { timeout: remaining() });
    }
    if (options.expectedLocator) {
      await options.expectedLocator.waitFor({ state: 'visible', timeout: remaining() });
    }
  };
  try {
    await waitForExpected();
  } catch (error) {
    if (await eventError.isVisible().catch(() => false)) {
      throw new Error(`Case event failed after selecting "${action}": The event could not be created.`);
    }
    throw error;
  }
}
