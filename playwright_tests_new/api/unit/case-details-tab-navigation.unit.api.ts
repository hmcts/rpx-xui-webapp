import { expect, test } from '@playwright/test';
import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { caseDetailsTabsMarkup } from '../../integration/mocks/case-details-tabs.mock';

test.describe('case details tab pagination', { tag: '@svc-internal' }, () => {
  test.use({ actionTimeout: 1500 });

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
