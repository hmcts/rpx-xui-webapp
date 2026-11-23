import { expect, test as base } from '@playwright/test';
import { createServer } from 'node:http';
import { TaskListPage } from '../../E2E/page-objects/pages/exui/taskList.po';

const test = base.extend<{ fixtureOrigin: string }>({
  fixtureOrigin: async ({ page }, use) => {
    const server = createServer((_request, response) => response.writeHead(404).end());
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Fixture server did not bind to a TCP port');
    await page.route('**/*', (route) => route.abort());
    try {
      await use(`http://127.0.0.1:${address.port}`);
    } finally {
      await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
    }
  },
});

test(
  'waits for an initially blank task-list page to render before considering a reload',
  { tag: '@svc-internal' },
  async ({ page, fixtureOrigin }) => {
    let documents = 0;
    await page.route(`${fixtureOrigin}/**`, async (route) => {
      if (route.request().url().endsWith('/app.js')) {
        await new Promise((resolve) => setTimeout(resolve, 1_200));
        await route
          .fulfill({
            contentType: 'text/javascript',
            body: 'document.body.innerHTML = "<h1>My work</h1>";',
          })
          .catch(() => {});
      } else {
        documents++;
        await route.fulfill({
          contentType: 'text/html',
          body: '<html><head><script defer src="/app.js"></script></head><body></body></html>',
        });
      }
    });
    await page.goto(`${fixtureOrigin}/work/my-work/my-access`, { waitUntil: 'commit' });
    const target = new TaskListPage(page) as unknown as {
      reloadBlankTaskListDocumentIfNeeded: (url: RegExp, label: string, deadline: number) => Promise<void>;
    };
    await target.reloadBlankTaskListDocumentIfNeeded(/\/work\/my-work\/my-access$/, 'slow startup', Date.now() + 5_000);
    expect(documents).toBe(1);
    await expect(page.getByRole('heading', { name: 'My work' })).toBeVisible();
  }
);

test.describe('blank grace contracts', { tag: '@svc-internal' }, () => {
  test.describe.configure({ mode: 'serial' });

  test('waits at most 30 seconds, then reloads a document which remains blank', async () => {
    const { errors } = await import('@playwright/test');
    let now = 1_000;
    let reloads = 0;
    let grace = 0;
    const originalNow = Date.now;
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => 'https://task-list.test/work/my-work/my-access',
        waitForFunction: async (_fn: unknown, _url: string, options: { timeout: number }) => {
          grace = options.timeout;
          now += options.timeout;
          throw new errors.TimeoutError('blank');
        },
        reload: async () => {
          reloads++;
        },
        waitForURL: async () => {},
      },
      taskListTable: { isVisible: async () => false },
      isRecoverableBrowserNavigationDocument: async () => false,
      isBlankTaskListDocument: async () => true,
      logger: { warn: () => {} },
    });
    Date.now = () => now;
    try {
      await taskList.reloadBlankTaskListDocumentIfNeeded(/\/work\/my-work\/my-access$/, 'blank', now + 60_000);
      expect(grace).toBe(30_000);
      expect(reloads).toBe(1);
    } finally {
      Date.now = originalNow;
    }
  });

  test('uses the shorter caller deadline and does not reload after it expires', async () => {
    const { errors } = await import('@playwright/test');
    let now = 1_000;
    let reloads = 0;
    let grace = 0;
    const originalNow = Date.now;
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => 'https://task-list.test/work/my-work/my-access',
        waitForFunction: async (_fn: unknown, _url: string, options: { timeout: number }) => {
          grace = options.timeout;
          now += options.timeout;
          throw new errors.TimeoutError('blank');
        },
        reload: async () => {
          reloads++;
        },
      },
      taskListTable: { isVisible: async () => false },
      isRecoverableBrowserNavigationDocument: async () => false,
      isBlankTaskListDocument: async () => true,
    });
    Date.now = () => now;
    try {
      await expect(
        taskList.reloadBlankTaskListDocumentIfNeeded(/\/work\/my-work\/my-access$/, 'short deadline', now + 500)
      ).rejects.toThrow('Timed out');
      expect(grace).toBe(500);
      expect(reloads).toBe(0);
    } finally {
      Date.now = originalNow;
    }
  });

  test('propagates page closure or evaluation errors and does not reload', async () => {
    const error = new Error('Target page closed');
    let reloads = 0;
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => 'https://task-list.test/work/my-work/my-access',
        waitForFunction: async () => {
          throw error;
        },
        reload: async () => {
          reloads++;
        },
      },
      taskListTable: { isVisible: async () => false },
      isRecoverableBrowserNavigationDocument: async () => false,
      isBlankTaskListDocument: async () => true,
    });
    await expect(
      taskList.reloadBlankTaskListDocumentIfNeeded(/\/work\/my-work\/my-access$/, 'closed', Date.now() + 60_000)
    ).rejects.toBe(error);
    expect(reloads).toBe(0);
  });

  test('recovers a browser error without waiting for blank grace', async () => {
    let waits = 0;
    let reloads = 0;
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => 'chrome-error://chromewebdata/',
        waitForFunction: async () => {
          waits++;
        },
        reload: async () => {
          reloads++;
        },
        waitForURL: async () => {},
      },
      taskListTable: { isVisible: async () => false },
      isRecoverableBrowserNavigationDocument: async () => true,
      isBlankTaskListDocument: async () => false,
      logger: { warn: () => {} },
    });
    await taskList.reloadBlankTaskListDocumentIfNeeded(/\/work\/my-work\/my-access$/, 'browser error', Date.now() + 60_000);
    expect(waits).toBe(0);
    expect(reloads).toBe(1);
  });

  test('does not recover an unrelated route', async () => {
    let waits = 0;
    let reloads = 0;
    const taskList = Object.assign(Object.create(TaskListPage.prototype), {
      page: {
        url: () => 'https://task-list.test/other',
        waitForFunction: async () => {
          waits++;
        },
        reload: async () => {
          reloads++;
        },
      },
      taskListTable: { isVisible: async () => false },
      isRecoverableBrowserNavigationDocument: async () => false,
      isBlankTaskListDocument: async () => false,
    });
    await taskList.reloadBlankTaskListDocumentIfNeeded(/\/work\/my-work\/my-access$/, 'wrong route', Date.now() + 60_000);
    expect(waits).toBe(0);
    expect(reloads).toBe(0);
  });
});

