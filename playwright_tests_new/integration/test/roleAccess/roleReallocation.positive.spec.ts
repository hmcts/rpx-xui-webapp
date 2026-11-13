import { expect, test } from '../../../E2E/fixtures';
import { RoleAccessPage } from '../../../E2E/page-objects/pages/exui/roleAccess.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupRoleJourney, setupRoleReadback } from '../../helpers/roleJourneys.helper';
import { roleCaseId, reallocatedRecords, expectedReallocation } from '../../mocks/roleJourneys.mock';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe('Role reallocation', { tag: ['@integration', '@integration-case-details'] }, () => {
  test('replaces only the selected assignee using the prior assignment identity', async ({ page, caseDetailsPage }) => {
    await page.clock.install({ time: new Date('2026-11-13T12:00:00.000Z') });
    const { requests } = await setupRoleJourney(page);
    const journey = new RoleAccessPage(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('Alice Example');
    await caseDetailsPage.openRoleActions('Legal Ops');
    const reallocate = caseDetailsPage.getRoleActionLink('Legal Ops', 'Reallocate');
    const link = new URL((await reallocate.getAttribute('href'))!, 'http://localhost');
    expect(Object.fromEntries(link.searchParams)).toMatchObject({
      caseId: roleCaseId,
      assignmentId: 'assignment-legal-ops-case-100',
      actorId: 'user-alice',
      typeOfRole: 'case-manager',
    });
    await reallocate.click();
    await journey.reviewReallocation();
    await expect(journey.summaryValue('Person')).toHaveText('Clara Replacement\nclara@example.com', { useInnerText: true });
    await expect(journey.summaryValue('Duration of role')).toHaveText('Indefinite');
    await test.info().attach('mutation-return-context', {
      body: JSON.stringify(await page.evaluate(() => ({ backUrl: window.history.state?.backUrl }))),
      contentType: 'application/json',
    });
    await setupRoleReadback(page, reallocatedRecords);
    const mutationResponse = page.waitForResponse('**/api/role-access/allocate-role/reallocate');
    await journey.confirmButton.click();
    await mutationResponse;
    expect(requests).toHaveLength(1);
    expect(requests[0].method()).toBe('POST');
    expect(new URL(requests[0].url()).pathname).toBe('/api/role-access/allocate-role/reallocate');
    expect(requests[0].postDataJSON()).toEqual(expectedReallocation);
    await expect(page).toHaveURL(new RegExp(`/cases/case-details/IA/Asylum/${roleCaseId}(?:#.*)?$`));
    await test.info().attach('automatic-return-url', { body: page.url(), contentType: 'text/plain' });
    await expect.soft(page.getByText("You've reallocated a role", { exact: true })).toBeVisible();

    // The ticket requires refreshed roles, not an automatic selected-tab return.
    await page.reload();
    await caseDetailsPage.selectCaseDetailsTab('Roles and access');
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops').locator('tbody tr')).toHaveCount(1);
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('Clara Replacement');
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).not.toContainText('Alice Example');
    await expect(caseDetailsPage.getRoleAccessSection('Judiciary')).toContainText('Bob Judge');
    await expect(caseDetailsPage.getRoleAccessSection('Judiciary')).toContainText('10 February 2026');
  });
});
