import type { Page, Route } from '@playwright/test';

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

  // Mock work basket and search inputs
  await page.route('**/data/internal/case-types/**/work-basket-inputs*', async (route) => {
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
