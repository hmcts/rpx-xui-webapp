import type { Page, Route } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  buildCaseListJurisdictionsMock,
  buildCaseListMock,
  buildCaseListMockForPage,
  buildCaseListMockForState,
  buildCaseListMockWithOptionalFieldsForPage,
  buildCaseListSubmittedStateJurisdictionsMock,
  buildCaseListStateFilterInputsMock,
  CASE_LIST_SUBMITTED_STATE_CASE_TYPE_LABEL,
  CASE_LIST_SUBMITTED_STATE_JURISDICTION_LABEL,
  CASE_LIST_SUBMITTED_STATE_OPTIONS,
} from '../../mocks/caseList.mock';

const userIdentifier = 'SOLICITOR';
const PAGE_SIZE = 25;
const defaultJurisdictionsMock = buildCaseListJurisdictionsMock();
type CaseListMockResponse = ReturnType<typeof buildCaseListMock>;

async function setupCaseListMocks(
  page: Page,
  options: {
    searchResponse?: unknown;
    searchResponseHandler?: (route: Route) => Promise<void>;
    jurisdictions?: unknown;
    workbasketInputs?: { workbasketInputs?: unknown[]; searchInputs?: unknown[] };
  }
): Promise<void> {
  const jurisdictions = options.jurisdictions ?? defaultJurisdictionsMock;
  const workbasketInputs = options.workbasketInputs ?? { workbasketInputs: [], searchInputs: [] };

  await page.unroute('**/aggregated/caseworkers/**/jurisdictions*').catch(() => undefined);
  await page.unroute('**/caseworkers/**/jurisdictions*').catch(() => undefined);
  await page.unroute('**/data/internal/case-types/**/work-basket-inputs*').catch(() => undefined);
  await page.unroute('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*').catch(() => undefined);
  await page.unroute('**/data/internal/case-types/**/search-inputs*').catch(() => undefined);
  await page.unroute('**/data/internal/searchCases*').catch(() => undefined);

  await page.route('**/aggregated/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(jurisdictions) });
  });

  await page.route('**/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(jurisdictions) });
  });

  await page.route('**/data/internal/case-types/**/work-basket-inputs*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(workbasketInputs) });
  });

  await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(workbasketInputs) });
  });

  await page.route('**/data/internal/case-types/**/search-inputs*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ searchInputs: workbasketInputs.searchInputs ?? [] }),
    });
  });

  await page.route('**/data/internal/searchCases*', async (route) => {
    if (options.searchResponseHandler) {
      await options.searchResponseHandler(route);
      return;
    }

    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(options.searchResponse) });
  });
}

async function clearPersistedCaseListState(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.removeItem('savedQueryParams');
    window.localStorage.removeItem('workbasket-filter-form-group-value');
  });
}

function getExpectedResultsSummary(totalResults: number, pageNumber: number, pageSize: number = PAGE_SIZE): string {
  const startResult = (pageNumber - 1) * pageSize + 1;
  const endResult = Math.min(totalResults, pageNumber * pageSize);
  return `Showing ${startResult} to ${endResult} of ${totalResults} results`;
}

async function waitForSearchCasesRequest(
  page: Page,
  expected: {
    page: number;
  }
) {
  const request = await page.waitForRequest((candidate) => {
    const requestUrl = new URL(candidate.url());
    return requestUrl.pathname === '/data/internal/searchCases' && requestUrl.searchParams.get('page') === String(expected.page);
  });

  const requestUrl = new URL(request.url());
  return {
    ctid: requestUrl.searchParams.get('ctid') ?? '',
    useCase: requestUrl.searchParams.get('use_case') ?? '',
    view: requestUrl.searchParams.get('view') ?? '',
    page: requestUrl.searchParams.get('page') ?? '',
  };
}

