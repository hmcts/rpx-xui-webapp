import { StaffAdministrationPage } from '../../../E2E/page-objects/pages/exui/staffAdministration.po';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { staffUserId } from '../../mocks/staffAdministration.mock';

test.describe('Staff administration access', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('redirects a user without the staff-admin role from a direct details URL', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests, addRequests } = await setupStaffAdministrationMockRoutes(page, { adminRole: false });
    await page.goto(`/staff/user-details/${staffUserId}`);

    await expect(page).toHaveURL('/');
    await expect(staff.userDetailsHeading).toHaveCount(0);
    expect(updateRequests).toHaveLength(0);
    expect(addRequests).toHaveLength(0);
  });

  for (const path of ['/staff/add-user', `/staff/user-details/${staffUserId}/update`]) {
    test(`redirects an ineligible user from ${path} without mutation requests`, async ({ page }) => {
      await applySessionCookies(page, 'STAFF_ADMIN');
      const { updateRequests, addRequests } = await setupStaffAdministrationMockRoutes(page, { adminRole: false });
      await page.goto(path);
      await expect(page).toHaveURL('/');
      expect(addRequests).toHaveLength(0);
      expect(updateRequests).toHaveLength(0);
    });
  }
});
