import { expect, test } from '../../../E2E/fixtures';
import {
  getQueryManagementSubmittedQueryCollection,
  openCaseworkerRespondToQueryFromTasksTab,
  openSolicitorFollowUpQueryFromQueryDetails,
  openSolicitorRaiseQueryFromNextStep,
} from '../../helpers';
import {
  QUERY_MANAGEMENT_CASE_REFERENCE,
  QUERY_MANAGEMENT_CASE_TYPE,
  QUERY_MANAGEMENT_CONFIRMATION_HEADER,
  QUERY_MANAGEMENT_EXISTING_QUERY_ID,
  QUERY_MANAGEMENT_FOLLOW_UP_DETAIL,
  QUERY_MANAGEMENT_FOLLOW_UP_MESSAGE_TYPE,
  QUERY_MANAGEMENT_JURISDICTION,
  QUERY_MANAGEMENT_QUERY_DETAIL,
  QUERY_MANAGEMENT_QUERY_SUBJECT,
  QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID,
  QUERY_MANAGEMENT_RESPOND_MESSAGE_TYPE,
  QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID,
  QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_NAME,
  QUERY_MANAGEMENT_RESPOND_TASK_ID,
  QUERY_MANAGEMENT_RESPONSE_DETAIL,
} from '../../mocks/queryManagement.mock';

