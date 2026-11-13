import { expect, test } from '../../../E2E/fixtures';
import { RoleAccessPage } from '../../../E2E/page-objects/pages/exui/roleAccess.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupTaskListMockRoutes } from '../../helpers/taskListMockRoutes.helper';
import { setupRoleJourney, setupRoleReadback } from '../../helpers/roleJourneys.helper';
import {
  roleCaseId,
  roleCasePath,
  addedExclusionRecords,
  expectedOtherExclusion,
  expectedSelfExclusion,
  exclusionReason,
} from '../../mocks/roleJourneys.mock';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe('Case exclusions', { tag: ['@integration', '@integration-case-details'] }, () => {
  test('excludes the selected person and reads back the exclusion without removing roles', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page);
    const journey = new RoleAccessPage(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await caseDetailsPage.getAddExclusionLink().click();
    await journey.reviewExclusion('Exclude another person', exclusionReason);
    await expect(journey.summaryValue('Who is the exclusion for')).toHaveText('Exclude another person');
    await expect(journey.summaryValue("What's the person's role")).toHaveText('Legal Ops');
    await expect(journey.summaryValue('Person')).toHaveText('Clara Replacement\nclara@example.com', { useInnerText: true });
    await expect(journey.summaryValue('Describe the exclusion')).toHaveText(exclusionReason);
    await setupRoleReadback(page, addedExclusionRecords);
    await journey.confirmExclusionButton.click();
    await expect(page).toHaveURL(new RegExp(`${roleCasePath}$`));
    expect(requests).toHaveLength(1);
    expect(requests[0].method()).toBe('POST');
    expect(new URL(requests[0].url()).pathname).toBe('/api/role-access/exclusions/confirm');
    expect(requests[0].postDataJSON()).toEqual(expectedOtherExclusion);
    await page.reload();
    const added = caseDetailsPage.getExclusionsTable().getByRole('row').filter({ hasText: 'Clara Replacement' });
    await expect(added).toHaveCount(1);
    await expect(added).toContainText(exclusionReason);
    await expect(caseDetailsPage.getExclusionsTable().locator('tbody tr')).toHaveCount(3);
    await expect(caseDetailsPage.getExclusionsTable()).toContainText('Judicial conflict flagged.');
    await expect(caseDetailsPage.getExclusionsTable()).toContainText('Separate conflict.');
    await expect(caseDetailsPage.getRoleAccessSection('Legal Ops')).toContainText('Alice Example');
    await expect(caseDetailsPage.getRoleAccessSection('Judiciary')).toContainText('Bob Judge');
  });
  test('self-exclusion uses the authenticated self option and returns to My work', async ({ page, caseDetailsPage }) => {
    const userResponse = page.waitForResponse('**/api/user/details*');
    await setupTaskListMockRoutes(page, { tasks: [], total_records: 0 });
    const { requests } = await setupRoleJourney(page);
    const journey = new RoleAccessPage(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await caseDetailsPage.getAddExclusionLink().click();
    expect((await (await userResponse).json()).userInfo.id).toBe('11111111-1111-4111-8111-111111111111');
    await journey.reviewExclusion('Exclude me', exclusionReason);
    await expect(journey.summaryValue('Who is the exclusion for')).toHaveText('Exclude me');
    await journey.confirmExclusionButton.click();
    await expect(page).toHaveURL(/\/work\/my-work\/list$/);
    await expect(page.getByRole('heading', { name: 'My work', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'You have no assigned tasks.', exact: true })).toBeVisible();
    expect(requests).toHaveLength(1);
    expect(requests[0].method()).toBe('POST');
    expect(new URL(requests[0].url()).pathname).toBe('/api/role-access/exclusions/confirm');
    expect(requests[0].postDataJSON()).toEqual(expectedSelfExclusion);
  });
});
