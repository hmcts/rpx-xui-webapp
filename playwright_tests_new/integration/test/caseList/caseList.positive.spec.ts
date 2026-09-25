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
  buildCaseListJurisdictionsWithProbateMock,
  buildCaseListMock,
  buildCaseListMockForDefaultState,
  buildCaseListMockForPage,
  buildCaseListMockForStates,
  buildCaseListMockWithOptionalFieldsForPage,
  buildCaseListProbateFilterInputsMock,
  buildCaseListStateFilterInputsMock,
  buildCaseListTextFilterInputsMock,
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
        let responseBody = pageOneMock;
        if (pageNumber === 2) {
          responseBody = pageTwoMock;
        } else if (pageNumber === 4) {
          responseBody = pageFourMock;
        }

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
        let responseBody = pageOneMock;
        if (pageNumber === 2) {
          responseBody = pageTwoMock;
        } else if (pageNumber === 4) {
          responseBody = pageFourMock;
        }

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

  test(`User ${userIdentifier} can filter by one state, multiple states, and a dynamic filter`, async ({
    caseListPage,
    tableUtils,
    page,
  }) => {
    const jurisdictions = buildCaseListJurisdictionsMock();
    const workbasketInputs = buildCaseListStateFilterInputsMock();
    const anyStateMock = buildCaseListMockForDefaultState('Any');
    const singleStateMock = buildCaseListMockForStates(['CaseCreated']);
    const multipleStateMock = buildCaseListMockForStates(['CaseCreated', 'Submitted']);
    const intersectionMock = buildCaseListMockForStates(['CaseCreated'], 'intersection');
    const stateMocks = new Map([
      ['Any', anyStateMock],
      ['CaseCreated', singleStateMock],
      ['CaseCreated,Submitted', multipleStateMock],
    ]);

    await clearPersistedCaseListState(page);
    await setupCaseListMocks(page, {
      searchResponseHandler: async (route) => {
        const requestUrl = new URL(route.request().url());
        const state = requestUrl.searchParams.get('state') ?? 'Any';
        const textField0 = requestUrl.searchParams.get('case.TextField0');
        const responseBody = textField0 ? intersectionMock : (stateMocks.get(state) ?? anyStateMock);

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(responseBody),
        });
      },
      jurisdictions,
      workbasketInputs,
    });

    await caseListPage.navigateTo();
    await caseListPage.searchByJurisdiction('Family Divorce');
    await caseListPage.searchByCaseType('XUI Case PoC');
    await expect(caseListPage.stateSelect).toBeVisible();

    await test.step('apply one selected state and verify the request and case list', async () => {
      await caseListPage.searchByStates(['CaseCreated']);
      const stateSearchRequestPromise = waitForSearchCasesRequest(page, { page: 1, state: 'CaseCreated' });
      await caseListPage.applyFilters();
      const stateSearchRequest = await stateSearchRequestPromise;

      expectSearchCasesRequest(stateSearchRequest, {
        ...defaultSearchCasesRequestParams,
        page: '1',
        state: 'CaseCreated',
      });
      await expectCaseListSummary(caseListPage, singleStateMock.total, 1);
      await expectCaseListRows(caseListPage, tableUtils, singleStateMock);
    });

    await test.step('reopen the menu and verify the selected state is retained', async () => {
      if ((await caseListPage.stateSelect.getAttribute('aria-expanded')) === 'true') {
        await caseListPage.stateSelect.click();
      }
      await caseListPage.searchByStates(['CaseCreated']);
      await expect(caseListPage.stateCheckbox('CaseCreated')).toBeChecked();
    });

    await test.step('apply two selected states and verify the request and case list', async () => {
      const stateSearchRequestPromise = waitForSearchCasesRequest(page, { page: 1, state: 'CaseCreated,Submitted' });
      await caseListPage.searchByStates(['CaseCreated', 'Submitted']);
      await caseListPage.applyFilters();
      const stateSearchRequest = await stateSearchRequestPromise;

      expectSearchCasesRequest(stateSearchRequest, {
        ...defaultSearchCasesRequestParams,
        page: '1',
        state: 'CaseCreated,Submitted',
      });
      await expectCaseListSummary(caseListPage, multipleStateMock.total, 1);
      await expectCaseListRows(caseListPage, tableUtils, multipleStateMock);
    });

    await test.step('combine a selected state with a dynamic filter and verify the request and case list', async () => {
      await caseListPage.searchByStates(['CaseCreated']);
      expect(await caseListPage.searchByTextField0('intersection')).toBe(true);
      const stateSearchRequestPromise = waitForSearchCasesRequest(page, { page: 1, state: 'CaseCreated' });
      await caseListPage.applyFilters();
      const stateSearchRequest = await stateSearchRequestPromise;

      expectSearchCasesRequest(stateSearchRequest, {
        ...defaultSearchCasesRequestParams,
        page: '1',
        state: 'CaseCreated',
        caseFilters: { 'case.TextField0': 'intersection' },
      });
      await expectCaseListSummary(caseListPage, intersectionMock.total, 1);
      await expectCaseListRows(caseListPage, tableUtils, intersectionMock);
    });

    await test.step('clear selected states and verify no state parameter is sent', async () => {
      expect(await caseListPage.searchByTextField0('')).toBe(true);
      await caseListPage.searchByStates([]);
      const stateSearchRequestPromise = waitForSearchCasesRequest(page, { page: 1, allowEmptyState: true });
      await caseListPage.applyFilters();
      const stateSearchRequest = await stateSearchRequestPromise;

      expectSearchCasesRequest(stateSearchRequest, {
        ...defaultSearchCasesRequestParams,
        page: '1',
        state: null,
      });
      await expectCaseListSummary(caseListPage, anyStateMock.total, 1);
      await expectCaseListRows(caseListPage, tableUtils, anyStateMock);
    });

    await expectPaginationState(caseListPage, {
      currentPage: 1,
      previousVisible: false,
      paginationVisible: true,
      finalItem: 'Next',
    });

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

  test(`User ${userIdentifier} does not carry hidden dynamic filters across jurisdiction and case type changes`, async ({
    caseListPage,
    page,
  }) => {
    const divorceCaseTypeId = 'xuiTestJurisdiction';
    const probateCaseTypeId = 'GrantOfRepresentation';
    const staleDivorceFilterValue = 'divorce-hidden-filter';
    const divorceWorkbasketInputs = buildCaseListTextFilterInputsMock();
    const probateWorkbasketInputs = buildCaseListProbateFilterInputsMock();

    await clearPersistedCaseListState(page);
    await setupCaseListMocks(page, {
      jurisdictions: buildCaseListJurisdictionsWithProbateMock(),
      searchResponse: buildCaseListMock(2),
      workbasketInputsHandler: async (route) => {
        const requestUrl = route.request().url();
        const body = requestUrl.includes(probateCaseTypeId) ? probateWorkbasketInputs : divorceWorkbasketInputs;

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(body),
        });
      },
    });

    await caseListPage.navigateTo();
    await caseListPage.searchByJurisdiction('Family Divorce');
    await caseListPage.searchByCaseType('XUI Case PoC');
    expect(await caseListPage.searchByTextField0(staleDivorceFilterValue)).toEqual(true);

    const divorceSearchRequestPromise = waitForSearchCasesRequest(page, {
      page: 1,
      ctid: divorceCaseTypeId,
    });

    await caseListPage.applyFilters();
    const divorceSearchRequest = await divorceSearchRequestPromise;

    expect(divorceSearchRequest.caseFilters['case.TextField0']).toEqual(staleDivorceFilterValue);

    await caseListPage.searchByJurisdiction('Probate');
    await caseListPage.searchByCaseType('Grant of representation');

    const probateSearchRequestPromise = waitForSearchCasesRequest(page, {
      page: 1,
      ctid: probateCaseTypeId,
    });

    await caseListPage.applyFilters();
    const probateSearchRequest = await probateSearchRequestPromise;

    expect(probateSearchRequest.ctid).toEqual(probateCaseTypeId);
    expect(probateSearchRequest.caseFilters['case.TextField0']).toBeUndefined();
    expect(Object.keys(probateSearchRequest.caseFilters)).not.toContain('case.TextField0');
  });
});
