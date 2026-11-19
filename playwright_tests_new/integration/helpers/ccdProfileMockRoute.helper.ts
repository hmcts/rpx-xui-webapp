import type { Page } from '@playwright/test';
import type { buildHearingsUserDetailsMock } from '../mocks/hearings.mock';

export async function setupCcdProfileMockRoute(
  page: Page,
  userInfo: ReturnType<typeof buildHearingsUserDetailsMock>['userInfo']
) {
  await page.route('**/data/internal/profile*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ user: { idam: userInfo }, channels: [], jurisdictions: [] }),
    });
  });
}
