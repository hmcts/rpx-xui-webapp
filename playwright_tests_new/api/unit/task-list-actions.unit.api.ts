import { expect, test } from '@playwright/test';

import { TaskListPage } from '../../E2E/page-objects/pages/exui/taskList.po.js';

function createActionLocator(config: {
  waitResults: Array<'visible' | 'hidden'>;
  clickFailures?: string[];
  dispatchFailures?: string[];
  evaluateFailures?: string[];
}) {
  let waitAttempt = 0;
  let clickAttempt = 0;
  let dispatchAttempt = 0;
  let evaluateAttempt = 0;
  let focusAttempt = 0;
  const locator = {
    first() {
      return this;
    },
    async waitFor() {
      const result = config.waitResults[Math.min(waitAttempt, config.waitResults.length - 1)];
      waitAttempt += 1;
      if (result === 'hidden') {
        throw new Error('element is not visible');
      }
    },
    async scrollIntoViewIfNeeded() {
      return undefined;
    },
    async click() {
      const failureMessage = config.clickFailures?.[clickAttempt];
      clickAttempt += 1;
      if (failureMessage) {
        throw new Error(failureMessage);
      }
    },
    async dispatchEvent() {
      const failureMessage = config.dispatchFailures?.[dispatchAttempt];
      dispatchAttempt += 1;
      if (failureMessage) {
        throw new Error(failureMessage);
      }
    },
    async evaluate() {
      const failureMessage = config.evaluateFailures?.[evaluateAttempt];
      evaluateAttempt += 1;
      if (failureMessage) {
        throw new Error(failureMessage);
      }
    },
    async focus() {
      focusAttempt += 1;
    },
    get attempts() {
      return { waitAttempt, clickAttempt, dispatchAttempt, evaluateAttempt, focusAttempt };
    },
  };

  return locator;
}

function createButtonLocator(config: { clickFailures?: string[] }) {
  let clickAttempt = 0;
  const locator = {
    first() {
      return this;
    },
    async waitFor() {
      return undefined;
    },
    async scrollIntoViewIfNeeded() {
      return undefined;
    },
    async click() {
      const failureMessage = config.clickFailures?.[clickAttempt];
      clickAttempt += 1;
      if (failureMessage) {
        throw new Error(failureMessage);
      }
    },
    async dispatchEvent() {
      clickAttempt += 1;
    },
    async evaluate() {
      clickAttempt += 1;
      return { disabled: false, text: 'Submit', ariaDisabled: null };
    },
    async focus() {
      return undefined;
    },
    get clickAttempt() {
      return clickAttempt;
    },
  };

  return locator;
}

test.describe.configure({ mode: 'serial' });

type TaskListShellNavigationHarness = {
  page: { url: () => string };
  isBlankTaskListDocument?: (urlPattern: RegExp) => Promise<boolean>;
  reloadBlankTaskListDocumentIfNeeded?: (urlPattern: RegExp, context: string, timeoutMs: number) => Promise<void>;
  waitForTaskListShellReady: (context: string, timeoutMs: number) => Promise<void>;
  waitForTaskListSpinnerToSettle?: (timeoutMs: number) => Promise<void>;
};

type TaskListShellNavigationMethod = (
  this: TaskListShellNavigationHarness,
  urlPattern: RegExp,
  context: string,
  timeoutMs: number
) => Promise<void>;

const waitForTaskListShellReadyAfterNavigation = (
  TaskListPage.prototype as unknown as {
    waitForTaskListShellReadyAfterNavigation: TaskListShellNavigationMethod;
  }
).waitForTaskListShellReadyAfterNavigation;

