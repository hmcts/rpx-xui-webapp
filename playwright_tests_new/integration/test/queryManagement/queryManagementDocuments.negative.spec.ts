import { expect, test } from '../../../E2E/fixtures';
import {
  getQueryManagementSubmittedQueryCollection,
  openSolicitorRaiseQueryFromNextStep,
} from '../../helpers/queryManagementMockRoutes.helper';
import { setupQueryDocumentUpload } from '../../helpers/queryDocumentMockRoutes.helper';
import {
  QUERY_MANAGEMENT_DOCUMENT,
  QUERY_MANAGEMENT_EXPECTED_ATTACHMENT,
  QUERY_MANAGEMENT_QUERY_SUBJECT,
  QUERY_MANAGEMENT_QUERY_DETAIL,
} from '../../mocks/queryManagement.mock';

test(
  'failed query submission retains the attached document and review values without success',
  { tag: ['@integration', '@integration-query-management'] },
  async ({ page, caseDetailsPage, queryManagementPage }) => {
    const capture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage, {
      submitQueryEvent: { status: 500, body: { message: 'query-submit-failed' } },
    });
    await setupQueryDocumentUpload(page);
    await queryManagementPage.chooseRaiseAQueryJourney();
    await queryManagementPage.attachDocument(QUERY_MANAGEMENT_DOCUMENT.originalDocumentName);
    await expect(queryManagementPage.documents.getByRole('button', { name: 'Cancel upload' })).toBeDisabled();
    await queryManagementPage.enterQueryDetailsAndContinue(QUERY_MANAGEMENT_QUERY_SUBJECT, QUERY_MANAGEMENT_QUERY_DETAIL);
    await queryManagementPage.submitQuery();
    await expect(queryManagementPage.eventCreationErrorHeading).toBeVisible();
    await expect(queryManagementPage.reviewQueryDetails).toContainText(QUERY_MANAGEMENT_DOCUMENT.originalDocumentName);
    await expect(queryManagementPage.reviewRow('Query subject')).toContainText(QUERY_MANAGEMENT_QUERY_SUBJECT);
    await expect(queryManagementPage.reviewRow('Query detail')).toContainText(QUERY_MANAGEMENT_QUERY_DETAIL);
    await expect(queryManagementPage.querySubmittedHeading).toHaveCount(0);
    expect(capture.submittedEvents).toHaveLength(1);
    expect(capture.submittedEventMethods).toEqual(['POST']);
    expect(getQueryManagementSubmittedQueryCollection(capture.submittedEvents[0]).caseMessages?.[0]?.value?.attachments).toEqual([
      { id: null, value: QUERY_MANAGEMENT_EXPECTED_ATTACHMENT },
    ]);
  }
);
