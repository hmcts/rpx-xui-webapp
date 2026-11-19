import { expect, test } from '@playwright/test';

import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po.js';

type TaskTabState = {
  containerVisible: boolean;
  spinnerVisible: boolean;
  taskCount: number;
  taskVisible: boolean;
};

function createTaskTab(state: TaskTabState) {
  const taskWaitError = new Error('locator.waitFor: Timeout 30000ms exceeded.');
  const containerError = new Error('locator.waitFor: Timeout exceeded waiting for .active-tasks-container');
  const spinner = {
    first: () => spinner,
    isVisible: async () => state.spinnerVisible,
    waitFor: async () => {
      if (state.spinnerVisible) throw new Error('spinner still visible');
    },
  };
  const text = (value: string) => ({ innerText: async () => value, evaluate: async () => '' });
  const task = {
    locator: (selector: string) =>
      selector === 'p.govuk-body'
        ? text('Review the appeal')
        : {
            count: async () => 1,
            nth: () => ({
              locator: (rowSelector: string) =>
                rowSelector.includes('__key') ? text('Priority') : { ...text('Urgent'), evaluate: async () => '' },
            }),
          },
  };
  const details = Object.assign(Object.create(CaseDetailsPage.prototype), {
    logger: { warn: () => undefined },
    page: { locator: () => spinner },
    taskListContainer: {
      isVisible: async () => state.containerVisible,
      waitFor: async () => {
        if (!state.containerVisible) throw containerError;
      },
    },
    taskItem: {
      count: async () => state.taskCount,
      first: () => ({
        waitFor: async () => {
          if (!state.taskVisible) throw taskWaitError;
        },
      }),
      nth: () => task,
    },
  });
  return { details, taskWaitError, containerError };
}

test.describe('Case details task rows', { tag: '@svc-internal' }, () => {
  test('returns task rows when a task is rendered', async () => {
    const { details } = createTaskTab({ containerVisible: true, spinnerVisible: false, taskCount: 1, taskVisible: true });
    const rows = await CaseDetailsPage.prototype.getTaskKeyValueRows.call(details);
    expect(rows).toEqual([{ Title: 'Review the appeal', Priority: 'Urgent', 'Priority HTML': '' }]);
  });

  test('returns [] for a loaded task tab with no tasks', async () => {
    const { details } = createTaskTab({ containerVisible: true, spinnerVisible: false, taskCount: 0, taskVisible: false });
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).resolves.toEqual([]);
  });

  test('rethrows when the task tab container never renders', async () => {
    const { details, containerError } = createTaskTab({
      containerVisible: false,
      spinnerVisible: false,
      taskCount: 0,
      taskVisible: false,
    });
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toBe(containerError);
  });

  test('rethrows when tasks are still loading behind the spinner', async () => {
    const { details } = createTaskTab({ containerVisible: true, spinnerVisible: true, taskCount: 0, taskVisible: false });
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toThrow(
      'Spinner still visible while loading case tasks'
    );
  });

  test('rethrows the wait failure when tasks exist but never become visible', async () => {
    const { details, taskWaitError } = createTaskTab({
      containerVisible: true,
      spinnerVisible: false,
      taskCount: 2,
      taskVisible: false,
    });
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toBe(taskWaitError);
  });
});
