import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';

test.describe('Add a staff user', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('reviews and submits a new user with a primary location', async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { addRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto('/staff');

    await page.getByRole('button', { name: 'Add new user' }).click();
    await expect(page.getByRole('heading', { name: 'Add user' })).toBeVisible();
    await page.getByLabel('First name').fill('Alex');
    await page.getByLabel('Last name').fill('Rivera');
    await page.getByLabel('Email').fill('alex.rivera@example.test');
    await page.getByLabel('Region').selectOption({ label: 'London' });
    await page.getByLabel('Immigration and Asylum').check();
    await page.getByLabel('User type').selectOption({ label: 'Legal operations' });
    await page.getByLabel('Case allocator').check();
    await page.getByLabel('Caseworker', { exact: true }).check();
    await page.locator('#location-primary').fill('Taylor');
    await page.getByRole('option', { name: 'Taylor House' }).click();
    await page.getByRole('link', { name: 'Add primary location' }).click();
    await expect(page.locator('#base_locations_primary')).toContainText('Taylor House');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByText('Check your answers before adding a new user')).toBeVisible();
    await expect(page.getByText('Alex Rivera')).toBeVisible();
    await expect(page.getByText('alex.rivera@example.test')).toBeVisible();
    await expect(page.getByText('Taylor House')).toBeVisible();
    const userTypeRow = page.locator('.govuk-summary-list__row').filter({ hasText: 'User type' }).first();
    await expect(userTypeRow).toContainText('Legal operations');
    await page.getByRole('button', { name: 'Submit', exact: true }).click();

    await expect(page).toHaveURL(/\/staff$/);
    await expect(page.getByText('You have added a new user.')).toBeVisible();
    expect(addRequests).toHaveLength(1);
    expect(addRequests[0]).toMatchObject({
      first_name: 'Alex',
      last_name: 'Rivera',
      email_id: 'alex.rivera@example.test',
      user_type: 'Legal operations',
      region_id: 1,
      services: [{ service: 'Immigration and Asylum', service_code: 'IA' }],
      base_locations: [{ location_id: '1', location: 'Taylor House', is_primary: true, service_codes: ['IA'] }],
      case_allocator: true,
      task_supervisor: false,
      staff_admin: false,
      roles: [{ role_id: 'role-1', role: 'Caseworker', is_primary: true }],
    });

    await page.getByRole('textbox', { name: 'Search for a user by name' }).fill('Alex');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    const addedRow = page.getByRole('row', { name: /Alex Rivera/ });
    await expect(addedRow).toContainText('Taylor House');
    await addedRow.getByRole('link', { name: 'Alex Rivera' }).click();
    await expect(page).toHaveURL(/\/staff\/user-details\/staff-added-001$/);
    const details = page.getByRole('heading', { name: 'User details' }).locator('..');
    await expect(details).toContainText('alex.rivera@example.test');
    await expect(details).toContainText('Taylor House');
    await expect(details).toContainText('Legal operations');
  });
});
