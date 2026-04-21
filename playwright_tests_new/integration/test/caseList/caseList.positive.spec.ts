import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  clearPersistedCaseListState,
  defaultSearchCasesRequestParams,
  expectCaseListRows,
  expectCaseListSummary,
  expectPaginationState,
  expectSearchCasesRequest,
  navigateToPageAndAssertResults,
  setupCaseListMocks,
  waitForSearchCasesRequest,
} from '../../helpers';
import {
  buildCaseListJurisdictionsMock,
  buildCaseListMock,
  buildCaseListMockForDefaultState,
  buildCaseListMockForPage,
  buildCaseListMockWithOptionalFieldsForPage,
  buildCaseListStateFilterInputsMock,
  CASE_LIST_STATE_FILTER_OPTIONS,
} from '../../mocks/caseList.mock';

const userIdentifier = 'SOLICITOR';
const PAGE_SIZE = 25;

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Case List as ${userIdentifier}`, { tag: ['@integration', '@integration-case-list'] }, () => {
  test(`User ${userIdentifier} can view cases on the case list page`, async ({ caseListPage, tableUtils, page }) => {
    const mock = buildCaseListMock(124);
    await setupCaseListMocks(page, { searchResponse: mock });

    await caseListPage.navigateTo();

    await expectCaseListSummary(caseListPage, mock.total, 1);
    await expectCaseListRows(caseListPage, tableUtils, mock);
    await expectPaginationState(caseListPage, {
      currentPage: 1,
      previousVisible: false,
      paginationVisible: true,
      finalItem: 'Next',
    });
  });

  test(`User ${userIdentifier} sees empty case list message when searchCases returns empty response`, async ({
    caseListPage,
    page,
  }) => {
    await setupCaseListMocks(page, {
      searchResponse: {
        columns: [],
        results: [],
        total: 0,
      },
    });

    await caseListPage.navigateTo();
    await expect(caseListPage.exuiHeader.header).toBeVisible();
    await expect(caseListPage.jurisdictionSelect).toBeVisible();
    expect(await caseListPage.caseSearchResultsMessage.textContent()).toContain('No cases found. Try using different filters.');
  });

  test(`User ${userIdentifier} can view less than 25 cases on the case list page`, async ({ caseListPage, tableUtils, page }) => {
    const mock = buildCaseListMock(20);
    await setupCaseListMocks(page, { searchResponse: mock });

    await caseListPage.navigateTo();

    const expectedCount = Math.min(mock.results.length, PAGE_SIZE);
    await expect(caseListPage.caseListResultsAmount).toHaveText(`Showing 1 to ${expectedCount} of ${mock.total} results`);
    await expectCaseListRows(caseListPage, tableUtils, mock);
    await expectPaginationState(caseListPage, { currentPage: 1, previousVisible: false, paginationVisible: false });
  });

  test(`User ${userIdentifier} can view more than 100 cases on the case list page`, async ({
    caseListPage,
    tableUtils,
    page,
  }) => {
    const totalResults = 100;
    const pageOneMock = buildCaseListMockForPage(totalResults, 1, PAGE_SIZE);
    const pageTwoMock = buildCaseListMockForPage(totalResults, 2, PAGE_SIZE);
    const pageFourMock = buildCaseListMockForPage(totalResults, 4, PAGE_SIZE);

    await setupCaseListMocks(page, {
      searchResponseHandler: async (route) => {
        const requestUrl = new URL(route.request().url());
        const pageNumber = Number(requestUrl.searchParams.get('page') ?? '1');
        const responseBody = pageNumber === 4 ? pageFourMock : pageNumber === 2 ? pageTwoMock : pageOneMock;

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(responseBody),
        });
      },
    });

    await caseListPage.navigateTo();

    await expectCaseListSummary(caseListPage, totalResults, 1);
    await expectCaseListRows(caseListPage, tableUtils, pageOneMock);
    await expectPaginationState(caseListPage, {
      currentPage: 1,
      previousVisible: false,
      paginationVisible: true,
      finalItem: 'Next',
    });

    await navigateToPageAndAssertResults(page, caseListPage, tableUtils, {
      targetPage: 2,
      expectedRequest: {
        ...defaultSearchCasesRequestParams,
        page: '2',
      },
      expectedMock: pageTwoMock,
      pagination: { currentPage: 2, previousVisible: true, nextVisible: true },
    });

    await navigateToPageAndAssertResults(page, caseListPage, tableUtils, {
      targetPage: 4,
      expectedRequest: {
        ...defaultSearchCasesRequestParams,
        page: '4',
      },
      expectedMock: pageFourMock,
      pagination: { currentPage: 4, previousVisible: true, nextVisible: false },
    });
  });

  test(`User ${userIdentifier} can view more than 10000 cases on the case list page`, async ({
    caseListPage,
    tableUtils,
    page,
  }) => {
    const totalResults = 10000;
    const pageOneMock = buildCaseListMockForPage(totalResults, 1, PAGE_SIZE);
    const pageFourHundredMock = buildCaseListMockForPage(totalResults, 400, PAGE_SIZE);

    await setupCaseListMocks(page, {
      searchResponseHandler: async (route) => {
        const requestUrl = new URL(route.request().url());
        const pageNumber = Number(requestUrl.searchParams.get('page') ?? '1');
        const responseBody = pageNumber === 400 ? pageFourHundredMock : pageOneMock;

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(responseBody),
        });
      },
    });

    await caseListPage.navigateTo();

    await expect(caseListPage.caseListResultsLimitWarning).toContainText(
      'The total size of the result set is 10,000. Only the first 10,000 records are available for display.'
    );
    await expectCaseListSummary(caseListPage, totalResults, 1);
    await expectCaseListRows(caseListPage, tableUtils, pageOneMock);
    await expectPaginationState(caseListPage, {
      currentPage: 1,
      previousVisible: false,
      paginationVisible: true,
      finalItem: 'Next',
    });

    await navigateToPageAndAssertResults(page, caseListPage, tableUtils, {
      targetPage: 400,
      expectedRequest: {
        ...defaultSearchCasesRequestParams,
        page: '400',
      },
      expectedMock: pageFourHundredMock,
      pagination: { currentPage: 400, previousVisible: true, nextVisible: false },
    });
  });

  test(`User ${userIdentifier} can view case with optional data missing where fields are optional`, async ({
    caseListPage,
    tableUtils,
    page,
  }) => {
    const totalResults = 100;
    const pageOneMock = buildCaseListMockWithOptionalFieldsForPage(totalResults, 1, PAGE_SIZE);
    const pageTwoMock = buildCaseListMockWithOptionalFieldsForPage(totalResults, 2, PAGE_SIZE);
    const pageFourMock = buildCaseListMockWithOptionalFieldsForPage(totalResults, 4, PAGE_SIZE);

    await setupCaseListMocks(page, {
      searchResponseHandler: async (route) => {
        const requestUrl = new URL(route.request().url());
        const pageNumber = Number(requestUrl.searchParams.get('page') ?? '1');
        const responseBody = pageNumber === 4 ? pageFourMock : pageNumber === 2 ? pageTwoMock : pageOneMock;

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(responseBody),
        });
      },
    });

    await caseListPage.navigateTo();

    await expectCaseListSummary(caseListPage, totalResults, 1);
    await expectCaseListRows(caseListPage, tableUtils, pageOneMock);
    await expectPaginationState(caseListPage, {
      currentPage: 1,
      previousVisible: false,
      paginationVisible: true,
      finalItem: 'Next',
    });

    await navigateToPageAndAssertResults(page, caseListPage, tableUtils, {
      targetPage: 2,
      expectedRequest: {
        ...defaultSearchCasesRequestParams,
        page: '2',
      },
      expectedMock: pageTwoMock,
      pagination: { currentPage: 2, previousVisible: true, nextVisible: true },
    });

    await navigateToPageAndAssertResults(page, caseListPage, tableUtils, {
      targetPage: 4,
      expectedRequest: {
        ...defaultSearchCasesRequestParams,
        page: '4',
      },
      expectedMock: pageFourMock,
      pagination: { currentPage: 4, previousVisible: true, nextVisible: false },
    });
  });

  test(`User ${userIdentifier} can filter by multiple states and see the expected case list`, async ({
    caseListPage,
    tableUtils,
    page,
  }) => {
    const jurisdictions = buildCaseListJurisdictionsMock();
    const workbasketInputs = buildCaseListStateFilterInputsMock();
    const statesToVerify = ['Any', ...CASE_LIST_STATE_FILTER_OPTIONS];
    const stateMocks = new Map(statesToVerify.map((state) => [state, buildCaseListMockForDefaultState(state)]));

    await clearPersistedCaseListState(page);
    await setupCaseListMocks(page, {
      searchResponseHandler: async (route) => {
        const requestUrl = new URL(route.request().url());
        const state = requestUrl.searchParams.get('state') ?? 'Any';

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(stateMocks.get(state) ?? stateMocks.get('Any')),
        });
      },
      jurisdictions,
      workbasketInputs,
    });

    await caseListPage.navigateTo();
    await caseListPage.searchByJurisdiction('Family Divorce');
    await caseListPage.searchByCaseType('XUI Case PoC');
    await expect(caseListPage.stateSelect).toBeVisible();

    for (const state of statesToVerify) {
      await test.step(`Apply the ${state} filter and verify the request and case list`, async () => {
        await caseListPage.searchByState(state);
        const stateSearchRequestPromise = waitForSearchCasesRequest(page, {
          page: 1,
          state: state === 'Any' ? undefined : state,
          allowEmptyState: state === 'Any',
        });

        await caseListPage.applyFilters();
        const stateSearchRequest = await stateSearchRequestPromise;
        const stateMock = stateMocks.get(state)!;
        const expectedUniqueReference = stateMock.results[0].case_fields['[CASE_REFERENCE]'];

        expectSearchCasesRequest(stateSearchRequest, {
          ...defaultSearchCasesRequestParams,
          page: '1',
          state: state === 'Any' ? null : state,
        });

        await expectCaseListSummary(caseListPage, stateMock.total, 1);
        await expectCaseListRows(caseListPage, tableUtils, stateMock);
        await expectPaginationState(caseListPage, {
          currentPage: 1,
          previousVisible: false,
          paginationVisible: true,
          finalItem: 'Next',
        });
        await expect(caseListPage.caseResultsTable).toContainText(expectedUniqueReference);
      });
    }

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
