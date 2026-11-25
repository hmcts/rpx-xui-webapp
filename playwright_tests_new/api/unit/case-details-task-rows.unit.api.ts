import { expect, test } from '@playwright/test';

import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po.js';

type TaskTabState = {
  containerVisible: boolean;
  spinnerVisible: boolean;
  taskCount: number;
  taskVisible: boolean;
  calls?: Array<{ url: string; method: string; status: number; timestamp: string }>;
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
    taskTabNavigation: { caseId: '1234567890', startedSequence: 999 },
    taskSearchSequence: Math.max(999, ...(state.calls ?? []).map((call) => Date.parse(call.timestamp))),
    taskSearches: (state.calls ?? []).map((call) => ({
      sequence: Date.parse(call.timestamp),
      path: new URL(call.url).pathname,
      empty: call.status === 200 ? Promise.resolve(true) : undefined,
    })),
    taskSearchByRequest: new WeakMap(),
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
    const { details } = createTaskTab({
      containerVisible: true,
      spinnerVisible: false,
      taskCount: 0,
      taskVisible: false,
      calls: [
        {
          url: 'https://xui.example/workallocation/case/task/1234567890',
          method: 'POST',
          status: 200,
          timestamp: new Date(1_000).toISOString(),
        },
      ],
    });
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).resolves.toEqual([]);
  });

  for (const [label, body] of [
    ['empty array', []],
    ['object', {}],
    ['nonempty array', [{}]],
    ['null', null],
  ] as const) {
    test(`checks a 200 task search response body: ${label}`, async () => {
      const { details } = createTaskTab({ containerVisible: true, spinnerVisible: false, taskCount: 0, taskVisible: false });
      const request = { method: () => 'POST', url: () => 'https://xui.example/workallocation/case/task/1234567890' };
      details.recordCaseTaskSearch(request);
      details.recordCaseTaskSearchResponse({ request: () => request, status: () => 200, json: async () => body });
      const result = CaseDetailsPage.prototype.getTaskKeyValueRows.call(details);
      if (label === 'empty array') await expect(result).resolves.toEqual([]);
      else await expect(result).rejects.toThrow('Case task search did not succeed');
      expect(JSON.stringify(details.taskSearches)).not.toContain('body');
    });
  }

  test('rejects unreadable 200 task search JSON', async () => {
    const { details } = createTaskTab({ containerVisible: true, spinnerVisible: false, taskCount: 0, taskVisible: false });
    const request = { method: () => 'POST', url: () => 'https://xui.example/workallocation/case/task/1234567890' };
    details.recordCaseTaskSearch(request);
    details.recordCaseTaskSearchResponse({
      request: () => request,
      status: () => 200,
      json: async () => {
        throw new Error('invalid JSON');
      },
    });
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toThrow('Case task search did not succeed');
  });

  test('does not accept a late success from the request before a failed retry', async () => {
    const { details } = createTaskTab({ containerVisible: true, spinnerVisible: false, taskCount: 0, taskVisible: false });
    const request = () => ({ method: () => 'POST', url: () => 'https://xui.example/workallocation/case/task/1234567890' });
    const first = request();
    details.recordCaseTaskSearch(first);
    details.taskTabNavigation.startedSequence = details.taskSearchSequence;
    const retry = request();
    details.recordCaseTaskSearch(retry);
    details.recordCaseTaskSearchResponse({ request: () => retry, status: () => 500 });
    details.recordCaseTaskSearchResponse({ request: () => first, status: () => 200, json: async () => [] });
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toThrow('Case task search did not succeed');
  });

  test('rejects an empty response if a newer task search fails while JSON is being read', async () => {
    const { details } = createTaskTab({ containerVisible: true, spinnerVisible: false, taskCount: 0, taskVisible: false });
    const request = () => ({ method: () => 'POST', url: () => 'https://xui.example/workallocation/case/task/1234567890' });
    const first = request();
    let releaseBody: (value: unknown) => void = () => undefined;
    const body = new Promise((resolve) => {
      releaseBody = resolve;
    });
    details.recordCaseTaskSearch(first);
    details.recordCaseTaskSearchResponse({ request: () => first, status: () => 200, json: () => body });
    const result = CaseDetailsPage.prototype.getTaskKeyValueRows.call(details);
    const retry = request();
    details.recordCaseTaskSearch(retry);
    details.recordCaseTaskSearchResponse({ request: () => retry, status: () => 500 });
    releaseBody([]);
    await expect(result).rejects.toThrow('Case task search did not succeed');
  });

  for (const status of [0, 400, 500]) {
    test(`does not treat a failed task search (${status}) as an empty list`, async () => {
      const { details } = createTaskTab({
        containerVisible: true,
        spinnerVisible: false,
        taskCount: 0,
        taskVisible: false,
        calls: [
          {
            url: 'https://xui.example/workallocation/case/task/1234567890',
            method: 'POST',
            status,
            timestamp: new Date(1_000).toISOString(),
          },
        ],
      });
      await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toThrow(
        'Case task search did not succeed'
      );
    });
  }

  test('requires a successful search for this navigation and case before accepting an empty list', async () => {
    const { details } = createTaskTab({
      containerVisible: true,
      spinnerVisible: false,
      taskCount: 0,
      taskVisible: false,
      calls: [
        {
          url: 'https://xui.example/workallocation/case/task/1234567890',
          method: 'POST',
          status: 200,
          timestamp: new Date(999).toISOString(),
        },
        {
          url: 'https://xui.example/workallocation/case/task/other',
          method: 'POST',
          status: 200,
          timestamp: new Date(1_000).toISOString(),
        },
      ],
    });
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toThrow('Case task search did not succeed');
  });

  test('accepts a successful search after an earlier failed search', async () => {
    const { details } = createTaskTab({
      containerVisible: true,
      spinnerVisible: false,
      taskCount: 0,
      taskVisible: false,
      calls: [500, 200].map((status, index) => ({
        url: 'https://xui.example/workallocation/case/task/1234567890',
        method: 'POST',
        status,
        timestamp: new Date(1_000 + index).toISOString(),
      })),
    });
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).resolves.toEqual([]);
  });

  test('rejects a failed search after an earlier success', async () => {
    const { details } = createTaskTab({
      containerVisible: true,
      spinnerVisible: false,
      taskCount: 0,
      taskVisible: false,
      calls: [200, 500].map((status, index) => ({
        url: 'https://xui.example/workallocation/case/task/1234567890',
        method: 'POST',
        status,
        timestamp: new Date(1_000 + index).toISOString(),
      })),
    });
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toThrow('Case task search did not succeed');
  });

  test('does not reuse a search response from a previous navigation attempt', async () => {
    const calls = [
      {
        url: 'https://xui.example/workallocation/case/task/1234567890',
        method: 'POST',
        status: 200,
        timestamp: new Date(1_001).toISOString(),
      },
    ];
    const { details } = createTaskTab({ containerVisible: true, spinnerVisible: false, taskCount: 0, taskVisible: false, calls });
    let navigations = 0;
    let waits = 0;
    details.taskSearchSequence = 1_000;
    details.taskSearches = [];
    details.gotoCaseDetailsPath = async () => {
      navigations += 1;
      if (navigations === 1) {
        details.taskSearchSequence += 1;
        details.taskSearches.push({
          sequence: details.taskSearchSequence,
          path: '/workallocation/case/task/1234567890',
          empty: Promise.resolve(true),
        });
      }
    };
    details.exuiSpinnerComponent = { wait: async () => undefined };
    details.taskListContainer.waitFor = async () => {
      waits += 1;
      if (waits === 1) {
        throw new Error('first container not visible');
      }
    };
    await CaseDetailsPage.prototype.openTasksTab.call(details, 'IA', 'Asylum', '1234567890');
    expect(navigations).toBe(2);
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toThrow('Case task search did not succeed');
  });

  test('does not reuse a search from a failed internal page.goto attempt', async () => {
    const { details } = createTaskTab({ containerVisible: true, spinnerVisible: false, taskCount: 0, taskVisible: false });
    details.taskSearches = [];
    details.taskSearchSequence = 0;
    let attempts = 0;
    details.page.goto = async () => {
      attempts += 1;
      if (attempts === 1) {
        details.taskSearchSequence += 1;
        details.taskSearches.push({
          sequence: details.taskSearchSequence,
          path: '/workallocation/case/task/1234567890',
          empty: Promise.resolve(true),
        });
        throw new Error('net::ERR_CONNECTION_RESET');
      }
    };
    details.page.url = () => 'https://xui.example/cases/case-details/IA/Asylum/1234567890/tasks';
    details.page.waitForURL = async () => undefined;
    details.page.waitForTimeout = async () => undefined;
    details.exuiSpinnerComponent = { wait: async () => undefined };
    await CaseDetailsPage.prototype.openTasksTab.call(details, 'IA', 'Asylum', '1234567890');
    expect(attempts).toBe(2);
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toThrow('Case task search did not succeed');
  });

  test('does not reuse an earlier navigation when a task tab is reached by another route', async () => {
    const { details } = createTaskTab({
      containerVisible: true,
      spinnerVisible: false,
      taskCount: 0,
      taskVisible: false,
      calls: [
        {
          url: 'https://xui.example/workallocation/case/task/1234567890',
          method: 'POST',
          status: 200,
          timestamp: new Date(1_000).toISOString(),
        },
      ],
    });
    details.taskTabNavigation = undefined;
    await expect(CaseDetailsPage.prototype.getTaskKeyValueRows.call(details)).rejects.toThrow('Case task search did not succeed');
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
