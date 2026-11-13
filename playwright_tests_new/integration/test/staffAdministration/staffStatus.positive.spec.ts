import { StaffAdministrationPage } from '../../../E2E/page-objects/pages/exui/staffAdministration.po';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { secondStaffUser, secondStaffUserId, staffUser, staffUserId } from '../../mocks/staffAdministration.mock';

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
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests, detailsRequests } = await setupStaffAdministrationMockRoutes(page);
    await page.goto(`/staff/user-details/${staffUserId}`);

    const statusButton = staff.suspendButton;
    await expect(statusButton).toBeVisible();
    await statusButton.click();

    await expect(staff.restoreButton).toBeVisible();
    await expect(page.getByText('User suspended', { exact: true })).toBeVisible();
    expect(updateRequests).toHaveLength(1);
    expect(updateRequests[0]).toMatchObject({
      case_worker_id: staffUserId,
      email_id: staffUser.email_id,
      suspended: true,
      ...preservedStaffFields,
    });

    await staff.restoreButton.click();

    await expect(staff.suspendButton).toBeVisible();
    await expect(page.getByText('User restored', { exact: true })).toBeVisible();
    expect(detailsRequests).toEqual([staffUserId, staffUserId, staffUserId]);
    expect(updateRequests).toHaveLength(2);
    expect(updateRequests[1]).toMatchObject({
      case_worker_id: staffUserId,
      email_id: staffUser.email_id,
      suspended: false,
      ...preservedStaffFields,
    });
    await page.goto(`/staff/user-details/${secondStaffUserId}`);
    await expect(staff.userDetails).toContainText(secondStaffUser.email_id);
    await expect(staff.summaryRow('Status')).toContainText('ACTIVE');
    await expect(staff.suspendButton).toBeVisible();
    expect(updateRequests).toHaveLength(2);
  });

  test('ignores duplicate suspension actions until the update and details refresh complete', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await applySessionCookies(page, 'STAFF_ADMIN');
    let releaseUpdate!: () => void;
    let signalUpdate!: () => void;
    let releaseRefetch!: () => void;
    let signalRefetch!: () => void;
    const updateGate = new Promise<void>((resolve) => {
      releaseUpdate = resolve;
    });
    const updateStarted = new Promise<void>((resolve) => {
      signalUpdate = resolve;
    });
    const refetchGate = new Promise<void>((resolve) => {
      releaseRefetch = resolve;
    });
    const refetchStarted = new Promise<void>((resolve) => {
      signalRefetch = resolve;
    });
    const { updateRequests, detailsRequests } = await setupStaffAdministrationMockRoutes(page, {
      updateGate,
      onUpdate: signalUpdate,
      refetchGate,
      onRefetch: signalRefetch,
    });
    await page.goto(`/staff/user-details/${staffUserId}`);
    try {
      await staff.suspendButton.click();
      await updateStarted;
      await staff.suspendButton.click();
      expect(updateRequests).toHaveLength(1);
      expect(detailsRequests).toEqual([staffUserId]);
      await expect(page.getByText('User suspended', { exact: true })).toHaveCount(0);
      releaseUpdate();
      await refetchStarted;
      await staff.suspendButton.click();
      expect(updateRequests).toHaveLength(1);
      expect(detailsRequests).toEqual([staffUserId, staffUserId]);
      await expect(page.getByText('User suspended', { exact: true })).toHaveCount(0);
      releaseRefetch();
      await expect(staff.restoreButton).toBeVisible();
      await expect(page.getByText('User suspended', { exact: true })).toBeVisible();
      expect(updateRequests).toHaveLength(1);
      expect(updateRequests[0]).toMatchObject({ case_worker_id: staffUserId, suspended: true });
      expect(detailsRequests).toEqual([staffUserId, staffUserId]);
    } finally {
      releaseUpdate();
      releaseRefetch();
    }
  });
});
