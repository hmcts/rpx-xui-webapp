import { expect, test } from '../../../E2E/fixtures';
import type { Page } from '@playwright/test';
import { applySessionCookies } from '../../../common/sessionCapture';
import type { CaseListPage } from '../../../E2E/page-objects/pages/exui/caseList.po';
import type { GlobalSearchPage } from '../../../E2E/page-objects/pages/exui/globalSearch.po';
import { setupGlobalSearchMockRoutes } from '../../helpers/caseSearchMockRoutes.helper';
import {
  buildGlobalSearchJurisdictionsMock,
  buildGlobalSearchNoResultsMock,
  buildGlobalSearchServicesMock,
  GLOBAL_SEARCH_CASE_REFERENCE,
} from '../../mocks/globalSearch.mock';
import { SEARCH_CASE_ERROR_STATUS_CODES, SEARCH_CASE_MALFORMED_JSON_BODY, TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.FPL_GLOBAL_SEARCH;

const noResultsResponse = buildGlobalSearchNoResultsMock();
const servicesResponse = buildGlobalSearchServicesMock();
const jurisdictionsResponse = buildGlobalSearchJurisdictionsMock();

async function submitGlobalSearchFromMenu(
  caseReference: string,
  caseListPage: CaseListPage,
  globalSearchPage: GlobalSearchPage,
  page: Page
) {
  await caseListPage.navigateTo();
  await globalSearchPage.searchLinkOnMenuBar.click();
  await page.waitForURL(/\/search/);
  await globalSearchPage.caseIdTextBox.waitFor({ state: 'visible' });
  await globalSearchPage.caseIdTextBox.fill(caseReference);
  await globalSearchPage.servicesOption.selectOption('PUBLICLAW');
  await globalSearchPage.searchButton.click();
  await globalSearchPage.exuiSpinnerComponent.wait();
}

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);

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

test.describe(`Global Search negative flows as ${userIdentifier}`, () => {
  for (const status of SEARCH_CASE_ERROR_STATUS_CODES) {
    test(`shows error no-results page when global search returns HTTP ${status}`, async ({
      caseListPage,
      globalSearchPage,
      page,
    }) => {
      let searchRequestSeen = false;
      await page.unroute('**/api/globalsearch/results*');
      await page.unroute('**/api/globalSearch/results*');
      await page.route('**/api/globalsearch/results*', async (route) => {
        searchRequestSeen = true;
        await route.fulfill({
          status,
          contentType: 'application/json',
          body: JSON.stringify({ message: `Forced failure ${status}` }),
        });
      });
      await page.route('**/api/globalSearch/results*', async (route) => {
        searchRequestSeen = true;
        await route.fulfill({
          status,
          contentType: 'application/json',
          body: JSON.stringify({ message: `Forced failure ${status}` }),
        });
      });

      await submitGlobalSearchFromMenu(GLOBAL_SEARCH_CASE_REFERENCE, caseListPage, globalSearchPage, page);

      expect(searchRequestSeen).toBeTruthy();
      await expect(page).toHaveURL(/\/search\/noresults/);
      await expect(page.getByRole('heading', { level: 1, name: 'Something went wrong' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Search again' })).toBeVisible();
    });
  }

  test('shows error no-results page when global search response is malformed JSON', async ({
    caseListPage,
    globalSearchPage,
    page,
  }) => {
    let searchRequestSeen = false;
    await page.unroute('**/api/globalsearch/results*');
    await page.unroute('**/api/globalSearch/results*');
    await page.route('**/api/globalsearch/results*', async (route) => {
      searchRequestSeen = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: SEARCH_CASE_MALFORMED_JSON_BODY,
      });
    });
    await page.route('**/api/globalSearch/results*', async (route) => {
      searchRequestSeen = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: SEARCH_CASE_MALFORMED_JSON_BODY,
      });
    });

    await submitGlobalSearchFromMenu(GLOBAL_SEARCH_CASE_REFERENCE, caseListPage, globalSearchPage, page);

    expect(searchRequestSeen).toBeTruthy();
    await expect(page).toHaveURL(/\/search\/noresults/);
    await expect(page.getByRole('heading', { level: 1, name: 'Something went wrong' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search again' })).toBeVisible();
  });

  test('shows error no-results page when global search request times out', async ({ caseListPage, globalSearchPage, page }) => {
    let searchRequestSeen = false;
    await page.unroute('**/api/globalsearch/results*');
    await page.unroute('**/api/globalSearch/results*');
    await page.route('**/api/globalsearch/results*', async (route) => {
      searchRequestSeen = true;
      await route.abort('timedout');
    });
    await page.route('**/api/globalSearch/results*', async (route) => {
      searchRequestSeen = true;
      await route.abort('timedout');
    });

    await submitGlobalSearchFromMenu(GLOBAL_SEARCH_CASE_REFERENCE, caseListPage, globalSearchPage, page);

    expect(searchRequestSeen).toBeTruthy();
    await expect(page).toHaveURL(/\/search\/noresults/);
    await expect(page.getByRole('heading', { level: 1, name: 'Something went wrong' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search again' })).toBeVisible();
  });
});
