import { faker } from '@faker-js/faker';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture';
import { buildCaseDetailsTasksMinimal } from '../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../mocks/cases/asylumCase.mock';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let assigneeId: string | null = null;

test.beforeAll(() => {
  faker.seed(260209);
  const { cookies } = loadSessionCookies(userIdentifier);
  sessionCookies = cookies;
  assigneeId = extractUserIdFromCookies(sessionCookies);
});

test.beforeEach(async ({ page }) => {
  if (sessionCookies.length) {
    await page.context().addCookies(sessionCookies);
  }
});

test.describe(`User ${userIdentifier} can see task tab contents on a case`, () => {
  test(`Task values and meta data is displayed as expected`, async ({ taskListPage, caseDetailsPage, page }) => {
    const caseMockResponse = buildAsylumCaseMock({ caseId: '1111111111111111' });
    const taskData = {
      caseId: caseMockResponse.case_id,
      titles: ['Follow-up extended direction', 'follow up overdue respondent evidence', 'follow up overdue respondent evidence'],
      states: ['unassigned', 'assigned'],
      types: ['followUpExtendedDirection', 'followUpOverdueRespondentEvidence', 'followUpOverdueRespondentEvidence'],
      taskSystems: ['SELF'],
      locations: [
        { name: 'Manchester', id: '512401' },
        { name: 'Taylor House', id: '765324' },
      ],
      descriptions: [
        'You still need to submit your appeal.\n\n[Submit your appeal](/case/IA/Asylum/${[CASE_REFERENCE]}/trigger/submitAppeal)',
        'Current progress of the case ![Progress map showing that the appeal is now at stage 1 of 11 stages - the Appeal started stage](https://raw.githubusercontent.com/hmcts/ia-appeal-frontend/master/app/assets/images/progress_legalRep_appealStarted.svg)',
        '## Next steps\nPlease review the evidence before proceeding.'
      ],
      assignees: assigneeId ? [assigneeId] : [],
    };
    await test.step('Setup route mock for task details', async () => {
      await page.route(`**data/internal/cases/${caseMockResponse.case_id}*`, async (route) => {
        const body = JSON.stringify(caseMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route(`**workallocation/case/task/${caseMockResponse.case_id}*`, async (route) => {
        const tasks = buildCaseDetailsTasksMinimal(taskData);
        const body = JSON.stringify(tasks);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Verify table shows results', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseMockResponse.case_id}`);
      await taskListPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseDetailsTab('Tasks');
      await taskListPage.exuiSpinnerComponent.wait();
      await expect(caseDetailsPage.taskListContainer).toHaveScreenshot('task-list-markdown.png');
    });
  });

  test(`Priority labels render for each category`, async ({ taskListPage, caseDetailsPage, page }) => {
    const inSixHours = faker.date.soon({ days: 0.25 }).toISOString();
    const inTwoDays = faker.date.soon({ days: 2 }).toISOString();
    const caseMockResponse = buildAsylumCaseMock({ caseId: '1111111111111111' });
    const taskData = {
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
    };

    await test.step('Setup route mock for priority label tasks', async () => {
      await page.route(`**data/internal/cases/${caseMockResponse.case_id}*`, async (route) => {
        const body = JSON.stringify(caseMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route(`**workallocation/case/task/${caseMockResponse.case_id}*`, async (route) => {
        const tasks = buildCaseDetailsTasksMinimal(taskData);
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
      console.log(JSON.stringify(await caseDetailsPage.getTaskKeyValueRows()));
      await expect(caseDetailsPage.taskListContainer).toHaveScreenshot('task-list-urgency.png');
    });
  });
});
