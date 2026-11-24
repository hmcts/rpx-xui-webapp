import { expect, test } from '../../../E2E/fixtures';
import { RoleAllocationPage } from '../../../E2E/page-objects/pages/exui/roleAllocation.po';
import { setupRoleAllocationMockRoutes } from '../../helpers/roleAllocationMockRoutes.helper';
import {
  allocatedPerson,
  allocationCaseId,
  allocationCasePath,
  existingJudicialRole,
  validAllocationRoles,
} from '../../mocks/roleAllocation.mock';

test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: new Date('2030-01-15T12:00:00.000Z') });
});

test.describe('Case-role allocation', { tag: ['@integration', '@integration-role-allocation-mock-session'] }, () => {
  test('allocates the reviewed role to the selected person and reads back that assignment', async ({ page, caseDetailsPage }) => {
    const { requests, getUnexpectedRequests } = await setupRoleAllocationMockRoutes(page);
    const journey = new RoleAllocationPage(page);
    await caseDetailsPage.openRolesAndAccessTab(allocationCaseId);
    const existingRow = caseDetailsPage
      .getRoleAccessSection('Judiciary')
      .getByRole('row')
      .filter({ hasText: existingJudicialRole.actorName });
    await expect(existingRow).toHaveCount(1);
    await expect(existingRow).toContainText(existingJudicialRole.roleName);
    const validRolesRequest = page.waitForRequest('**/api/role-access/allocate-role/valid-roles*');
    await caseDetailsPage.getAllocateLegalOpsRoleLink().click();
    await expect(page).toHaveURL(/\/role-access\/allocate-role\/allocate/);
    expect((await validRolesRequest).postDataJSON()).toEqual({ serviceIds: ['IA'] });
    await journey.reviewAllocation();
    await expect(journey.summaryValue('Type of role')).toHaveText('Case manager');
    await expect(journey.summaryValue('Who the role will be allocated to')).toHaveText('Allocate to another person');
    await expect(journey.summaryValue('Person')).toHaveText('Clara Replacement\nclara@example.com', { useInnerText: true });
    await expect(journey.summaryValue('Duration of role')).toHaveText('Indefinite');
    expect(requests).toHaveLength(0);

    await journey.confirmButton.click();
    await expect(page).toHaveURL(new RegExp(`${allocationCasePath}$`));
    expect(requests).toHaveLength(1);
    expect(requests[0].method()).toBe('POST');
    expect(new URL(requests[0].url()).pathname).toBe('/api/role-access/allocate-role/confirm');
    expect(requests[0].postDataJSON()).toEqual({
      caseId: allocationCaseId,
      jurisdiction: 'IA',
      state: 4,
      typeOfRole: { id: 'case-manager', name: 'Case manager' },
      allocateTo: 'Allocate to another person',
      person: allocatedPerson,
      durationOfRole: 'Indefinite',
      action: 'allocate',
      period: { startDate: '2030-01-15T00:00:00.000Z', endDate: null },
      roleCategory: 'LEGAL_OPERATIONS',
      lastError: null,
      roles: validAllocationRoles[0].roles,
    });
    await page.reload();
    const allocatedRow = caseDetailsPage
      .getRoleAccessSection('Legal Ops')
      .getByRole('row')
      .filter({ hasText: allocatedPerson.name });
    await expect(allocatedRow).toHaveCount(1);
    await expect(allocatedRow).toContainText('Case manager');
    await expect(allocatedRow).toContainText('15 January 2030');
    await expect(existingRow).toHaveCount(1);
    await expect(existingRow).toContainText(existingJudicialRole.roleName);
    expect(getUnexpectedRequests()).toEqual([]);
  });
});