test.describe('Query Management integration', { tag: ['@integration', '@integration-query-management'] }, () => {
  test('allows a solicitor to raise a query from the case Next step event', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    const submissionCapture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage);

    await test.step('Choose the raise-query journey from Query Management options', async () => {
      await expect(page).toHaveURL(new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}(?:$|[/?#])`));
      await expect(queryManagementPage.raiseANewQueryHeading).toBeVisible();
      await expect(queryManagementPage.raiseANewQueryHeading).toContainText('Raise a new query');

      await queryManagementPage.chooseRaiseAQueryJourney();

      await expect(page).toHaveURL(
        new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}/raiseAQuery(?:$|[/?#])`)
      );
      await expect(queryManagementPage.enterQueryDetailsHeading).toBeVisible();
      await expect(queryManagementPage.enterQueryDetailsHeading).toContainText('Enter query details');
    });

    await test.step('Enter query details and continue to review', async () => {
      await queryManagementPage.enterQueryDetailsAndContinue(QUERY_MANAGEMENT_QUERY_SUBJECT, QUERY_MANAGEMENT_QUERY_DETAIL);

      await expect(queryManagementPage.reviewQueryDetailsHeading).toBeVisible();
      await expect(queryManagementPage.reviewQueryDetailsHeading).toContainText('Review query details');
      await expect(queryManagementPage.reviewSummaryValues.nth(0)).toContainText(QUERY_MANAGEMENT_QUERY_SUBJECT);
      await expect(queryManagementPage.reviewSummaryValues.nth(1)).toContainText(QUERY_MANAGEMENT_QUERY_DETAIL);
      await expect(queryManagementPage.reviewSummaryValues.nth(2)).toContainText('No');
    });

    await test.step('Submit the query and assert the CCD event payload', async () => {
      const submitResponse = page.waitForResponse(
        (response) =>
          response.url().includes(`/data/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/events`) &&
          response.request().method() === 'POST'
      );

      await queryManagementPage.submitQuery();
      await submitResponse;

      await expect(queryManagementPage.querySubmittedHeading).toBeVisible();
      await expect(queryManagementPage.querySubmittedHeading).toContainText('Query submitted');
      await expect(queryManagementPage.querySubmittedConfirmation).toContainText(QUERY_MANAGEMENT_CONFIRMATION_HEADER);

      expect(submissionCapture.submittedEvents).toHaveLength(1);
      const submittedEvent = submissionCapture.submittedEvents[0];
      const queryCollection = getQueryManagementSubmittedQueryCollection(submittedEvent);
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

    await test.step('Open the Queries tab and assert the submitted query is shown', async () => {
      await caseDetailsPage.openCaseDetails(
        QUERY_MANAGEMENT_JURISDICTION,
        QUERY_MANAGEMENT_CASE_TYPE,
        QUERY_MANAGEMENT_CASE_REFERENCE
      );
      await caseDetailsPage.selectCaseDetailsTab('Queries');
      await expect(queryManagementPage.queryList).toBeVisible();
      await expect(queryManagementPage.queryListCaption).toContainText('Query Solicitor');

      const queryRow = queryManagementPage.queryListRow(QUERY_MANAGEMENT_QUERY_SUBJECT);
      await expect(queryRow).toBeVisible();
      await expect(queryRow).toContainText(QUERY_MANAGEMENT_QUERY_SUBJECT);
      await expect(queryRow).toContainText('Query Solicitor');

      await queryManagementPage.openQueryFromQueriesTable(QUERY_MANAGEMENT_QUERY_SUBJECT);

      await expect(queryManagementPage.queryDetails).toBeVisible();
      await expect(queryManagementPage.queryDetailsCaption).toContainText('Query details');
      await expect(queryManagementPage.queryDetailsRow('Sender name')).toBeVisible();
      await expect(queryManagementPage.queryDetailsRowValue('Sender name')).toContainText('Query Solicitor');
      await expect(queryManagementPage.queryDetailsRowValue('Query subject')).toContainText(QUERY_MANAGEMENT_QUERY_SUBJECT);
      await expect(queryManagementPage.queryDetailsRowValue('Query body')).toContainText(QUERY_MANAGEMENT_QUERY_DETAIL);
      await expect(queryManagementPage.queryDetailsRowValue('Is the query hearing related?')).toContainText('No');
    });
  });

  test('allows a caseworker to respond to a query from the Tasks tab', async ({ page, caseDetailsPage, queryManagementPage }) => {
    const submissionCapture = await openCaseworkerRespondToQueryFromTasksTab(page, caseDetailsPage, queryManagementPage);

    await test.step('Enter the response and continue to review', async () => {
      await expect(page).toHaveURL(
        new RegExp(
          `/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}/3/${QUERY_MANAGEMENT_EXISTING_QUERY_ID}\\?tid=${QUERY_MANAGEMENT_RESPOND_TASK_ID}(?:$|[&#])`
        )
      );
      await expect(queryManagementPage.respondQueryForm).toBeVisible();
      await expect(queryManagementPage.respondToQueryHeading).toContainText('Respond to a query');
      await expect(queryManagementPage.responseDetailInput).toBeVisible();

      await queryManagementPage.enterResponseDetailsAndContinue(QUERY_MANAGEMENT_RESPONSE_DETAIL);

      await expect(queryManagementPage.reviewQueryDetailsHeading).toBeVisible();
      await expect(queryManagementPage.reviewQueryDetailsHeading).toContainText('Review query response details');
      await expect(queryManagementPage.reviewSummaryValues.nth(0)).toContainText(QUERY_MANAGEMENT_QUERY_SUBJECT);
      await expect(queryManagementPage.reviewSummaryValues.nth(1)).toContainText(QUERY_MANAGEMENT_RESPONSE_DETAIL);
      await expect(queryManagementPage.reviewSummaryValues.nth(2)).toContainText('No answer');
    });

    await test.step('Submit the response, complete the task and assert the CCD event payload', async () => {
      const submitResponse = page.waitForResponse(
        (response) =>
          response.url().includes(`/data/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/events`) &&
          response.request().method() === 'POST'
      );
      const completeTaskResponse = page.waitForResponse(
        (response) =>
          response.url().includes(`/workallocation/task/${QUERY_MANAGEMENT_RESPOND_TASK_ID}/complete`) &&
          response.request().method() === 'POST'
      );

      await queryManagementPage.submitQuery();
      await submitResponse;
      await completeTaskResponse;

      await expect(queryManagementPage.querySubmittedHeading).toBeVisible();
      await expect(queryManagementPage.querySubmittedHeading).toContainText('Query response submitted');
      await expect(queryManagementPage.queryResponseSubmittedConfirmation).toContainText(
        'This query response has been added to the case'
      );

      expect(submissionCapture.submittedEvents).toHaveLength(1);
      const submittedEvent = submissionCapture.submittedEvents[0];
      const queryCollection = getQueryManagementSubmittedQueryCollection(submittedEvent);
      const responseMessage = queryCollection.caseMessages?.find(
        (message) => message.value?.parentId === QUERY_MANAGEMENT_EXISTING_QUERY_ID
      )?.value;

      expect(submittedEvent.event).toMatchObject({
        id: QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID,
        description: QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_NAME,
      });
      expect(submittedEvent.event_token).toBe(`mock-${QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID}-event-token`);
      expect(responseMessage).toMatchObject({
        subject: QUERY_MANAGEMENT_QUERY_SUBJECT,
        body: QUERY_MANAGEMENT_RESPONSE_DETAIL,
        name: 'Case Worker',
        attachments: [],
        parentId: QUERY_MANAGEMENT_EXISTING_QUERY_ID,
        isClosed: 'No',
        messageType: QUERY_MANAGEMENT_RESPOND_MESSAGE_TYPE,
      });
      expect(submissionCapture.completedTasks).toEqual([
        {
          taskId: QUERY_MANAGEMENT_RESPOND_TASK_ID,
          body: {
            actionByEvent: true,
            eventName: QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_NAME,
          },
        },
      ]);
    });
  });

  test('allows a solicitor to raise a follow-up query from query details', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    const submissionCapture = await openSolicitorFollowUpQueryFromQueryDetails(page, caseDetailsPage, queryManagementPage);

    await test.step('Enter follow-up query details and continue to review', async () => {
      await expect(page).toHaveURL(
        new RegExp(
          `/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}/4/${QUERY_MANAGEMENT_EXISTING_QUERY_ID}(?:$|[/?#])`
        )
      );
      await expect(queryManagementPage.respondQueryForm).toBeVisible();
      await expect(queryManagementPage.respondToQueryHeading).toContainText('Ask a follow-up question');
      await expect(queryManagementPage.responseDetailInput).toBeVisible();

      await queryManagementPage.enterFollowUpDetailsAndContinue(QUERY_MANAGEMENT_FOLLOW_UP_DETAIL);

      await expect(queryManagementPage.reviewQueryDetailsHeading).toBeVisible();
      await expect(queryManagementPage.reviewQueryDetailsHeading).toContainText('Review query details');
      await expect(queryManagementPage.reviewSummaryValues.nth(0)).toContainText(QUERY_MANAGEMENT_FOLLOW_UP_DETAIL);
    });

    await test.step('Submit the follow-up query and assert the CCD event payload', async () => {
      const submitResponse = page.waitForResponse(
        (response) =>
          response.url().includes(`/data/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/events`) &&
          response.request().method() === 'POST'
      );

      await queryManagementPage.submitQuery();
      await submitResponse;

      await expect(queryManagementPage.querySubmittedHeading).toBeVisible();
      await expect(queryManagementPage.querySubmittedHeading).toContainText('Query submitted');
      await expect(queryManagementPage.querySubmittedConfirmation).toContainText(QUERY_MANAGEMENT_CONFIRMATION_HEADER);

      expect(submissionCapture.submittedEvents).toHaveLength(1);
      expect(submissionCapture.completedTasks).toHaveLength(0);
      const submittedEvent = submissionCapture.submittedEvents[0];
      const queryCollection = getQueryManagementSubmittedQueryCollection(submittedEvent);
      const followUpMessage = queryCollection.caseMessages?.find(
        (message) => message.value?.body === QUERY_MANAGEMENT_FOLLOW_UP_DETAIL
      )?.value;

      expect(submittedEvent.event).toMatchObject({
        id: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID,
        description: 'Raise a query',
      });
      expect(submittedEvent.event_token).toBe(`mock-${QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID}-event-token`);
      expect(queryCollection.caseMessages).toHaveLength(3);
      expect(followUpMessage).toMatchObject({
        subject: QUERY_MANAGEMENT_QUERY_SUBJECT,
        body: QUERY_MANAGEMENT_FOLLOW_UP_DETAIL,
        name: 'Query Solicitor',
        attachments: [],
        parentId: QUERY_MANAGEMENT_EXISTING_QUERY_ID,
        isClosed: 'No',
        messageType: QUERY_MANAGEMENT_FOLLOW_UP_MESSAGE_TYPE,
      });
    });
  });
});
