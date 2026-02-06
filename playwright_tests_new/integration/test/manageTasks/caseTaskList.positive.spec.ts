import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture';
import { buildCaseDetailsTasksMinimal } from '../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../mocks/cases/asylumCase.mock';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let assigneeId: string | undefined;

test.beforeAll(() => {
  const { cookies } = loadSessionCookies(userIdentifier);
  sessionCookies = cookies;
  const userIdCookie = sessionCookies.find((cookie) => cookie?.name === '__userid__');
  assigneeId = userIdCookie?.value;
});

test.beforeEach(async ({ page }) => {
  if (sessionCookies.length) {
    await page.context().addCookies(sessionCookies);
  }
});

test.describe(`User ${userIdentifier} can see task tab contents on a case`, () => {
  test(`Task values and meta data is displayed as expected`, async ({ taskListPage, caseDetailsPage, page }) => {
    const caseMockResponse = buildAsylumCaseMock({ caseId: '1111111111111111' });
    await test.step('Setup route mock for task details', async () => {
      await page.route(`**data/internal/cases/${caseMockResponse.case_id}*`, async (route) => {
        const body = JSON.stringify(caseMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route(`**workallocation/case/task/${caseMockResponse.case_id}*`, async (route) => {
        const tasks = buildCaseDetailsTasksMinimal({
          caseId: caseMockResponse.case_id,
          titles: ['Follow-up extended direction', 'follow up overdue respondent evidence'],
          states: ['unassigned', 'assigned'],
          types: ['followUpExtendedDirection', 'followUpOverdueRespondentEvidence'],
          taskSystems: ['SELF'],
          locations: [
            { name: 'Manchester', id: '512401' },
            { name: 'Taylor House', id: '765324' },
          ],
          descriptions: [
            'You still need to submit your appeal.\n[Submit your appeal](/case/IA/Asylum/${[CASE_REFERENCE]}/trigger/submitAppeal)',
            'Current progress of the case ![Progress map showing that the appeal is now at stage 1 of 11 stages - the Appeal started stage](https://raw.githubusercontent.com/hmcts/ia-appeal-frontend/master/app/assets/images/progress_legalRep_appealStarted.svg)',
          ],
          assignees: assigneeId ? [assigneeId] : [],
        });
        const body = JSON.stringify(tasks);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Verify table shows results', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseMockResponse.case_id}`);
      await taskListPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseDetailsTab('Tasks');
      await taskListPage.exuiSpinnerComponent.wait();
    });
  });

  test(`Priority labels render for each category`, async ({ taskListPage, caseDetailsPage, page }) => {
    const caseMockResponse = buildAsylumCaseMock({ caseId: '1111111111111111' });

    const now = new Date();
    const inSixHours = new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString();
    const inTwoDays = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();

    await test.step('Setup route mock for priority label tasks', async () => {
      await page.route(`**data/internal/cases/${caseMockResponse.case_id}*`, async (route) => {
        const body = JSON.stringify(caseMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route(`**workallocation/case/task/${caseMockResponse.case_id}*`, async (route) => {
        const tasks = buildCaseDetailsTasksMinimal({
          caseId: caseMockResponse.case_id,
          titles: ['Urgent task', 'High task', 'Medium task', 'Low task'],
          states: ['assigned'],
          types: ['followUpExtendedDirection'],
          taskSystems: ['SELF'],
          locations: [{ name: 'Manchester', id: '512401' }],
          assignees: assigneeId ? [assigneeId] : [],
          majorPriorities: [1000, 4000, 5000, 6000],
          priorityDates: [inTwoDays, inTwoDays, inSixHours, inTwoDays],
          dueDates: [inTwoDays, inTwoDays, inSixHours, inTwoDays],
        });
        const body = JSON.stringify(tasks);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Verify priority labels are shown', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseMockResponse.case_id}`);
      await taskListPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseDetailsTab('Tasks');
      await taskListPage.exuiSpinnerComponent.wait();

      //TODO add table matcher expects and remove selectors from the test
      await expect(page.locator('strong.hmcts-badge--red')).toContainText('urgent');
      await expect(page.locator('strong.govuk-tag--red')).toContainText('high');
      await expect(page.locator('strong.govuk-tag--yellow')).toContainText('medium');
      await expect(page.locator('strong.govuk-tag--grey')).toContainText('low');
    });
  });
});
