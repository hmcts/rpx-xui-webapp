import { expect, test } from '../../../E2E/fixtures';
import {
  openSolicitorRaiseQueryFromNextStep,
  setupQueryManagementMockRoutes,
} from '../../helpers/queryManagementMockRoutes.helper';
import {
  QUERY_MANAGEMENT_CASE_REFERENCE,
  QUERY_MANAGEMENT_CONFIGURED_FLAGS,
  QUERY_MANAGEMENT_CROSS_CASE_FLAGS,
  QUERY_MANAGEMENT_SECOND_CASE_REFERENCE,
  QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
} from '../../mocks/queryManagement.mock';

test.describe('Configured query guidance', { tag: ['@integration', '@integration-query-management'] }, () => {
  test('renders matching guidance, substitutes the current case and routes to its query form', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage, {
      featureFlags: QUERY_MANAGEMENT_CONFIGURED_FLAGS,
    });
    await expect(
      queryManagementPage.qualifyingQuestionOptions.getByRole('radio', { name: 'Unrelated case guidance' })
    ).toHaveCount(0);
    await queryManagementPage.selectGuidance('Read case guidance');
    await expect(queryManagementPage.guidance.locator('ccd-markdown')).toHaveText(
      `Guidance for case 1652-1613-7285-4637. Check case 1652-1613-7285-4637 before continuing.`
    );
    await queryManagementPage.continueButton.click();
    await expect(page).toHaveURL(new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}/raiseAQuery$`));
    await expect(queryManagementPage.enterQueryDetailsHeading).toBeVisible();
    await expect(queryManagementPage.documents).toContainText('Attach evidence relevant to this asylum query.');
    await expect(queryManagementPage.content).not.toContainText('Unrelated attachment guidance.');
  });

  test('routes a direct option without showing markdown', async ({ page, caseDetailsPage, queryManagementPage }) => {
    await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage, {
      featureFlags: QUERY_MANAGEMENT_CONFIGURED_FLAGS,
    });
    await queryManagementPage.selectGuidance('Go directly to a query');
    await expect(page).toHaveURL(new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}/raiseAQuery$`));
    await expect(queryManagementPage.enterQueryDetailsHeading).toBeVisible();
    await expect(queryManagementPage.guidance).toHaveCount(0);
  });

  test('information-only guidance hides Continue and Previous restores options and controls', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage, {
      featureFlags: QUERY_MANAGEMENT_CONFIGURED_FLAGS,
    });
    await queryManagementPage.selectGuidance('Read information only');
    await expect(queryManagementPage.guidance.locator('ccd-markdown')).toHaveText('This information does not require a query.');
    await expect(queryManagementPage.continueButton).toHaveCount(0);
    await queryManagementPage.previousButton.click();
    await expect(queryManagementPage.raiseANewQueryHeading).toBeVisible();
    await expect(queryManagementPage.continueButton).toBeVisible();
    await queryManagementPage.selectGuidance('Read case guidance');
    await expect(queryManagementPage.guidance).toContainText('Guidance for case 1652-1613-7285-4637.');
    await expect(queryManagementPage.guidance).not.toContainText('This information does not require a query.');
    await expect(queryManagementPage.continueButton).toBeVisible();
  });
  test('leaving guidance for another case resets the selection and substitutes the new case', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage, {
      featureFlags: QUERY_MANAGEMENT_CROSS_CASE_FLAGS,
    });
    await queryManagementPage.selectGuidance('Read another case');
    await expect(queryManagementPage.guidance).toContainText('Check the current guidance before changing case.');
    await setupQueryManagementMockRoutes(page, {
      caseReference: QUERY_MANAGEMENT_SECOND_CASE_REFERENCE,
      featureFlags: QUERY_MANAGEMENT_CROSS_CASE_FLAGS,
    });
    await queryManagementPage.continueButton.click();
    await expect(page).toHaveURL(new RegExp(`/cases/case-details/IA/Asylum/${QUERY_MANAGEMENT_SECOND_CASE_REFERENCE}`));
    await caseDetailsPage.selectCaseAction(QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME, {
      expectedLocator: queryManagementPage.raiseANewQueryHeading,
      expectedPath: new RegExp(`/query-management/query/${QUERY_MANAGEMENT_SECOND_CASE_REFERENCE}$`),
    });
    await expect(queryManagementPage.guidance).toHaveCount(0);
    await expect(queryManagementPage.qualifyingQuestionOptions.locator('input:checked')).toHaveCount(0);
    await queryManagementPage.selectGuidance('Read case guidance');
    await expect(queryManagementPage.guidance).toContainText('Guidance for case 1652-1613-7285-4645.');
    await expect(queryManagementPage.guidance).not.toContainText('1652-1613-7285-4637');
    await queryManagementPage.continueButton.click();
    await expect(page).toHaveURL(new RegExp(`/query-management/query/${QUERY_MANAGEMENT_SECOND_CASE_REFERENCE}/raiseAQuery$`));
  });
});