test(
  'reloads a persistently blank browser document after the 30-second grace',
  { tag: '@svc-internal' },
  async ({ page, fixtureOrigin }) => {
    test.setTimeout(40_000);
    let documents = 0;
    await page.route(`${fixtureOrigin}/**`, async (route) => {
      documents += 1;
      await route.fulfill({ contentType: 'text/html', body: '<html><body></body></html>' });
    });
    await page.goto(`${fixtureOrigin}/work/my-work/my-access`, { waitUntil: 'load' });
    const target = new TaskListPage(page) as unknown as {
      reloadBlankTaskListDocumentIfNeeded: (url: RegExp, label: string, deadline: number) => Promise<void>;
    };
    const start = Date.now();
    await target.reloadBlankTaskListDocumentIfNeeded(/\/work\/my-work\/my-access$/, 'persistent blank', start + 37_000);
    expect(Date.now() - start).toBeGreaterThanOrEqual(29_000);
    expect(documents).toBe(2);
  }
);

test(
  'does not reload when a blank page navigates to another route during grace',
  { tag: '@svc-internal' },
  async ({ page, fixtureOrigin }) => {
    let documents = 0;
    await page.route(`${fixtureOrigin}/**`, async (route) => {
      documents += 1;
      await route.fulfill({ contentType: 'text/html', body: '<html><body></body></html>' });
    });
    await page.goto(`${fixtureOrigin}/work/my-work/my-access`, { waitUntil: 'load' });
    const target = new TaskListPage(page) as unknown as {
      reloadBlankTaskListDocumentIfNeeded: (url: RegExp, label: string, deadline: number) => Promise<void>;
    };
    const changingRoute = page.waitForFunction(() => location.pathname === '/other');
    const recovery = target.reloadBlankTaskListDocumentIfNeeded(
      /\/work\/my-work\/my-access$/,
      'route changes',
      Date.now() + 5_000
    );
    await page.evaluate(() => {
      history.pushState({}, '', '/other');
    });
    await changingRoute;
    await recovery;
    expect(documents).toBe(1);
    expect(page.url()).toContain('/other');
  }
);

test(
  'does not reload when a full navigation replaces a blank page',
  { tag: '@svc-internal' },
  async ({ page, fixtureOrigin }) => {
    let documents = 0;
    await page.route(`${fixtureOrigin}/**`, async (route) => {
      documents++;
      await route.fulfill({ contentType: 'text/html', body: '<html><body></body></html>' });
    });
    await page.goto(`${fixtureOrigin}/work/my-work/my-access`, { waitUntil: 'load' });
    const target = new TaskListPage(page) as unknown as {
      reloadBlankTaskListDocumentIfNeeded: (url: RegExp, label: string, deadline: number) => Promise<void>;
    };
    const recovering = target.reloadBlankTaskListDocumentIfNeeded(
      /\/work\/my-work\/my-access$/,
      'replacement',
      Date.now() + 5_000
    );
    await new Promise((resolve) => setTimeout(resolve, 100));
    await page.goto(`${fixtureOrigin}/other`, { waitUntil: 'load' });
    await recovering;
    expect(documents).toBe(2);
    expect(page.url()).toContain('/other');
  }
);
