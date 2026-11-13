import { StaffAdministrationPage } from '../../../E2E/page-objects/pages/exui/staffAdministration.po';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';

test.describe('Staff administration search', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test.beforeEach(async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    await setupStaffAdministrationMockRoutes(page);
  });

  test('shows no user when the search has no matches', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await page.goto('/staff');
    await staff.searchForUser('Nobody');

    await expect(staff.noResults).toHaveText('No results found');
    await expect(staff.userRow(/Jane Smith/)).toHaveCount(0);
  });

  test('shows an inline validation error for a rejected cold search without inventing rows', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await setupStaffAdministrationMockRoutes(page, { searchStatus: 400 });
    await page.goto('/staff');
    const response = page.waitForResponse((response) => response.url().includes('/getUsersByPartialName'));
    await staff.searchForUser('Jane');
    expect((await response).status()).toBe(400);
    await expect(page.getByText('Invalid search string. Please input a valid string.')).toBeVisible();
    await expect(staff.userListHeading).toBeVisible();
    await expect(staff.userRow(/Jane Smith/)).toHaveCount(0);
    await expect(staff.noResults).toHaveCount(0);
    await expect(page).toHaveURL(/\/staff$/);
  });
});
