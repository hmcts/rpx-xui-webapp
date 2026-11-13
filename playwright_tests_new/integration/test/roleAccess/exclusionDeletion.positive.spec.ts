import { expect, test } from '../../../E2E/fixtures';
import { RoleAccessPage } from '../../../E2E/page-objects/pages/exui/roleAccess.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupRoleJourney, setupRoleReadback } from '../../helpers/roleJourneys.helper';
import { roleCaseId, roleCasePath, roleRecords, expectedDeletedExclusion } from '../../mocks/roleJourneys.mock';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe('Exclusion deletion', { tag: ['@integration', '@integration-case-details'] }, () => {
  test('deletes the selected exclusion and retains the other exclusion and active roles', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page);
    const journey = new RoleAccessPage(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await journey.deleteExclusionLink('Bob Judge').click();
    await expect(page).toHaveURL(new RegExp(`caseId=${roleCaseId}`));
    await expect(journey.summaryValue('Person')).toHaveText('Bob Judge');
    await expect(journey.summaryValue('Describe the exclusion')).toHaveText('Judicial conflict flagged.');
    await setupRoleReadback(
      page,
      roleRecords.filter((record) => record.assignmentId !== 'assignment-judge-case-100-excluded')
    );
    await journey.deleteExclusionButton.click();
    await expect(page).toHaveURL(new RegExp(`${roleCasePath}$`));
    expect(requests).toHaveLength(1);
    expect(requests[0].method()).toBe('POST');
    expect(new URL(requests[0].url()).pathname).toBe('/api/role-access/exclusions/delete');
    expect(requests[0].postDataJSON()).toEqual({ roleExclusion: expectedDeletedExclusion });
    await page.reload();
    await expect(caseDetailsPage.getExclusionsTable().locator('tbody tr')).toHaveCount(1);
    await expect(caseDetailsPage.getExclusionsTable()).not.toContainText('Bob Judge');
    await expect(caseDetailsPage.getExclusionsTable()).toContainText('Alice Example');
    await expect(caseDetailsPage.getExclusionsTable()).toContainText('Separate conflict.');
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('Alice Example');
    await expect(caseDetailsPage.getRoleAccessSection('Judiciary')).toContainText('Bob Judge');
  });
});
