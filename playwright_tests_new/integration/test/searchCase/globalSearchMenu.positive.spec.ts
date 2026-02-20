import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { createGlobalSearchResultsRouteHandler, setupGlobalSearchMockRoutes, submitGlobalSearchFromMenu } from '../../helpers';
import {
  buildGlobalSearchCaseDetailsMock,
  buildGlobalSearchJurisdictionsMock,
  buildGlobalSearchMenuResultsMock,
  buildGlobalSearchNoResultsMock,
  buildGlobalSearchServicesMock,
  GLOBAL_SEARCH_CASE_NAME,
  GLOBAL_SEARCH_CASE_REFERENCE,
  GLOBAL_SEARCH_NON_EXISTENT_CASE_REFERENCE,
} from '../../mocks/globalSearch.mock';
import { TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.FPL_GLOBAL_SEARCH;

const servicesMockResponse = buildGlobalSearchServicesMock();
const jurisdictionsMockResponse = buildGlobalSearchJurisdictionsMock();
const globalSearchResultsMockResponse = buildGlobalSearchMenuResultsMock();
const globalSearchNoResultsMockResponse = buildGlobalSearchNoResultsMock();

const globalSearchResultsHandler = createGlobalSearchResultsRouteHandler({
  matchingCaseReference: GLOBAL_SEARCH_CASE_REFERENCE,
  successResponse: globalSearchResultsMockResponse,
  noResultsResponse: globalSearchNoResultsMockResponse,
});

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);

  await setupGlobalSearchMockRoutes(page, {
    jurisdictions: jurisdictionsMockResponse,
    services: servicesMockResponse,
    searchResultsHandler: globalSearchResultsHandler,
    caseDetailsHandler: async (route) => {
      const requestUrl = route.request().url();
      const caseReference = requestUrl.split('/').pop() ?? GLOBAL_SEARCH_CASE_REFERENCE;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(buildGlobalSearchCaseDetailsMock(caseReference)),
      });
    },
  });
});

test.describe(`Global search from menu bar as ${userIdentifier}`, () => {
  test('searches by 16-digit case reference and navigates to case details', async ({
    caseListPage,
    globalSearchPage,
    tableUtils,
  }) => {
    await test.step('Run global search from primary menu bar', async () => {
      await caseListPage.navigateTo();
      await globalSearchPage.performGlobalSearchWithCase(GLOBAL_SEARCH_CASE_REFERENCE, 'PUBLICLAW');
      await expect(globalSearchPage.searchResultsHeader).toHaveText('Search results');
    });

    await test.step('Verify search results table contains expected case and service', async () => {
      const table = await tableUtils.parseDataTable(globalSearchPage.searchResultsTable);
      expect(table.length).toBe(1);
      expect(table[0]['Case']).toContain(GLOBAL_SEARCH_CASE_NAME);
      expect(table[0]['Case']).toContain(GLOBAL_SEARCH_CASE_REFERENCE);
      expect(table[0]['Service']).toBe('Public Law');
    });

    await test.step('Verify search result exposes case details link', async () => {
      await expect(globalSearchPage.viewLink).toBeVisible();
      await expect(globalSearchPage.viewLink).toHaveAttribute('href', /\/cases\/case-details\/PUBLICLAW\/PRLAPPS\//);
    });
  });

  test('shows no results content for non-existent 16-digit case reference', async ({ caseListPage, globalSearchPage, page }) => {
    await test.step('Run global search with non-existent case reference', async () => {
      await submitGlobalSearchFromMenu(GLOBAL_SEARCH_NON_EXISTENT_CASE_REFERENCE, caseListPage, globalSearchPage, page);
    });

    await test.step('Verify no-results content and key action link', async () => {
      await expect(page).toHaveURL(/\/search\/noresults/);
      await expect(page.getByRole('heading', { level: 1, name: 'No results found' })).toBeVisible();
      await expect(page.getByText('Try searching again.')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Search', exact: true })).toBeVisible();
    });
  });
});
