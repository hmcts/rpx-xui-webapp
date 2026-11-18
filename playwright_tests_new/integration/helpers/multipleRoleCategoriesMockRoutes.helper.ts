import type { Page } from '@playwright/test';
import { judicialColleagueSearchMock, multipleRoleTaskRolesMock } from '../mocks/multipleRoleCategories.mock';

export async function setupMultipleRoleCategoriesRoutes(page: Page, taskId: string): Promise<void> {
  await page.route(`**/workallocation/task/${taskId}/roles`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(multipleRoleTaskRolesMock),
    });
  });
  await page.route('**/workallocation/findPerson', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(judicialColleagueSearchMock),
    });
  });
}
