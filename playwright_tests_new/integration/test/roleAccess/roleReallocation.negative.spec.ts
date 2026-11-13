import { expect, test } from '../../../E2E/fixtures';
import { RoleAccessPage } from '../../../E2E/page-objects/pages/exui/roleAccess.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupRoleJourney } from '../../helpers/roleJourneys.helper';
import { roleCaseId, roleCasePath, expectedReallocation } from '../../mocks/roleJourneys.mock';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe('Role reallocation failures', { tag: ['@integration', '@integration-case-details'] }, () => {
  test('missing replacement stays on the form and cancel leaves the assignment intact', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page);
    const journey = new RoleAccessPage(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await caseDetailsPage.openRoleActions('Legal Ops');
    await caseDetailsPage.getRoleActionLink('Legal Ops', 'Reallocate').click();
    await journey.continueButton.click();
    await expect(journey.errorSummary).toContainText('You must select a name');
    await expect(journey.personSearch).toBeVisible();
    expect(requests).toHaveLength(0);
    await journey.cancelLink.click();
    await expect(page).toHaveURL(new RegExp(`${roleCasePath}$`));
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('Alice Example');
    expect(requests).toHaveLength(0);
  });
  test('rejected replacement follows the error route without changing the assignee', async ({ page, caseDetailsPage }) => {
    await page.clock.install({ time: new Date('2026-11-13T12:00:00.000Z') });
    const { requests } = await setupRoleJourney(page, { status: 422 });
    const journey = new RoleAccessPage(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await caseDetailsPage.openRoleActions('Legal Ops');
    await caseDetailsPage.getRoleActionLink('Legal Ops', 'Reallocate').click();
    await journey.reviewReallocation();
    await journey.confirmButton.click();
    await expect(page).toHaveURL(/\/role-access\/user-not-assignable$/);
    expect(requests).toHaveLength(1);
    expect(requests[0].postDataJSON()).toEqual(expectedReallocation);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('Alice Example');
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).not.toContainText('Clara Replacement');
  });
  test('non-allocator direct reallocation cannot submit a mutation', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page, { isCaseAllocator: false });
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await page.goto(
      `/role-access/allocate-role/reallocate?caseId=${roleCaseId}&jurisdiction=IA&caseType=Asylum&assignmentId=assignment-legal-ops-case-100&actorId=user-alice&roleCategory=LEGAL_OPERATIONS&typeOfRole=case-manager`
    );
    await expect(page).toHaveURL(/\/cases$/);
    await expect(new RoleAccessPage(page).confirmButton).toHaveCount(0);
    expect(requests).toHaveLength(0);
  });
});
