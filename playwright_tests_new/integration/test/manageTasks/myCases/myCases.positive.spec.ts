import { expect, test } from '../../../../E2E/fixtures';
import { applyPrewarmedSessionCookies, setupTaskListBootstrapRoutes, taskListRoutePattern } from '../../../helpers';
import { formatUiDate } from '../../../utils/tableUtils';

const userIdentifier = 'STAFF_ADMIN';
const myCasesRoutePattern = /\/workallocation\/my-work\/cases(?:\?.*)?$/;

const toMiddayUtcIso = (date: string): string => {
  const stableDate = new Date(date);
  stableDate.setUTCHours(12, 0, 0, 0);
  return stableDate.toISOString();
};

const buildMyCasesMock = () => {
  const cases = [
    {
      id: 'allocation-1',
      case_id: '1234567812345670',
      case_name: 'Jo Fly 1',
      case_category: 'Protection',
      case_type: 'Asylum',
      jurisdiction: 'IA',
      jurisdictionId: 'IA',
      startDate: toMiddayUtcIso('2026-01-10T00:00:00.000Z'),
      endDate: toMiddayUtcIso('2026-02-16T00:00:00.000Z'),
      case_role: 'lead-judge',
      role: 'Lead judge',
      role_category: 'JUDICIAL',
      hasAccess: true,
      actions: [],
    },
    {
      id: 'allocation-2',
      case_id: '1234567812345671',
      case_name: 'Jo Fly 2',
      case_category: 'Human rights',
      case_type: 'Asylum',
      jurisdiction: 'SSCS',
      jurisdictionId: 'SSCS',
      startDate: toMiddayUtcIso('2026-01-12T00:00:00.000Z'),
      endDate: toMiddayUtcIso('2026-02-18T00:00:00.000Z'),
      case_role: 'case-manager',
      role: 'Case manager',
      role_category: 'LEGAL_OPERATIONS',
      hasAccess: true,
      actions: [],
    },
  ];

  return {
    cases,
    total_records: cases.length,
  };
};

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(`My Cases as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User ${userIdentifier} can view cases on the My cases page from My work`, async ({ taskListPage, page, tableUtils }) => {
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
      expect(await taskListPage.getResultsText()).toBe(`Showing 1 to 2 of ${myCasesMockResponse.cases.length} results`);

      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(Object.keys(table[0] ?? {})).toEqual(
        expect.arrayContaining(['Case name', 'Service', 'Case category', 'Case role', 'Start', 'End'])
      );

      for (let i = 0; i < table.length; i++) {
        const expectedCase = myCasesMockResponse.cases[i];
        expect(table[i]['Case name']).toBe(expectedCase.case_name);
        expect(table[i]['Service']).toBe(expectedCase.jurisdiction);
        expect(table[i]['Case category']).toBe(expectedCase.case_category);
        expect(table[i]['Case role']).toBe(expectedCase.role);
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
