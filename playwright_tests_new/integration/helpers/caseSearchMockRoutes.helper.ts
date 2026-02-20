import { expect } from '@playwright/test';
import type { Page, Route } from '@playwright/test';
import type { CaseListPage } from '../../E2E/page-objects/pages/exui/caseList.po';
import type { GlobalSearchPage } from '../../E2E/page-objects/pages/exui/globalSearch.po';
import type { SearchCasePage } from '../../E2E/page-objects/pages/exui/searchCase.po';

/**
 * Configuration for setting up Find Case mock routes.
 */
export interface FindCaseMockRoutesConfig {
  jurisdictions: unknown;
  workBasketInputs: unknown;
  searchResultsHandler: (route: Route) => Promise<void>;
  caseDetailsHandler?: (route: Route) => Promise<void>;
}

/**
 * Sets up mock API routes for Find Case tests.
 *
 * This centralizes the duplicated route setup across multiple test files,
 * following the DRY principle and Open/Closed Principle.
 *
 * @param page - Playwright Page object
 * @param config - Configuration object with mock data and handlers
 *
 * @example
 * ```typescript
 * await setupFindCaseMockRoutes(page, {
 *   jurisdictions: buildFindCaseJurisdictionsMock(),
 *   workBasketInputs: buildFindCaseWorkBasketInputsMock(),
 *   searchResultsHandler: mySearchHandler,
 * });
 * ```
 */
export async function setupFindCaseMockRoutes(page: Page, config: FindCaseMockRoutesConfig): Promise<void> {
  // Mock jurisdictions endpoint
  await page.route('**/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(config.jurisdictions),
    });
  });

  // Mock work basket inputs endpoints
  await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(config.workBasketInputs),
    });
  });

  await page.route('**/data/internal/case-types/**/work-basket-inputs*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(config.workBasketInputs),
    });
  });

  // Mock search inputs endpoint
  await page.route('**/data/internal/case-types/**/search-inputs*', async (route) => {
    const workBasketInputs = config.workBasketInputs as { searchInputs?: unknown };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ searchInputs: workBasketInputs.searchInputs ?? [] }),
    });
  });

  // Mock case details endpoint (if handler provided)
  if (config.caseDetailsHandler) {
    await page.route('**/data/internal/cases/**', config.caseDetailsHandler);
  }

  // Mock search cases endpoint
  await page.route('**/data/internal/searchCases*', config.searchResultsHandler);
}

/**
 * Configuration for setting up Global Search mock routes.
 */
export interface GlobalSearchMockRoutesConfig {
  jurisdictions: unknown;
  services: unknown;
  searchResultsHandler: (route: Route) => Promise<void>;
  caseDetailsHandler?: (route: Route) => Promise<void>;
}

/**
 * Sets up mock API routes for Global Search tests.
 *
 * @param page - Playwright Page object
 * @param config - Configuration object with mock data and handlers
 */
export async function setupGlobalSearchMockRoutes(page: Page, config: GlobalSearchMockRoutesConfig): Promise<void> {
  // Mock jurisdictions endpoints
  await page.route('**/aggregated/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(config.jurisdictions),
    });
  });

  await page.route('**/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(config.jurisdictions),
    });
  });

  // Mock global search services endpoints (both case variants)
  await page.route('**/api/globalSearch/services*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(config.services),
    });
  });

  await page.route('**/api/globalsearch/services*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(config.services),
    });
  });

  // Mock work basket and search inputs (modern CCD data path)
  await page.route('**/data/internal/case-types/**/work-basket-inputs*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ workbasketInputs: [] }),
    });
  });

  // Mock legacy work basket inputs endpoint (CCD classic caseworkers path)
  await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ workbasketInputs: [] }),
    });
  });

  await page.route('**/data/internal/case-types/**/search-inputs*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ searchInputs: [] }),
    });
  });

  // Mock internal search cases
  await page.route('**/data/internal/searchCases*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ columns: [], results: [], total: 0 }),
    });
  });

  // Mock global search results endpoints (both case variants)
  await page.route('**/api/globalsearch/results*', config.searchResultsHandler);
  await page.route('**/api/globalSearch/results*', config.searchResultsHandler);

  // Mock case details endpoint (if handler provided)
  if (config.caseDetailsHandler) {
    await page.route('**/data/internal/cases/**', config.caseDetailsHandler);
  }
}

/**
 * Payload structure for global search requests.
 */
type GlobalSearchRequestPayload = {
  searchCriteria?: {
    caseReferences?: string[];
  };
};

/**
 * Options for creating a global search results route handler.
 */
export interface GlobalSearchResultsRouteHandlerOptions {
  matchingCaseReference: string;
  successResponse: unknown;
  noResultsResponse: unknown;
}

/**
 * Creates a route handler for global search results.
 * Returns different responses based on whether the searched case reference matches.
 *
 * @param options - Configuration for the route handler
 * @returns Route handler function
 */
export function createGlobalSearchResultsRouteHandler(options: GlobalSearchResultsRouteHandlerOptions) {
  const { matchingCaseReference, successResponse, noResultsResponse } = options;

  return async (route: Route) => {
    let payload: GlobalSearchRequestPayload | undefined;
    const rawPostData = route.request().postData();
    if (rawPostData) {
      try {
        payload = JSON.parse(rawPostData) as GlobalSearchRequestPayload;
      } catch {
        payload = undefined;
      }
    }

    const searchedCaseReferences = payload?.searchCriteria?.caseReferences ?? [];
    const responseBody = searchedCaseReferences.includes(matchingCaseReference) ? successResponse : noResultsResponse;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(responseBody),
    });
  };
}

