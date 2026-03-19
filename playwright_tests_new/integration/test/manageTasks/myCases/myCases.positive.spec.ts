import { expect, test } from '../../../../E2E/fixtures';
import { applyPrewarmedSessionCookies, setupMyCasesRoutes } from '../../../helpers';
import { buildMyCases, buildMyCasesMock } from '../../../mocks/myCases.mock';
import { formatUiDate } from '../../../utils/tableUtils';

const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(`My Cases as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`Cases and actions menus render correctly`, async ({ taskListPage, page, tableUtils }) => {
    const myCasesMockResponse = buildMyCasesMock();

    await test.step('Setup route mocks for My cases', async () => {
      await setupMyCasesRoutes(page, myCasesMockResponse);
    });

    await test.step('Open My work and navigate to My cases', async () => {
      await taskListPage.gotoMyCases();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify the cases table columns and data as seen as expected', async () => {
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

    await test.step('Verify manage options are displayed when Manage is clicked', async () => {
      await taskListPage.waitForManageButton('my cases manage options');
      await taskListPage.openFirstManageActions('my cases manage options');

      await expect(taskListPage.taskActionsRow).toBeVisible();
      await expect(taskListPage.reallocateAction).toBeVisible();
      await expect(taskListPage.removeAllocationAction).toBeVisible();
      await expect(taskListPage.reallocateAction).toContainText('Reallocate');
      await expect(taskListPage.removeAllocationAction).toContainText('Remove Allocation');
    });
  });

  test(`Large datasets render correctly`, async ({ taskListPage, tableUtils, page }) => {
    const myCasesMockResponse = buildMyCases(999, undefined, 50);

    await test.step('Setup route mocks for a large dataset', async () => {
      await setupMyCasesRoutes(page, myCasesMockResponse);
    });

    await test.step('Open My cases with the large dataset', async () => {
      await taskListPage.gotoMyCases();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Check large dataset rendering of results data', async () => {
      expect(await taskListPage.myCasesResultsAmount.textContent()).toBe(`Showing ${myCasesMockResponse.cases.length} results`);
      await expect(taskListPage.uniqueCasesSummary).toContainText(`${myCasesMockResponse.unique_cases} cases`);

      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);

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
  });
});
