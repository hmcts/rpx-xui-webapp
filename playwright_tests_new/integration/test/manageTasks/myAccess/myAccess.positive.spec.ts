import { expect, test } from '../../../../E2E/fixtures';
import { applyPrewarmedSessionCookies, setupTaskListBootstrapRoutes, taskListRoutePattern } from '../../../helpers';
import { buildMyAccessCases, buildMyAccessMock } from '../../../mocks/myAccess.mock';
import { formatUiDate } from '../../../utils/tableUtils';

const userIdentifier = 'STAFF_ADMIN';
const myAccessRoutePattern = /\/workallocation\/my-work\/myaccess(?:\?.*)?$/;

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(`My Access as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User can view cases on the My access page from My work`, async ({ taskListPage, page, tableUtils }) => {
    const myAccessMockResponse = buildMyAccessMock();
    const isNewCount = (myAccessMockResponse.cases ?? []).filter((c) => c.isNew === true).length;

    await test.step('Setup route mocks for My access', async () => {
      await setupTaskListBootstrapRoutes(page);
      await page.route('**/api/role-access/roles/get-my-access-new-count*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ count: isNewCount }),
        });
      });
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ tasks: [], total_records: 0 }),
        });
      });
      await page.route(myAccessRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(myAccessMockResponse),
        });
      });
    });

    await test.step('Open My work and navigate to My access', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'My access' }).first().click();
      await page.waitForURL(/\/work\/my-work\/my-access$/);
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify the access table columns and data', async () => {
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(Object.keys(table[0] ?? {})).toEqual(
        expect.arrayContaining(['Case name', 'Service', 'Case category', 'Date submitted', 'Access', 'Start', 'End'])
      );

      await expect(
        taskListPage.taskTableTabs.filter({ hasText: 'My access' }).first().locator('.xui-alert-link__number')
      ).toHaveText(`${isNewCount}`);

      for (let i = 0; i < table.length; i++) {
        const expectedCase = myAccessMockResponse.cases[i];
        expect(table[i]['Case name']).toBe(expectedCase.case_name);
        expect(table[i]['Service']).toBe(expectedCase.expectedServiceLabel);
        expect(table[i]['Case category']).toBe(expectedCase.case_category);
        expect(table[i]['Date submitted']).toBe(formatUiDate(expectedCase.dateSubmitted));
        expect(table[i]['Access']).toBe(expectedCase.access);
        expect(table[i]['Start']).toBe(expectedCase.startDate);
        expect(table[i]['End']).toBe(expectedCase.endDate);
      }
    });

    await test.step('Verify rows with access render case name links to case details', async () => {
      for (const c of myAccessMockResponse.cases.filter((item) => item.hasAccess)) {
        const caseLink = taskListPage.taskListTable.getByRole('link', { name: c.case_name }).first();
        await expect(taskListPage.taskListTable.getByRole('link', { name: c.case_name })).toBeVisible();
        await expect(caseLink).toBeVisible();
        await expect(caseLink).toHaveAttribute('href', `/cases/case-details/${c.jurisdictionId}/${c.case_type}/${c.case_id}`);
      }
    });

    await test.step('Verify denied access rows render the trailing View link instead of a case link', async () => {
      const deniedCase = myAccessMockResponse.cases.find((c) => c.role === 'specific-access-denied');
      const deniedRow = taskListPage.taskListTable
        .locator('tr')
        .filter({ hasText: deniedCase?.case_name ?? '' })
        .first();
      const deniedCaseLink = deniedRow.getByRole('link', { name: deniedCase?.case_name ?? '' });
      const viewLink = deniedRow.locator('a.xui-access-view-field');

      await expect(deniedCaseLink).toHaveCount(0);
      await expect(viewLink).toBeVisible();
      await expect(viewLink).toHaveText('View');
    });
  });

  test(`Large datasets render correctly`, async ({ taskListPage, tableUtils, page }) => {
    const myAccessMockResponse = buildMyAccessCases(999);
    const isNewCount = (myAccessMockResponse.cases ?? []).filter((c) => c.isNew === true).length;

    await test.step('Setup route mocks for a large datasets', async () => {
      await setupTaskListBootstrapRoutes(page);
      await page.route('**/api/role-access/roles/get-my-access-new-count*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ count: isNewCount }),
        });
      });
      await page.route(taskListRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ tasks: [], total_records: 0 }),
        });
      });
      await page.route(myAccessRoutePattern, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(myAccessMockResponse),
        });
      });
    });

    await test.step('Open My access with the large dataset', async () => {
      await taskListPage.goto();
      await taskListPage.taskTableTabs.filter({ hasText: 'My access' }).first().click();
      await page.waitForURL(/\/work\/my-work\/my-access$/);
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Check large dataset rendering', async () => {
      await expect(
        taskListPage.taskTableTabs.filter({ hasText: 'My access' }).first().locator('.xui-alert-link__number')
      ).toHaveText(`${isNewCount}`);
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      for (let i = 0; i < table.length; i++) {
        const expectedCase = myAccessMockResponse.cases[i];
        expect(table[i]['Case name']).toBe(expectedCase.case_name);
        expect(table[i]['Service']).toBe(expectedCase.expectedServiceLabel);
        expect(table[i]['Case category']).toBe(expectedCase.case_category);
        expect(table[i]['Date submitted']).toBe(formatUiDate(expectedCase.dateSubmitted));
        expect(table[i]['Access']).toBe(expectedCase.access);
        expect(table[i]['Start']).toBe(expectedCase.startDate);
        expect(table[i]['End']).toBe(expectedCase.endDate);
      }
    });
  });
});
