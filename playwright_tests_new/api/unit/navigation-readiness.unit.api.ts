import { expect, test } from '@playwright/test';
import { scrollTabIntoViewWithDetachedRetry } from '../../E2E/page-objects/pages/exui/caseDetails.po.js';
import { createCaseActionHarness, createReadinessHarness } from './navigation-readiness.helpers.js';

test.describe('Navigation readiness deadlines', { tag: '@svc-internal' }, () => {
  test('detached tab scroll does not retry after the caller deadline', async () => {
    const times = [0, 100];
    let calls = 0;
    const tab = {
      scrollIntoViewIfNeeded: async () => {
        calls += 1;
        throw new Error('locator.scrollIntoViewIfNeeded: Element is not attached to the DOM');
      },
    };
    await expect(scrollTabIntoViewWithDetachedRetry(tab, 100, () => times.shift() ?? 100)).rejects.toThrow(/Timed out/);
    expect(calls).toBe(1);
  });

  for (const heading of ['', 'Current heading', 'Replacement heading']) {
    test(`diagnostic takes an immediate heading snapshot: ${heading || 'absent'}`, async () => {
      const harness = createReadinessHarness();
      harness.page.locator = () => ({
        first() {
          return this;
        },
        waitFor: async () => undefined,
        textContent: async () => {
          harness.advance(100);
          return heading;
        },
        evaluateAll: async () => heading,
      });
      try {
        await expect(harness.taskList.waitForVisibleSignal([['missing', harness.hidden]], 'shell', 10)).rejects.toThrow(
          `heading=${heading || 'unknown'}`
        );
        expect(harness.elapsed()).toBe(10);
      } finally {
        harness.restore();
      }
    });
  }

  test('task shell stops before starting a nested wait at exact expiry', async () => {
    const harness = createReadinessHarness();
    harness.page.waitForURL = async () => {
      harness.advance(10);
    };
    try {
      await expect(harness.taskList.waitForTaskListShellReady('shell', 10)).rejects.toThrow(/timed out/i);
      expect(harness.timedCalls).toEqual([]);
    } finally {
      harness.restore();
    }
  });

  test('task shell passes the remaining budget to successive waits', async () => {
    const harness = createReadinessHarness();
    harness.page.waitForURL = async () => {
      harness.advance(4);
    };
    harness.taskList.waitForTaskListSpinnerToSettle = async (timeout: number) => {
      harness.timedCalls.push({ name: 'spinner', timeout });
      harness.advance(2);
    };
    try {
      await harness.taskList.waitForTaskListShellReady('shell', 10);
      expect(harness.timedCalls).toEqual([
        { name: 'spinner', timeout: 6 },
        { name: 'spinner', timeout: 4 },
      ]);
    } finally {
      harness.restore();
    }
  });

  test('task shell allows a slow spinner to settle within the caller budget', async () => {
    const harness = createReadinessHarness();
    harness.taskList.waitForTaskListSpinnerToSettle = async (timeout: number) => {
      if (timeout < 11_000) throw new Error('spinner timed out early');
      harness.advance(11_000);
      harness.taskList.waitForTaskListSpinnerToSettle = async () => undefined;
    };
    try {
      await harness.taskList.waitForTaskListShellReady('shell', 30_000);
      expect(harness.elapsed()).toBe(11_000);
    } finally {
      harness.restore();
    }
  });

  test('case tabs stop before the second wait when the first consumes the budget', async () => {
    const harness = createReadinessHarness();
    harness.caseDetails.container = {
      waitFor: async () => {
        harness.advance(10);
      },
    };
    try {
      await expect(harness.caseDetails.waitForCaseDetailsReady(10)).rejects.toThrow(/timed out/i);
      expect(harness.timedCalls).toEqual([]);
    } finally {
      harness.restore();
    }
  });

  test('case tabs pass remaining time to the tab list', async () => {
    const harness = createReadinessHarness();
    harness.caseDetails.container = {
      waitFor: async () => {
        harness.advance(4);
      },
    };
    try {
      await harness.caseDetails.waitForCaseDetailsReady(10);
      expect(harness.timedCalls).toEqual([{ name: 'visible', timeout: 6 }]);
    } finally {
      harness.restore();
    }
  });
});

test.describe('Case action destination failures', { tag: '@svc-internal' }, () => {
  for (const controlsRemoved of [false, true]) {
    test(`does not reissue Go on wrong destination when controlsRemoved=${controlsRemoved}`, async () => {
      const harness = createCaseActionHarness({ controlsRemoved });
      await expect(harness.caseDetails.selectCaseAction('Upload Document', { expectedPath: '/expected' })).rejects.toThrow(
        'wrong destination'
      );
      expect(harness.goClicks()).toBe(1);
    });
  }

  test('retry false preserves the destination error with one Go', async () => {
    const harness = createCaseActionHarness();
    await expect(
      harness.caseDetails.selectCaseAction('Upload Document', { expectedPath: '/expected', retry: false })
    ).rejects.toThrow('wrong destination');
    expect(harness.goClicks()).toBe(1);
  });

  test('known event error is reported with one Go', async () => {
    const harness = createCaseActionHarness({ eventError: true });
    await expect(harness.caseDetails.selectCaseAction('Upload Document', { expectedPath: '/expected' })).rejects.toThrow(
      'The event could not be created'
    );
    expect(harness.goClicks()).toBe(1);
  });
});

test('a post-dispatch click failure with a spinner never repeats Go', { tag: '@svc-internal' }, async () => {
  const harness = createCaseActionHarness();
  let clicks = 0;
  harness.caseDetails.caseActionGoButton.click = async () => {
    clicks += 1;
    throw new Error('navigation failed after dispatch');
  };
  harness.caseDetails.page.locator = () => ({
    first() {
      return this;
    },
    isVisible: async () => true,
    waitFor: async () => undefined,
  });
  await expect(harness.caseDetails.selectCaseAction('Upload Document')).rejects.toThrow('navigation failed after dispatch');
  expect(clicks).toBe(1);
});

test('task shell propagates a persistent spinner failure', { tag: '@svc-internal' }, async () => {
  const harness = createReadinessHarness();
  harness.page.waitForFunction = async () => {
    throw new Error('persistent spinner');
  };
  Object.assign(harness.page, {
    locator: () => ({
      first() {
        return this;
      },
      waitFor: async () => {
        throw new Error('persistent spinner');
      },
    }),
  });
  try {
    await expect(harness.taskList.waitForTaskListShellReady('shell', 30_000)).rejects.toThrow('persistent spinner');
  } finally {
    harness.restore();
  }
});
