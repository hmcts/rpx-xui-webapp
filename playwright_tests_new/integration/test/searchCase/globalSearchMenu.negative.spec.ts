import { expect, test } from '../../../E2E/fixtures';
import {
  applySearchCaseSessionCookies,
  overrideGlobalSearchResultsRoute,
  setupFastCaseRetrievalConfigRoute,
  setupGlobalSearchMockRoutes,
  submitGlobalSearchFromMenu,
} from '../../helpers';
import {
  buildGlobalSearchJurisdictionsMock,
  buildGlobalSearchNoResultsMock,
  buildGlobalSearchServicesMock,
  GLOBAL_SEARCH_CASE_REFERENCE,
} from '../../mocks/globalSearch.mock';
import { SEARCH_CASE_ERROR_STATUS_CODES, SEARCH_CASE_MALFORMED_JSON_BODY } from '../../testData';

const noResultsResponse = buildGlobalSearchNoResultsMock();
const servicesResponse = buildGlobalSearchServicesMock();
const jurisdictionsResponse = buildGlobalSearchJurisdictionsMock();

test.beforeEach(async ({ page }, testInfo) => {
  await applySearchCaseSessionCookies(page, testInfo);
  await setupFastCaseRetrievalConfigRoute(page);

  await setupGlobalSearchMockRoutes(page, {
    jurisdictions: jurisdictionsResponse,
    services: servicesResponse,
    searchResultsHandler: async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(noResultsResponse),
      });
    },
  });
});

test.describe('Global Search negative flows with prewarmed search session', () => {
  for (const status of SEARCH_CASE_ERROR_STATUS_CODES) {
    test(`shows error no-results page when global search returns HTTP ${status}`, async ({ globalSearchPage, page }) => {
      let searchRequestSeen = false;
      await overrideGlobalSearchResultsRoute(page, async (route) => {
        searchRequestSeen = true;
        await route.fulfill({
          status,
          contentType: 'application/json',
          body: JSON.stringify({ message: `Forced failure ${status}` }),
        });
      });

      await submitGlobalSearchFromMenu(GLOBAL_SEARCH_CASE_REFERENCE, globalSearchPage, page);

      expect(searchRequestSeen).toBeTruthy();
      await expect(page).toHaveURL(/\/search\/noresults/);
      await expect(page.getByRole('heading', { level: 1, name: 'Something went wrong' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Search again' })).toBeVisible();
    });
  }

  test('shows error no-results page when global search response is malformed JSON', async ({ globalSearchPage, page }) => {
    let searchRequestSeen = false;
    await overrideGlobalSearchResultsRoute(page, async (route) => {
      searchRequestSeen = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: SEARCH_CASE_MALFORMED_JSON_BODY,
      });
    });

    await submitGlobalSearchFromMenu(GLOBAL_SEARCH_CASE_REFERENCE, globalSearchPage, page);

    expect(searchRequestSeen).toBeTruthy();
    await expect(page).toHaveURL(/\/search\/noresults/);
    await expect(page.getByRole('heading', { level: 1, name: 'Something went wrong' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search again' })).toBeVisible();
  });

  test('shows error no-results page when global search request times out', async ({ globalSearchPage, page }) => {
    let searchRequestSeen = false;
    await overrideGlobalSearchResultsRoute(page, async (route) => {
      searchRequestSeen = true;
      await route.abort('timedout');
    });

    await submitGlobalSearchFromMenu(GLOBAL_SEARCH_CASE_REFERENCE, globalSearchPage, page);

    expect(searchRequestSeen).toBeTruthy();
    await expect(page).toHaveURL(/\/search\/noresults/);
    await expect(page.getByRole('heading', { level: 1, name: 'Something went wrong' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search again' })).toBeVisible();
  });
});
