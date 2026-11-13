import { expect, test } from '../../../E2E/fixtures';
import { openSolicitorRaiseQueryFromNextStep } from '../../helpers/queryManagementMockRoutes.helper';
import { QUERY_MANAGEMENT_CASE_REFERENCE, QUERY_MANAGEMENT_CONFIGURED_FLAGS } from '../../mocks/queryManagement.mock';

test(
  'configured guidance requires a selection without navigating or submitting',
  { tag: ['@integration', '@integration-query-management'] },
  async ({ page, caseDetailsPage, queryManagementPage }) => {
    const capture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage, {
      featureFlags: QUERY_MANAGEMENT_CONFIGURED_FLAGS,
    });
    await queryManagementPage.continueButton.click();
    await expect(queryManagementPage.validationErrors).toContainText(['Select an option']);
    await expect(page).toHaveURL(new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}$`));
    await expect(queryManagementPage.guidance).toHaveCount(0);
    expect(capture.submittedEvents).toEqual([]);
  }
);
