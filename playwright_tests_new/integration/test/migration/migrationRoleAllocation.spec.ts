import { expect, test } from '../../helpers/migrationTest.fixture';
import { CaseDetailsPage } from '../../../E2E/page-objects/pages/exui/caseDetails.po';
import { RoleAllocationPage } from '../../../E2E/page-objects/pages/exui/roleAllocation.po';
import { setupRoleAllocationMockRoutes } from '../../helpers/roleAllocationMockRoutes.helper';
import { allocatedPerson, allocationCaseId } from '../../mocks/roleAllocation.mock';

test.describe('Role allocation validation recovery', { tag: ['@integration', '@integration-govuk-migration'] }, () => {
  test('role error link focuses the invalid radio and preserves its case route', async ({ page }, testInfo) => {
    const routes = await setupRoleAllocationMockRoutes(page);
    const details = new CaseDetailsPage(page);
    const allocation = new RoleAllocationPage(page);
    await details.openRolesAndAccessTab(allocationCaseId);
    await details.getAllocateLegalOpsRoleLink().click();
    await expect(allocation.caseManagerRadio).toBeVisible();
    await expect(allocation.caseManagerRadio).not.toBeChecked();
    const context = new URL(page.url());
    expect(context.searchParams.get('caseId')).toBe(allocationCaseId);
    expect(context.searchParams.get('jurisdiction')).toBe('IA');
    expect(context.searchParams.get('roleCategory')).toBe('LEGAL_OPERATIONS');

    await allocation.continueButton.press('Enter');
    await expect(allocation.errorSummary).toContainText('Please select an option');
    expect(routes.requests).toHaveLength(0);
    const link = allocation.errorSummary.getByRole('link', { name: 'Please select an option', exact: true });
    await expect(link).toBeVisible();
    await link.press('Enter');
    await testInfo.attach('role-error-link-outcome', {
      body: JSON.stringify({
        before: `${context.pathname}${context.search}`,
        after: `${new URL(page.url()).pathname}${new URL(page.url()).search}`,
        active: await page.evaluate(() => ({ tag: document.activeElement?.tagName, id: document.activeElement?.id })),
      }),
      contentType: 'application/json',
    });
    await expect
      .soft(page, 'Error-link activation must retain the allocation route and case context')
      .toHaveURL((url) => url.pathname === context.pathname && url.search === context.search);
    await expect.soft(allocation.caseManagerRadio, 'The first invalid radio must receive keyboard focus').toBeFocused();
    expect(routes.requests, 'Error-link activation must not allocate a role').toHaveLength(0);
    expect(routes.getUnexpectedRequests()).toEqual([]);
  });

  test('correcting an omitted role reaches the populated review without allocating', async ({ page }, testInfo) => {
    const routes = await setupRoleAllocationMockRoutes(page);
    const details = new CaseDetailsPage(page);
    const allocation = new RoleAllocationPage(page);
    await details.openRolesAndAccessTab(allocationCaseId);
    await details.getAllocateLegalOpsRoleLink().click();
    await expect(allocation.caseManagerRadio).toBeVisible();
    const context = new URL(page.url());
    expect(context.searchParams.get('caseId')).toBe(allocationCaseId);
    expect(context.searchParams.get('jurisdiction')).toBe('IA');
    expect(context.searchParams.get('roleCategory')).toBe('LEGAL_OPERATIONS');
    await allocation.continueButton.press('Enter');
    await expect(allocation.errorSummary).toContainText('Please select an option');
    expect(routes.requests).toHaveLength(0);

    await allocation.caseManagerRadio.press('Space');
    await expect(allocation.caseManagerRadio).toBeChecked();
    await allocation.reviewAllocation();
    await expect(allocation.confirmButton).toBeVisible();
    await expect(allocation.confirmButton).toBeEnabled();
    await expect(allocation.summaryValue('Type of role')).toHaveText('Case manager');
    await expect(allocation.summaryValue('Who the role will be allocated to')).toHaveText('Allocate to another person');
    await expect(allocation.summaryValue('Person')).toContainText(allocatedPerson.name);
    await expect(allocation.summaryValue('Person')).toContainText(allocatedPerson.email);
    await expect(allocation.summaryValue('Duration of role')).toHaveText('Indefinite');
    await expect(allocation.errorSummary).toHaveCount(0);
    await expect(page).toHaveURL((url) => url.pathname === context.pathname && url.search === context.search);
    expect(routes.requests, 'Review must not send the allocation confirmation').toHaveLength(0);
    expect(routes.getUnexpectedRequests()).toEqual([]);
    await testInfo.attach('role-corrected-review', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  });
});
