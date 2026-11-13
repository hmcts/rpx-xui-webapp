import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { staffUser, staffUserId } from '../../mocks/staffAdministration.mock';

const preservedStaffFields = {
  user_type: staffUser.user_type,
  region: staffUser.region,
  region_id: staffUser.region_id,
  roles: staffUser.roles,
  services: staffUser.services,
  base_locations: staffUser.base_locations,
  skills: staffUser.skills,
  case_allocator: staffUser.case_allocator,
  task_supervisor: staffUser.task_supervisor,
  staff_admin: staffUser.staff_admin,
};

test.describe('Staff administration status', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('suspends and restores the selected user after a refreshed details response', async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto(`/staff/user-details/${staffUserId}`);

    const statusButton = page.getByRole('button', { name: 'Suspend', exact: true });
    await expect(statusButton).toBeVisible();
    await statusButton.click();

    await expect(page.getByRole('button', { name: 'Restore', exact: true })).toBeVisible();
    await expect(page.getByText('User suspended', { exact: true })).toBeVisible();
    expect(updateRequests).toHaveLength(1);
    expect(updateRequests[0]).toMatchObject({
      case_worker_id: staffUserId,
      email_id: staffUser.email_id,
      suspended: true,
      ...preservedStaffFields,
    });

    await page.getByRole('button', { name: 'Restore', exact: true }).click();

    await expect(page.getByRole('button', { name: 'Suspend', exact: true })).toBeVisible();
    await expect(page.getByText('User restored', { exact: true })).toBeVisible();
    expect(updateRequests).toHaveLength(2);
    expect(updateRequests[1]).toMatchObject({
      case_worker_id: staffUserId,
      email_id: staffUser.email_id,
      suspended: false,
      ...preservedStaffFields,
    });
  });
});
