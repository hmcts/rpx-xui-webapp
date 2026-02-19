import { expect, test } from '../../../E2E/fixtures';
import type { Route } from '@playwright/test';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  buildGlobalSearchCaseDetailsMock,
  buildGlobalSearchJurisdictionsMock,
  buildGlobalSearchNoResultsMock,
  buildGlobalSearchResultsMock,
  buildGlobalSearchServicesMock,
  GLOBAL_SEARCH_CASE_NAME,
  GLOBAL_SEARCH_CASE_REFERENCE,
  GLOBAL_SEARCH_NON_EXISTENT_CASE_REFERENCE,
} from '../../mocks/globalSearch.mock';
import { TEST_USERS } from '../../testData/caseReferences';

const userIdentifier = TEST_USERS.FPL_GLOBAL_SEARCH;

const servicesMockResponse = buildGlobalSearchServicesMock();
const jurisdictionsMockResponse = buildGlobalSearchJurisdictionsMock();
const globalSearchResultsMockResponse = buildGlobalSearchResultsMock();
const globalSearchNoResultsMockResponse = buildGlobalSearchNoResultsMock();

const globalSearchResultsHandler = async (route: Route) => {
  const rawPayload = route.request().postData();
  let requestBody:
    | {
        searchCriteria?: { caseReferences?: string[] };
      }
    | undefined;
  if (rawPayload) {
    try {
      requestBody = JSON.parse(rawPayload) as {
        searchCriteria?: { caseReferences?: string[] };
      };
    } catch {
      requestBody = undefined;
    }
  }
  const searchedCaseReferences = requestBody?.searchCriteria?.caseReferences ?? [];
  const response = searchedCaseReferences.includes(GLOBAL_SEARCH_CASE_REFERENCE)
    ? globalSearchResultsMockResponse
    : globalSearchNoResultsMockResponse;

  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(response) });
};

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);

  await page.route('**/api/globalSearch/services*', async (route) => {
    const body = JSON.stringify(servicesMockResponse);
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });

  await page.route('**/api/globalsearch/services*', async (route) => {
    const body = JSON.stringify(servicesMockResponse);
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });

  await page.route('**/caseworkers/**/jurisdictions*', async (route) => {
    const body = JSON.stringify(jurisdictionsMockResponse);
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });

  await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route) => {
    const body = JSON.stringify({ workbasketInputs: [] });
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });

  await page.route('**/data/internal/case-types/**/work-basket-inputs*', async (route) => {
    const body = JSON.stringify({ workbasketInputs: [] });
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });

  await page.route('**/data/internal/case-types/**/search-inputs*', async (route) => {
    const body = JSON.stringify({ searchInputs: [] });
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });

  await page.route('**/data/internal/cases/**', async (route) => {
    const requestUrl = route.request().url();
    const caseReference = requestUrl.split('/').pop() || GLOBAL_SEARCH_CASE_REFERENCE;
    const body = JSON.stringify(buildGlobalSearchCaseDetailsMock(caseReference));
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });
});

test.describe(`Global search from menu bar as ${userIdentifier}`, () => {
  test('searches by 16-digit case reference and navigates to case details', async ({
    caseListPage,
    globalSearchPage,
    tableUtils,
    page,
  }) => {
    await test.step('Intercept global search results for known case reference', async () => {
      await page.route('**/api/globalsearch/results*', globalSearchResultsHandler);
      await page.route('**/api/globalSearch/results*', globalSearchResultsHandler);
    });

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
    await test.step('Intercept global search results with empty response', async () => {
      await page.route('**/api/globalsearch/results*', globalSearchResultsHandler);
      await page.route('**/api/globalSearch/results*', globalSearchResultsHandler);
    });

    await test.step('Run global search with non-existent case reference', async () => {
      await caseListPage.navigateTo();
      await globalSearchPage.searchLinkOnMenuBar.click();
      await page.waitForURL(/\/search/);
      await globalSearchPage.caseIdTextBox.waitFor({ state: 'visible' });
      await globalSearchPage.caseIdTextBox.fill(GLOBAL_SEARCH_NON_EXISTENT_CASE_REFERENCE);
      await globalSearchPage.servicesOption.selectOption('PUBLICLAW');
      await globalSearchPage.searchButton.click();
      await globalSearchPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify no-results content and key action link', async () => {
      await expect(page).toHaveURL(/\/search\/noresults/);
      await expect(page.getByRole('heading', { level: 1, name: 'No results found' })).toBeVisible();
      await expect(page.getByText('Try searching again.')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Search', exact: true })).toBeVisible();
    });
  });
});
