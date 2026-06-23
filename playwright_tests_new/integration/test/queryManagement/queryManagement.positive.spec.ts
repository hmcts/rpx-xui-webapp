import { expect, test } from '../../../E2E/fixtures';
import { openSolicitorRaiseQueryFromNextStep } from '../../helpers';
import {
  QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID,
  QUERY_MANAGEMENT_CASE_REFERENCE,
  QUERY_MANAGEMENT_CONFIRMATION_HEADER,
  QUERY_MANAGEMENT_QUERY_DETAIL,
  QUERY_MANAGEMENT_QUERY_SUBJECT,
  QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID,
} from '../../mocks/queryManagement.mock';

test.describe('Query Management integration', { tag: ['@integration', '@integration-query-management'] }, () => {
  test('allows a solicitor to raise a query from the case Next step event', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    const submissionCapture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage);

    await test.step('Choose the raise-query journey from Query Management options', async () => {
      await queryManagementPage.chooseRaiseAQueryJourney(QUERY_MANAGEMENT_CASE_REFERENCE);
    });

    await test.step('Enter query details and continue to review', async () => {
      await queryManagementPage.enterQueryDetailsAndContinue(QUERY_MANAGEMENT_QUERY_SUBJECT, QUERY_MANAGEMENT_QUERY_DETAIL);
      await queryManagementPage.expectReviewQueryDetails(QUERY_MANAGEMENT_QUERY_SUBJECT, QUERY_MANAGEMENT_QUERY_DETAIL);
    });

    await test.step('Submit the query and assert the CCD event payload', async () => {
      const submitResponse = page.waitForResponse(
        (response) =>
          response.url().includes(`/data/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/events`) &&
          response.request().method() === 'POST'
      );

      await queryManagementPage.submitQuery();
      await submitResponse;

      await queryManagementPage.expectQuerySubmitted(QUERY_MANAGEMENT_CONFIRMATION_HEADER);

      expect(submissionCapture.submittedEvents).toHaveLength(1);
      const submittedEvent = submissionCapture.submittedEvents[0];
      const queryCollection = submittedEvent.data?.[QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID] as {
        partyName?: string;
        roleOnCase?: string;
        caseMessages?: Array<{
          id: string | null;
          value?: {
            subject?: string;
            body?: string;
            isHearingRelated?: string;
            hearingDate?: string | null;
            name?: string;
            attachments?: unknown[];
            isHmctsStaff?: string;
          };
        }>;
      };
      const queryMessage = queryCollection.caseMessages?.[0]?.value;

      expect(submittedEvent.event).toMatchObject({
        id: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID,
        description: 'Raise a query',
      });
      expect(submittedEvent.event_token).toBe(`mock-${QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID}-event-token`);
      expect(queryCollection).toMatchObject({
        partyName: 'Query Solicitor',
        roleOnCase: '',
      });
      expect(queryMessage).toMatchObject({
        subject: QUERY_MANAGEMENT_QUERY_SUBJECT,
        body: QUERY_MANAGEMENT_QUERY_DETAIL,
        isHearingRelated: 'No',
        hearingDate: null,
        name: 'Query Solicitor',
        attachments: [],
      });
      expect(queryMessage).not.toHaveProperty('isHmctsStaff');
    });
  });
});
