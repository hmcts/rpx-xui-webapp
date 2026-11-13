import { expect, test } from '../../../E2E/fixtures';
import { openSolicitorRaiseQueryFromNextStep } from '../../helpers/queryManagementMockRoutes.helper';
import { QUERY_MANAGEMENT_QUERY_SUBJECT, QUERY_MANAGEMENT_QUERY_DETAIL } from '../../mocks/queryManagement.mock';

test(
  'an incomplete hearing date prevents review and submission',
  { tag: ['@integration', '@integration-query-management'] },
  async ({ page, caseDetailsPage, queryManagementPage }) => {
    const capture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage);
    await queryManagementPage.chooseRaiseAQueryJourney();
    await queryManagementPage.querySubjectInput.fill(QUERY_MANAGEMENT_QUERY_SUBJECT);
    await queryManagementPage.queryDetailInput.fill(QUERY_MANAGEMENT_QUERY_DETAIL);
    await queryManagementPage.hearingRelatedYesRadio.check();
    await queryManagementPage.enterHearingDate('17', '7', '');
    await queryManagementPage.continueButton.click();
    await expect(queryManagementPage.validationErrors).toContainText(['Enter a valid date']);
    await expect(queryManagementPage.reviewQueryDetails).toHaveCount(0);
    await expect(queryManagementPage.querySubmittedHeading).toHaveCount(0);
    expect(capture.submittedEvents).toEqual([]);
  }
);
