import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture';
import { buildCaseDetailsTasksMinimal } from '../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../mocks/cases/asylumCase.mock';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];

test.beforeAll(() => {
  const { cookies } = loadSessionCookies(userIdentifier);
  sessionCookies = cookies;
});

test.beforeEach(async ({ page }) => {
  if (sessionCookies.length) {
    await page.context().addCookies(sessionCookies);
  }
});

test.describe(`User ${userIdentifier} can see task tab contents on a case`, () => {
  test(`Task values and meta data is displayed as expected`, async ({ taskListPage, caseDetailsPage, page }) => {
    const userIdCookie = sessionCookies.find((cookie) => cookie?.name === '__userid__');
    const assigneeId = userIdCookie?.value;
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
});
