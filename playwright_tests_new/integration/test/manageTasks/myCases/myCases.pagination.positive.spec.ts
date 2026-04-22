import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies, setupMyCasesRoutes } from '../../../helpers';
import { buildMyCaseMock, buildMyCases } from '../../../mocks/myCases.mock';

const userIdentifier = 'STAFF_ADMIN';

const getSummaryText = async (summaryLocator: { textContent: () => Promise<string | null> }): Promise<string> => {
  return ((await summaryLocator.textContent()) ?? '').replace(/\s+/g, ' ').trim();
};

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`My Cases pagination as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test('keeps large My cases result sets unpaginated and renders non-sortable columns as plain headers', async ({
    taskListPage,
    page,
  }) => {
    const myCasesResponse = buildMyCases(
      140,
      (index) => {
        const caseNumber = index + 1;
        const jurisdictionId = index % 2 === 0 ? 'IA' : 'SSCS';
        return buildMyCaseMock({
          id: `allocation-${caseNumber}`,
          case_id: `160000000000${String(caseNumber).padStart(4, '0')}`,
          case_name: `Managed case ${caseNumber}`,
          case_category: caseNumber % 2 === 0 ? 'Protection' : 'Human rights',
          case_type: 'Asylum',
          jurisdiction: jurisdictionId,
          jurisdictionId,
          expectedServiceLabel: jurisdictionId === 'IA' ? 'Immigration & Asylum' : 'Social security and child support',
        });
      },
      100
    );

    await test.step('Setup route mocks for a multi-page My cases response', async () => {
      await setupMyCasesRoutes(page, myCasesResponse);
    });

    await test.step('Open My cases and verify the large-result summary stays unpaginated', async () => {
      await taskListPage.gotoMyCases();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await expect(taskListPage.paginationControls).toHaveCount(0);
      await expect(taskListPage.uniqueCasesSummary).toContainText('100 cases');
      await expect(taskListPage.taskRows).toHaveCount(140);
      expect(await getSummaryText(taskListPage.myCasesResultsAmount)).toBe('Showing 140 results');
    });

    await test.step('Verify case name and case category remain non-sortable', async () => {
      await expect(taskListPage.sortByCaseNameTableHeader).toHaveCount(0);
      await expect(taskListPage.sortByCaseCategoryTableHeader).toHaveCount(0);
    });

    await test.step('Verify the final row is still rendered in the same unpaginated table', async () => {
      await expect(taskListPage.taskListTable.getByRole('link', { name: 'Managed case 140' })).toBeVisible();
    });
  });

  test('hides pagination controls when all results fit on one page', async ({ taskListPage, page }) => {
    const myCasesResponse = buildMyCases(20, (index) =>
      buildMyCaseMock({
        id: `single-page-allocation-${index + 1}`,
        case_id: `170000000000${String(index + 1).padStart(4, '0')}`,
        case_name: `Single page case ${index + 1}`,
      })
    );

    await test.step('Setup route mocks for a single-page My cases response', async () => {
      await setupMyCasesRoutes(page, myCasesResponse);
    });

    await test.step('Open My cases and verify pagination controls are hidden', async () => {
      await taskListPage.gotoMyCases();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      await expect(taskListPage.paginationControls).toHaveCount(0);
      await expect(taskListPage.uniqueCasesSummary).toContainText('20 cases');
      expect(await getSummaryText(taskListPage.myCasesResultsAmount)).toMatch(/Showing (?:1 to 20 of 20|20) results/);
    });
  });
});
