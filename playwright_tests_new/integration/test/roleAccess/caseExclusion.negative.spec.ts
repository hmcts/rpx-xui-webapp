import { expect, test } from '../../../E2E/fixtures';
import { RoleAccessPage } from '../../../E2E/page-objects/pages/exui/roleAccess.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupRoleJourney } from '../../helpers/roleJourneys.helper';
import { roleCaseId, roleCasePath, expectedSelfExclusion, exclusionReason } from '../../mocks/roleJourneys.mock';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe('Case exclusion failures', { tag: ['@integration', '@integration-case-details'] }, () => {
  test('requires an exclusion choice and reason; cancel submits nothing', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page);
    const journey = new RoleAccessPage(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await caseDetailsPage.getAddExclusionLink().click();
    await journey.continueButton.click();
    await expect(journey.errorSummary).toContainText('Please select an option');
    expect(requests).toHaveLength(0);
    await journey.exclusionChoice('Exclude me').check();
    await journey.continueButton.click();
    await journey.continueButton.click();
    await expect(journey.errorSummary).toContainText('Enter exclusion');
    await expect(journey.description).toBeVisible();
    expect(requests).toHaveLength(0);
    await journey.cancelLink.click();
    await expect(page).toHaveURL(new RegExp(`${roleCasePath}$`));
    await expect(caseDetailsPage.getExclusionsTable().locator('tbody tr')).toHaveCount(2);
    expect(requests).toHaveLength(0);
  });
  test('rejects missing category and missing person without an exclusion request', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page);
    const journey = new RoleAccessPage(page);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await caseDetailsPage.getAddExclusionLink().click();
    await journey.exclusionChoice('Exclude another person').check();
    await journey.continueButton.click();
    await journey.continueButton.click();
    await expect(journey.errorSummary).toContainText('Please select an option');
    await journey.exclusionChoice('Legal Ops').check();
    await journey.continueButton.click();
    await journey.continueButton.click();
    await expect(journey.errorSummary).toContainText('You must select a name');
    expect(requests).toHaveLength(0);
  });
  test('failed confirmation follows current error routing and leaves exclusions unchanged', async ({ page, caseDetailsPage }) => {
    const { requests } = await setupRoleJourney(page, { status: 500 });
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await caseDetailsPage.getAddExclusionLink().click();
    await new RoleAccessPage(page).reviewExclusion('Exclude me', exclusionReason);
    await new RoleAccessPage(page).confirmExclusionButton.click();
    await expect(page).toHaveURL(/\/service-down$/);
    expect(requests).toHaveLength(1);
    expect(requests[0].postDataJSON()).toEqual(expectedSelfExclusion);
    await expect(page.getByText("You've excluded yourself from a case.", { exact: true })).toHaveCount(0);
    await caseDetailsPage.openRolesAndAccessTab(roleCaseId);
    await expect(caseDetailsPage.getExclusionsTable().locator('tbody tr')).toHaveCount(2);
    await expect(caseDetailsPage.getExclusionsTable()).not.toContainText('Clara Replacement');
  });
});
