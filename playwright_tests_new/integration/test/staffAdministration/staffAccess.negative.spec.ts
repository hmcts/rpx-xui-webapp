import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { staffUserId } from '../../mocks/staffAdministration.mock';

test.describe('Staff administration access', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test('redirects a user without the staff-admin role from a direct details URL', async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    const { updateRequests } = await setupStaffAdministrationMockRoutes(page, { adminRole: false });
    await page.goto(`/staff/user-details/${staffUserId}`);

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'User details' })).toHaveCount(0);
    expect(updateRequests).toHaveLength(0);
  });
});
