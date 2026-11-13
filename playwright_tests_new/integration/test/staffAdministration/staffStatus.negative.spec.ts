import { StaffAdministrationPage } from '../../../E2E/page-objects/pages/exui/staffAdministration.po';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { staffUser, staffUserId } from '../../mocks/staffAdministration.mock';

test.describe('Staff administration status', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('keeps the user active and shows a warning when suspension is rejected', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page, { updateStatus: 400 });
    await page.goto(`/staff/user-details/${staffUserId}`);

    await staff.suspendButton.click();

    await expect(page).toHaveURL(new RegExp(`/staff/user-details/${staffUserId}$`));
    await expect(staff.suspendButton).toBeVisible();
    await expect(
      page.getByText('There is a problem. There was a system error and your request could not be processed.')
    ).toBeVisible();
    expect(updateRequests).toHaveLength(1);
    expect(updateRequests[0]).toMatchObject({ case_worker_id: staffUserId, suspended: true });
  });

  test('does not offer update or suspend for a pending user', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page, {
      initialUser: { ...staffUser, up_idam_status: 'PENDING' },
    });
    await page.goto(`/staff/user-details/${staffUserId}`);

    await expect(page.getByText('Users with the Pending status cannot be Updated or Suspended')).toBeVisible();
    await expect(staff.resendActivationButton).toBeVisible();
    await expect(staff.updateButton).toHaveCount(0);
    await expect(staff.suspendButton).toHaveCount(0);
    await expect(staff.restoreButton).toHaveCount(0);
    expect(updateRequests).toHaveLength(0);
  });

  test('does not claim success when the details refresh fails after suspension', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page, { refetchStatus: 503 });
    await page.goto(`/staff/user-details/${staffUserId}`);
    await staff.suspendButton.click();

    await expect(page).toHaveURL(/\/service-down$/);
    await expect(page.getByText('User suspended', { exact: true })).toHaveCount(0);
    await expect(page.getByText('User restored', { exact: true })).toHaveCount(0);
    expect(updateRequests).toHaveLength(1);
    expect(updateRequests[0]).toMatchObject({ case_worker_id: staffUserId, suspended: true });
  });
});
