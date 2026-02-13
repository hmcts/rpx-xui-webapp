import { faker } from '@faker-js/faker';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildCaseDetailsTasksMinimal } from '../../mocks/caseDetailsTasks.builder';
import { buildAsylumCaseMock } from '../../mocks/cases/asylumCase.mock';

const userIdentifier = 'STAFF_ADMIN';
const inSixHours = faker.date.soon({ days: 0.25 }).toISOString();
const inTwoDays = faker.date.soon({ days: 2 }).toISOString();
const in90Days = faker.date.future().toISOString();
const caseId = '1111111111111111';
let sessionCookies: any[] = [];
let assigneeId: string | null = null;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  assigneeId = extractUserIdFromCookies(sessionCookies);
});

test.describe(`User ${userIdentifier} can see assigned tasks on a case`, () => {
  test(`Task values and markdown is displayed as expected`, async ({ tableUtils, caseDetailsPage, page }) => {
    const caseMockResponse = buildAsylumCaseMock({ caseId });

    const taskData = {
      id: [faker.string.uuid().toString()],
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
      priorityDates: [in90Days],
      dueDates: [in90Days],
      assignees: assigneeId ? [assigneeId] : [],
    };
    const tasks = buildCaseDetailsTasksMinimal(taskData);

    await test.step('Setup route mock for task details', async () => {
      await page.route(`**data/internal/cases/${caseId}*`, async (route) => {
        const body = JSON.stringify(caseMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route(`**workallocation/case/task/${caseId}*`, async (route) => {
        const body = JSON.stringify(tasks);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Verify table shows results', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseId}/tasks`);
      await caseDetailsPage.taskListContainer.waitFor();
      const table = await caseDetailsPage.getTaskKeyValueRows();

      expect.soft(table.length).toBe(taskData.titles.length);
      taskData.titles.forEach((title, i) => {
        expect.soft(table[i]['Title']).toContain(title);
        expect.soft(table[i]['Assigned to']).not.toBe('');
        expect.soft(table[i]['Priority']).toContain('LOW');
      });

      expect
        .soft(table[0]['Next steps'], 'Next steps not showing expected text')
        .toContain('You still need to submit your appeal. Submit your appeal');
      expect
        .soft(table[0]['Next steps HTML'], 'Next steps link does not contain expected submitAppeal href')
        .toContain(`href="/case/IA/Asylum/${caseId}/trigger/submitAppeal?tid=${taskData.id}"`);
      expect.soft(table[1]['Next steps'], 'Next steps not showing expected text').toContain('Current progress of the case');
      expect
        .soft(table[1]['Next steps HTML'], 'Next steps not showing expected image')
        .toContain(
          `<img src="https://raw.githubusercontent.com/hmcts/ia-appeal-frontend/master/app/assets/images/progress_legalRep_appealStarted.svg?tid=${taskData.id}" alt="Progress map showing that the appeal is now at stage 1 of 11 stages - the Appeal started stage">`
        );
      expect.soft(table[2]['Next steps HTML'], 'Next steps not showing text as a heading').toContain('<h1>Next steps</h1>');
      expect
        .soft(table[2]['Next steps'], 'Next steps not showing expected text')
        .toContain('Next steps Please review the evidence before proceeding.');
    });
  });

  test(`Priority labels render for each task depending on major priority rate and date`, async ({ taskListPage, caseDetailsPage, page }, testInfo) => {
    const caseMockResponse = buildAsylumCaseMock({ caseId });
    const taskData = {
      id: [faker.string.uuid().toString()],
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
      await page.route(`**data/internal/cases/${caseId}*`, async (route) => {
        const body = JSON.stringify(caseMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route(`**workallocation/case/task/${caseId}*`, async (route) => {
        const tasks = buildCaseDetailsTasksMinimal(taskData);
        const body = JSON.stringify(tasks);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Verify the expected priority labels are shown', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseId}/tasks`);
      await caseDetailsPage.taskListContainer.waitFor();
      const table = await caseDetailsPage.getTaskKeyValueRows();
      await page.waitForLoadState('domcontentloaded');


      expect.soft(table[0]['Priority'], 'The priority label for the first task should be URGENT').toContain('URGENT');
      expect.soft(table[1]['Priority'], 'The priority label for the second task should be HIGH').toContain('HIGH');
      expect.soft(table[2]['Priority'], 'The priority label for the third task should be MEDIUM').toContain('MEDIUM');
      expect.soft(table[3]['Priority'], 'The priority label for the fourth task should be LOW').toContain('LOW');

      expect.soft(table[0]['Next steps'], 'Next steps not showing expected text').toContain('Click link to proceed to task');
    });
  });

  // Skipped until EXUI-4127 is resolved
  test.skip(`Complex Markdown label renders correctly`, async ({ taskListPage, caseDetailsPage, page }) => {
    const caseMockResponse = buildAsylumCaseMock({ caseId });
    const taskData = {
      id: [faker.string.uuid().toString()],
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

    await test.step('Setup route mock for complex markdown in a task', async () => {
      await page.route(`**data/internal/cases/${caseId}*`, async (route) => {
        const body = JSON.stringify(caseMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route(`**workallocation/case/task/${caseId}*`, async (route) => {
        const tasks = buildCaseDetailsTasksMinimal(taskData);
        const body = JSON.stringify(tasks);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Verify Next steps elements are shown as expected', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseId}/tasks`);
      await caseDetailsPage.taskListContainer.waitFor();
      const table = await caseDetailsPage.getTaskKeyValueRows();
      const content = await caseDetailsPage.getTaskKeyValueRows();
      expect.soft(content[0]['Next steps']).toMatch(/^Overview/);
      expect.soft(content[0]['Next steps HTML']).toContain(
          `<img src="https://raw.githubusercontent.com/hmcts/ia-appeal-frontend/master/app/assets/images/progress_legalRep_appealStarted.svg?tid=${taskData.id}" alt="Progress map showing that the appeal is now at stage 1 of 11 stages - the Appeal started stage">`
        );
      expect.soft(content[0]['Next steps']).toContain('Do this next You still need to submit your appeal. Submit your appeal You can also review and edit your appeal.');
      expect.soft(content[0]['Next steps HTML']).toContain(`href="/case/IA/Asylum/${caseId}/trigger/submitAppeal?tid=${taskData.id}"`);
      expect.soft(content[0]['Next steps HTML']).toContain(`href="/case/IA/Asylum/${caseId}/trigger/editAppeal?tid=${taskData.id}"`);
    });
  });
});
