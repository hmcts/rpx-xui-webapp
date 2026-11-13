import { expect, test } from '../../../E2E/fixtures';
import { RoleAccessPage } from '../../../E2E/page-objects/pages/exui/roleAccess.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupRoleJourney } from '../../helpers/roleJourneys.helper';
import { roleCaseId, roleCasePath } from '../../mocks/roleJourneys.mock';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe('Role removal failures', { tag: ['@integration', '@integration-case-details'] }, () => {
  test('cancel returns to the case without removing any assignment', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await caseDetailsPage.openRoleActions('Legal Ops');
    await caseDetailsPage.getRoleActionLink('Legal Ops', 'Remove Allocation').click();
    await new RoleAccessPage(page).cancelLink.click();
    await expect(page).toHaveURL(new RegExp(`${roleCasePath}$`));
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('Alice Example');
    expect(requests).toHaveLength(0);
  });
  test('failed removal follows the error route and retains both roles on readback', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page, { status: 500 });
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await caseDetailsPage.openRoleActions('Legal Ops');
    await caseDetailsPage.getRoleActionLink('Legal Ops', 'Remove Allocation').click();
    await new RoleAccessPage(page).removeAllocationButton.click();
    await expect(page).toHaveURL(/\/service-down$/);
    expect(requests).toHaveLength(1);
    expect(requests[0].postDataJSON()).toEqual({ assigmentId: 'assignment-legal-ops-case-100' });
    await expect(page.getByText("You've removed a role allocation.", { exact: false })).toHaveCount(0);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('Alice Example');
    await expect(caseDetailsPage.getRoleAccessSection('Judiciary')).toContainText('Bob Judge');
  });
  test('non-allocator direct removal route cannot submit a mutation', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page, { isCaseAllocator: false });
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await page.goto(
      `/role-access/allocate-role/remove?caseId=${roleCaseId}&jurisdiction=IA&caseType=Asylum&assignmentId=assignment-legal-ops-case-100`
    );
    await expect(page).toHaveURL(/\/cases$/);
    await expect(new RoleAccessPage(page).removeAllocationButton).toHaveCount(0);
    expect(requests).toHaveLength(0);
  });
});
