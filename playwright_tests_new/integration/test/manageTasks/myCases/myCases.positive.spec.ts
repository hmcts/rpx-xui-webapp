import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies, setupMyCasesRoutes } from '../../../helpers';
import { buildMyCases, buildMyCasesMock, myCasesAllocatorActions } from '../../../mocks/myCases.mock';
import { formatUiDate } from '../../../utils/tableUtils';

const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
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

      await expect(taskListPage.taskListTable.getByRole('button', { name: 'Case name', exact: true })).toHaveCount(0);
      await expect(taskListPage.taskListTable.getByRole('button', { name: 'Case category', exact: true })).toHaveCount(0);
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

  test(`Allocator actions render for multiple case rows`, async ({ taskListPage, page }) => {
    const myCasesMockResponse = buildMyCases(
      2,
      (index) => ({
        case_id: `123456781234567${index}`,
        case_name: `Managed case ${index + 1}`,
        actions: [...myCasesAllocatorActions],
      }),
      2
    );
    const expectedActionIds = ['reallocate', 'remove'];

    await test.step('Setup route mocks for allocator-managed cases', async () => {
      await setupMyCasesRoutes(page, myCasesMockResponse);
    });

    await test.step('Open My cases', async () => {
      await taskListPage.gotoMyCases();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    const assertManageActionsForRow = async (rowIndex: number) => {
      await taskListPage.openManageActionsForRow(rowIndex, `my cases manage action matrix row ${rowIndex + 1}`);

      for (const actionId of expectedActionIds) {
        await taskListPage.waitForTaskActionForRow(rowIndex, actionId, `my cases manage action matrix row ${rowIndex + 1}`);
      }
    };

    await test.step('Verify rows 1 and 2 expose Reallocate and Remove Allocation', async () => {
      await assertManageActionsForRow(0);
      await assertManageActionsForRow(1);
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
      await expect(taskListPage.exuiBodyComponent.paginationControls).not.toBeVisible();

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
