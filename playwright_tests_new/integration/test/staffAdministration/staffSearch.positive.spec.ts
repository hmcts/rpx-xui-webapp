import { StaffAdministrationPage } from '../../../E2E/page-objects/pages/exui/staffAdministration.po';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupStaffAdministrationMockRoutes } from '../../helpers';
import { secondStaffUser, secondStaffUserId, staffUser, staffUserId } from '../../mocks/staffAdministration.mock';

test.describe('Staff administration search', { tag: ['@integration', '@integration-staff-admin'] }, () => {
  test.beforeEach(async ({ page }) => {
    await applySessionCookies(page, 'STAFF_ADMIN');
    await setupStaffAdministrationMockRoutes(page);
  });

  test('finds a staff user and opens the selected user details', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await page.goto('/staff');
    await expect(staff.userListHeading).toBeVisible();

    const searchRequest = page.waitForRequest((request) => request.url().includes('/api/staff-ref-data/getUsersByPartialName'));
    await staff.searchForUser('Jane');

    const request = await searchRequest;
    expect(new URL(request.url()).searchParams.get('search')).toBe('Jane');
    expect(request.headers()['page-number']).toBe('1');
    expect(request.headers()['page-size']).toBe('15');

    const row = staff.userRow(/Jane Smith/);
    await expect(row).toContainText('Immigration and Asylum');
    await expect(row).toContainText('Taylor House');
    await expect(row).toContainText('Caseworker');
    await row.getByRole('link', { name: 'Jane Smith' }).click();

    await expect(page).toHaveURL(new RegExp(`/staff/user-details/${staffUserId}$`));
    const details = staff.userDetails;
    await expect(details).toContainText(staffUser.email_id);
    await expect(details).toContainText('Taylor House');
    await expect(details).toContainText('Case allocator');
  });

  test('opens the second matching user without showing the first user’s details', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await page.goto('/staff');
    await staff.searchForUser('Jane');

    const secondRow = staff.userRow(/Jane Doe/);
    await expect(staff.userRow(/Jane Smith/)).toBeVisible();
    await expect(secondRow).toContainText('Taylor House');
    await secondRow.getByRole('link', { name: 'Jane Doe' }).click();

    await expect(page).toHaveURL(new RegExp(`/staff/user-details/${secondStaffUserId}$`));
    const details = staff.userDetails;
    await expect(details).toContainText(secondStaffUser.email_id);
    await expect(details).not.toContainText(staffUser.email_id);
  });

  test('keeps advanced search criteria while paging to a distinct second-page user', async ({ page }) => {
    const staff = new StaffAdministrationPage(page);
    await page.goto('/staff');
    await staff.advancedSearchButton.click();
    await staff.advancedUserType.selectOption({ label: 'Legal operations' });
    await staff.advancedStatus.selectOption({ label: 'Active' });
    const firstRequest = page.waitForRequest((request) => request.url().includes('/getFilteredUsers'));
    await staff.advancedSearchSubmit.click();
    const first = await firstRequest;
    expect(Object.fromEntries(new URL(first.url()).searchParams)).toEqual({ userType: 'Legal operations', status: 'ACTIVE' });
    expect(first.headers()['page-number']).toBe('1');
    expect(first.headers()['page-size']).toBe('15');
    await expect(staff.userRow(/Filtered User 1 /)).toBeVisible();
    await expect(staff.paginationResults).toHaveText('Showing 1 to 15 of 16 results');
    await expect(staff.userRow(/Jane Doe/)).toHaveCount(0);
    const secondRequest = page.waitForRequest((request) => request.url().includes('/getFilteredUsers'));
    await staff.secondPage.click();
    const second = await secondRequest;
    expect(Object.fromEntries(new URL(second.url()).searchParams)).toEqual({ userType: 'Legal operations', status: 'ACTIVE' });
    expect(second.headers()['page-number']).toBe('2');
    expect(second.headers()['page-size']).toBe('15');
    await expect(staff.userRow(/Jane Doe/)).toContainText('Taylor House');
    await expect(staff.userRow(/Filtered User 1 /)).toHaveCount(0);
    await expect(staff.advancedUserType).toHaveValue('Legal operations');
    await expect(staff.advancedStatus).toHaveValue('ACTIVE');
    await expect(staff.paginationResults).toHaveText('Showing 16 to 16 of 16 results');

    await staff.advancedJobTitle.selectOption({ label: 'Caseworker' });
    const resetRequest = page.waitForRequest((request) => request.url().includes('/getFilteredUsers'));
    await staff.advancedSearchSubmit.click();
    const reset = await resetRequest;
    expect(Object.fromEntries(new URL(reset.url()).searchParams)).toEqual({
      userType: 'Legal operations',
      status: 'ACTIVE',
      jobTitle: 'role-1',
    });
    expect(reset.headers()['page-number']).toBe('1');
    expect(reset.headers()['page-size']).toBe('15');
    await expect(staff.userRow(/Filtered User 1 /)).toBeVisible();
    await expect(staff.userRow(/Jane Doe/)).toHaveCount(0);
    await expect(staff.paginationResults).toHaveText('Showing 1 to 15 of 16 results');
  });
});
