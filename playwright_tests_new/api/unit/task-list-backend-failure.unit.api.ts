import { expect, test } from '@playwright/test';
import { TaskListPage } from '../../E2E/page-objects/pages/exui/taskList.po.js';
import { createReadinessHarness } from './navigation-readiness.helpers.js';

type TrackedCall = { url: string; method: string; status: number; duration: number; timestamp: string };

function taskSearchCall(status: number, atMs: number, url = 'https://xui.example/workallocation/task'): TrackedCall {
  return { url, method: 'POST', status, duration: 10, timestamp: new Date(atMs).toISOString() };
}

function shellHarness(options: { calls?: TrackedCall[]; signalVisibleAfterMs?: number } = {}) {
  const harness = createReadinessHarness();
  const shellSignal = {
    ...harness.hidden,
    isVisible: async () => options.signalVisibleAfterMs !== undefined && harness.elapsed() >= options.signalVisibleAfterMs,
  };
  Object.assign(harness.taskList, {
    myWorkHeading: shellSignal,
    taskTableTabs: harness.hidden,
    myWorkFilterToggle: harness.hidden,
    taskListTable: harness.hidden,
    taskTableHeader: harness.hidden,
    taskTableFooter: harness.hidden,
    taskListResultsAmount: harness.hidden,
    errorPageHeading: harness.hidden,
    getApiCalls: () => options.calls ?? [],
  });
  return harness;
}

test.describe('Task list shell backend failure', { tag: '@svc-internal' }, () => {
  for (const status of [403, 503]) {
    test(`fails fast naming HTTP ${status} when the task search fails and no shell renders`, async () => {
      const harness = shellHarness({ calls: [taskSearchCall(status, 0)] });
      try {
        await expect(harness.taskList.waitForTaskListShellReady('shell', 30_000, 0)).rejects.toThrow(
          `Task search POST https://xui.example/workallocation/task returned HTTP ${status} and no task list shell (shell) signal appeared`
        );
        expect(harness.elapsed()).toBeLessThan(5_000);
      } finally {
        harness.restore();
      }
    });
  }

  test('accepts the shell empty state rendered after a failed task search', async () => {
    const harness = shellHarness({ calls: [taskSearchCall(500, 0)], signalVisibleAfterMs: 1_000 });
    try {
      await harness.taskList.waitForTaskListShellReady('shell', 30_000, 0);
      expect(harness.elapsed()).toBe(1_000);
    } finally {
      harness.restore();
    }
  });

  test('ignores failures before the navigation started and non-search task calls', async () => {
    const harness = shellHarness({
      calls: [
        taskSearchCall(500, 0),
        taskSearchCall(500, 1_000, 'https://xui.example/workallocation/task/123/claim'),
        { ...taskSearchCall(500, 1_000), method: 'GET' },
      ],
    });
    try {
      await expect(harness.taskList.waitForTaskListShellReady('shell', 10_000, 500)).rejects.toThrow(
        'No visible task list shell (shell) signal appeared within'
      );
    } finally {
      harness.restore();
    }
  });
});

test.describe('Task list name-resolution failure', { tag: '@svc-internal' }, () => {
  function navigationHarness(failures: string[]) {
    let attempts = 0;
    let url = 'about:blank';
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => url,
        goto: async (path: string) => {
          attempts += 1;
          const failure = failures.shift();
          if (failure) throw new Error(failure);
          url = `https://xui.example${path}`;
        },
        waitForTimeout: async () => undefined,
        waitForURL: async () => undefined,
      },
    });
    return { taskList, attempts: () => attempts };
  }

  test('stops on the second unresolved host instead of retrying it as transient', async () => {
    const dnsFailure = 'page.goto: net::ERR_NAME_NOT_RESOLVED at https://xui.missing.example/work/my-work/list';
    const harness = navigationHarness([dnsFailure, dnsFailure, dnsFailure]);
    const error = await harness.taskList
      .gotoTaskListPath('/work/my-work/list', /\/work\/my-work\/list/, 'dns check', Date.now() + 30_000)
      .catch((caught: unknown) => caught);
    expect((error as Error).message).toBe('Target environment unavailable: xui.missing.example did not resolve');
    expect((error as Error).cause).toBeInstanceOf(Error);
    expect(harness.attempts()).toBe(2);
  });

  test('still retries a single unresolved host once', async () => {
    const harness = navigationHarness(['page.goto: net::ERR_NAME_NOT_RESOLVED at https://xui.example/work/my-work/list']);
    await harness.taskList.gotoTaskListPath('/work/my-work/list', /\/work\/my-work\/list/, 'dns check', Date.now() + 30_000);
    expect(harness.attempts()).toBe(2);
  });
});
