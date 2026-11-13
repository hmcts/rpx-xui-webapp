import { expect, test } from '../../../E2E/fixtures';
import { RoleAccessPage } from '../../../E2E/page-objects/pages/exui/roleAccess.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupRoleJourney } from '../../helpers/roleJourneys.helper';
import { roleCaseId, roleCasePath, expectedDeletedExclusion } from '../../mocks/roleJourneys.mock';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe('Exclusion deletion failures', { tag: ['@integration', '@integration-case-details'] }, () => {
  test('cancel keeps both exclusions and sends no deletion', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await new RoleAccessPage(page).deleteExclusionLink('Bob Judge').click();
    await new RoleAccessPage(page).cancelLink.click();
    await expect(page).toHaveURL(new RegExp(`${roleCasePath}$`));
    await expect(caseDetailsPage.getExclusionsTable().locator('tbody tr')).toHaveCount(2);
    expect(requests).toHaveLength(0);
  });
  test('rejected deletion does not fabricate restored access', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page, { status: 500 });
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await new RoleAccessPage(page).deleteExclusionLink('Bob Judge').click();
    await new RoleAccessPage(page).deleteExclusionButton.click();
    await expect(page).toHaveURL(/\/service-down$/);
    expect(requests).toHaveLength(1);
    expect(requests[0].method()).toBe('POST');
    expect(new URL(requests[0].url()).pathname).toBe('/api/role-access/exclusions/delete');
    expect(requests[0].postDataJSON()).toEqual({ roleExclusion: expectedDeletedExclusion });
    await expect(page.getByText("You've deleted an exclusion.", { exact: true })).toHaveCount(0);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await expect(caseDetailsPage.getExclusionsTable().locator('tbody tr')).toHaveCount(2);
    await expect(caseDetailsPage.getExclusionsTable()).toContainText('Bob Judge');
    await expect(caseDetailsPage.getExclusionsTable()).toContainText('Alice Example');
  });
  test('non-allocator direct deletion route cannot submit a mutation', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page, { isCaseAllocator: false });
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await page.goto(
      `/role-access/delete-exclusion?caseId=${roleCaseId}&jurisdiction=IA&caseType=Asylum&exclusionId=assignment-judge-case-100-excluded`
    );
    await expect(page).toHaveURL(/\/cases$/);
    await expect(new RoleAccessPage(page).deleteExclusionButton).toHaveCount(0);
    expect(requests).toHaveLength(0);
  });
});
