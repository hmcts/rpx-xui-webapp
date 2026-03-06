import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildTaskListMock, buildDeterministicMyTasksListMock, myActionsList } from '../../mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import { formatUiDate } from '../../utils/tableUtils';
import { setupTaskListMockRoutes } from '../../helpers';
import { setupTaskActionEndpointMocks } from '../../helpers/taskActionApiMocks.helper';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let taskListMockResponse: ReturnType<typeof buildTaskListMock>;

test.beforeEach(async ({ page }) => {
  const { cookies } = await applySessionCookies(page, userIdentifier);
  sessionCookies = cookies;
  const userId = extractUserIdFromCookies(sessionCookies);
  taskListMockResponse = buildTaskListMock(160, userId?.toString() || '', myActionsList);
});

test.describe(`Task List as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} can see all assigned tasks on the task list page`, async ({ taskListPage, page, tableUtils }) => {
    await test.step('Setup route mock for task list', async () => {
      await setupTaskListMockRoutes(page, taskListMockResponse);
    });

    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify the UI shows the expected layout and data, given the mock response', async () => {
      expect(await taskListPage.getResultsText()).toBe(
        `Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`
      );
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      for (let i = 0; i < table.length; i++) {
        const expectedCaseName = taskListMockResponse.tasks[i].case_name;
        expect(table[i]['Case name']).toBe(expectedCaseName);
        // Check additional columns
        expect(table[i]['Case category']).toBe(taskListMockResponse.tasks[i].case_category);
        expect(table[i]['Location']).toBe(taskListMockResponse.tasks[i].location_name);
        expect(table[i]['Task']).toBe(taskListMockResponse.tasks[i].task_title);
        expect(table[i]['Due date']).toBe(formatUiDate(taskListMockResponse.tasks[i].due_date));
        // Hearing date: allow empty string or null
        const expectedHearingDate = taskListMockResponse.tasks[i].next_hearing_date || '';
        expect(table[i]['Hearing date']).toBe(formatUiDate(expectedHearingDate));
      }
    });
  });

  test(`User ${userIdentifier} sees the expected message if there are no assigned tasks`, async ({ taskListPage, page }) => {
    const emptyMockResponse = { tasks: [], total_records: 0 };
    await test.step('Setup route mock for empty task list', async () => {
      await setupTaskListMockRoutes(page, emptyMockResponse);
    });
    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });
    await test.step('Verify table shows no results for empty mock', async () => {
      expect(await taskListPage.taskListTable.textContent()).toContain('You have no assigned tasks.');
    });
  });

  test(`User ${userIdentifier} sees all priority type tasks with specific due dates`, async ({
    taskListPage,
    page,
    tableUtils,
  }) => {
    const deterministicMockResponse = buildDeterministicMyTasksListMock('deterministic-assignee');
    await test.step('Setup route mock for deterministic task list', async () => {
      await setupTaskListMockRoutes(page, deterministicMockResponse);
    });

    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify table shows deterministic priority tasks and due dates', async () => {
      expect(await taskListPage.getResultsText()).toBe(`Showing 1 to 4 of 4 results`);
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(table.length).toBe(4);
      for (let i = 0; i < table.length; i++) {
        const expected = deterministicMockResponse.tasks[i];
        expect(table[i]['Case name']).toBe(expected.case_name);
        expect(table[i]['Case category']).toBe(expected.case_category);
        expect(table[i]['Location']).toBe(expected.location_name);
        expect(table[i]['Task']).toBe(expected.task_title);
        expect(table[i]['Due date']).toBe(formatUiDate(expected.due_date));
        const actualPriority = table[i]['Priority']?.toLowerCase() ?? '';
        const expectedPriority = String(expected.priority_field ?? '').toLowerCase();
        expect(actualPriority).toBe(expectedPriority);
      }
    });
  });

  test(`User ${userIdentifier} can see all expected table elements`, async ({ taskListPage, page, tableUtils }) => {
    await test.step('Setup route mock for deterministic task list', async () => {
      await page.route('**/workallocation/task*', async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify all table sorting buttons are visible', async () => {
      await expect(taskListPage.sortByCaseNameTableHeader).toBeVisible();
      await expect(taskListPage.sortByCaseCategoryTableHeader).toBeVisible();
      await expect(taskListPage.sortByLocationTableHeader).toBeVisible();
      await expect(taskListPage.sortByTaskTableHeader).toBeVisible();
      await expect(taskListPage.sortByDueDateTableHeader).toBeVisible();
      await expect(taskListPage.sortByHearingDateTableHeader).toBeVisible();
    });

    await test.step('Verify pagination buttons are visible', async () => {
      await expect(taskListPage.paginationNextButton).toBeVisible();
      await expect(taskListPage.paginationPreviousButton).toBeVisible();
      await expect(taskListPage.paginationEllipsisButton).toBeVisible();
    });
  });

  test(`User ${userIdentifier} can cancel one of their assigned tasks`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mock for deterministic task list and cancel action endpoints', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'cancel', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });
    });

    await test.step('Navigate to the my tasks list page', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Open manage actions and click Cancel task', async () => {
      const manageButton = taskListPage.manageCaseButtons.first();
      await expect(manageButton).toBeVisible();
      await manageButton.click();

      await expect(taskListPage.taskActionCancel).toBeVisible();
      await taskListPage.taskActionCancel.click();

      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/cancel`));
    });

    await test.step('Submit cancel action and verify expected API response', async () => {
      await expect(page.locator('#action-title')).toHaveText('Cancel a task');

      const cancelApiResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/cancel`) &&
          response.status() === 204
      );

      await page.locator('#submit-button').click();
      const cancelApiResponse = await cancelApiResponsePromise;
      expect(cancelApiResponse.ok()).toBeTruthy();

      await expect(page).toHaveURL(/\/work\/my-work\/list/);
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText(
        `You've cancelled a task. It has been removed from the task list.`
      );
    });
  });

  test(`User ${userIdentifier} can mark one of their assigned tasks as done`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mock for task list and complete action endpoints', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'complete', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });
    });

    await test.step('Navigate to task list and open complete action', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionMarkAsDone).toBeVisible();
      await taskListPage.taskActionMarkAsDone.click();

      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/complete`));
      await expect(page.locator('#action-title')).toHaveText('Mark the task as done');
    });

    await test.step('Submit complete action and verify request/response', async () => {
      const completeRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${firstTask.id}/complete`)
      );
      const completeResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/complete`) &&
          response.status() === 204
      );

      await page.locator('#submit-button').click();
      const completeRequest = await completeRequestPromise;
      expect(completeRequest.postDataJSON()).toEqual({ hasNoAssigneeOnComplete: false });
      const completeResponse = await completeResponsePromise;
      expect(completeResponse.ok()).toBeTruthy();

      await expect(page).toHaveURL(/\/work\/my-work\/list/);
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText(
        `You've marked a task as done. It has been removed from the task list.`
      );
    });
  });

  test(`User ${userIdentifier} can use Go to task action from task list`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];
    const caseMockResponse = {
      case_id: firstTask.case_id,
      case_type: {
        id: firstTask.case_type_id,
        name: firstTask.case_type_id,
        jurisdiction: {
          id: firstTask.jurisdiction,
          name: firstTask.jurisdiction,
        },
      },
      tabs: [],
      triggers: [],
      events: [],
      channels: [],
      metadataFields: [],
      state: {
        id: 'CaseCreated',
        name: 'Case created',
      },
    };

    await test.step('Setup route mock for task list and go action dependencies', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'go', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });

      await page.route(`**/data/internal/cases/${firstTask.case_id}*`, async (route) => {
        const body = JSON.stringify(caseMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
        const body = JSON.stringify([
          {
            email: 'test@example.com',
            firstName: 'Test',
            idamId: firstTask.assignee,
            lastName: 'User',
            location: {
              id: 227101,
              locationName: 'Newport (South Wales) Immigration and Asylum Tribunal',
            },
            roleCategory: 'LEGAL_OPERATIONS',
            service: 'IA',
          },
        ]);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to task list and click Go to task', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionGoTo).toBeVisible();

      const caseTasksResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/case/task/${firstTask.case_id}`) &&
          response.status() === 200
      );

      await taskListPage.taskActionGoTo.click();
      const caseTasksResponse = await caseTasksResponsePromise;
      expect(caseTasksResponse.ok()).toBeTruthy();

      await expect(page.getByRole('heading', { name: 'Active tasks' })).toBeVisible();
    });
  });

  test(`User ${userIdentifier} can open reassign flow from task list`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mock for task list and reassign action endpoints', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'reassign', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
      });
    });

    await test.step('Navigate to task list and open reassign action', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionReassign).toBeVisible();
      await taskListPage.taskActionReassign.click();

      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/reassign`));
      await expect(page.locator('main')).toContainText('Choose a role type');
      await expect(page.locator('main')).toContainText('Reassign task');
    });
  });

  test(`User ${userIdentifier} can unassign one of their assigned tasks`, async ({ taskListPage, page }) => {
    const firstTask = taskListMockResponse.tasks[0];

    await test.step('Setup route mock for task list and unassign action endpoints', async () => {
      await page.route(/.*\/workallocation\/task(?:\?.*)?$/, async (route) => {
        const body = JSON.stringify(taskListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await setupTaskActionEndpointMocks(page, 'unassign', {
        taskId: firstTask.id,
        caseId: firstTask.case_id,
        jurisdiction: firstTask.jurisdiction,
        caseTypeId: firstTask.case_type_id,
        assigneeId: firstTask.assignee,
        unassignMode: 'unclaim',
      });
    });

    await test.step('Navigate to task list and open unassign action', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionUnassign).toBeVisible();
      await taskListPage.taskActionUnassign.click();

      await expect(page).toHaveURL(new RegExp(`/work/${firstTask.id}/unclaim`));
      await expect(page.locator('#action-title')).toContainText('Unassign');
    });

    await test.step('Submit unassign action and verify expected API response', async () => {
      const unassignResponsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes(`/workallocation/task/${firstTask.id}/unclaim`) &&
          response.status() === 204
      );

      await page.locator('#submit-button').click();
      const unassignResponse = await unassignResponsePromise;
      expect(unassignResponse.ok()).toBeTruthy();

      await expect(page).toHaveURL(/\/work\/my-work\/list/);
      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText(
        `You've unassigned a task. It's now in Available tasks.`
      );
    });
  });
});
