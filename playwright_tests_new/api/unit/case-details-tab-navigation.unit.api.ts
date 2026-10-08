import { expect, Locator, test } from '@playwright/test';
import { CaseDetailsPage, scrollTabIntoViewWithDetachedRetry } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { caseDetailsTabsMarkup } from '../../integration/mocks/case-details-tabs.mock';

test.describe('case details tab pagination', { tag: '@svc-internal' }, () => {
  test.use({ actionTimeout: 1500 });

  test('retries an exact detached-tab scroll with the remaining deadline', async () => {
    const timeouts: number[] = [];
    const times = [0, 40];
    const tab: Pick<Locator, 'scrollIntoViewIfNeeded'> = {
      async scrollIntoViewIfNeeded(options) {
        timeouts.push(options?.timeout ?? 0);
        if (timeouts.length === 1) {
          throw new Error('locator.scrollIntoViewIfNeeded: Element is not attached to the DOM\nCall log');
        }
      },
    };

    await scrollTabIntoViewWithDetachedRetry(tab, 100, () => times.shift() ?? 40);

    expect(timeouts).toEqual([100, 60]);
  });

  for (const scenario of [
    {
      name: 'propagates a second detached-tab scroll error after one retry',
      firstError: new Error('locator.scrollIntoViewIfNeeded: Element is not attached to the DOM'),
      expectedCalls: 2,
    },
    { name: 'propagates an unrelated scroll error without retrying', firstError: new Error('Timeout'), expectedCalls: 1 },
  ]) {
    test(scenario.name, async () => {
      const secondError = new Error('second scroll failed');
      let calls = 0;
      const tab: Pick<Locator, 'scrollIntoViewIfNeeded'> = {
        async scrollIntoViewIfNeeded() {
          calls += 1;
          if (calls === 1) {
            throw scenario.firstError;
          }
          throw secondError;
        },
      };

      await expect(scrollTabIntoViewWithDetachedRetry(tab, 100, () => 0)).rejects.toBe(
        scenario.expectedCalls === 2 ? secondError : scenario.firstError
      );
      expect(calls).toBe(scenario.expectedCalls);
    });
  }

  for (const scenario of [
    { name: 'reveals a tab clipped before the visible strip', offset: 400, tab: 'Documents', pagination: true },
    { name: 'reveals a tab clipped after the visible strip', offset: 0, tab: 'Flags', pagination: true },
    { name: 'reveals a partly clipped tab before the visible strip', offset: 250, tab: 'Documents', pagination: true },
    { name: 'reveals a partly clipped tab after the visible strip', offset: 350, tab: 'Flags', pagination: true },
    { name: 'selects an already visible tab', offset: 300, tab: 'History', pagination: true },
    { name: 'selects a tab without pagination controls', offset: 0, tab: 'Documents', pagination: false },
  ]) {
    test(scenario.name, async ({ page }) => {
      await page.setContent(caseDetailsTabsMarkup(scenario.offset, scenario.pagination));
      const details = new CaseDetailsPage(page);
      Object.assign(details, { getRecommendedTimeoutMs: () => 5000 });

      await details.selectCaseDetailsTab(scenario.tab);

      await expect(page.getByRole('tab', { name: scenario.tab, exact: true })).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByRole('tabpanel')).toBeVisible();
    });
  }

  test('selects a visible tab wider than the tab viewport without paging back and forth', async ({ page }) => {
    await page.setContent(caseDetailsTabsMarkup(0, true, false, 400));
    const details = new CaseDetailsPage(page);
    Object.assign(details, { getRecommendedTimeoutMs: () => 5000 });

    await details.selectCaseDetailsTab('Documents');

    await expect(page.getByRole('tab', { name: 'Documents', exact: true })).toHaveAttribute('aria-selected', 'true');
  });

  test('fails rather than bypassing a disabled pagination control', async ({ page }) => {
    await page.setContent(caseDetailsTabsMarkup(400, true, true));
    const details = new CaseDetailsPage(page);
    Object.assign(details, { getRecommendedTimeoutMs: () => 500 });

    await expect(details.selectCaseDetailsTab('Documents')).rejects.toThrow(/Timeout/);
    await expect(page.getByRole('tab', { name: 'Documents', exact: true })).toHaveAttribute('aria-selected', 'false');
  });
});