/**
 * Options for creating a Find Case search results route handler.
 */
export interface FindCaseSearchResultsHandlerOptions {
  /** The case reference that should return a matching result */
  existingCaseReference: string;
  /** Response body to return when the case reference is found */
  matchingResponse: unknown;
  /** Response body to return when no case reference matches */
  noMatchResponse: unknown;
  /** Function to extract a case reference from the parsed request payload */
  getCaseReferenceFromPayload: (payload: unknown) => string | undefined;
}

/**
 * Creates a route handler for Find Case search results.
 * Returns a matching or empty response based on the case reference in the request.
 *
 * Checks the request payload, URL, and raw body to robustly detect the searched
 * reference, handling CCD's multiple search-submission strategies.
 *
 * @param options - Configuration for the route handler
 * @returns Route handler function
 */
export function createFindCaseSearchResultsRouteHandler(
  options: FindCaseSearchResultsHandlerOptions
): (route: Route) => Promise<void> {
  const { existingCaseReference, matchingResponse, noMatchResponse, getCaseReferenceFromPayload } = options;

  return async (route: Route) => {
    const requestUrl = route.request().url();
    const rawPayload = route.request().postData();
    let searchPayload: unknown;
    if (rawPayload) {
      try {
        searchPayload = JSON.parse(rawPayload) as unknown;
      } catch {
        searchPayload = undefined;
      }
    }
    const requestedCaseReference = getCaseReferenceFromPayload(searchPayload);
    const decodedUrl = decodeURIComponent(requestUrl);
    const caseReferenceFromUrl = /\d{16}/.exec(decodedUrl)?.[0];
    const isMatch =
      requestedCaseReference === existingCaseReference ||
      Boolean(rawPayload?.includes(existingCaseReference)) ||
      caseReferenceFromUrl === existingCaseReference ||
      decodedUrl.includes(existingCaseReference);

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(isMatch ? matchingResponse : noMatchResponse),
    });
  };
}

/**
 * Overrides the global search results routes with a new handler.
 * Unregisters the existing route handlers first to ensure the override takes effect.
 * Used in negative-scenario tests to simulate HTTP errors, malformed JSON, or timeouts.
 *
 * @param page - Playwright Page object
 * @param handler - New route handler to register
 */
export async function overrideGlobalSearchResultsRoute(page: Page, handler: (route: Route) => Promise<void>): Promise<void> {
  await page.unroute('**/api/globalsearch/results*');
  await page.unroute('**/api/globalSearch/results*');
  await page.route('**/api/globalsearch/results*', handler);
  await page.route('**/api/globalSearch/results*', handler);
}

/**
 * Overrides the Find Case search results route with a new handler.
 * Unregisters the existing handler first so the override takes effect.
 * Used in negative-scenario tests to simulate HTTP errors, malformed JSON, or timeouts.
 *
 * @param page - Playwright Page object
 * @param handler - New route handler to register
 */
export async function overrideFindCaseSearchResultsRoute(page: Page, handler: (route: Route) => Promise<void>): Promise<void> {
  await page.unroute('**/data/internal/searchCases*');
  await page.route('**/data/internal/searchCases*', handler);
}

/**
 * Submits a header quick-search using a 16-digit case reference.
 * Navigates to the case list, waits for the search input, and submits the reference.
 *
 * Extracted from spec-level inline helpers for reuse across positive and negative search suites.
 *
 * @param caseReference - 16-digit case reference to search for
 * @param caseListPage - Page object for the case list page
 * @param searchCasePage - Page object for the search case (header search) page
 */
export async function submitHeaderQuickSearch(
  caseReference: string,
  caseListPage: CaseListPage,
  searchCasePage: SearchCasePage
): Promise<void> {
  await caseListPage.navigateTo();
  // Defensive check: confirms search input is present before interacting
  await expect(searchCasePage.caseIdTextBox).toBeVisible();
  await searchCasePage.searchWith16DigitCaseId(caseReference);
}

/**
 * Submits a global search from the top navigation menu.
 * Navigates to case list, opens the global search panel, fills the case reference, and submits.
 *
 * Extracted from spec-level inline helpers for reuse across positive and negative test suites.
 *
 * @param caseReference - 16-digit case reference to search for
 * @param caseListPage - Page object for the case list page
 * @param globalSearchPage - Page object for the global search page
 * @param page - Playwright Page object (for URL wait)
 */
export async function submitGlobalSearchFromMenu(
  caseReference: string,
  caseListPage: CaseListPage,
  globalSearchPage: GlobalSearchPage,
  page: Page
): Promise<void> {
  await caseListPage.navigateTo();
  await globalSearchPage.searchLinkOnMenuBar.click();
  await page.waitForURL(/\/search/);
  await globalSearchPage.caseIdTextBox.waitFor({ state: 'visible' });
  await globalSearchPage.caseIdTextBox.fill(caseReference);
  await globalSearchPage.servicesOption.selectOption('PUBLICLAW');
  await globalSearchPage.searchButton.click();
  await globalSearchPage.exuiSpinnerComponent.wait();
}
