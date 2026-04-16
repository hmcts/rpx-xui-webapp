import { expect, test } from '../../../../E2E/fixtures';
import { buildMyTaskListMock } from '../../../mocks/taskList.mock';
import { logTaskCancellationAssertion } from '../../../utils/taskCancellationAssertionLogger';
import {
  routeCaseDetailsTaskCancellationFlow,
  routeMyTaskCancellationFlow,
  type CancellationScenario,
  type CaseDetailsTemplate,
} from '../../../utils/taskCancellationRoutes';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { applySessionCookiesAndExtractUserId } from '../../../helpers';

const userIdentifier = 'STAFF_ADMIN';
const taskId = '22222222-2222-2222-2222-222222222222';

const cancellationMatrix: readonly CancellationScenario[] = [
  {
    scenario: 'PRIVATELAW / PRLAPPS',
    jurisdiction: 'PRIVATELAW',
    caseTypeId: 'PRLAPPS',
    caseId: '1770285290104655',
    caseName: 'PRL Manual Cancellation Test Case',
  },
  {
    scenario: 'PUBLICLAW / CARE_SUPERVISION_EPO',
    jurisdiction: 'PUBLICLAW',
    caseTypeId: 'CARE_SUPERVISION_EPO',
    caseId: '1770133055796879',
    caseName: 'Public Law Manual Cancellation Test Case',
  },
] as const;