test.describe('Task list action helper unit tests', { tag: '@svc-internal' }, () => {
  test('keeps the caller readiness budget after task-list navigation', async () => {
    const observedTimeouts: number[] = [];

    await waitForTaskListShellReadyAfterNavigation.call(
      {
        page: { url: () => 'https://manage-case.aat.platform.hmcts.net/work/my-work/list' },
        waitForTaskListShellReady: async (_context, timeoutMs) => {
          observedTimeouts.push(timeoutMs);
        },
      },
      /\/work\/my-work\/list$/,
      'unit task-list shell',
      30_000
    );

    expect(observedTimeouts).toEqual([30_000]);
  });

  test('shares the readiness budget with blank-document recovery', async () => {
    const observedTimeouts: number[] = [];
    const originalNow = Date.now;
    let now = 0;
    Date.now = () => now;

    try {
      await waitForTaskListShellReadyAfterNavigation.call(
        {
          page: { url: () => 'https://manage-case.aat.platform.hmcts.net/work/my-work/list' },
          isBlankTaskListDocument: async () => true,
          reloadBlankTaskListDocumentIfNeeded: async () => undefined,
          waitForTaskListSpinnerToSettle: async () => undefined,
          waitForTaskListShellReady: async (_context, timeoutMs) => {
            observedTimeouts.push(timeoutMs);
            if (observedTimeouts.length === 1) {
              now = 20_000;
              throw new Error('blank document');
            }
          },
        },
        /\/work\/my-work\/list$/,
        'unit task-list blank recovery',
        30_000
      );
    } finally {
      Date.now = originalNow;
    }

    expect(observedTimeouts).toEqual([30_000, 10_000]);
  });

  test('resolves and finds the stable task identity from Manage button IDs', async () => {
    const manageIds = ['manage_task-a', 'manage_task-b'];
    const pageObject = {
      taskRows: { count: async () => manageIds.length },
      getManageButtonForRow: (rowIndex: number) => ({
        getAttribute: async () => manageIds[rowIndex],
      }),
    };

    await expect(TaskListPage.prototype.getTaskIdForRow.call(pageObject, 1)).resolves.toBe('task-b');
    await expect(TaskListPage.prototype.findTaskRowIndexById.call(pageObject, 'task-b')).resolves.toBe(1);
    await expect(TaskListPage.prototype.findTaskRowIndexById.call(pageObject, 'missing')).resolves.toBe(-1);
  });

  test('waitForTaskRowReady fails fast when the task data API returns a server error', async () => {
    const waitIntervals: number[] = [];
    let apiCallsReadCount = 0;

    await expect(
      TaskListPage.prototype.waitForTaskRowReady.call(
        {
          assertTaskListInteractive: async () => undefined,
          getApiCalls: () => {
            apiCallsReadCount += 1;
            return apiCallsReadCount === 1
              ? []
              : [
                  {
                    method: 'POST',
                    url: 'https://manage-case.aat.platform.hmcts.net/workallocation/task',
                    status: 503,
                  },
                ];
          },
          getLatestTaskDataCallSummary: () => 'POST /workallocation/task -> HTTP 503',
          getManageButtonForRow: () => ({
            isVisible: async () => false,
          }),
          getTaskRow: () => ({
            isVisible: async () => false,
          }),
          isTaskDataCall: (url: string) => url.includes('/workallocation/task') && !url.includes('/types-of-work'),
          page: {
            waitForTimeout: async (ms: number) => waitIntervals.push(ms),
          },
          taskRows: {
            count: async () => 0,
          },
        },
        'unit task api failure',
        { timeoutMs: 5_000, pollMs: 50 }
      )
    ).rejects.toThrow(
      'Task list failed while waiting for task row (unit task api failure): POST https://manage-case.aat.platform.hmcts.net/workallocation/task returned HTTP 503'
    );

    expect(waitIntervals).toEqual([]);
  });

  test('waitForTaskRowReady ignores task data server errors captured before the current wait', async () => {
    const waitIntervals: number[] = [];

    await expect(
      TaskListPage.prototype.waitForTaskRowReady.call(
        {
          assertTaskListInteractive: async () => undefined,
          getApiCalls: () => [
            {
              method: 'POST',
              url: 'https://manage-case.aat.platform.hmcts.net/workallocation/task',
              status: 502,
            },
          ],
          getLatestTaskDataCallSummary: () => 'none captured',
          getManageButtonForRow: () => ({
            isVisible: async () => false,
          }),
          getTaskRow: () => ({
            isVisible: async () => false,
          }),
          isTaskDataCall: (url: string) => url.includes('/workallocation/task') && !url.includes('/types-of-work'),
          page: {
            waitForTimeout: async (ms: number) => waitIntervals.push(ms),
          },
          taskRows: {
            count: async () => 0,
          },
        },
        'unit stale task api failure',
        { timeoutMs: 100, pollMs: 50 }
      )
    ).rejects.toThrow('Timed out after 100ms waiting for task row (unit stale task api failure)');

    expect(waitIntervals.length).toBeGreaterThan(0);
  });

  test('waitForTaskDataResponse accepts a successful post-baseline task inspection', async () => {
    const apiCalls = [
      { method: 'POST', url: 'https://manage-case.aat.platform.hmcts.net/workallocation/task', status: 503 },
      { method: 'POST', url: 'https://manage-case.aat.platform.hmcts.net/workallocation/task', status: 200 },
    ];

    await expect(
      TaskListPage.prototype.waitForTaskDataResponse.call(
        {
          assertTaskListInteractive: async () => undefined,
          getApiCalls: () => apiCalls,
          isTaskDataCall: (url: string) => url.endsWith('/workallocation/task'),
          page: {
            waitForTimeout: async () => undefined,
            url: () => 'https://manage-case.aat.platform.hmcts.net/work/my-work/list',
          },
        },
        'unit cleanup inspection',
        1,
        { timeoutMs: 100, pollMs: 1 }
      )
    ).resolves.toBeUndefined();
  });

  test('waitForTaskDataResponse rejects a failed cleanup inspection instead of treating the task as absent', async () => {
    await expect(
      TaskListPage.prototype.waitForTaskDataResponse.call(
        {
          assertTaskListInteractive: async () => undefined,
          getApiCalls: () => [
            { method: 'POST', url: 'https://manage-case.aat.platform.hmcts.net/workallocation/task', status: 500 },
          ],
          isTaskDataCall: (url: string) => url.endsWith('/workallocation/task'),
          page: {
            waitForTimeout: async () => undefined,
            url: () => 'https://manage-case.aat.platform.hmcts.net/work/my-work/list',
          },
        },
        'unit cleanup inspection',
        0,
        { timeoutMs: 100, pollMs: 1 }
      )
    ).rejects.toThrow(
      'Task data inspection failed (unit cleanup inspection): POST https://manage-case.aat.platform.hmcts.net/workallocation/task returned HTTP 500'
    );
  });

  test('clickTaskActionForRow reopens the same row when the row action is temporarily hidden', async () => {
    const action = createActionLocator({
      waitResults: ['hidden', 'visible'],
    });
    const reopenedRows: Array<{ rowIndex: number; context: string }> = [];

    await TaskListPage.prototype.clickTaskActionForRow.call(
      {
        getTaskActionForRow: (rowIndex: number, actionId: string) => {
          expect(rowIndex).toBe(2);
          expect(actionId).toBe('claim');
          return action as never;
        },
        openManageActionsForRow: async (rowIndex: number, context: string) => {
          reopenedRows.push({ rowIndex, context });
        },
        assertTaskListInteractive: async () => undefined,
        page: {
          waitForTimeout: async () => undefined,
          keyboard: {
            press: async () => undefined,
          },
          url: () => 'https://manage-case.aat.platform.hmcts.net/work/my-work/available',
        },
      },
      2,
      'claim',
      'row scoped task action retry',
      { timeoutMs: 5_000, pollMs: 50 }
    );

    expect(reopenedRows).toEqual([{ rowIndex: 2, context: 'row scoped task action retry for row 3 reopen 1' }]);
    expect(action.attempts).toEqual({ waitAttempt: 2, clickAttempt: 1, dispatchAttempt: 0, evaluateAttempt: 0, focusAttempt: 0 });
  });

  test('clickTaskAction reopens the actions row after hidden and transient action refresh failures', async () => {
    const action = createActionLocator({
      waitResults: ['hidden', 'visible', 'visible'],
      clickFailures: ['Timeout 2500ms exceeded.'],
    });
    const interactiveContexts: string[] = [];
    const manageContexts: string[] = [];
    const waitIntervals: number[] = [];

    await TaskListPage.prototype.clickTaskAction.call(
      {
        assertTaskListInteractive: async (context: string) => interactiveContexts.push(context),
        openFirstManageActions: async (context: string) => manageContexts.push(context),
        page: {
          waitForTimeout: async (ms: number) => waitIntervals.push(ms),
          url: () => 'https://manage-case.aat.platform.hmcts.net/work/my-work/list',
        },
      },
      action as never,
      'unit task action retry',
      { timeoutMs: 5_000, pollMs: 50 }
    );

    expect(manageContexts).toEqual(['unit task action retry reopen 1']);
    expect(interactiveContexts).toEqual([
      'clicking task action (unit task action retry)',
      'clicking task action (unit task action retry)',
    ]);
    expect(waitIntervals).toEqual([]);
    expect(action.attempts).toEqual({ waitAttempt: 2, clickAttempt: 2, dispatchAttempt: 0, evaluateAttempt: 0, focusAttempt: 0 });
  });

  test('clickTaskAction retries a bounded fallback click when the action link rerenders during click', async () => {
    const action = createActionLocator({
      waitResults: ['visible'],
      clickFailures: ['element was detached from the DOM'],
    });

    await TaskListPage.prototype.clickTaskAction.call(
      {
        assertTaskListInteractive: async () => undefined,
        openFirstManageActions: async () => undefined,
        page: {
          waitForTimeout: async () => undefined,
          keyboard: {
            press: async () => undefined,
          },
          url: () => 'https://manage-case.aat.platform.hmcts.net/work/my-work/available',
        },
      },
      action as never,
      'unit task action dispatch fallback',
      { timeoutMs: 5_000, pollMs: 50 }
    );

    expect(action.attempts).toEqual({ waitAttempt: 1, clickAttempt: 2, dispatchAttempt: 0, evaluateAttempt: 0, focusAttempt: 0 });
  });

  test('clickTaskActionForRowOnce never repeats an ambiguous claim click', async () => {
    const action = createActionLocator({
      waitResults: ['visible'],
      clickFailures: ['element was detached from the DOM'],
    });

    await expect(
      TaskListPage.prototype.clickTaskActionForRowOnce.call(
        {
          assertTaskListInteractive: async () => undefined,
          getTaskActionForRow: () => action,
        },
        0,
        'claim',
        'single claim dispatch',
        { timeoutMs: 5_000 }
      )
    ).rejects.toThrow('element was detached from the DOM');
    expect(action.attempts.clickAttempt).toBe(1);
  });

  test('clickButtonAndWaitForRequest retries after a transient click failure and returns the observed request', async () => {
    const button = createButtonLocator({
      clickFailures: ['element was detached from the DOM'],
    });
    const keyboardPresses: string[] = [];
    const waitForRequestCalls: number[] = [];
    const fakeRequest = {
      method: () => 'POST',
      url: () => 'https://manage-case.aat.platform.hmcts.net/workallocation/task/123/assign',
    };

    const request = await TaskListPage.prototype.clickButtonAndWaitForRequest.call(
      {
        page: {
          waitForRequest: async () => {
            waitForRequestCalls.push(1);
            if (waitForRequestCalls.length === 1) {
              throw new Error('request timeout');
            }
            return fakeRequest;
          },
          waitForEvent: async () => {
            throw new Error('pageerror timeout');
          },
          keyboard: {
            press: async (key: string) => keyboardPresses.push(key),
          },
          url: () => 'https://manage-case.aat.platform.hmcts.net/work/123/reassign',
        },
      },
      button as never,
      (observedRequest: { method: () => string }) => observedRequest.method() === 'POST',
      'unit submit retry',
      { timeoutMs: 5_000 }
    );

    expect(request).toBe(fakeRequest);
    expect(waitForRequestCalls).toHaveLength(2);
    expect(button.clickAttempt).toBe(2);
    expect(keyboardPresses).toEqual([]);
  });
});
