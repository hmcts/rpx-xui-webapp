import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { staffUser, staffUserId } from '../../mocks/staffAdministration.mock';

test.describe('Edit a staff user', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('blocks review when the changed name is empty without losing the selected user', async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto(`/staff/user-details/${staffUserId}`);
    await page.getByRole('button', { name: 'Update', exact: true }).click();

    await page.getByLabel('First name').fill('');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page).toHaveURL(new RegExp(`/staff/user-details/${staffUserId}/update$`));
    await expect(page.locator('#first_name-required-error')).toContainText('Enter the user’s first name');
    await expect(page.locator('#email_id')).toHaveValue(staffUser.email_id);
    expect(updateRequests).toHaveLength(0);
  });

  test('does not claim an edit succeeded when the update request is rejected', async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page, { updateStatus: 400 });
    await page.goto(`/staff/user-details/${staffUserId}`);
    await page.getByRole('button', { name: 'Update', exact: true }).click();
    await page.getByLabel('First name').fill('Janet');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('button', { name: 'Submit', exact: true }).click();

    await expect(page).toHaveURL(/\/service-down$/);
    await expect(page.getByText('Janet Smith')).toHaveCount(0);
    expect(updateRequests).toHaveLength(1);
    expect(updateRequests[0]).toMatchObject({ first_name: 'Janet', email_id: staffUser.email_id });
  });
});
