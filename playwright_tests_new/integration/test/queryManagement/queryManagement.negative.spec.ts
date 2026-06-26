import { expect, test } from '../../../E2E/fixtures';
import { openSolicitorRaiseQueryFromNextStep, setupQueryManagementMockRoutes } from '../../helpers';
import {
  buildQueryManagementExistingQueryCollection,
  QUERY_MANAGEMENT_CASE_REFERENCE,
  QUERY_MANAGEMENT_CASE_TYPE,
  QUERY_MANAGEMENT_JURISDICTION,
  QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
} from '../../mocks/queryManagement.mock';
import { applySessionCookies } from '../../../common/sessionCapture';
import { TEST_USERS } from '../../testData';

test.describe('Query Management negative integration', { tag: ['@integration', '@integration-query-management'] }, () => {
  test('shows validation when a solicitor continues without choosing a query option', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    const submissionCapture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage);

    await queryManagementPage.continueButton.click();

    await expect(queryManagementPage.errorSummaryTitle).toHaveText('There is a problem');
    await expect(queryManagementPage.validationErrors).toContainText(['Select an option']);
    await expect(queryManagementPage.raiseANewQueryHeading).toBeVisible();
    expect(submissionCapture.submittedEvents).toHaveLength(0);
  });

  test('shows validation when a solicitor continues without mandatory query details', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    const submissionCapture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage);

    await queryManagementPage.chooseRaiseAQueryJourney();
    await queryManagementPage.continueButton.click();

    await expect(page).toHaveURL(new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}/raiseAQuery(?:$|[/?#])`));
    await expect(queryManagementPage.errorSummaryTitle).toHaveText('There is a problem');
    await expect(queryManagementPage.validationErrors).toContainText([
      'Enter a query subject',
      'Enter query details',
      'Select whether the query is hearing related or not',
    ]);
    await expect(queryManagementPage.enterQueryDetailsHeading).toBeVisible();
    expect(submissionCapture.submittedEvents).toHaveLength(0);
  });

  test('shows the case-not-configured validation when the requested query cannot be resolved', async ({
    page,
    queryManagementPage,
  }) => {
    await applySessionCookies(page, TEST_USERS.SOLICITOR);
    const submissionCapture = await setupQueryManagementMockRoutes(page, {
      includeQueryTab: true,
      queryCollection: buildQueryManagementExistingQueryCollection({ includeResponse: true }),
      user: 'solicitor',
    });

    await page.goto(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}/4/missing-query-id`);

    await expect(queryManagementPage.errorSummaryTitle).toHaveText('There is a problem');
    await expect(queryManagementPage.validationErrors).toContainText(['This case is not configured for query management.']);
    expect(submissionCapture.submittedEvents).toHaveLength(0);
  });

  test('shows a query setup error when the raise-query event trigger fails', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    await applySessionCookies(page, TEST_USERS.SOLICITOR);
    const submissionCapture = await setupQueryManagementMockRoutes(page, {
      raiseQueryEventTrigger: {
        status: 500,
        body: { message: 'query-event-trigger-failed' },
      },
    });
    const failedTriggerResponse = page.waitForResponse(
      (response) =>
        response.url().includes(`/event-triggers/queryManagementRaiseQuery`) &&
        response.request().method() === 'GET' &&
        response.status() === 500
    );

    await caseDetailsPage.openCaseDetails(
      QUERY_MANAGEMENT_JURISDICTION,
      QUERY_MANAGEMENT_CASE_TYPE,
      QUERY_MANAGEMENT_CASE_REFERENCE
    );
    await caseDetailsPage.selectCaseAction(QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME, {
      expectedLocator: queryManagementPage.raiseANewQueryHeading,
      expectedPath: new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}(?:$|[/?#])`),
    });
    await queryManagementPage.chooseRaiseAQueryJourney();
    await failedTriggerResponse;

    await expect(page.getByText('query-event-trigger-failed', { exact: true })).toBeVisible();
    await expect(queryManagementPage.continueButton).not.toBeVisible();
    expect(submissionCapture.submittedEvents).toHaveLength(0);
  });

  test('shows an event creation error and stays on review when query submission fails', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    await applySessionCookies(page, TEST_USERS.SOLICITOR);
    const submissionCapture = await setupQueryManagementMockRoutes(page, {
      submitQueryEvent: {
        status: 500,
        body: { message: 'query-submit-failed' },
      },
    });
    await caseDetailsPage.openCaseDetails(
      QUERY_MANAGEMENT_JURISDICTION,
      QUERY_MANAGEMENT_CASE_TYPE,
      QUERY_MANAGEMENT_CASE_REFERENCE
    );
    await caseDetailsPage.selectCaseAction(QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME, {
      expectedLocator: queryManagementPage.raiseANewQueryHeading,
      expectedPath: new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}(?:$|[/?#])`),
    });
    await queryManagementPage.chooseRaiseAQueryJourney();
    await queryManagementPage.enterQueryDetailsAndContinue('Submission failure subject', 'Submission failure details');
    await expect(queryManagementPage.reviewQueryDetailsHeading).toBeVisible();

    const failedSubmitResponse = page.waitForResponse(
      (response) =>
        response.url().includes(`/data/cases/${QUERY_MANAGEMENT_CASE_REFERENCE}/events`) &&
        response.request().method() === 'POST' &&
        response.status() === 500
    );

    await queryManagementPage.submitQuery();
    await failedSubmitResponse;

    await expect(queryManagementPage.reviewQueryDetailsHeading).toBeVisible();
    await expect(queryManagementPage.eventCreationErrorHeading).toBeVisible();
    await expect(queryManagementPage.querySubmittedHeading).not.toBeVisible();
    expect(submissionCapture.submittedEvents).toHaveLength(1);
  });
});
