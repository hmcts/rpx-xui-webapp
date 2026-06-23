import type { Page, Route } from '@playwright/test';
import {
  setupXuiAppShellBaseRoutes,
  type XuiAppShellBaseRoutesOptions,
} from '../../../integration/helpers/xuiAppShellMockRoutes.helper';

export type AccessibilityMockSessionOptions = XuiAppShellBaseRoutesOptions;

async function fulfillJson(route: Route, body: unknown, status = 200): Promise<void> {
  await route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(body),
  });
}

export async function setupAccessibilityMockSession(page: Page, options: AccessibilityMockSessionOptions = {}): Promise<void> {
  await setupXuiAppShellBaseRoutes(page, options);

  await page.route('**/auth/isAuthenticated*', async (route) => fulfillJson(route, true));
  await page.route('**/api/healthCheck*', async (route) => fulfillJson(route, { healthState: true }));
  await page.route('**/api/organisation*', async (route) =>
    fulfillJson(route, {
      name: 'Playwright Organisation',
      organisationIdentifier: 'PLAYWRIGHT_ORG',
      status: 'ACTIVE',
      contactInformation: [],
      paymentAccount: [],
    })
  );

  await page.route('**/*launchdarkly.com/**', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.fulfill({ status: 202, body: '' });
      return;
    }

    await fulfillJson(route, {});
  });
}
