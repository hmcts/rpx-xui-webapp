import { expect, test } from '@playwright/test';
import { StaffAdministrationPage } from '../../../E2E/page-objects/pages/exui/staffAdministration.po';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import { setupStaffAdministrationMockRoutes } from '../../helpers/staffAdministrationMockRoutes.helper';
import { staffUser, staffUserId } from '../../mocks/staffAdministration.mock';

for (const width of [1280, 320]) {
  test.describe(`Staff administration at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    test.beforeEach(() => {
      test.skip(width === 320 && process.env.MIGRATION_STRICT_REFLOW !== 'true', 'Enable strict narrow reflow');
    });

    test(
      'distinguishes no matches from populated results and opens the selected user',
      { tag: '@migration-sweep' },
      async ({ page }, testInfo) => {
        await setupMigrationVisualRoutes(page, ['staff-admin']);
        const { detailsRequests } = await setupStaffAdministrationMockRoutes(page);
        const staff = new StaffAdministrationPage(page);
        await page.goto('/staff');
        await expect(staff.userListHeading).toBeVisible();
        await staff.searchForUser('Nobody');
        await expect(staff.noResults).toHaveText('No results found');
        const empty = await captureMigrationState(page, testInfo, 'staff-no-results');
        expect.soft(empty.documentWidth, 'Staff empty results should fit the viewport').toBeLessThanOrEqual(width + 1);
        expect.soft(empty.violations).toEqual([]);

        await staff.searchForUser('Jane');
        const row = staff.userRow(/Jane Smith/);
        await expect(row).toContainText('Taylor House');
        await expect(staff.userRow(/Jane Doe/)).toBeVisible();
        const populated = await captureMigrationState(page, testInfo, 'staff-populated-results');
        expect.soft(populated.documentWidth, 'Staff populated results should fit the viewport').toBeLessThanOrEqual(width + 1);
        expect.soft(populated.violations).toEqual([]);
        await row.getByRole('link', { name: 'Jane Smith' }).click();
        await expect(page).toHaveURL(new RegExp(`/staff/user-details/${staffUserId}$`));
        await expect(staff.userDetails).toContainText(staffUser.email_id);
        expect(detailsRequests.at(-1)).toBe(staffUserId);
        const details = await captureMigrationState(page, testInfo, 'staff-user-details');
        expect.soft(details.documentWidth, 'Staff details should fit the viewport').toBeLessThanOrEqual(width + 1);
        expect.soft(details.violations).toEqual([]);
      }
    );
  });
}
