import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';

test.describe('Add a staff user', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('keeps entered details and blocks review for an invalid email', async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { addRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto('/staff');
    await page.getByRole('button', { name: 'Add new user' }).click();

    await page.getByLabel('First name').fill('Alex');
    await page.getByLabel('Last name').fill('Rivera');
    await page.getByLabel('Email').fill('not-an-email');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page).toHaveURL(/\/staff\/add-user$/);
    await expect(page.locator('#email_id-email-error')).toContainText('Enter an email address in the correct format');
    await expect(page.getByLabel('First name')).toHaveValue('Alex');
    await expect(page.getByLabel('Last name')).toHaveValue('Rivera');
    expect(addRequests).toHaveLength(0);
  });
});
