import { StaffAdministrationPage } from '../../../E2E/page-objects/pages/exui/staffAdministration.po';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { staffUser, staffUserId } from '../../mocks/staffAdministration.mock';

test.describe('Edit a staff user', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('blocks review when the changed name is empty without losing the selected user', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto(`/staff/user-details/${staffUserId}`);
    await staff.updateButton.click();

    await staff.firstName.fill('');
    await staff.continueButton.click();

    await expect(page).toHaveURL(new RegExp(`/staff/user-details/${staffUserId}/update$`));
    await expect(staff.firstNameRequiredError).toContainText('Enter the user’s first name');
    await expect(staff.emailId).toHaveValue(staffUser.email_id);
    expect(updateRequests).toHaveLength(0);
  });

  test('does not claim an edit succeeded when the update request is rejected', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page, { updateStatus: 400 });
    await page.goto(`/staff/user-details/${staffUserId}`);
    await staff.updateButton.click();
    await staff.firstName.fill('Janet');
    await staff.continueButton.click();
    await staff.submitButton.click();

    await expect(page).toHaveURL(/\/service-down$/);
    await expect(page.getByText('Janet Smith')).toHaveCount(0);
    expect(updateRequests).toHaveLength(1);
    expect(updateRequests[0]).toMatchObject({ first_name: 'Janet', email_id: staffUser.email_id });
  });

  test('cancels an edit and reopens the original user without sending an update', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto(`/staff/user-details/${staffUserId}`);
    await staff.updateButton.click();
    await staff.firstName.fill('Discarded');
    await staff.taskSupervisor.check();
    await staff.continueButton.click();
    await expect(page.getByText('Check your answers before updating the user')).toBeVisible();
    await expect(staff.summaryRow('Name')).toContainText('Discarded Smith');
    await staff.cancelButton.click();
    await expect(page).toHaveURL(/\/staff$/);
    expect(updateRequests).toHaveLength(0);
    await staff.searchForUser('Jane');
    await staff
      .userRow(/Jane Smith/)
      .getByRole('link', { name: 'Jane Smith' })
      .click();
    await expect(page).toHaveURL(new RegExp(`/staff/user-details/${staffUserId}$`));
    await expect(staff.userDetails).toContainText('Jane Smith');
    expect(updateRequests).toHaveLength(0);
    await staff.updateButton.click();
    await expect(staff.firstName).toHaveValue(staffUser.first_name);
    await expect(staff.emailId).toHaveValue(staffUser.email_id);
    await expect(staff.taskSupervisor).not.toBeChecked();
    expect(updateRequests).toHaveLength(0);
  });
});
