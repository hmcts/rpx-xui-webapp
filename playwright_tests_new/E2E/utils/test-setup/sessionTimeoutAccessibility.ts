import type { Page } from '@playwright/test';
import { buildXuiAppShellUserDetailsMock } from '../../../integration/helpers/xuiAppShellMockRoutes.helper';
import { setupAccessibilityMockSession } from '../accessibility/accessibilityMockSession';

export async function setupSessionTimeoutAccessibility(page: Page): Promise<void> {
  await page.clock.install();
  await setupAccessibilityMockSession(page);
  await page.route('**/api/user/o/userinfo*', async (route) => {
    await route.fulfill({
      json: {
        ...buildXuiAppShellUserDetailsMock(),
        sessionTimeout: { idleModalDisplayTime: 5, totalIdleTime: 6 },
      },
    });
  });
  await page.route('**/auth/keepalive*', async (route) => route.fulfill({ json: true }));
}
