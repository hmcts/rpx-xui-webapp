import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies, setupTaskListBootstrapRoutes, taskListRoutePattern } from '../../../helpers';
import { buildTaskListMock, myActionsList } from '../../../mocks/taskList.mock';
import { buildMyCases } from '../../../mocks/myCases.mock';

const userIdentifier = 'STAFF_ADMIN';
const allWorkCasesRoutePattern = /\/workallocation\/all-work\/cases(?:\?.*)?$/;

const supportedJurisdictions = ['IA', 'CIVIL'];
const supportedJurisdictionDetails = [
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
  { serviceId: 'CIVIL', serviceName: 'Civil' },
];

test.describe(`All Work Tasks as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test.beforeEach(async ({ page }) => {
    await applySessionCookies(page, userIdentifier);
  });

  test('User can view all-work task table, links, and pagination', async ({ taskListPage, page, tableUtils }) => {
    const taskListMockResponse = buildTaskListMock(2000, '', myActionsList);

    await test.step('Setup route mocks for all-work tasks', async () => {
      await setupTaskListBootstrapRoutes(page, supportedJurisdictions, supportedJurisdictionDetails);
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(taskListMockResponse),
        });
      });
    });

    await test.step('Navigate to all-work tasks page', async () => {
      await taskListPage.gotoAllWorkTasks();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify expected all-work columns, data, and case link rendering', async () => {
      expect
        .soft(await taskListPage.getResultsText())
        .toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);

      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(Object.keys(table[0] ?? {})).toEqual(
        expect.arrayContaining(['Case name', 'Case category', 'Location', 'Task', 'Person'])
      );

      expect.soft(table[0]['Case name']).toBe(taskListMockResponse.tasks[0].case_name);
      expect.soft(table[0]['Case category']).toBe(taskListMockResponse.tasks[0].case_category);
      expect.soft(table[0]['Location']).toBe(taskListMockResponse.tasks[0].location_name);
      expect.soft(table[0]['Task']).toBe(taskListMockResponse.tasks[0].task_title);

      const firstCase = taskListMockResponse.tasks[0];
      const firstCaseLink = taskListPage.taskListTable.getByRole('link', { name: firstCase.case_name }).first();
      await expect(firstCaseLink).toBeVisible();
      await expect(firstCaseLink).toHaveAttribute(
        'href',
        `/cases/case-details/${firstCase.jurisdiction}/${firstCase.case_type_id}/${firstCase.case_id}`
      );
    });

    await test.step('Verify pagination controls are shown for multi-page all-work results', async () => {
      await expect(taskListPage.exuiBodyComponent.paginationNextButton).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.paginationPreviousButton).not.toBeVisible();

      await taskListPage.exuiBodyComponent.paginationNextButton.click();
      await taskListPage.exuiSpinnerComponent.wait();
      await expect(taskListPage.exuiBodyComponent.paginationPreviousButton).toBeVisible();
      expect
        .soft(await taskListPage.getResultsText())
        .toContain(`Showing 26 to 50 of ${taskListMockResponse.total_records} results`);
    });
  });

  test('All-work Case name sort persists after navigating away and back', async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(40, '', myActionsList);
    const allWorkCasesMockResponse = buildMyCases(3);
    const caseNameSortHeaderCell = taskListPage.sortByCaseNameTableHeader.locator('xpath=ancestor::th[1]');

    await test.step('Setup route mocks for all-work tasks sorting', async () => {
      await setupTaskListBootstrapRoutes(page, supportedJurisdictions, supportedJurisdictionDetails);
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(taskListMockResponse),
        });
      });
      await page.route(allWorkCasesRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(allWorkCasesMockResponse),
        });
      });
    });

    await test.step('Open all-work tasks and sort by Case name ascending', async () => {
      await taskListPage.gotoAllWorkTasks();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await taskListPage.sortByCaseNameTableHeader.click();
      await taskListPage.exuiSpinnerComponent.wait();
      await expect(caseNameSortHeaderCell).toHaveAttribute('aria-sort', 'ascending');
    });

    await test.step('Navigate to All work cases then back to All work tasks', async () => {
      await taskListPage.taskTableTabs.filter({ hasText: 'Cases' }).first().click();
      await page.waitForURL(/\/work\/all-work\/cases$/, { timeout: 15_000 });

      const allWorkTasksRequestPromise = page.waitForRequest((request) => {
        if (!taskListRoutePattern.exec(request.url()) || request.method() !== 'POST') {
          return false;
        }

        try {
          const requestBody = request.postDataJSON() as {
            searchRequest?: {
              request_context?: string;
              sorting_parameters?: Array<{ sort_by?: string; sort_order?: string }>;
            };
            view?: string;
          };

          return (
            requestBody.view === 'AllWork' &&
            requestBody.searchRequest?.request_context === 'ALL_WORK' &&
            requestBody.searchRequest?.sorting_parameters?.some(
              (sortParameter) => sortParameter.sort_by === 'caseName' && sortParameter.sort_order === 'asc'
            ) === true
          );
        } catch {
          return false;
        }
      });

      await taskListPage.taskTableTabs.filter({ hasText: 'Tasks' }).first().click();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await allWorkTasksRequestPromise;
    });

    await test.step('Verify Case name sort remains selected on all-work tasks', async () => {
      await expect(caseNameSortHeaderCell).toHaveAttribute('aria-sort', 'ascending');
    });
  });

  test('All-work filter controls are visible and interactive', async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(10, '', myActionsList);

    await test.step('Setup route mocks for all-work filters', async () => {
      await setupTaskListBootstrapRoutes(page, supportedJurisdictions, supportedJurisdictionDetails);
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(taskListMockResponse),
        });
      });
    });

    await test.step('Open all-work tasks and expand filters', async () => {
      await taskListPage.gotoAllWorkTasks();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
      await taskListPage.waitForAllWorkFilterControlsReady();
    });

    await test.step('Verify all-work service/location/task/person filter controls are present', async () => {
      await expect(taskListPage.allWorkServiceFilter).toBeVisible();
      await expect(taskListPage.allWorkLocationAllRadio).toBeVisible();
      await expect(taskListPage.allWorkLocationSearchRadio).toBeVisible();

      await expect(taskListPage.allWorkTaskCategoryAllRadio).toBeVisible();
      await expect(taskListPage.allWorkTaskCategoryUnassignedRadio).toBeVisible();
      await expect(taskListPage.allWorkTaskCategoryAssignedToPersonRadio).toBeVisible();

      await expect(taskListPage.allWorkTasksByRoleTypeFilter).toBeVisible();
      await expect(taskListPage.allWorkPersonSearchInput).toBeVisible();
    });
  });

  test('All-work manage action matrix is rendered for each expected row', async ({ taskListPage, page }) => {
    const taskListMockResponse = buildTaskListMock(25, '', myActionsList);
    const allActionIds = ['assign', 'claim', 'claim-and-go', 'reassign', 'unclaim', 'go', 'cancel', 'complete'];

    taskListMockResponse.tasks[0].actions = [
      { id: 'assign', title: 'Assign task' },
      { id: 'go', title: 'Go to task' },
    ];
    taskListMockResponse.tasks[1].actions = [
      { id: 'assign', title: 'Assign task' },
      { id: 'go', title: 'Go to task' },
    ];
    taskListMockResponse.tasks[3].actions = [
      { id: 'reassign', title: 'Reassign task' },
      { id: 'unclaim', title: 'Unassign task' },
      { id: 'go', title: 'Go to task' },
    ];

    await test.step('Setup route mocks for all-work manage action matrix', async () => {
      await setupTaskListBootstrapRoutes(page, supportedJurisdictions, supportedJurisdictionDetails);
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(taskListMockResponse),
        });
      });
    });

    const assertManageActionsForRow = async (rowIndex: number, expectedActionIds: string[]) => {
      await taskListPage.gotoAllWorkTasks();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
      await taskListPage.openManageActionsForRow(rowIndex, `all-work manage action matrix row ${rowIndex + 1}`);

      const taskActionsRow = taskListPage.getTaskActionsRow(rowIndex);

      for (const actionId of allActionIds) {
        const actionLocator = taskActionsRow.locator(`#action_${actionId}`);
        if (expectedActionIds.includes(actionId)) {
          await taskListPage.waitForTaskActionForRow(rowIndex, actionId, `all-work manage action matrix row ${rowIndex + 1}`);
        } else {
          await expect(actionLocator).toHaveCount(0);
        }
      }
    };

    await test.step('Validate row 1 and row 2 show Assign task and Go to task', async () => {
      await assertManageActionsForRow(0, ['assign', 'go']);
      await assertManageActionsForRow(1, ['assign', 'go']);
    });

    await test.step('Validate row 4 shows Reassign task, Unassign task, and Go to task', async () => {
      await assertManageActionsForRow(3, ['reassign', 'unclaim', 'go']);
    });
  });
});

