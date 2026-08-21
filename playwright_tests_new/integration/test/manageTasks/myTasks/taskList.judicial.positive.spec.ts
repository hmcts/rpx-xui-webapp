import { type Page } from '@playwright/test';
import { expect, test } from '../../../../E2E/fixtures';
import { formatUiDate } from '../../../utils/tableUtils';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { applySessionCookiesAndExtractUserId, setupManageTasksBaseRoutes } from '../../../helpers';
import { judicialAMMenuRole } from '../../../helpers/amRoleAssignmentMock.helper';
import type { TaskListPage } from '../../../../E2E/page-objects/pages/exui/taskList.po';
import type { UtilsFixtures } from '../../../../E2E/utils/utils.fixtures';

type TableUtils = UtilsFixtures['tableUtils'];
type TaskListMockResponse = ReturnType<typeof buildTaskListMock>;

async function verifyJudicialTaskListSearch(
  page: Page,
  taskListPage: TaskListPage,
  tableUtils: TableUtils,
  userId: string,
  taskListMockResponse: TaskListMockResponse
): Promise<void> {
  const firstTask = taskListMockResponse.tasks[0];
  const judicialUsersResponse = [
    {
      sidam_id: userId,
      personal_code: 'judicial-personal-code-1',
      known_as: 'Judge',
      surname: 'User',
      full_name: 'Judge User',
      email_id: 'judge.user@example.com',
    },
  ];

  await test.step('Setup judicial task list routes and lookup response', async () => {
    await setupManageTasksBaseRoutes(page, {
      taskListResponse: taskListMockResponse,
      user: {
        userId,
        roleCategory: 'JUDICIAL',
        roles: ['caseworker-ia-iacjudge'],
        amMenuRole: judicialAMMenuRole,
      },
    });

    await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(judicialUsersResponse),
      });
    });
  });

  await test.step('Open My tasks and capture the judicial search request', async () => {
    const taskSearchRequestPromise = page.waitForRequest((request) => {
      if (request.method() !== 'POST' || !request.url().includes('/workallocation/task')) {
        return false;
      }

      try {
        const requestBody = request.postDataJSON() as {
          searchRequest?: {
            search_by?: string;
            search_parameters?: Array<{ key?: string; values?: string[]; operator?: string }>;
          };
          view?: string;
        };

        return requestBody.view === 'MyTasks';
      } catch {
        return false;
      }
    });

    await taskListPage.gotoAndWaitForTaskRow('judicial user my tasks search');
    await expect(taskListPage.taskListTable).toBeVisible();
    const taskSearchRequest = await taskSearchRequestPromise;

    const requestBody = taskSearchRequest.postDataJSON() as {
      searchRequest?: {
        search_by?: string;
        search_parameters?: Array<{ key?: string; values?: string[]; operator?: string }>;
      };
      view?: string;
    };

    expect(requestBody).toEqual(
      expect.objectContaining({
        view: 'MyTasks',
        searchRequest: expect.objectContaining({
          search_by: 'judge',
          search_parameters: expect.arrayContaining([
            expect.objectContaining({ key: 'user', values: [userId] }),
            expect.objectContaining({ key: 'state', values: ['assigned'] }),
          ]),
        }),
      })
    );
  });

  await test.step('Verify the judicial task list renders the expected tasks', async () => {
    const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
    const firstRow = table[0];

    expect(table).toHaveLength(taskListMockResponse.tasks.length);
    expect(firstRow).toMatchObject({
      'Case name': firstTask.case_name,
      'Case category': firstTask.case_category,
      Location: firstTask.location_name,
      Task: firstTask.task_title,
      'Task created': formatUiDate(firstTask.created_date),
      'Hearing date': formatUiDate(firstTask.next_hearing_date || ''),
      Priority: expect.anything(),
    });
  });
}

test.describe('Task List as IAC_Judge_WA_R1', { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  let userId: string;
  let taskListMockResponse: TaskListMockResponse;

  test.beforeEach(async ({ page }) => {
    userId = await applySessionCookiesAndExtractUserId(page, 'IAC_Judge_WA_R1');
    taskListMockResponse = buildTaskListMock(6, userId, myActionsList);
  });

  test('Judicial user searches My tasks and identifies assigned tasks', async ({
    taskListPage,
    page,
    tableUtils,
  }) => {
    await verifyJudicialTaskListSearch(page, taskListPage, tableUtils, userId, taskListMockResponse);
  });
});
