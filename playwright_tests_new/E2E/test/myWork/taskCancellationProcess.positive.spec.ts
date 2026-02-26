import { expect, test } from '../../fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildMyTaskListMock } from '../../../integration/mocks/taskList.mock';
import { extractUserIdFromCookies } from '../../../integration/utils/extractUserIdFromCookies';
import {
  routeCaseDetailsTaskCancellationFlow,
  routeMyTaskCancellationFlow,
  type CancellationScenario,
  type CaseDetailsTemplate,
} from '../../../integration/utils/taskCancellationRoutes';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const userIdentifier = 'STAFF_ADMIN';
const taskId = '11111111-1111-1111-1111-111111111111';

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
];

test.describe(`Task cancellation scenarios as ${userIdentifier}`, () => {
  for (const matrixItem of cancellationMatrix) {
    test(`EXUI-3662 My Tasks manual cancellation for ${matrixItem.scenario}`, async ({ taskListPage, page }) => {
      const { cookies } = await applySessionCookies(page, userIdentifier);
      const userId = extractUserIdFromCookies(cookies) || 'test-user-id';

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
        await taskListPage.goto();
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.exuiSpinnerComponent.wait();
        await expect(taskListPage.taskListTable).toContainText(matrixItem.caseName);

        await taskListPage.manageCaseButtons.first().click();
        await expect(taskListPage.taskActionCancel.first()).toBeVisible();
        await taskListPage.taskActionCancel.first().click();
      });

      await test.step('Confirm cancellation and verify user-visible outcome', async () => {
        await taskListPage.confirmTaskCancellation();
        await expect(taskListPage.cancelledTaskMessage).toBeVisible();
        await expect(taskListPage.taskListTable).not.toContainText(matrixItem.caseName);
      });
    });
  }

  test('EXUI-3662 Case details Tasks tab manual cancellation path', async ({ page, taskListPage }) => {
    const scenario = cancellationMatrix[0];
    const { cookies } = await applySessionCookies(page, userIdentifier);
    const userId = extractUserIdFromCookies(cookies) || 'test-user-id';
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

  test('EXUI-3662 Cancel action is not shown for a non-cancellable task', async ({ taskListPage, page }) => {
    const scenario = cancellationMatrix[0];
    const { cookies } = await applySessionCookies(page, userIdentifier);
    const userId = extractUserIdFromCookies(cookies) || 'test-user-id';

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
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
      await taskListPage.manageCaseButtons.first().click();
      await expect(taskListPage.taskActionsRow).toBeVisible();
      await expect(taskListPage.taskActionCancel).toHaveCount(0);
    });
  });

  test('EXUI-3662 Stale task cancellation shows task no longer available warning', async ({ taskListPage, page }) => {
    const scenario = cancellationMatrix[0];
    const { cookies } = await applySessionCookies(page, userIdentifier);
    const userId = extractUserIdFromCookies(cookies) || 'test-user-id';

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
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionCancel.first().click();
    });

    await test.step('Confirm stale cancellation shows warning', async () => {
      await taskListPage.confirmTaskCancellation();
      await expect(taskListPage.taskNoLongerAvailableMessage).toBeVisible();
      await expect(page).toHaveURL(/\/work\/my-work\/list/);
    });
  });

  test('EXUI-3662 Cancellation API failure shows task no longer available warning', async ({ taskListPage, page }) => {
    const scenario = cancellationMatrix[0];
    const { cookies } = await applySessionCookies(page, userIdentifier);
    const userId = extractUserIdFromCookies(cookies) || 'test-user-id';

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
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.manageCaseButtons.first().click();
      await taskListPage.taskActionCancel.first().click();
    });

    await test.step('Confirm API failure shows warning', async () => {
      await taskListPage.confirmTaskCancellation();
      await expect(taskListPage.taskNoLongerAvailableMessage).toBeVisible();
      await expect(page).toHaveURL(/\/work\/my-work\/list/);
    });
  });
});
