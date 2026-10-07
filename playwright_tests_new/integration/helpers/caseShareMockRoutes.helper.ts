import { Page } from '@playwright/test';

export async function setupCaseShareMockRoutes(page: Page): Promise<void> {
  await page.route('**/api/caseshare/orgs**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ organisations: [] }),
    });
  });

  await page.route('**/api/caseshare/users**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ users: [] }),
    });
  });

  await page.route('**/api/caseshare/cases**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ cases: [] }),
    });
  });

  await page.route('**/api/caseshare/case-assignments**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ sharedCases: [] }),
    });
  });
}
