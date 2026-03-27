import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  buildCaseListSubmittedStateJurisdictionsMock,
  buildCaseListSubmittedStateWorkbasketInputsMock,
  buildCaseListJurisdictionsMock,
  buildCaseListMock,
  buildCaseListMockWithOptionalFields,
  CASE_LIST_SUBMITTED_STATE_CASE_TYPE_LABEL,
  CASE_LIST_SUBMITTED_STATE_JURISDICTION_LABEL,
  CASE_LIST_SUBMITTED_STATE_OPTIONS,
} from '../../mocks/caseList.mock';

const userIdentifier = 'SOLICITOR';
const caseListMockResponse = buildCaseListMock(124);
const PAGE_SIZE = 25;

const caseListJurisdictionsMock = buildCaseListJurisdictionsMock();

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

      await test.step('Verify user can see the expected paginated case list', async () => {
        expect(await caseListPage.caseListResultsAmount.textContent()).toBe(
          caseListPage.getExpectedResultsSummary(caseListMockResponseMoreThan100.total, 1, PAGE_SIZE)
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

        const pageTwoSearchRequest = await caseListPage.clickPaginationPageAndWaitForSearchRequest(2);
        expect(pageTwoSearchRequest).toEqual({
          ctid: 'xuiTestJurisdiction',
          useCase: 'WORKBASKET',
          view: 'WORKBASKET',
          page: '2',
        });

        await expect(caseListPage.paginationCurrentPage).toContainText('2');
        await expect(caseListPage.paginationPrevious).toBeVisible();
        await expect(caseListPage.paginationNext).toBeVisible();

        const pageFourSearchRequest = await caseListPage.clickPaginationPageAndWaitForSearchRequest(4);
        expect(pageFourSearchRequest).toEqual({
          ctid: 'xuiTestJurisdiction',
          useCase: 'WORKBASKET',
          view: 'WORKBASKET',
          page: '4',
        });
        await expect(caseListPage.paginationCurrentPage).toContainText('4');
        await expect(caseListPage.caseListResultsAmount).toHaveText(
          caseListPage.getExpectedResultsSummary(caseListMockResponseMoreThan100.total, 4, PAGE_SIZE)
        );
      });
    });
  });

  test.describe(`Search for more than 10000 Cases ${userIdentifier}`, { tag: ['@integration', '@integration-case-list'] }, () => {
    const caseListMockResponseMoreThan10000 = buildCaseListMock(10000);

    test(`User ${userIdentifier} can view more than 10000 cases on the case list page`, async ({
      caseListPage,
      tableUtils,
      page,
    }) => {
      await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
        await page.route('**/data/internal/searchCases*', async (route) => {
          const body = JSON.stringify(caseListMockResponseMoreThan10000);
          await route.fulfill({ status: 200, contentType: 'application/json', body });
        });
      });

      await test.step('Navigate to the search page', async () => {
        await caseListPage.navigateTo();
      });

      await test.step('Verify user can see the capped case list pagination state', async () => {
        const totalPages = Math.ceil(caseListMockResponseMoreThan10000.total / PAGE_SIZE);

        await expect(caseListPage.caseListResultsLimitWarning).toContainText(
          'The total size of the result set is 10,000. Only the first 10,000 records are available for display.'
        );
        expect(await caseListPage.caseListResultsAmount.textContent()).toBe(
          caseListPage.getExpectedResultsSummary(caseListMockResponseMoreThan10000.total, 1, PAGE_SIZE)
        );
        const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
        expect(table.length).toBe(caseListMockResponseMoreThan10000.results.length);
        for (let i = 0; i < caseListMockResponseMoreThan10000.results.length; i++) {
          const expectedFields = caseListMockResponseMoreThan10000.results[i].case_fields;
          expect(table[i]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
          expect(table[i]['Text Field 0']).toBe(expectedFields['TextField0']);
          expect(table[i]['Text Field 1']).toBe(expectedFields['TextField1']);
          expect(table[i]['Text Field 2']).toBe(expectedFields['TextField2']);
        }
        expect(await caseListPage.pagination.isVisible()).toBeTruthy();
        await expect(caseListPage.paginationCurrentPage).toContainText('1');
        await expect(caseListPage.paginationPrevious).not.toBeVisible();
        const visiblePageNumbers = await caseListPage.getVisiblePaginationPageNumbers();
        const visibleIntermediatePageNumbers = visiblePageNumbers.slice(1, -1);

        expect(visiblePageNumbers[0]).toBe(1);
        expect(visiblePageNumbers.at(-1)).toBe(totalPages);
        expect(visibleIntermediatePageNumbers).toEqual(
          Array.from({ length: visibleIntermediatePageNumbers.length }, (_, index) => index + 2)
        );
        expect(await caseListPage.getPaginationFinalItem()).toBe('Next');

        const pageFourHundredSearchRequest = await caseListPage.clickPaginationPageAndWaitForSearchRequest(400);
        expect(pageFourHundredSearchRequest).toEqual({
          ctid: 'xuiTestJurisdiction',
          useCase: 'WORKBASKET',
          view: 'WORKBASKET',
          page: '400',
        });

        await expect(caseListPage.paginationCurrentPage).toContainText('400');
        await expect(caseListPage.paginationPrevious).toBeVisible();
        await expect(caseListPage.paginationNext).not.toBeVisible();
        await expect(caseListPage.caseListResultsAmount).toHaveText(
          caseListPage.getExpectedResultsSummary(caseListMockResponseMoreThan10000.total, 400, PAGE_SIZE)
        );
      });
    });
  });

  test.describe(
    `Valid response with optional case data missing ${userIdentifier}`,
    { tag: ['@integration', '@integration-case-list'] },
    () => {
      const caseListMockResponseMissingData = buildCaseListMockWithOptionalFields(100);

      test(`User ${userIdentifier} can view case with optional data missing where fields are optional`, async ({
        caseListPage,
        tableUtils,
        page,
      }) => {
        await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
          await page.route('**/data/internal/searchCases*', async (route) => {
            const body = JSON.stringify(caseListMockResponseMissingData);
            await route.fulfill({ status: 200, contentType: 'application/json', body });
          });
        });

        await test.step('Navigate to the search page', async () => {
          await caseListPage.navigateTo();
        });

        await test.step('Verify user can see the expected paginated case list with optional data missing', async () => {
          expect(await caseListPage.caseListResultsAmount.textContent()).toBe(
            caseListPage.getExpectedResultsSummary(caseListMockResponseMissingData.total, 1, PAGE_SIZE)
          );
          const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
          expect(table.length).toBe(caseListMockResponseMissingData.results.length);
          for (let i = 0; i < caseListMockResponseMissingData.results.length; i++) {
            const expectedFields = caseListMockResponseMissingData.results[i].case_fields;
            expect(table[i]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
            expect(table[i]['Text Field 0']).toBe(expectedFields['TextField0']);
            expect(table[i]['Text Field 1']).toBe(expectedFields['TextField1']);
            expect(table[i]['Text Field 2']).toBe(expectedFields['TextField2']);
          }
          expect(await caseListPage.pagination.isVisible()).toBeTruthy();
          await expect(caseListPage.paginationCurrentPage).toContainText('1');
          await expect(caseListPage.paginationPrevious).not.toBeVisible();
          expect(await caseListPage.getPaginationFinalItem()).toBe('Next');

          const pageTwoSearchRequest = await caseListPage.clickPaginationPageAndWaitForSearchRequest(2);
          expect(pageTwoSearchRequest).toEqual({
            ctid: 'xuiTestJurisdiction',
            useCase: 'WORKBASKET',
            view: 'WORKBASKET',
            page: '2',
          });

          await expect(caseListPage.paginationCurrentPage).toContainText('2');
          await expect(caseListPage.paginationPrevious).toBeVisible();
          await expect(caseListPage.paginationNext).toBeVisible();

          const pageFourSearchRequest = await caseListPage.clickPaginationPageAndWaitForSearchRequest(4);
          expect(pageFourSearchRequest).toEqual({
            ctid: 'xuiTestJurisdiction',
            useCase: 'WORKBASKET',
            view: 'WORKBASKET',
            page: '4',
          });
          await expect(caseListPage.paginationCurrentPage).toContainText('4');
          await expect(caseListPage.caseListResultsAmount).toHaveText(
            caseListPage.getExpectedResultsSummary(caseListMockResponseMissingData.total, 4, PAGE_SIZE)
          );
        });
      });
    }
  );

  test.describe(
    `Valid URL response with multiple state filters ${userIdentifier}`,
    { tag: ['@integration', '@integration-case-list'] },
    () => {
      const caseListMockResponseSubmittedState = buildCaseListMock(100);
      const submittedStateJurisdictionsMock = buildCaseListSubmittedStateJurisdictionsMock();
      const submittedStateWorkbasketInputsMock = buildCaseListSubmittedStateWorkbasketInputsMock();
      const statesToVerify = ['Any', ...CASE_LIST_SUBMITTED_STATE_OPTIONS];

      test(`User ${userIdentifier} can filter by multiple states and see the expected case list`, async ({
        caseListPage,
        tableUtils,
        page,
      }) => {
        await test.step('Intercept case list bootstrap and search endpoints for multi-state filtering', async () => {
          await page.unroute('**/aggregated/caseworkers/**/jurisdictions*');
          await page.unroute('**/caseworkers/**/jurisdictions*');
          await page.unroute('**/data/internal/case-types/**/work-basket-inputs*');
          await page.unroute('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*');
          await page.unroute('**/data/internal/case-types/**/search-inputs*');

          await page.route('**/aggregated/caseworkers/**/jurisdictions*', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(submittedStateJurisdictionsMock),
            });
          });

          await page.route('**/caseworkers/**/jurisdictions*', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(submittedStateJurisdictionsMock),
            });
          });

          await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(submittedStateWorkbasketInputsMock),
            });
          });

          await page.route('**/data/internal/case-types/**/work-basket-inputs*', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(submittedStateWorkbasketInputsMock),
            });
          });

          await page.route('**/data/internal/case-types/**/search-inputs*', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({ searchInputs: submittedStateWorkbasketInputsMock.searchInputs }),
            });
          });

          await page.route('**/data/internal/searchCases*', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(caseListMockResponseSubmittedState),
            });
          });
        });

        await test.step('case-list filter state before opening the page', async () => {
          await page.addInitScript(() => {
            window.localStorage.removeItem('savedQueryParams');
            window.localStorage.removeItem('workbasket-filter-form-group-value');
          });
        });

        await test.step('Navigate to the case list and prepare the state filter', async () => {
          await caseListPage.navigateTo();
          await caseListPage.searchByJurisdiction(CASE_LIST_SUBMITTED_STATE_JURISDICTION_LABEL);
          await caseListPage.searchByCaseType(CASE_LIST_SUBMITTED_STATE_CASE_TYPE_LABEL);
          await expect(caseListPage.stateSelect).toBeVisible();
        });

        for (const state of statesToVerify) {
          await test.step(`Apply the ${state} filter and verify the request and case list`, async () => {
            await caseListPage.searchByState(state);

            const stateSearchRequest = page.waitForRequest((request) => {
              if (!request.url().includes('/data/internal/searchCases')) {
                return false;
              }

              const requestUrl = new URL(request.url());
              if (state === 'Any') {
                return !requestUrl.searchParams.has('state') || requestUrl.searchParams.get('state') === '';
              }

              return requestUrl.searchParams.get('state') === state;
            });

            await caseListPage.applyFilters();
            const stateSearchRequestUrl = new URL((await stateSearchRequest).url());

            expect.soft(stateSearchRequestUrl.pathname).toContain('/data/internal/searchCases');
            expect.soft(stateSearchRequestUrl.searchParams.get('ctid')).toBe('CARE_SUPERVISION_EPO');
            expect.soft(stateSearchRequestUrl.searchParams.get('use_case')).toBe('WORKBASKET');
            expect.soft(stateSearchRequestUrl.searchParams.get('view')).toBe('WORKBASKET');
            if (state === 'Any') {
              expect.soft(stateSearchRequestUrl.searchParams.get('state')).toBeFalsy();
            } else {
              expect.soft(stateSearchRequestUrl.searchParams.get('state')).toBe(state);
            }
            expect.soft(stateSearchRequestUrl.searchParams.get('page')).toBe('1');

            await expect(caseListPage.caseListResultsAmount).toHaveText(
              caseListPage.getExpectedResultsSummary(caseListMockResponseSubmittedState.total, 1, PAGE_SIZE)
            );
            const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
            expect(table.length).toBe(caseListMockResponseSubmittedState.results.length);
            for (let i = 0; i < caseListMockResponseSubmittedState.results.length; i++) {
              const expectedFields = caseListMockResponseSubmittedState.results[i].case_fields;
              expect(table[i]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
              expect(table[i]['Text Field 0']).toBe(expectedFields['TextField0']);
              expect(table[i]['Text Field 1']).toBe(expectedFields['TextField1']);
              expect(table[i]['Text Field 2']).toBe(expectedFields['TextField2']);
            }
            expect(await caseListPage.pagination.isVisible()).toBeTruthy();
            await expect(caseListPage.paginationCurrentPage).toContainText('1');
            await expect(caseListPage.paginationPrevious).not.toBeVisible();
            expect(await caseListPage.getPaginationFinalItem()).toBe('Next');
          });
        }

        await test.step('Verify the unselectable cases guidance message can be expanded', async () => {
          await expect(caseListPage.unselectableCasesInfoMessage).toBeVisible();
          await expect(caseListPage.unselectableCasesInfoSummaryButton).toBeVisible();
          await expect(caseListPage.unselectableCasesInfoSummary).toContainText('Why are some cases unselectable?');
          await caseListPage.unselectableCasesInfoSummaryButton.click();
          await expect(caseListPage.unselectableCasesInfoDetails).toHaveAttribute('open', '');
          await expect(caseListPage.unselectableCasesInfoContent).toBeVisible();
          await expect(caseListPage.unselectableCasesInfoContent).toHaveText(
            "You might not be able to select and share some cases in your current case list. However, you'll be able to select any new cases you create and share them."
          );
        });
      });
    }
  );
});
