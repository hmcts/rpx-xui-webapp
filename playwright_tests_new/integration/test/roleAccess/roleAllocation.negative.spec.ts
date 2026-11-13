import { expect, test } from '../../../E2E/fixtures';
import { RoleAllocationPage } from '../../../E2E/page-objects/pages/exui/roleAllocation.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupRoleAllocationMockRoutes } from '../../helpers/roleAllocationMockRoutes.helper';
import { allocationCaseId, allocationCasePath, existingJudicialRole } from '../../mocks/roleAllocation.mock';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
  await page.clock.install({ time: new Date('2030-01-15T12:00:00.000Z') });
});

test.describe('Case-role allocation failures', { tag: ['@integration', '@integration-case-details'] }, () => {
  test('requires a role before continuing and sends no allocation request', async ({ page, caseDetailsPage }) => {
    const requests = await setupRoleAllocationMockRoutes(page);
    const journey = new RoleAllocationPage(page);
    await caseDetailsPage.openRolesAndAccessTab(allocationCaseId);
    await caseDetailsPage.getAllocateLegalOpsRoleLink().click();
    await journey.continueButton.click();
    await expect(journey.errorSummary).toContainText('Please select an option');
    await expect(page.getByRole('radio', { name: 'Case manager', exact: true })).toHaveAttribute(
      'aria-describedby',
      'chooseRole-error'
    );
    await expect(page.locator('#chooseRole-error')).toContainText('Please select an option');
    expect(requests).toHaveLength(0);
  });

  test('cancel after choosing a role sends no allocation request', async ({ page, caseDetailsPage }) => {
    const requests = await setupRoleAllocationMockRoutes(page);
    const journey = new RoleAllocationPage(page);
    await caseDetailsPage.openRolesAndAccessTab(allocationCaseId);
    await caseDetailsPage.getAllocateLegalOpsRoleLink().click();
    await page.getByRole('radio', { name: 'Case manager', exact: true }).check();
    await journey.continueButton.click();
    await journey.cancelLink.click();
    await expect(page).toHaveURL(new RegExp(`${allocationCasePath}$`));
    expect(requests).toHaveLength(0);
    await expect(caseDetailsPage.getRoleAccessSection('Judiciary')).toContainText(existingJudicialRole.actorName);
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('There are no legal Ops roles for this case.');
  });

  test('non-allocator direct route cannot submit an allocation', async ({ page, caseDetailsPage }) => {
    const requests = await setupRoleAllocationMockRoutes(page, { isCaseAllocator: false });
    await caseDetailsPage.openRolesAndAccessTab(allocationCaseId);
    await page.goto(
      `/role-access/allocate-role/allocate?caseId=${allocationCaseId}&jurisdiction=IA&caseType=Asylum&roleCategory=LEGAL_OPERATIONS`
    );
    await expect(page).toHaveURL(/\/cases$/);
    await expect(new RoleAllocationPage(page).confirmButton).toHaveCount(0);
    await expect(page.getByText("You've allocated a role.", { exact: true })).toHaveCount(0);
    expect(requests).toHaveLength(0);
  });

  test('failed confirmation does not fabricate an allocation or a success message', async ({ page, caseDetailsPage }) => {
    const requests = await setupRoleAllocationMockRoutes(page, { status: 500 });
    const journey = new RoleAllocationPage(page);
    await caseDetailsPage.openRolesAndAccessTab(allocationCaseId);
    await caseDetailsPage.getAllocateLegalOpsRoleLink().click();
    await journey.reviewAllocation();
    await journey.confirmButton.click();
    await expect(page).toHaveURL(/\/service-down$/);
    expect(requests).toHaveLength(1);
    expect(requests[0].method()).toBe('POST');
    expect(new URL(requests[0].url()).pathname).toBe('/api/role-access/allocate-role/confirm');
    await expect(page.getByText("You've allocated a role.", { exact: true })).toHaveCount(0);
    await caseDetailsPage.openRolesAndAccessTab(allocationCaseId);
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('There are no legal Ops roles for this case.');
    await expect(caseDetailsPage.getRoleAccessSection('Judiciary')).toContainText(existingJudicialRole.actorName);
  });
});
