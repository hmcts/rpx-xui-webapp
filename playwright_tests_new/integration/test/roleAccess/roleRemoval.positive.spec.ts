import { expect, test } from '../../../E2E/fixtures';
import { RoleAccessPage } from '../../../E2E/page-objects/pages/exui/roleAccess.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupRoleJourney, setupRoleReadback } from '../../helpers/roleJourneys.helper';
import { roleCaseId, roleCasePath, roleRecords } from '../../mocks/roleJourneys.mock';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe('Role removal', { tag: ['@integration', '@integration-case-details'] }, () => {
  test('removes only the selected allocation and reads back the unaffected role', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page);
    const journey = new RoleAccessPage(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await caseDetailsPage.openRoleActions('Legal Ops');
    await caseDetailsPage.getRoleActionLink('Legal Ops', 'Remove Allocation').click();
    await expect(journey.summaryValue('Type of role')).toHaveText('Case Manager');
    await expect(journey.summaryValue('Person')).toHaveText('Alice Example\nalice@example.com', { useInnerText: true });
    await setupRoleReadback(
      page,
      roleRecords.filter((record) => record.assignmentId !== 'assignment-legal-ops-case-100')
    );
    const mutationResponse = page.waitForResponse('**/api/role-access/allocate-role/delete');
    await journey.removeAllocationButton.click();
    await mutationResponse;
    expect(requests).toHaveLength(1);
    expect(requests[0].method()).toBe('POST');
    expect(new URL(requests[0].url()).pathname).toBe('/api/role-access/allocate-role/delete');
    expect(requests[0].postDataJSON()).toEqual({ assigmentId: 'assignment-legal-ops-case-100' });
    await expect(page).toHaveURL(new RegExp(`${roleCasePath}$`));
    await expect(
      page.getByText("You've removed a role allocation. You may need to unassign or reassign associated tasks too.", {
        exact: true,
      })
    ).toBeVisible();

    await page.reload();
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('There are no legal Ops roles for this case.');
    await expect(
      caseDetailsPage.getRoleAccessSection('Judiciary').getByRole('row').filter({ hasText: 'Bob Judge' })
    ).toContainText('Lead Judge');
    await expect(
      caseDetailsPage.getRoleAccessSection('Judiciary').getByRole('row').filter({ hasText: 'Bob Judge' })
    ).toContainText('10 February 2026');
    await expect(caseDetailsPage.getExclusionsTable().locator('tbody tr')).toHaveCount(2);
  });
});
