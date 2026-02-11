import { faker } from '@faker-js/faker';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildCaseDetailsTasksMinimal } from '../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../mocks/cases/asylumCase.mock';

const userIdentifier = 'STAFF_ADMIN';
const inSixHours = faker.date.soon({ days: 0.25 }).toISOString();
const inTwoDays = faker.date.soon({ days: 2 }).toISOString();
const inTenDays = faker.date.soon({ days: 10 }).toISOString();
let sessionCookies: any[] = [];
let assigneeId: string | null = null;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  assigneeId = extractUserIdFromCookies(sessionCookies);
});

test.describe(`User ${userIdentifier} can see task tab contents on a case`, () => {
  test(`Task values and meta data is displayed as expected`, async ({ taskListPage, caseDetailsPage, page }) => {
    const caseMockResponse = buildAsylumCaseMock({ caseId: '1111111111111111' });
    const taskData = {
      caseId: caseMockResponse.case_id,
      titles: ['Follow-up extended direction', 'follow up overdue respondent evidence', 'follow up overdue respondent evidence'],
      states: ['assigned'],
      types: ['followUpExtendedDirection', 'followUpOverdueRespondentEvidence', 'followUpOverdueRespondentEvidence'],
      taskSystems: ['SELF'],
      locations: [{ name: 'Manchester', id: '512401' }],
      descriptions: [
        'You still need to submit your appeal.\n\n[Submit your appeal](/case/IA/Asylum/${[CASE_REFERENCE]}/trigger/submitAppeal)',
        'Current progress of the case ![Progress map showing that the appeal is now at stage 1 of 11 stages - the Appeal started stage](https://raw.githubusercontent.com/hmcts/ia-appeal-frontend/master/app/assets/images/progress_legalRep_appealStarted.svg)',
        '# Next steps\nPlease review the evidence before proceeding.',
      ],
      priorityDates: [inTenDays],
      dueDates: [inTenDays],
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
      await page.goto(`/cases/case-details/IA/Asylum/${caseMockResponse.case_id}/tasks`);
      await caseDetailsPage.taskListContainer.waitFor();
      const table = await caseDetailsPage.getTaskKeyValueRows();

      expect(table.length).toBe(taskData.titles.length);
      expect(table[0]['Title']).toContain(taskData.titles[0]);
      expect(table[1]['Title']).toContain(taskData.titles[1]);
      expect(table[2]['Title']).toContain(taskData.titles[2]);

      expect(table[0]['Priority']).toContain('LOW');
      expect(table[1]['Priority']).toContain('LOW');
      expect(table[2]['Priority']).toContain('LOW');

      expect(table[0]['Next steps']).toContain('You still need to submit your appeal. Submit your appeal');
      expect(table[1]['Next steps']).toContain('Current progress of the case');
      expect(table[2]['Next steps']).toContain('Next steps Please review the evidence before proceeding.');
    });
  });

  test(`Priority labels render for each category`, async ({ taskListPage, caseDetailsPage, page }) => {
    const caseMockResponse = buildAsylumCaseMock({ caseId: '1111111111111111' });
    const taskData = {
      caseId: caseMockResponse.case_id,
      titles: ['Urgent', 'High', 'Medium', 'Low'],
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
      await page.goto(`/cases/case-details/IA/Asylum/${caseMockResponse.case_id}/tasks`);
      await caseDetailsPage.taskListContainer.waitFor();
      const table = await caseDetailsPage.getTaskKeyValueRows();
      expect(table[0]['Priority'], 'The priority label for the first task should be URGENT').toContain('URGENT');
      expect(table[1]['Priority'], 'The priority label for the second task should be HIGH').toContain('HIGH');
      expect(table[2]['Priority'], 'The priority label for the third task should be MEDIUM').toContain('MEDIUM');
      expect(table[3]['Priority'], 'The priority label for the fourth task should be LOW').toContain('LOW');
    });
  });

  // Skipped until EXUI-4127 is resolved
  test.skip(`Complex Markdown label renders correctly`, async ({ taskListPage, caseDetailsPage, page }) => {
    const caseMockResponse = buildAsylumCaseMock({ caseId: '1111111111111111' });
    const taskData = {
      caseId: caseMockResponse.case_id,
      titles: ['Complex markdown task'],
      states: ['assigned'],
      types: ['followUpExtendedDirection'],
      taskSystems: ['SELF'],
      locations: [{ name: 'Manchester', id: '512401' }],
      assignees: assigneeId ? [assigneeId] : [],
      descriptions: [
        '# Overview\n\n## Current progress of the case\n\n<img src="https://raw.githubusercontent.com/hmcts/ia-appeal-frontend/master/app/assets/images/progress_legalRep_appealStarted.svg" alt="Progress map showing that the appeal is now at stage 1 of 11 stages - the Appeal started stage">\n\n## Do this next\nYou still need to submit your appeal.\n\n[Submit your appeal](/case/IA/Asylum/${[CASE_REFERENCE]}/trigger/submitAppeal)\n\nYou can also review and edit your appeal.\n\n[Edit appeal](/case/IA/Asylum/${[CASE_REFERENCE]}/trigger/editAppeal)',
      ],
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
      await page.goto(`/cases/case-details/IA/Asylum/${caseMockResponse.case_id}/tasks`);
      await caseDetailsPage.taskListContainer.waitFor();
      const table = await caseDetailsPage.getTaskKeyValueRows();
      console.log(JSON.stringify(table, null, 2));
      const content = await caseDetailsPage.getTaskKeyValueRows();
      expect(content[0]['Next steps']).toMatch(/^Overview/);
    });
  });
});
