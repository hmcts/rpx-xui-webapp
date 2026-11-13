import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';

test.describe('Staff administration search', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test.beforeEach(async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    await setupStaffAdministrationMockRoutes(page);
  });

  test('shows no user when the search has no matches', async ({ page }) => {
    await page.goto('/staff');
    await page.getByRole('textbox', { name: 'Search for a user by name' }).fill('Nobody');
    await page.getByRole('button', { name: 'Search', exact: true }).click();

    await expect(page.locator('#user-list-no-results')).toHaveText('No results found');
    await expect(page.getByRole('row', { name: /Jane Smith/ })).toHaveCount(0);
  });
});
