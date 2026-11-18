import { StaffAdministrationPage } from '../../../E2E/page-objects/pages/exui/staffAdministration.po';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { secondStaffUser, secondStaffUserId, staffUser, staffUserId } from '../../mocks/staffAdministration.mock';

test.describe('Edit a staff user', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('reviews and saves changed identity, service, location and role fields for the selected user', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests, detailsRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto(`/staff/user-details/${staffUserId}`);

    await staff.updateButton.click();
    await expect(staff.editUserHeading).toBeVisible();
    await expect(staff.firstName).toHaveValue(staffUser.first_name);
    await expect(staff.lastName).toHaveValue(staffUser.last_name);
    await expect(staff.emailId).toHaveValue(staffUser.email_id);
    await expect(staff.emailId).toBeDisabled();
    await expect(staff.caseAllocator).toBeChecked();
    await expect(staff.immigrationAndAsylum).toBeChecked();
    await expect(staff.caseworker).toBeChecked();
    await staff.firstName.fill('Janet');
    await staff.immigrationAndAsylum.uncheck();
    await staff.family.check();
    await staff.addPrimaryLocation('Oxford', 'Oxford Court');
    await expect(staff.primaryLocation).toContainText('Oxford Court');
    await staff.caseAllocator.uncheck();
    await staff.taskSupervisor.check();
    await staff.caseworker.uncheck();
    await staff.seniorCaseworker.check();
    await staff.continueButton.click();

    await expect(page.getByText('Check your answers before updating the user')).toBeVisible();
    const nameRow = staff.summaryRow('Name');
    await expect(nameRow).toContainText('Janet Smith');
    await expect(page.getByText(staffUser.email_id)).toBeVisible();
    const roleRow = staff.summaryRow('Role');
    await expect(roleRow).toContainText('Task supervisor');
    await expect(roleRow).not.toContainText('Case allocator');
    const serviceRow = staff.summaryRow('Service');
    await expect(serviceRow).toContainText('Family');
    await expect(serviceRow).not.toContainText('Immigration and Asylum');
    const primaryLocationRow = staff.summaryRow('Primary location');
    await expect(primaryLocationRow).toContainText('Oxford Court');
    await staff.submitButton.click();

    await expect(page).toHaveURL(new RegExp(`/staff/user-details/${staffUserId}$`));
    await expect(page.getByText('Janet Smith')).toBeVisible();
    const details = staff.userDetails;
    await expect(details).toContainText('Task supervisor');
    await expect(details).not.toContainText('Case allocator');
    await expect(details).toContainText('Family');
    await expect(details).toContainText('Oxford Court');
    expect(detailsRequests).toEqual([staffUserId, staffUserId]);
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
    await page.goto(`/staff/user-details/${secondStaffUserId}`);
    await expect(staff.userDetails).toContainText(secondStaffUser.email_id);
    await expect(staff.userDetails).not.toContainText('Janet Smith');
    await expect(staff.summaryRow('Role')).toContainText('Case allocator');
    await expect(staff.summaryRow('Service')).toContainText('Immigration and Asylum');
  });
});