test.describe('All Work role-based task columns', { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  const scenarios = [
    {
      userIdentifier: 'IAC_CaseOfficer_R2',
      expectedDateHeader: 'Due date',
      notExpectedDateHeader: 'Task created',
    },
    {
      userIdentifier: 'IAC_Judge_WA_R1',
      expectedDateHeader: 'Task created',
      notExpectedDateHeader: 'Due date',
    },
  ] as const;

  for (const scenario of scenarios) {
    test.describe(`All-work columns render correctly for ${scenario.userIdentifier}`, () => {
      const taskListMockResponse = buildTaskListMock(40, '', myActionsList);

      test.beforeEach(async ({ page }) => {
        await applySessionCookies(page, scenario.userIdentifier);
      });
      test(`renders expected date column and not the non-expected date column`, async ({ taskListPage, page, tableUtils }) => {
        await test.step('Setup route mocks for all-work role-based columns', async () => {
          await setupTaskListBootstrapRoutes(page, supportedJurisdictions, supportedJurisdictionDetails);
          await page.route(taskListRoutePattern, async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(taskListMockResponse),
            });
          });
        });

        await test.step('Navigate to all-work tasks and parse rendered columns', async () => {
          await taskListPage.gotoAllWorkTasks();
          await expect(taskListPage.taskListTable).toBeVisible();
          await taskListPage.exuiSpinnerComponent.wait();

          const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
          const headers = Object.keys(table[0] ?? {});

          expect(headers).toEqual(
            expect.arrayContaining(['Case name', 'Case category', 'Location', 'Task', 'Person', 'Priority'])
          );
          expect(headers).toContain(scenario.expectedDateHeader);
          expect(headers).not.toContain(scenario.notExpectedDateHeader);

          expect(table[0][scenario.expectedDateHeader]).toBeTruthy();
        });
      });
    });
  }
});
