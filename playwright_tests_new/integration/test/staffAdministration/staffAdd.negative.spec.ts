import { StaffAdministrationPage } from '../../../E2E/page-objects/pages/exui/staffAdministration.po';
import { expect, test } from '../../../E2E/fixtures';
import { newStaffUserDetails, staffAddFailureCases } from '../../mocks/staffAdministration.mock';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';

test.describe('Add a staff user', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('keeps entered details and blocks review for an invalid email', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { addRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto('/staff');
    await staff.addUserButton.click();

    await staff.firstName.fill('Alex');
    await staff.lastName.fill('Rivera');
    await staff.email.fill('not-an-email');
    await staff.continueButton.click();

    await expect(page).toHaveURL(/\/staff\/add-user$/);
    await expect(staff.emailFormatError).toContainText('Enter an email address in the correct format');
    await expect(staff.firstName).toHaveValue('Alex');
    await expect(staff.lastName).toHaveValue('Rivera');
    expect(addRequests).toHaveLength(0);
  });

  test.describe('valid new user fields', () => {
    test('requires a primary location without losing the entered user details', async ({ page }) => {
      const staff = new StaffAdministrationPage(page);
      await applySessionCookies(page, 'STAFF_ADMIN');
      const { addRequests } = await setupStaffAdministrationMockRoutes(page);
      await page.goto('/staff/add-user');
      await staff.fillNewUserDetails(newStaffUserDetails);
      await staff.continueButton.click();
      await expect(page).toHaveURL(/\/staff\/add-user$/);
      await expect(staff.missingPrimaryLocationError).toContainText('Select at least one primary location');
      await expect(staff.firstName).toHaveValue('Alex');
      await expect(staff.lastName).toHaveValue('Rivera');
      await expect(staff.email).toHaveValue('alex.rivera@example.test');
      expect(addRequests).toHaveLength(0);
      await staff.addPrimaryLocation('Taylor', 'Taylor House');
      await staff.continueButton.click();
      await expect(page.getByText('Check your answers before adding a new user')).toBeVisible();
      await expect(staff.summaryRow('Primary location')).toContainText('Taylor House');
      expect(addRequests).toHaveLength(0);
    });

    for (const failure of staffAddFailureCases) {
      test(`does not claim creation succeeded after ${failure.name}`, async ({ page }) => {
        const staff = new StaffAdministrationPage(page);
        await applySessionCookies(page, 'STAFF_ADMIN');
        const { addRequests } = await setupStaffAdministrationMockRoutes(page, {
          addStatus: failure.status,
          addError: failure.error,
        });
        await page.goto('/staff/add-user');
        await staff.fillNewUserDetails(newStaffUserDetails);
        await staff.addPrimaryLocation('Taylor', 'Taylor House');
        await staff.continueButton.click();
        await expect(page.getByText('Check your answers before adding a new user')).toBeVisible();
        const response = page.waitForResponse((response) => response.url().includes('/addNewUser'));
        await staff.submitButton.click();
        expect((await response).status()).toBe(failure.status);
        if (failure.status === 400) {
          await expect(page.getByRole('heading', { name: `Error: ${failure.error}` })).toBeVisible();
          await expect(staff.summaryRow('Name')).toContainText('Alex Rivera');
          await expect(staff.summaryRow('Email address')).toContainText('alex.rivera@example.test');
          await expect(staff.summaryRow('Primary location')).toContainText('Taylor House');
          await expect(page).toHaveURL(/\/staff\/add-user\/check-your-answers$/);
        } else {
          await expect(page).toHaveURL(/\/service-down$/);
        }
        await expect(page.getByText('You have added a new user.')).toHaveCount(0);
        expect(addRequests).toHaveLength(1);
        expect(addRequests[0]).toMatchObject({
          first_name: 'Alex',
          last_name: 'Rivera',
          email_id: 'alex.rivera@example.test',
          base_locations: [{ location_id: '1', location: 'Taylor House', is_primary: true, service_codes: ['IA'] }],
        });
      });
    }
  });
});
