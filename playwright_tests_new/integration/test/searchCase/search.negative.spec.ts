import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { createGlobalSearchResultsRouteHandler, setupGlobalSearchMockRoutes, submitHeaderQuickSearch } from '../../helpers';
import {
  buildGlobalSearchNoResultsMock,
  buildGlobalSearchServicesMock,
  buildSearchCaseJurisdictionsMock,
  VALID_SEARCH_CASE_REFERENCE,
} from '../../mocks/search.mock';
import { SEARCH_CASE_ERROR_STATUS_CODES, SEARCH_CASE_MALFORMED_JSON_BODY, TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.FPL_GLOBAL_SEARCH;

const searchCaseJurisdictionsMock = buildSearchCaseJurisdictionsMock();
const globalSearchServicesMock = buildGlobalSearchServicesMock();
// Both handler branches return no-results: this suite tests case-details errors,
// not search-results errors. The search result always succeeds; only the subsequent
// case-details response is varied per test.
const globalSearchResultsHandler = createGlobalSearchResultsRouteHandler({
  matchingCaseReference: VALID_SEARCH_CASE_REFERENCE,
  successResponse: buildGlobalSearchNoResultsMock(),
  noResultsResponse: buildGlobalSearchNoResultsMock(),
});

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);

  await setupGlobalSearchMockRoutes(page, {
    jurisdictions: searchCaseJurisdictionsMock,
    services: globalSearchServicesMock,
    searchResultsHandler: globalSearchResultsHandler,
  });

  // Keep restricted-case-access dependencies mocked so this suite remains fully mocked.
  await page.route('**/api/role-access/roles/access-get-by-caseId', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  });
  await page.route('**/api/wa-supported-jurisdiction/get', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(['PUBLICLAW']) });
  });
  await page.route('**/workallocation/caseworker/getUsersByServiceName', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  });
  await page.route('**/api/prd/judicial/searchJudicialUserByIdamId', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  });
});

test.describe(`Header quick search negative flows as ${userIdentifier}`, () => {
  for (const status of SEARCH_CASE_ERROR_STATUS_CODES) {
    test(`handles case-details load failure for HTTP ${status}`, async ({ caseListPage, searchCasePage, page }) => {
      let caseDetailsRequestSeen = false;
      await page.route('**/data/internal/cases/**', async (route) => {
        caseDetailsRequestSeen = true;
        await route.fulfill({
          status,
          contentType: 'application/json',
          body: JSON.stringify({ message: `Forced failure ${status}` }),
        });
      });

      await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, caseListPage, searchCasePage);

      expect(caseDetailsRequestSeen).toBeTruthy();

      if (status === 403) {
        await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
        await expect(
          page.getByText('This case is restricted. The details of the users with access are provided below.')
        ).toBeVisible();
      } else {
        // timeout: 20_000 — failed auth/access redirect can take up to 15s in AAT when the error page resolves
        await expect(page).not.toHaveURL(/\/cases\/case-details\//);
        await expect.poll(() => page.url(), { timeout: 20_000 }).toMatch(/\/(cases(?:[/?#]|$)|work\/my-work\/list(?:[/?#]|$))/);
      }
    });
  }

  test('handles malformed case-details response from header quick search', async ({ caseListPage, searchCasePage, page }) => {
    let caseDetailsRequestSeen = false;
    await page.route('**/data/internal/cases/**', async (route) => {
      caseDetailsRequestSeen = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: SEARCH_CASE_MALFORMED_JSON_BODY,
      });
    });

    await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, caseListPage, searchCasePage);

    expect(caseDetailsRequestSeen).toBeTruthy();
    await expect(page).not.toHaveURL(/\/cases\/case-details\//);
    await expect.poll(() => page.url(), { timeout: 20_000 }).toMatch(/\/(cases(?:[/?#]|$)|work\/my-work\/list(?:[/?#]|$))/);
  });

  test('handles timed-out case-details request from header quick search', async ({ caseListPage, searchCasePage, page }) => {
    let caseDetailsRequestSeen = false;
    await page.route('**/data/internal/cases/**', async (route) => {
      caseDetailsRequestSeen = true;
      await route.abort('timedout');
    });

    await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, caseListPage, searchCasePage);

    expect(caseDetailsRequestSeen).toBeTruthy();
    // timeout: 20_000 — aborted/timed-out request triggers error-page redirect which can take up to 15s in AAT
    await expect(page).not.toHaveURL(/\/cases\/case-details\//);
    await expect.poll(() => page.url(), { timeout: 20_000 }).toMatch(/\/(cases(?:[/?#]|$)|work\/my-work\/list(?:[/?#]|$))/);
  });
});
