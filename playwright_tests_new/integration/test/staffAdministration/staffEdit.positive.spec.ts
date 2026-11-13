import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { staffUser, staffUserId } from '../../mocks/staffAdministration.mock';

test.describe('Edit a staff user', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('reviews and saves changed identity, service, location and role fields for the selected user', async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto(`/staff/user-details/${staffUserId}`);

    await page.getByRole('button', { name: 'Update', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Edit user' })).toBeVisible();
    await expect(page.getByLabel('First name')).toHaveValue(staffUser.first_name);
    await expect(page.getByLabel('Last name')).toHaveValue(staffUser.last_name);
    await expect(page.locator('#email_id')).toHaveValue(staffUser.email_id);
    await expect(page.locator('#email_id')).toBeDisabled();
    await expect(page.getByLabel('Case allocator')).toBeChecked();
    await expect(page.getByLabel('Immigration and Asylum')).toBeChecked();
    await expect(page.getByLabel('Caseworker', { exact: true })).toBeChecked();
    await page.getByLabel('First name').fill('Janet');
    await page.getByLabel('Immigration and Asylum').uncheck();
    await page.getByLabel('Family', { exact: true }).check();
    await page.locator('#location-primary').fill('Oxford');
    await page.getByRole('option', { name: 'Oxford Court' }).click();
    await page.getByRole('link', { name: 'Add primary location' }).click();
    await expect(page.locator('#base_locations_primary')).toContainText('Oxford Court');
    await page.getByLabel('Case allocator').uncheck();
    await page.getByLabel('Task supervisor').check();
    await page.getByLabel('Caseworker', { exact: true }).uncheck();
    await page.getByLabel('Senior caseworker').check();
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByText('Check your answers before updating the user')).toBeVisible();
    const nameRow = page.locator('.govuk-summary-list__row').filter({ hasText: 'Name' }).first();
    await expect(nameRow).toContainText('Janet Smith');
    await expect(page.getByText(staffUser.email_id)).toBeVisible();
    const roleRow = page.locator('.govuk-summary-list__row').filter({ hasText: 'Role' }).first();
    await expect(roleRow).toContainText('Task supervisor');
    await expect(roleRow).not.toContainText('Case allocator');
    const serviceRow = page.locator('.govuk-summary-list__row').filter({ hasText: 'Service' }).first();
    await expect(serviceRow).toContainText('Family');
    await expect(serviceRow).not.toContainText('Immigration and Asylum');
    const primaryLocationRow = page.locator('.govuk-summary-list__row').filter({ hasText: 'Primary location' }).first();
    await expect(primaryLocationRow).toContainText('Oxford Court');
    await page.getByRole('button', { name: 'Submit', exact: true }).click();

    await expect(page).toHaveURL(new RegExp(`/staff/user-details/${staffUserId}$`));
    await expect(page.getByText('Janet Smith')).toBeVisible();
    const details = page.getByRole('heading', { name: 'User details' }).locator('..');
    await expect(details).toContainText('Task supervisor');
    await expect(details).not.toContainText('Case allocator');
    await expect(details).toContainText('Family');
    await expect(details).toContainText('Oxford Court');
    expect(updateRequests).toHaveLength(1);
    expect(updateRequests[0]).toMatchObject({
      first_name: 'Janet',
      last_name: 'Smith',
      email_id: staffUser.email_id,
      user_type: staffUser.user_type,
      region_id: staffUser.region_id,
      case_allocator: false,
      task_supervisor: true,
      staff_admin: false,
      roles: [{ role_id: 'role-2', role: 'Senior caseworker', is_primary: true }],
      services: [{ service: 'Family', service_code: 'FA' }],
      base_locations: [{ location_id: '2', location: 'Oxford Court', is_primary: true, service_codes: ['FA'] }],
    });
  });
});
