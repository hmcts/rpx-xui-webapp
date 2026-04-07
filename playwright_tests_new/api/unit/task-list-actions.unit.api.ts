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

test.describe('Task list action helper unit tests', { tag: '@svc-internal' }, () => {
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
