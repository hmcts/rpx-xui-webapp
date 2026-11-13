import { expect, test } from '../../../E2E/fixtures';
import {
  getQueryManagementSubmittedQueryCollection,
  openSolicitorRaiseQueryFromNextStep,
} from '../../helpers/queryManagementMockRoutes.helper';
import { QUERY_MANAGEMENT_QUERY_SUBJECT, QUERY_MANAGEMENT_QUERY_DETAIL } from '../../mocks/queryManagement.mock';

test.describe('Query hearing date mapping', { tag: ['@integration', '@integration-query-management'] }, () => {
  test.use({ timezoneId: 'Europe/London' });
  test('submits the selected hearing date and Yes answer with unchanged query details', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    const capture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage);
    await queryManagementPage.chooseRaiseAQueryJourney();
    await queryManagementPage.querySubjectInput.fill(QUERY_MANAGEMENT_QUERY_SUBJECT);
    await queryManagementPage.queryDetailInput.fill(QUERY_MANAGEMENT_QUERY_DETAIL);
    await queryManagementPage.hearingRelatedYesRadio.check();
    await queryManagementPage.enterHearingDate('17', '7', '2027');
    await queryManagementPage.continueButton.click();
    await expect(queryManagementPage.reviewRow('Is the query hearing related?')).toContainText('Yes');
    await expect(queryManagementPage.reviewRow('What is the date of the hearing?')).toContainText('17 Jul 2027');
    await queryManagementPage.submitQuery();
    await expect(queryManagementPage.querySubmittedHeading).toBeVisible();
    expect(capture.submittedEvents).toHaveLength(1);
    expect(capture.submittedEventMethods).toEqual(['POST']);
    expect(getQueryManagementSubmittedQueryCollection(capture.submittedEvents[0]).caseMessages?.[0]?.value).toMatchObject({
      subject: QUERY_MANAGEMENT_QUERY_SUBJECT,
      body: QUERY_MANAGEMENT_QUERY_DETAIL,
      isHearingRelated: 'Yes',
      hearingDate: '2027-07-17',
    });
  });

  test('changing Yes to No clears the earlier hearing date in review and submission', async ({
    page,
    caseDetailsPage,
    queryManagementPage,
  }) => {
    const capture = await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage);
    await queryManagementPage.chooseRaiseAQueryJourney();
    await queryManagementPage.querySubjectInput.fill(QUERY_MANAGEMENT_QUERY_SUBJECT);
    await queryManagementPage.queryDetailInput.fill(QUERY_MANAGEMENT_QUERY_DETAIL);
    await queryManagementPage.hearingRelatedYesRadio.check();
    await queryManagementPage.enterHearingDate('17', '7', '2027');
    await queryManagementPage.hearingRelatedNoRadio.check();
    await queryManagementPage.continueButton.click();
    await expect(queryManagementPage.reviewRow('Is the query hearing related?')).toContainText('No');
    await expect(queryManagementPage.reviewRow('What is the date of the hearing?')).toHaveCount(0);
    await queryManagementPage.submitQuery();
    await expect(queryManagementPage.querySubmittedHeading).toBeVisible();
    expect(capture.submittedEvents).toHaveLength(1);
    expect(capture.submittedEventMethods).toEqual(['POST']);
    expect(getQueryManagementSubmittedQueryCollection(capture.submittedEvents[0]).caseMessages?.[0]?.value).toMatchObject({
      subject: QUERY_MANAGEMENT_QUERY_SUBJECT,
      body: QUERY_MANAGEMENT_QUERY_DETAIL,
      isHearingRelated: 'No',
      hearingDate: null,
    });
  });
});
