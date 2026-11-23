import { expect, test } from '@playwright/test';
import { TaskListPage } from '../../E2E/page-objects/pages/exui/taskList.po.js';

test.describe('Task list navigation deadline', { tag: '@svc-internal' }, () => {
  test('shares the caller budget across navigation, shell bootstrap and row readiness', async () => {
    const originalNow = Date.now;
    let now = 100_000;
    const rowBudgets: number[] = [];
    let url = 'about:blank';
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => url,
        goto: async (path: string) => {
          now += 10_000;
          url = `https://xui.local${path}`;
        },
        waitForURL: async () => {},
      },
      reloadBlankTaskListDocumentIfNeeded: async () => {
        now += 5_000;
      },
      waitForTaskListSpinnerToSettle: async () => {
        now += 3_000;
      },
      waitForTaskListShellReadyAfterNavigation: async () => {
        now += 4_000;
      },
      waitForTaskRowReady: async (_context: string, options: { timeoutMs: number }) => {
        rowBudgets.push(options.timeoutMs);
      },
    }) as TaskListPage;
    Date.now = () => now;
    try {
      await taskList.gotoAndWaitForTaskRow('deadline check', { timeoutMs: 30_000 });
      expect(rowBudgets).toEqual([8_000]);
    } finally {
      Date.now = originalNow;
    }
  });

  test('does not retry a generic navigation timeout', async () => {
    let attempts = 0;
    const timeout = new Error('page.goto: Timeout 15000ms exceeded.');
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => 'about:blank',
        goto: async () => {
          attempts += 1;
          throw timeout;
        },
        waitForTimeout: async () => {},
      },
    }) as TaskListPage;

    await expect(taskList.gotoMyCases()).rejects.toBe(timeout);
    expect(attempts).toBe(1);
  });

  test('transport retries and route validation consume the original navigation budget', async () => {
    const originalNow = Date.now;
    let now = 100_000;
    let url = 'about:blank';
    const navigationBudgets: number[] = [];
    const routeBudgets: number[] = [];
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => url,
        goto: async (path: string, options: { timeout: number }) => {
          navigationBudgets.push(options.timeout);
          if (navigationBudgets.length < 3) {
            now += 14_000;
            throw new Error('net::ERR_NETWORK_CHANGED');
          }
          now += 500;
          url = `https://xui.local${path}`;
        },
        waitForURL: async (_pattern: RegExp, options: { timeout: number }) => {
          routeBudgets.push(options.timeout);
        },
        waitForTimeout: async (delay: number) => {
          now += delay;
        },
      },
      reloadBlankTaskListDocumentIfNeeded: async () => {},
      waitForTaskListSpinnerToSettle: async () => {},
      waitForTaskListShellReadyAfterNavigation: async () => {},
      waitForTaskRowReady: async () => {},
    }) as TaskListPage;
    Date.now = () => now;
    try {
      await taskList.gotoAndWaitForTaskRow('transport retry', { timeoutMs: 30_000 });
      expect(navigationBudgets).toEqual([15_000, 15_000, 1_000]);
      expect(routeBudgets).toEqual([500]);
    } finally {
      Date.now = originalNow;
    }
  });

  test('preserves the route wait error instead of swallowing it', async () => {
    const routeError = new Error('Expected task-list route never appeared');
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => 'https://xui.local/unexpected-route',
        goto: async () => {},
        waitForURL: async () => {
          throw routeError;
        },
      },
    }) as TaskListPage;

    await expect(taskList.gotoMyCases()).rejects.toBe(routeError);
  });

  test('does not start row readiness when bootstrap has exhausted the caller budget', async () => {
    const originalNow = Date.now;
    let now = 100_000;
    let rowWaits = 0;
    let url = 'about:blank';
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => url,
        goto: async (path: string) => {
          url = `https://xui.local${path}`;
        },
        waitForURL: async () => {},
      },
      reloadBlankTaskListDocumentIfNeeded: async () => {},
      waitForTaskListSpinnerToSettle: async () => {},
      waitForTaskListShellReadyAfterNavigation: async () => {
        now += 30_000;
      },
      waitForTaskRowReady: async () => {
        rowWaits += 1;
      },
    }) as TaskListPage;
    Date.now = () => now;
    try {
      await expect(taskList.gotoAndWaitForTaskRow('deadline exhausted', { timeoutMs: 30_000 })).rejects.toThrow(
        'Timed out while'
      );
      expect(rowWaits).toBe(0);
    } finally {
      Date.now = originalNow;
    }
  });

  test('caps the missing-row poll to the remaining readiness budget', async () => {
    const originalNow = Date.now;
    let now = 100_000;
    const delays: number[] = [];
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        waitForTimeout: async (delay: number) => {
          delays.push(delay);
          now += delay;
        },
      },
      getApiCalls: () => [],
      assertTaskListInteractive: async () => {},
      taskRows: { count: async () => 0 },
    }) as TaskListPage;
    Date.now = () => now;
    try {
      await expect(taskList.waitForTaskRowReady('missing row', { timeoutMs: 50 })).rejects.toThrow('Timed out after 50ms');
      expect(delays).toEqual([50]);
    } finally {
      Date.now = originalNow;
    }
  });
});
