import { expect, test } from '@playwright/test';
import { CaseDetailsPage } from '../../page-objects/pages/exui/caseDetails.po.js';
import { TaskListPage } from '../../page-objects/pages/exui/taskList.po.js';
import { caseActionDocument, caseTabDocument } from '../../utils/test-setup/navigationReadinessMock.js';

test.describe('Navigation readiness on a synthetic local document', { tag: ['@e2e', '@e2e-reliability'] }, () => {
  test('persistent visible spinner prevents tab selection from completing', async ({ page }) => {
    await page.setContent(caseTabDocument({ spinner: true }));
    const details = new CaseDetailsPage(page);
    Object.assign(details, { getRecommendedTimeoutMs: () => 2_000 });
    await expect(details.selectCaseDetailsTab('Case File View')).rejects.toThrow('Spinner still visible');
  });

  test('spinner-free empty feature remains a valid tab view', async ({ page }) => {
    await page.setContent(caseTabDocument());
    await new CaseDetailsPage(page).selectCaseDetailsTab('Case File View');
    await expect(page.getByRole('heading', { name: 'Documents (0)' })).toBeVisible();
    await expect(page.getByText('No results')).toBeVisible();
  });

  test('already-selected tab without spinner remains usable', async ({ page }) => {
    await page.setContent(caseTabDocument({ selected: true }));
    await new CaseDetailsPage(page).selectCaseDetailsTab('Case File View');
    await expect(page.getByText('No results')).toBeVisible();
  });

  for (const heading of ['', '<main><h1>Current heading</h1></main>']) {
    test(`diagnostic reads the current DOM without waiting for a heading: ${heading ? 'present' : 'absent'}`, async ({
      page,
    }) => {
      await page.setContent(heading);
      page.setDefaultTimeout(2_000);
      const taskList = new TaskListPage(page) as unknown as {
        waitForVisibleSignal: (signals: [], context: string, timeoutMs: number) => Promise<string>;
      };
      const started = Date.now();
      await expect(taskList.waitForVisibleSignal([], 'synthetic shell', 30)).rejects.toThrow(
        `heading=${heading ? 'Current heading' : 'unknown'}`
      );
      expect(Date.now() - started).toBeLessThan(1_000);
    });
  }

  test('diagnostic snapshots a replaced heading', async ({ page }) => {
    await page.setContent('<main><h1>Old heading</h1></main>');
    const taskList = new TaskListPage(page) as unknown as {
      waitForVisibleSignal: (signals: [], context: string, timeoutMs: number) => Promise<string>;
    };
    await page.evaluate(() => {
      document.querySelector('h1')!.outerHTML = '<h2>Replacement heading</h2>';
    });
    await expect(taskList.waitForVisibleSignal([], 'synthetic shell', 30)).rejects.toThrow('heading=Replacement heading');
  });
});

test(
  'native actionability waits for an intercepting overlay and dispatches Go once',
  { tag: ['@e2e', '@e2e-reliability'] },
  async ({ page }) => {
    await page.setContent(caseActionDocument);
    const details = new CaseDetailsPage(page);
    const selection = details.selectCaseAction('Upload Document', {
      expectedLocator: page.getByTestId('ready'),
      timeoutMs: 5_000,
    });
    await expect(details.caseActionsDropdown).toHaveValue('uploadDocument');
    await expect(page.getByTestId('click-count')).toHaveText('0');
    await page.locator('#overlay').evaluate((overlay) => overlay.remove());
    await selection;
    await expect(page.getByTestId('click-count')).toHaveText('1');
    await expect(page.getByTestId('ready')).toBeVisible();
  }
);

test('selects an action whose option has no explicit value', { tag: ['@e2e', '@e2e-reliability'] }, async ({ page }) => {
  await page.setContent(
    caseActionDocument.replace(' value="uploadDocument"', '').replace('<div id="overlay"', '<div hidden id="overlay"')
  );
  const details = new CaseDetailsPage(page);
  await details.selectCaseAction('Upload Document', { expectedLocator: page.getByTestId('ready'), timeoutMs: 2_000 });
  await expect(details.caseActionsDropdown).toHaveValue('Upload Document');
  await expect(page.getByTestId('click-count')).toHaveText('1');
});

test('preserves whitespace in an action option value', { tag: ['@e2e', '@e2e-reliability'] }, async ({ page }) => {
  await page.setContent(
    caseActionDocument
      .replace('value="uploadDocument"', 'value=" uploadDocument "')
      .replace('<div id="overlay"', '<div hidden id="overlay"')
  );
  const details = new CaseDetailsPage(page);
  await details.selectCaseAction('Upload Document', { expectedLocator: page.getByTestId('ready'), timeoutMs: 2_000 });
  await expect(details.caseActionsDropdown).toHaveValue(' uploadDocument ');
});

test(
  'waits for a late spinner and destination within the original deadline',
  { tag: ['@e2e', '@e2e-reliability'] },
  async ({ page }) => {
    await page.setContent(caseActionDocument.replace('<div id="overlay"', '<div hidden id="overlay"'));
    await page.locator('.event-trigger button').evaluate((button) => {
      (button as HTMLButtonElement).onclick = () => {
        document.querySelector('[data-testid=click-count]')!.textContent = '1';
        setTimeout(() => {
          const spinner = document.createElement('xuilib-loading-spinner');
          spinner.textContent = 'Loading';
          document.body.append(spinner);
          setTimeout(() => {
            spinner.remove();
            (document.querySelector('[data-testid=ready]') as HTMLElement).hidden = false;
          }, 100);
        }, 50);
      };
    });
    const details = new CaseDetailsPage(page);
    await details.selectCaseAction('Upload Document', { expectedLocator: page.getByTestId('ready'), timeoutMs: 2_000 });
    await expect(page.getByTestId('click-count')).toHaveText('1');
    await expect(page.getByTestId('ready')).toBeVisible();
  }
);

test(
  'task shell accepts hidden spinner markup and exposes persistent visible spinners',
  { tag: ['@e2e', '@e2e-reliability'] },
  async ({ page }) => {
    await page.route('http://framework.test/**', (route) =>
      route.fulfill({
        contentType: 'text/html',
        body: '<main><h1>My work</h1><xuilib-loading-spinner hidden>Loading</xuilib-loading-spinner></main>',
      })
    );
    await page.goto('http://framework.test/work/my-work/list');
    const taskList = new TaskListPage(page);
    await taskList.waitForTaskListShellReady('synthetic task shell', 1_000);
    await expect(taskList.myWorkHeading).toBeVisible();
    await page.locator('xuilib-loading-spinner').evaluate((spinner) => {
      (spinner as HTMLElement).hidden = false;
    });
    await expect(taskList.waitForTaskListShellReady('synthetic task shell', 100)).rejects.toThrow();
  }
);
