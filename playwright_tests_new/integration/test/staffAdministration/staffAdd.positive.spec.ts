import { StaffAdministrationPage } from '../../../E2E/page-objects/pages/exui/staffAdministration.po';
import { expect, test } from '../../../E2E/fixtures';
import { secondStaffUser, secondStaffUserId } from '../../mocks/staffAdministration.mock';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';

test.describe('Add a staff user', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('reviews and submits a new user with a primary location', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { addRequests, detailsRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto('/staff');

    await staff.addUserButton.click();
    await expect(staff.addUserHeading).toBeVisible();
    await staff.firstName.fill('Alex');
    await staff.lastName.fill('Rivera');
    await staff.email.fill('alex.rivera@example.test');
    await staff.region.selectOption({ label: 'London' });
    await staff.immigrationAndAsylum.check();
    await staff.userType.selectOption({ label: 'Legal operations' });
    await staff.caseAllocator.check();
    await staff.caseworker.check();
    await staff.addPrimaryLocation('Taylor', 'Taylor House');
    await expect(staff.primaryLocation).toContainText('Taylor House');
    await staff.continueButton.click();

    await expect(page.getByText('Check your answers before adding a new user')).toBeVisible();
    await expect(page.getByText('Alex Rivera')).toBeVisible();
    await expect(page.getByText('alex.rivera@example.test')).toBeVisible();
    await expect(page.getByText('Taylor House')).toBeVisible();
    const userTypeRow = staff.summaryRow('User type');
    await expect(userTypeRow).toContainText('Legal operations');
    await staff.submitButton.click();

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

    await staff.searchForUser('Alex');
    const addedRow = staff.userRow(/Alex Rivera/);
    await expect(addedRow).toContainText('Taylor House');
    await addedRow.getByRole('link', { name: 'Alex Rivera' }).click();
    await expect(page).toHaveURL(/\/staff\/user-details\/staff-added-001$/);
    const details = staff.userDetails;
    await expect(details).toContainText('alex.rivera@example.test');
    await expect(details).toContainText('Taylor House');
    await expect(details).toContainText('Legal operations');
    expect(detailsRequests).toEqual(['staff-added-001']);
    await page.goto(`/staff/user-details/${secondStaffUserId}`);
    await expect(staff.userDetails).toContainText(secondStaffUser.email_id);
    await expect(staff.userDetails).not.toContainText('alex.rivera@example.test');
    await expect(staff.summaryRow('Status')).toContainText('ACTIVE');
  });
});