async function expectCaseListRows(caseListPage, tableUtils, mock: CaseListMockResponse): Promise<void> {
  const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
  expect(table).toHaveLength(mock.results.length);

  for (let i = 0; i < mock.results.length; i++) {
    const expectedFields = mock.results[i].case_fields;
    expect(table[i]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
    expect(table[i]['Text Field 0']).toBe(expectedFields['TextField0']);
    expect(table[i]['Text Field 1']).toBe(expectedFields['TextField1']);
    expect(table[i]['Text Field 2']).toBe(expectedFields['TextField2']);
  }
}

async function expectCaseListSummary(caseListPage, totalResults: number, pageNumber: number): Promise<void> {
  await expect(caseListPage.caseListResultsAmount).toHaveText(getExpectedResultsSummary(totalResults, pageNumber, PAGE_SIZE));
}

async function expectPaginationState(
  caseListPage,
  options: {
    currentPage: number;
    previousVisible: boolean;
    nextVisible?: boolean;
    paginationVisible?: boolean;
    finalItem?: string;
  }
): Promise<void> {
  if (options.paginationVisible !== undefined) {
    if (options.paginationVisible) {
      await expect(caseListPage.pagination).toBeVisible();
    } else {
      await expect(caseListPage.pagination).toBeHidden();
      return;
    }
  }

  await expect(caseListPage.paginationCurrentPage).toContainText(String(options.currentPage));
  if (options.previousVisible) {
    await expect(caseListPage.paginationPrevious).toBeVisible();
  } else {
    await expect(caseListPage.paginationPrevious).not.toBeVisible();
  }

  if (options.nextVisible !== undefined) {
    if (options.nextVisible) {
      await expect(caseListPage.paginationNext).toBeVisible();
    } else {
      await expect(caseListPage.paginationNext).not.toBeVisible();
    }
  }

  if (options.finalItem) {
    expect(await caseListPage.getPaginationFinalItem()).toBe(options.finalItem);
  }
}

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
    await expectPaginationState(caseListPage, { currentPage: 1, previousVisible: false, paginationVisible: true, finalItem: 'Next' });
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

  test(`User ${userIdentifier} can view more than 100 cases on the case list page`, async ({ caseListPage, tableUtils, page }) => {
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
    await expectPaginationState(caseListPage, { currentPage: 1, previousVisible: false, paginationVisible: true, finalItem: 'Next' });

    const pageTwoSearchRequestPromise = waitForSearchCasesRequest(page, { page: 2 });
    await caseListPage.clickPaginationPage(2);
    const pageTwoSearchRequest = await pageTwoSearchRequestPromise;
    expect(pageTwoSearchRequest).toEqual({
      ctid: 'xuiTestJurisdiction',
      useCase: 'WORKBASKET',
      view: 'WORKBASKET',
      page: '2',
    });

    await expectPaginationState(caseListPage, { currentPage: 2, previousVisible: true, nextVisible: true });
    await expectCaseListRows(caseListPage, tableUtils, pageTwoMock);

    const pageFourSearchRequestPromise = waitForSearchCasesRequest(page, { page: 4 });
    await caseListPage.clickPaginationPage(4);
    const pageFourSearchRequest = await pageFourSearchRequestPromise;
    expect(pageFourSearchRequest).toEqual({
      ctid: 'xuiTestJurisdiction',
      useCase: 'WORKBASKET',
      view: 'WORKBASKET',
      page: '4',
    });
    await expectPaginationState(caseListPage, { currentPage: 4, previousVisible: true, nextVisible: false });
    await expectCaseListSummary(caseListPage, totalResults, 4);
    await expectCaseListRows(caseListPage, tableUtils, pageFourMock);
  });

  test(`User ${userIdentifier} can view more than 10000 cases on the case list page`, async ({ caseListPage, tableUtils, page }) => {
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

    const totalPages = Math.ceil(totalResults / PAGE_SIZE);
    await expect(caseListPage.caseListResultsLimitWarning).toContainText(
      'The total size of the result set is 10,000. Only the first 10,000 records are available for display.'
    );
    await expectCaseListSummary(caseListPage, totalResults, 1);
    await expectCaseListRows(caseListPage, tableUtils, pageOneMock);
    await expectPaginationState(caseListPage, { currentPage: 1, previousVisible: false, paginationVisible: true, finalItem: 'Next' });
    const visiblePageNumbers = await caseListPage.getVisiblePaginationPageNumbers();
    const visibleIntermediatePageNumbers = visiblePageNumbers.slice(1, -1);

    expect(visiblePageNumbers[0]).toBe(1);
    expect(visiblePageNumbers.at(-1)).toBe(totalPages);
    expect(visibleIntermediatePageNumbers).toEqual(
      Array.from({ length: visibleIntermediatePageNumbers.length }, (_, index) => index + 2)
    );
    const pageFourHundredSearchRequestPromise = waitForSearchCasesRequest(page, { page: 400 });
    await caseListPage.clickPaginationPage(400);
    const pageFourHundredSearchRequest = await pageFourHundredSearchRequestPromise;
    expect(pageFourHundredSearchRequest).toEqual({
      ctid: 'xuiTestJurisdiction',
      useCase: 'WORKBASKET',
      view: 'WORKBASKET',
      page: '400',
    });

    await expectPaginationState(caseListPage, { currentPage: 400, previousVisible: true, nextVisible: false });
    await expectCaseListSummary(caseListPage, totalResults, 400);
    await expectCaseListRows(caseListPage, tableUtils, pageFourHundredMock);
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
    await expectPaginationState(caseListPage, { currentPage: 1, previousVisible: false, paginationVisible: true, finalItem: 'Next' });

    const pageTwoSearchRequestPromise = waitForSearchCasesRequest(page, { page: 2 });
    await caseListPage.clickPaginationPage(2);
    const pageTwoSearchRequest = await pageTwoSearchRequestPromise;
    expect(pageTwoSearchRequest).toEqual({
      ctid: 'xuiTestJurisdiction',
      useCase: 'WORKBASKET',
      view: 'WORKBASKET',
      page: '2',
    });

    await expectPaginationState(caseListPage, { currentPage: 2, previousVisible: true, nextVisible: true });
    await expectCaseListRows(caseListPage, tableUtils, pageTwoMock);

    const pageFourSearchRequestPromise = waitForSearchCasesRequest(page, { page: 4 });
    await caseListPage.clickPaginationPage(4);
    const pageFourSearchRequest = await pageFourSearchRequestPromise;
    expect(pageFourSearchRequest).toEqual({
      ctid: 'xuiTestJurisdiction',
      useCase: 'WORKBASKET',
      view: 'WORKBASKET',
      page: '4',
    });
    await expectPaginationState(caseListPage, { currentPage: 4, previousVisible: true, nextVisible: false });
    await expectCaseListSummary(caseListPage, totalResults, 4);
    await expectCaseListRows(caseListPage, tableUtils, pageFourMock);
  });

  test(`User ${userIdentifier} can filter by multiple states and see the expected case list`, async ({
    caseListPage,
    tableUtils,
    page,
  }) => {
    const jurisdictions = buildCaseListSubmittedStateJurisdictionsMock();
    const workbasketInputs = buildCaseListStateFilterInputsMock();
    const statesToVerify = ['Any', ...CASE_LIST_SUBMITTED_STATE_OPTIONS];
    const stateMocks = new Map(statesToVerify.map((state) => [state, buildCaseListMockForState(state)]));

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
    await caseListPage.searchByJurisdiction(CASE_LIST_SUBMITTED_STATE_JURISDICTION_LABEL);
    await caseListPage.searchByCaseType(CASE_LIST_SUBMITTED_STATE_CASE_TYPE_LABEL);
    await expect(caseListPage.stateSelect).toBeVisible();

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
        const stateMock = stateMocks.get(state)!;
        const expectedUniqueReference = stateMock.results[0].case_fields['[CASE_REFERENCE]'];

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

        await expectCaseListSummary(caseListPage, stateMock.total, 1);
        await expectCaseListRows(caseListPage, tableUtils, stateMock);
        await expectPaginationState(caseListPage, { currentPage: 1, previousVisible: false, paginationVisible: true, finalItem: 'Next' });
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
