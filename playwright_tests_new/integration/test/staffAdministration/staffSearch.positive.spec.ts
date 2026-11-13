import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { secondStaffUser, secondStaffUserId, staffUser, staffUserId } from '../../mocks/staffAdministration.mock';

test.describe('Staff administration search', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test.beforeEach(async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    await setupStaffAdministrationMockRoutes(page);
  });

  test('finds a staff user and opens the selected user details', async ({ page }) => {
    await page.goto('/staff');
    await expect(page.getByRole('heading', { name: 'User list' })).toBeVisible();

    const searchRequest = page.waitForRequest((request) => request.url().includes('/api/staff-ref-data/getUsersByPartialName'));
    await page.getByRole('textbox', { name: 'Search for a user by name' }).fill('Jane');
    await page.getByRole('button', { name: 'Search', exact: true }).click();

    const request = await searchRequest;
    expect(new URL(request.url()).searchParams.get('search')).toBe('Jane');
    expect(request.headers()['page-number']).toBe('1');
    expect(request.headers()['page-size']).toBe('15');

    const row = page.getByRole('row', { name: /Jane Smith/ });
    await expect(row).toContainText('Immigration and Asylum');
    await expect(row).toContainText('Taylor House');
    await expect(row).toContainText('Caseworker');
    await row.getByRole('link', { name: 'Jane Smith' }).click();

    await expect(page).toHaveURL(new RegExp(`/staff/user-details/${staffUserId}$`));
    const details = page.getByRole('heading', { name: 'User details' }).locator('..');
    await expect(details).toContainText(staffUser.email_id);
    await expect(details).toContainText('Taylor House');
    await expect(details).toContainText('Case allocator');
  });

  test('opens the second matching user without showing the first user’s details', async ({ page }) => {
    await page.goto('/staff');
    await page.getByRole('textbox', { name: 'Search for a user by name' }).fill('Jane');
    await page.getByRole('button', { name: 'Search', exact: true }).click();

    const secondRow = page.getByRole('row', { name: /Jane Doe/ });
    await expect(page.getByRole('row', { name: /Jane Smith/ })).toBeVisible();
    await expect(secondRow).toContainText('Taylor House');
    await secondRow.getByRole('link', { name: 'Jane Doe' }).click();

    await expect(page).toHaveURL(new RegExp(`/staff/user-details/${secondStaffUserId}$`));
    const details = page.getByRole('heading', { name: 'User details' }).locator('..');
    await expect(details).toContainText(secondStaffUser.email_id);
    await expect(details).not.toContainText(staffUser.email_id);
  });
});