test.describe(
  `Task cancellation integration as ${userIdentifier}`,
  { tag: ['@integration', '@integration-manage-tasks'] },
  () => {
    for (const matrixItem of cancellationMatrix) {
      test(`Cancel task sends expected request for ${matrixItem.scenario}`, async ({ taskListPage, page }, testInfo) => {
        const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier, {
          fallbackUserId: 'test-user-id',
        });

        const taskListMockResponse = buildMyTaskListMock(userId, 1);
        const task = {
          ...taskListMockResponse.tasks[0],
          id: taskId,
          case_id: matrixItem.caseId,
          case_name: matrixItem.caseName,
          case_type_id: matrixItem.caseTypeId,
          jurisdiction: matrixItem.jurisdiction,
          task_title: 'Send to gatekeeper',
          assignee: userId,
        };

        const { getCancelRequestUrl, getCancelRequestBody } = await routeMyTaskCancellationFlow(page, taskId, task);

        await test.step('Navigate to My Work and open cancel action', async () => {
          await taskListPage.gotoAndWaitForTaskRow(`cancel request payload validation for ${matrixItem.scenario}`);
          await expect(taskListPage.taskListTable).toBeVisible();
          await taskListPage.exuiSpinnerComponent.wait();
          await expect(taskListPage.taskListTable).toContainText(matrixItem.caseName);
          await taskListPage.clickTaskActionForRow(0, 'cancel', `cancel request payload validation for ${matrixItem.scenario}`);
        });

        await test.step('Confirm cancellation and verify request payload', async () => {
          await page.getByRole('button', { name: 'Cancel task' }).click();

          await expect
            .poll(() => getCancelRequestUrl(), { message: 'Cancel request was not captured' })
            .toContain(`/workallocation/task/${taskId}/cancel`);

          await expect.poll(() => getCancelRequestBody()).not.toBeNull();

          const parsedUrl = new URL(getCancelRequestUrl());
          const expectedPayload = { hasNoAssigneeOnComplete: false };
          const expectedBrowserRequestPath = `/workallocation/task/${taskId}/cancel`;
          const actualBrowserRequestPath = `${parsedUrl.pathname}${parsedUrl.search}`;
          const assertionSummary = logTaskCancellationAssertion({
            scenario: matrixItem.scenario,
            expectedPath: expectedBrowserRequestPath,
            actualPath: actualBrowserRequestPath,
            hasCancellationProcessQuery: parsedUrl.searchParams.has('cancellation_process'),
            hasCompletionProcessQuery: parsedUrl.searchParams.has('completion_process'),
            expectedPayload,
            actualPayload: getCancelRequestBody(),
          });

          await testInfo.attach('browser-request-expected-vs-actual.json', {
            body: JSON.stringify(
              {
                note: 'Browser -> ExUI API request validation for manual cancellation path',
                expectation: {
                  path: expectedBrowserRequestPath,
                  queryMustInclude: [],
                  queryMustExclude: ['cancellation_process', 'completion_process'],
                  payload: expectedPayload,
                },
                actual: {
                  path: actualBrowserRequestPath,
                  hasCancellationProcessQuery: parsedUrl.searchParams.has('cancellation_process'),
                  hasCompletionProcessQuery: parsedUrl.searchParams.has('completion_process'),
                  payload: getCancelRequestBody(),
                },
                assertions: assertionSummary,
              },
              null,
              2
            ),
            contentType: 'application/json',
          });

          expect(
            parsedUrl.searchParams.has('cancellation_process'),
            `Expected browser cancel request ${expectedBrowserRequestPath} to omit "cancellation_process"; actual path=${actualBrowserRequestPath}`
          ).toBeFalsy();
          expect(
            parsedUrl.searchParams.has('completion_process'),
            `Expected browser cancel request ${expectedBrowserRequestPath} to omit "completion_process"; actual path=${actualBrowserRequestPath}`
          ).toBeFalsy();
          expect(
            getCancelRequestBody(),
            `Expected browser cancel payload ${JSON.stringify(expectedPayload)}; actual=${JSON.stringify(getCancelRequestBody())}`
          ).toEqual(expectedPayload);
        });
      });

      test(`My Tasks manual cancellation for ${matrixItem.scenario}`, async ({ taskListPage, page }) => {
        const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier, {
          fallbackUserId: 'test-user-id',
        });

        const taskListMockResponse = buildMyTaskListMock(userId, 1);
        const task = {
          ...taskListMockResponse.tasks[0],
          id: taskId,
          case_id: matrixItem.caseId,
          case_name: matrixItem.caseName,
          case_type_id: matrixItem.caseTypeId,
          jurisdiction: matrixItem.jurisdiction,
          task_title: 'Send to gatekeeper',
          assignee: userId,
        };

        await routeMyTaskCancellationFlow(page, taskId, task);

        await test.step('Open cancellation from My Work', async () => {
          await taskListPage.gotoAndWaitForTaskRow(`my tasks manual cancellation for ${matrixItem.scenario}`);
          await expect(taskListPage.taskListTable).toBeVisible();
          await taskListPage.exuiSpinnerComponent.wait();
          await expect(taskListPage.taskListTable).toContainText(matrixItem.caseName);
          await taskListPage.clickTaskActionForRow(0, 'cancel', `my tasks manual cancellation for ${matrixItem.scenario}`);
        });

        await test.step('Confirm cancellation and verify user-visible outcome', async () => {
          await taskListPage.confirmTaskCancellation();
          await expect(taskListPage.cancelledTaskMessage).toBeVisible();
          await expect(taskListPage.taskListTable).not.toContainText(matrixItem.caseName);
        });
      });
    }

    test('Case details Tasks tab manual cancellation path', async ({ page, taskListPage }) => {
      const scenario = cancellationMatrix[0];
      const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier, {
        fallbackUserId: 'test-user-id',
      });
      const caseDetailsTemplate = JSON.parse(
        readFileSync(resolve(process.cwd(), 'src/assets/getCase.json'), 'utf8')
      ) as CaseDetailsTemplate;

      const task = {
        ...buildMyTaskListMock(userId, 1).tasks[0],
        id: taskId,
        case_id: scenario.caseId,
        case_name: scenario.caseName,
        case_type_id: scenario.caseTypeId,
        jurisdiction: scenario.jurisdiction,
        task_title: 'Send to gatekeeper',
        assignee: userId,
      };

      await routeCaseDetailsTaskCancellationFlow(page, taskId, scenario, task, caseDetailsTemplate);

      await test.step('Open case-details task cancellation action', async () => {
        await page.goto(`/cases/case-details/${scenario.jurisdiction}/${scenario.caseTypeId}/${scenario.caseId}/tasks`);
        await expect(page.getByRole('heading', { name: 'Active tasks' })).toBeVisible();
        const caseDetailsCancelAction = taskListPage.caseDetailsTaskActionCancel.first();
        await expect(caseDetailsCancelAction).toBeVisible();
        await caseDetailsCancelAction.click();
        await expect(taskListPage.confirmCancelTaskButton).toBeVisible();
      });

      await test.step('Confirm cancellation removes task action from tab', async () => {
        await taskListPage.confirmTaskCancellation();

        // Case-details tasks flow may keep the same route instance and skip banner re-render.
        // The key behaviour here is successful cancel + task removed from the tasks tab.
        await expect(page).toHaveURL(
          new RegExp(`/cases/case-details/${scenario.jurisdiction}/${scenario.caseTypeId}/${scenario.caseId}(?:/tasks|#Tasks)`)
        );
        await expect(taskListPage.caseDetailsTaskActionCancel).toHaveCount(0);
      });
    });

    test('Cancel action is not shown for a non-cancellable task', async ({ taskListPage, page }) => {
      const scenario = cancellationMatrix[0];
      const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier, {
        fallbackUserId: 'test-user-id',
      });

      const task = {
        ...buildMyTaskListMock(userId, 1).tasks[0],
        id: taskId,
        case_id: scenario.caseId,
        case_name: `${scenario.caseName} (No Cancel Permission)`,
        case_type_id: scenario.caseTypeId,
        jurisdiction: scenario.jurisdiction,
        assignee: userId,
      };

      await routeMyTaskCancellationFlow(page, taskId, task, { includeCancelAction: false });

      await test.step('Open task actions and verify cancel is not available', async () => {
        await taskListPage.gotoAndWaitForTaskRow('non-cancellable task action menu');
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.exuiSpinnerComponent.wait();
        await taskListPage.openFirstManageActions('non-cancellable task action menu');
        await expect(taskListPage.taskActionsRow).toBeVisible();
        await expect(taskListPage.taskActionCancel).toHaveCount(0);
      });
    });

    test('Stale task cancellation shows task no longer available warning', async ({ taskListPage, page }) => {
      const scenario = cancellationMatrix[0];
      const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier, {
        fallbackUserId: 'test-user-id',
      });

      const task = {
        ...buildMyTaskListMock(userId, 1).tasks[0],
        id: taskId,
        case_id: scenario.caseId,
        case_name: `${scenario.caseName} (Stale Task)`,
        case_type_id: scenario.caseTypeId,
        jurisdiction: scenario.jurisdiction,
        assignee: userId,
      };

      await routeMyTaskCancellationFlow(page, taskId, task, { cancelResponseStatus: 409 });

      await test.step('Open cancellation for stale task', async () => {
        await taskListPage.gotoAndWaitForTaskRow('stale task cancellation');
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.clickTaskActionForRow(0, 'cancel', 'stale task cancellation');
      });

      await test.step('Confirm stale cancellation shows warning', async () => {
        await taskListPage.confirmTaskCancellation();
        await expect(taskListPage.taskNoLongerAvailableMessage).toBeVisible();
        await expect(page).toHaveURL(/\/work\/my-work\/list/);
      });
    });

    test('Cancellation API failure shows task no longer available warning', async ({ taskListPage, page }) => {
      const scenario = cancellationMatrix[0];
      const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier, {
        fallbackUserId: 'test-user-id',
      });

      const task = {
        ...buildMyTaskListMock(userId, 1).tasks[0],
        id: taskId,
        case_id: scenario.caseId,
        case_name: `${scenario.caseName} (API Failure)`,
        case_type_id: scenario.caseTypeId,
        jurisdiction: scenario.jurisdiction,
        assignee: userId,
      };

      await routeMyTaskCancellationFlow(page, taskId, task, { cancelResponseStatus: 400 });

      await test.step('Open cancellation for API failure scenario', async () => {
        await taskListPage.gotoAndWaitForTaskRow('cancellation api failure warning');
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.clickTaskActionForRow(0, 'cancel', 'cancellation api failure warning');
      });

      await test.step('Confirm API failure shows warning', async () => {
        await taskListPage.confirmTaskCancellation();
        await expect(taskListPage.taskNoLongerAvailableMessage).toBeVisible();
        await expect(page).toHaveURL(/\/work\/my-work\/list/);
      });
    });
  }
);
