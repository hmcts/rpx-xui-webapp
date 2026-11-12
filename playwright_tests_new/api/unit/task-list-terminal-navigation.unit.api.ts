import { expect, test } from '@playwright/test';
import { TaskListPage } from '../../E2E/page-objects/pages/exui/taskList.po.js';

function navigationHarness(options: { initialPath?: string; reloadPath?: string; headingVisible?: boolean } = {}) {
  let url = 'about:blank';
  let reloads = 0;
  let headingWaits = 0;
  const heading = {
    async waitFor() {
      headingWaits += 1;
      if (options.headingVisible === false) throw new Error('Expected terminal heading is missing');
    },
  };
  const taskList = Object.assign(Object.create(TaskListPage.prototype), {
    page: {
      url: () => url,
      async goto(path: string) {
        url = `https://xui.local${options.initialPath ?? path}`;
      },
      async waitForURL(pattern: RegExp) {
        if (!pattern.test(url)) throw new Error(`Unexpected route: ${url}`);
      },
      async waitForFunction() {},
      async waitForLoadState() {},
      async waitForTimeout() {},
      locator: () => ({ innerText: async () => (options.reloadPath && reloads === 0 ? '' : 'Rendered view') }),
      async reload() {
        reloads += 1;
        url = `https://xui.local${options.reloadPath}`;
      },
    },
    logger: { warn() {} },
    notAuthorisedHeading: heading,
    serviceDownHeading: heading,
  }) as TaskListPage;
  return {
    taskList,
    get reloads() {
      return reloads;
    },
    get headingWaits() {
      return headingWaits;
    },
  };
}

test.describe('Task list terminal navigation', { tag: '@svc-internal' }, () => {
  for (const [method, path] of [
    ['gotoMyCasesExpectingNotAuthorised', '/not-authorised'],
    ['gotoMyAccessExpectingNotAuthorised', '/not-authorised'],
    ['gotoMyCasesExpectingServiceDown', '/service-down'],
    ['gotoMyAccessExpectingServiceDown', '/service-down'],
    ['gotoExpectingServiceDown', '/service-down'],
  ] as const) {
    test(`${method} accepts an immediate expected redirect`, async () => {
      const harness = navigationHarness({ initialPath: path });
      await harness.taskList[method]();
      expect(harness.headingWaits).toBe(1);
      expect(harness.reloads).toBe(0);
    });
    test(`${method} accepts the expected redirect after blank-page reload`, async () => {
      const harness = navigationHarness({ reloadPath: path });
      await harness.taskList[method]();
      expect(harness.reloads).toBe(1);
      expect(harness.headingWaits).toBe(1);
    });
  }

  test('rejects a different error route after reload', async () => {
    const harness = navigationHarness({ reloadPath: '/service-down' });
    await expect(harness.taskList.gotoMyCasesExpectingNotAuthorised()).rejects.toThrow('after blank-page reload');
    expect(harness.headingWaits).toBe(0);
  });

  test('requires the terminal route even when a matching heading is present', async () => {
    const harness = navigationHarness();
    await expect(harness.taskList.gotoMyCasesExpectingNotAuthorised()).rejects.toThrow('Unexpected route');
    expect(harness.headingWaits).toBe(0);
  });

  test('requires the terminal heading on the expected route', async () => {
    const harness = navigationHarness({ initialPath: '/not-authorised', headingVisible: false });
    await expect(harness.taskList.gotoMyCasesExpectingNotAuthorised()).rejects.toThrow('terminal heading is missing');
  });

  test('normal navigation still rejects an error redirect', async () => {
    const harness = navigationHarness({ initialPath: '/not-authorised' });
    await expect(harness.taskList.gotoMyCases()).rejects.toThrow('landed on');
  });
});
