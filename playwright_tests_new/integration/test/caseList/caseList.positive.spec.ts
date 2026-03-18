import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildCaseListMock, buildCaseListJurisdictionsMock } from '../../mocks/caseList.mock';

const userIdentifier = 'SOLICITOR';
const caseListMockResponse = buildCaseListMock(124);
const PAGE_SIZE = 25;

const caseListJurisdictionsMock = buildCaseListJurisdictionsMock();

function getExpectedResultsSummary(totalResults: number, pageNumber: number, pageSize: number = PAGE_SIZE): string {
  const startResult = (pageNumber - 1) * pageSize + 1;
  const endResult = Math.min(totalResults, pageNumber * pageSize);
  return `Showing ${startResult} to ${endResult} of ${totalResults} results`;
}

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);

  await page.route('**/caseworkers/**/jurisdictions*', async (route) => {
    const body = JSON.stringify(caseListJurisdictionsMock);
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });

  await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route) => {
    const body = JSON.stringify({ workbasketInputs: [] });
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });
});

test.describe(`Case List as ${userIdentifier}`, { tag: ['@integration', '@integration-case-list'] }, () => {
  test(`User ${userIdentifier} can view cases on the case list page`, async ({ caseListPage, tableUtils, page }) => {
    await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
      await page.route('**/data/internal/searchCases*', async (route) => {
        const body = JSON.stringify(caseListMockResponse);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to the search page', async () => {
      await caseListPage.navigateTo();
    });

    await test.step('Verify user can see a list shows the expected layout given the mock response', async () => {
      expect(await caseListPage.caseListResultsAmount.textContent()).toBe(
        `Showing 1 to ${Math.min(caseListMockResponse.results.length, 25)} of ${caseListMockResponse.total} results`
      );
      const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
      expect(table.length).toBe(caseListMockResponse.results.length);
      for (let i = 0; i < caseListMockResponse.results.length; i++) {
        const expectedFields = caseListMockResponse.results[i].case_fields;
        expect(table[i]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
        expect(table[i]['Text Field 0']).toBe(expectedFields['TextField0']);
        expect(table[i]['Text Field 1']).toBe(expectedFields['TextField1']);
        expect(table[i]['Text Field 2']).toBe(expectedFields['TextField2']);
      }
      expect(await caseListPage.pagination.isVisible()).toBeTruthy();
      expect(await caseListPage.getPaginationFinalItem()).toBe('Next');
    });
  });

  test(`User ${userIdentifier} sees empty case list message when searchCases returns empty response`, async ({
    caseListPage,
    tableUtils,
    page,
  }) => {
    await test.step('Intercept searchCases endpoint and fulfill with empty mock body', async () => {
      await page.route('**/data/internal/searchCases*', async (route) => {
        const body = JSON.stringify({
          columns: [],
          results: [],
          total: 0,
        });
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
    });

    await test.step('Navigate to the search page', async () => {
      await caseListPage.navigateTo();
      await expect(caseListPage.exuiHeader.header).toBeVisible();
    });

    await test.step('Verify user sees empty case list UI', async () => {
      await expect(caseListPage.jurisdictionSelect).toBeVisible();
      expect(await caseListPage.caseSearchResultsMessage.textContent()).toContain('No cases found. Try using different filters.');
    });
  });

  test.describe(`Search for less than 20 Cases ${userIdentifier}`, { tag: ['@integration', '@integration-case-list'] }, () => {
    const caseListMockResponseLessThan25 = buildCaseListMock(20);

    test(`User ${userIdentifier} can view less than 25 cases on the case list page`, async ({
      caseListPage,
      tableUtils,
      page,
    }) => {
      const mock = caseListMockResponseLessThan25;

      await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
        await page.route('**/data/internal/searchCases*', async (route) => {
          await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mock) });
        });
      });

      await test.step('Navigate to the search page', async () => {
        await caseListPage.navigateTo();
      });

      await test.step('Verify user can see a list of cases less than page size given the mock response', async () => {
        const expectedCount = Math.min(mock.results.length, PAGE_SIZE);
        await expect(caseListPage.caseListResultsAmount).toHaveText(`Showing 1 to ${expectedCount} of ${mock.total} results`);

        const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
        expect(table).toHaveLength(mock.results.length);

        for (let i = 0; i < mock.results.length; i++) {
          const expectedFields = mock.results[i].case_fields;
          expect(table[i]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
          expect(table[i]['Text Field 0']).toBe(expectedFields['TextField0']);
          expect(table[i]['Text Field 1']).toBe(expectedFields['TextField1']);
          expect(table[i]['Text Field 2']).toBe(expectedFields['TextField2']);
        }

        await expect(caseListPage.pagination).toBeHidden();
      });
    });

    test.describe(`Search for more than 100 Cases ${userIdentifier}`, { tag: ['@integration', '@integration-case-list'] }, () => {
      const caseListMockResponseMoreThan100 = buildCaseListMock(100);

      test(`User ${userIdentifier} can view more than 100 cases on the case list page`, async ({
        caseListPage,
        tableUtils,
        page,
      }) => {
        await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
          await page.route('**/data/internal/searchCases*', async (route) => {
            const body = JSON.stringify(caseListMockResponseMoreThan100);
            await route.fulfill({ status: 200, contentType: 'application/json', body });
          });
        });

        await test.step('Navigate to the search page', async () => {
          await caseListPage.navigateTo();
        });

        await test.step('Verify user can see a list of cases more than 100 based given the mock response', async () => {
          expect(await caseListPage.caseListResultsAmount.textContent()).toBe(
            getExpectedResultsSummary(caseListMockResponseMoreThan100.total, 1)
          );
          const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
          expect(table.length).toBe(caseListMockResponseMoreThan100.results.length);
          for (let i = 0; i < caseListMockResponseMoreThan100.results.length; i++) {
            const expectedFields = caseListMockResponseMoreThan100.results[i].case_fields;
            expect(table[i]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
            expect(table[i]['Text Field 0']).toBe(expectedFields['TextField0']);
            expect(table[i]['Text Field 1']).toBe(expectedFields['TextField1']);
            expect(table[i]['Text Field 2']).toBe(expectedFields['TextField2']);
          }
          expect(await caseListPage.pagination.isVisible()).toBeTruthy();
          await expect(caseListPage.paginationCurrentPage).toContainText('1');
          await expect(caseListPage.paginationPrevious).not.toBeVisible();
          expect(await caseListPage.getPaginationFinalItem()).toBe('Next');

          await caseListPage.clickPaginationPageAndExpectSearchRequest(2, {
            ctid: 'xuiTestJurisdiction',
            useCase: 'WORKBASKET',
            view: 'WORKBASKET',
            page: '2',
          });

          await expect(caseListPage.paginationCurrentPage).toContainText('2');
          await expect(caseListPage.paginationPrevious).toBeVisible();
          await expect(caseListPage.paginationNext).toBeVisible();

          await caseListPage.clickPaginationPage(4);
          await expect(caseListPage.paginationCurrentPage).toContainText('4');
          await expect(caseListPage.caseListResultsAmount).toHaveText(
            getExpectedResultsSummary(caseListMockResponseMoreThan100.total, 4)
          );
        });
      });
    });
  });
});
