import { expect, test } from '../../../E2E/fixtures';
import {
  getQueryManagementSubmittedQueryCollection,
  openSolicitorRaiseQueryFromNextStep,
} from '../../helpers/queryManagementMockRoutes.helper';
import { observeQueryDocumentViewer, setupQueryDocumentUpload } from '../../helpers/queryDocumentMockRoutes.helper';
import {
  QUERY_MANAGEMENT_CASE_REFERENCE,
  QUERY_MANAGEMENT_CASE_TYPE,
  QUERY_MANAGEMENT_JURISDICTION,
  QUERY_MANAGEMENT_DOCUMENT,
  QUERY_MANAGEMENT_EXPECTED_ATTACHMENT,
  QUERY_MANAGEMENT_QUERY_SUBJECT,
  QUERY_MANAGEMENT_QUERY_DETAIL,
  QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID,
} from '../../mocks/queryManagement.mock';

test.describe('Query document mapping', { tag: ['@integration', '@integration-query-management'] }, () => {
  test('retains the uploaded document through review, submission and reopening details', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    const capture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage);
    await setupQueryDocumentUpload(page);
    await queryManagementPage.chooseRaiseAQueryJourney();
    await queryManagementPage.attachDocument(QUERY_MANAGEMENT_DOCUMENT.originalDocumentName);
    await expect(queryManagementPage.documents.getByRole('button', { name: 'Cancel upload' })).toBeDisabled();
    await queryManagementPage.enterQueryDetailsAndContinue(QUERY_MANAGEMENT_QUERY_SUBJECT, QUERY_MANAGEMENT_QUERY_DETAIL);
    await expect(
      queryManagementPage.reviewQueryDetails.getByRole('button', {
        name: QUERY_MANAGEMENT_DOCUMENT.originalDocumentName,
        exact: true,
      })
    ).toBeVisible();
    await queryManagementPage.submitQuery();
    await expect(queryManagementPage.querySubmittedHeading).toBeVisible();
    expect(capture.submittedEvents).toHaveLength(1);
    expect(capture.submittedEventMethods).toEqual(['POST']);
    expect(capture.submittedEvents[0].event?.id).toBe(QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID);
    expect(getQueryManagementSubmittedQueryCollection(capture.submittedEvents[0]).caseMessages?.[0]?.value).toMatchObject({
      subject: QUERY_MANAGEMENT_QUERY_SUBJECT,
      body: QUERY_MANAGEMENT_QUERY_DETAIL,
      attachments: [{ id: null, value: QUERY_MANAGEMENT_EXPECTED_ATTACHMENT }],
    });
    await caseDetailsPage.openCaseDetails(
      QUERY_MANAGEMENT_JURISDICTION,
      QUERY_MANAGEMENT_CASE_TYPE,
      QUERY_MANAGEMENT_CASE_REFERENCE
    );
    await caseDetailsPage.selectCaseDetailsTab('Queries');
    await queryManagementPage.openQueryFromQueriesTable(QUERY_MANAGEMENT_QUERY_SUBJECT);
    const attachment = queryManagementPage
      .queryDetailsRowValue('Attachments')
      .getByRole('button', { name: QUERY_MANAGEMENT_DOCUMENT.originalDocumentName, exact: true });
    await expect(attachment).toBeVisible();
    const handoffs = await observeQueryDocumentViewer(page);
    const popupPromise = page.waitForEvent('popup');
    await attachment.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(/\/media-viewer(?:\?|$)/);
    await expect
      .poll(() => handoffs[0])
      .toMatchObject({
        document_filename: QUERY_MANAGEMENT_DOCUMENT.originalDocumentName,
        document_binary_url: '/documentsv2/11111111-2222-4333-8444-555555555555/binary',
      });
    await popup.close();
  });

  test('removing the document excludes it from review and the submitted collection', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    const capture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage);
    await setupQueryDocumentUpload(page);
    await queryManagementPage.chooseRaiseAQueryJourney();
    await queryManagementPage.attachDocument(QUERY_MANAGEMENT_DOCUMENT.originalDocumentName);
    await expect(queryManagementPage.documents.getByRole('button', { name: 'Cancel upload' })).toBeDisabled();
    await queryManagementPage.removeDocument();
    await queryManagementPage.enterQueryDetailsAndContinue(QUERY_MANAGEMENT_QUERY_SUBJECT, QUERY_MANAGEMENT_QUERY_DETAIL);
    await expect(queryManagementPage.reviewQueryDetails).not.toContainText(QUERY_MANAGEMENT_DOCUMENT.originalDocumentName);
    await queryManagementPage.submitQuery();
    await expect(queryManagementPage.querySubmittedHeading).toBeVisible();
    expect(capture.submittedEvents).toHaveLength(1);
    expect(capture.submittedEventMethods).toEqual(['POST']);
    expect(getQueryManagementSubmittedQueryCollection(capture.submittedEvents[0]).caseMessages?.[0]?.value?.attachments).toEqual(
      []
    );
  });
});
