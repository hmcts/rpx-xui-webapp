import { expect, test } from '../../../../E2E/fixtures';
import { applyPrewarmedSessionCookies, setupTaskListBootstrapRoutes, taskListRoutePattern } from '../../../helpers';
import { buildMyCasesMock } from '../../../mocks/myCases.mock';
import { formatUiDate } from '../../../utils/tableUtils';

const userIdentifier = 'STAFF_ADMIN';
const myCasesRoutePattern = /\/workallocation\/my-work\/cases(?:\?.*)?$/;

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(`My Cases as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User can view cases on the My cases page from My work`, async ({ taskListPage, page, tableUtils }) => {
    const myCasesMockResponse = buildMyCasesMock();

    await test.step('Setup route mocks for My cases', async () => {
      await setupTaskListBootstrapRoutes(page);
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ tasks: [], total_records: 0 }),
        });
      });
      await page.route(myCasesRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(myCasesMockResponse),
        });
      });
    });

    await test.step('Open My work and navigate to My cases', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'My cases' }).first().click();
      await page.waitForURL(/\/work\/my-work\/my-cases$/);
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify the cases table columns and data', async () => {
      expect(await taskListPage.myCasesResultsAmount.textContent()).toBe(`Showing ${myCasesMockResponse.cases.length} results`);

      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(Object.keys(table[0] ?? {})).toEqual(
        expect.arrayContaining(['Case name', 'Service', 'Case category', 'Case role', 'Hearing date', 'Start', 'End'])
      );

      for (let i = 0; i < table.length; i++) {
        const expectedCase = myCasesMockResponse.cases[i];
        expect(table[i]['Case name']).toBe(expectedCase.case_name);
        expect(table[i]['Service']).toBe(expectedCase.expectedServiceLabel);
        expect(table[i]['Case category']).toBe(expectedCase.case_category);
        expect(table[i]['Case role']).toBe(expectedCase.role);
        expect(table[i]['Hearing date']).toBe(formatUiDate(expectedCase.next_hearing_date));
        expect(table[i]['Start']).toBe(formatUiDate(expectedCase.startDate));
        expect(table[i]['End']).toBe(formatUiDate(expectedCase.endDate));
      }
    });

    await test.step('Verify the case name column renders links to case details', async () => {
      const firstCase = myCasesMockResponse.cases[0];
      const firstCaseLink = taskListPage.taskListTable.getByRole('link', { name: firstCase.case_name }).first();

      await expect(firstCaseLink).toBeVisible();
      await expect(firstCaseLink).toHaveAttribute(
        'href',
        `/cases/case-details/${firstCase.jurisdictionId}/${firstCase.case_type}/${firstCase.case_id}`
      );
    });
  });
});
