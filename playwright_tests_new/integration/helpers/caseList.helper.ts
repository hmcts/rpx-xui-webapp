import type { TableUtils } from '@hmcts/playwright-common';
import { expect, type Page, type Route } from '@playwright/test';
import type { CaseListPage } from '../../E2E/page-objects/pages/exui/caseList.po';
import { buildCaseListJurisdictionsMock, buildCaseListMock } from '../mocks/caseList.mock';

const PAGE_SIZE = 25;
const defaultJurisdictionsMock = buildCaseListJurisdictionsMock();

export type CaseListMockResponse = ReturnType<typeof buildCaseListMock>;
export type SearchCasesRequestDetails = {
  ctid: string;
  useCase: string;
  view: string;
  page: string;
  state?: string;
};
type ExpectedSearchCasesRequestDetails = Omit<SearchCasesRequestDetails, 'state'> & {
  state?: string | null;
};

export const defaultSearchCasesRequestParams = {
  ctid: 'xuiTestJurisdiction',
  useCase: 'WORKBASKET',
  view: 'WORKBASKET',
};

export async function setupCaseListMocks(
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

export async function clearPersistedCaseListState(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.removeItem('savedQueryParams');
    window.localStorage.removeItem('workbasket-filter-form-group-value');
  });
}

export async function waitForSearchCasesRequest(
  page: Page,
  expected: {
    page: number;
    state?: string;
    allowEmptyState?: boolean;
  }
): Promise<SearchCasesRequestDetails> {
  const request = await page.waitForRequest((candidate) => {
    const requestUrl = new URL(candidate.url());
    if (requestUrl.pathname !== '/data/internal/searchCases' || requestUrl.searchParams.get('page') !== String(expected.page)) {
      return false;
    }

    if (expected.allowEmptyState) {
      return !requestUrl.searchParams.has('state') || requestUrl.searchParams.get('state') === '';
    }

    if (expected.state !== undefined) {
      return requestUrl.searchParams.get('state') === expected.state;
    }

    return true;
  });

  const requestUrl = new URL(request.url());
  return {
    ctid: requestUrl.searchParams.get('ctid') ?? '',
    useCase: requestUrl.searchParams.get('use_case') ?? '',
    view: requestUrl.searchParams.get('view') ?? '',
    page: requestUrl.searchParams.get('page') ?? '',
    state: requestUrl.searchParams.get('state') ?? undefined,
  };
}

export function expectSearchCasesRequest(request: SearchCasesRequestDetails, expected: ExpectedSearchCasesRequestDetails): void {
  expect(request.ctid).toBe(expected.ctid);
  expect(request.useCase).toBe(expected.useCase);
  expect(request.view).toBe(expected.view);
  expect(request.page).toBe(expected.page);

  if (expected.state == null) {
    expect(request.state).toBeUndefined();
    return;
  }

  expect(request.state).toBe(expected.state);
}

export async function expectCaseListRows(
  caseListPage: CaseListPage,
  tableUtils: TableUtils,
  mock: CaseListMockResponse
): Promise<void> {
  const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
  expect(table).toHaveLength(mock.results.length);

  for (let index = 0; index < mock.results.length; index += 1) {
    const expectedFields = mock.results[index].case_fields;
    expect(table[index]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
    expect(table[index]['Text Field 0']).toBe(expectedFields['TextField0']);
    expect(table[index]['Text Field 1']).toBe(expectedFields['TextField1']);
    expect(table[index]['Text Field 2']).toBe(expectedFields['TextField2']);
  }
}

export async function expectCaseListSummary(caseListPage: CaseListPage, totalResults: number, pageNumber: number): Promise<void> {
  const startResult = (pageNumber - 1) * PAGE_SIZE + 1;
  const endResult = Math.min(totalResults, pageNumber * PAGE_SIZE);

  await expect(caseListPage.caseListResultsAmount).toHaveText(
    `Showing ${startResult} to ${endResult} of ${totalResults} results`
  );
}

export async function expectPaginationState(
  caseListPage: CaseListPage,
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

export async function navigateToPageAndAssertResults(
  page: Page,
  caseListPage: CaseListPage,
  tableUtils: TableUtils,
  options: {
    targetPage: number;
    expectedRequest: ExpectedSearchCasesRequestDetails;
    expectedMock: CaseListMockResponse;
    pagination: {
      currentPage: number;
      previousVisible: boolean;
      nextVisible?: boolean;
      paginationVisible?: boolean;
      finalItem?: string;
    };
    allowEmptyState?: boolean;
  }
): Promise<void> {
  const requestPromise = waitForSearchCasesRequest(page, {
    page: options.targetPage,
    state: options.expectedRequest.state ?? undefined,
    allowEmptyState: options.allowEmptyState,
  });

  await caseListPage.clickPaginationPage(options.targetPage);
  const request = await requestPromise;
  expectSearchCasesRequest(request, options.expectedRequest);

  await expectPaginationState(caseListPage, options.pagination);
  await expectCaseListSummary(caseListPage, options.expectedMock.total, options.targetPage);
  await expectCaseListRows(caseListPage, tableUtils, options.expectedMock);
}
