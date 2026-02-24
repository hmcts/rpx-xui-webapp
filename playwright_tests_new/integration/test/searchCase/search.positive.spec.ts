import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  buildCaseDetailsMock,
  buildGlobalSearchNoResultsMock,
  buildGlobalSearchResultsMock,
  buildGlobalSearchServicesMock,
  buildSearchCaseJurisdictionsMock,
  INVALID_SEARCH_CASE_REFERENCE,
  VALID_SEARCH_CASE_REFERENCE,
} from '../../mocks/search.mock';
import { createGlobalSearchResultsRouteHandler, setupGlobalSearchMockRoutes } from '../../helpers';
import { TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.FPL_GLOBAL_SEARCH;
const searchCaseJurisdictionsMock = buildSearchCaseJurisdictionsMock();
const globalSearchServicesMock = buildGlobalSearchServicesMock();
const globalSearchResultsHandler = createGlobalSearchResultsRouteHandler({
  matchingCaseReference: VALID_SEARCH_CASE_REFERENCE,
  successResponse: buildGlobalSearchResultsMock(VALID_SEARCH_CASE_REFERENCE),
  noResultsResponse: buildGlobalSearchNoResultsMock(),
});

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);

  await setupGlobalSearchMockRoutes(page, {
    jurisdictions: searchCaseJurisdictionsMock,
    services: globalSearchServicesMock,
    searchResultsHandler: globalSearchResultsHandler,
    caseDetailsHandler: async (route) => {
      const requestUrl = decodeURIComponent(route.request().url());
      const caseReference = /\d{16}/.exec(requestUrl)?.[0];
      if (!caseReference || caseReference !== VALID_SEARCH_CASE_REFERENCE) {
        await route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Not Found' }),
        });
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(buildCaseDetailsMock(caseReference)),
      });
    },
  });
});

test.describe(`Search quick find as ${userIdentifier}`, () => {
  test('User can find case by valid 16-digit case reference from header search', async ({
    caseListPage,
    searchCasePage,
    caseDetailsPage,
    page,
  }) => {
    await caseListPage.navigateTo();
    await expect(searchCasePage.caseIdTextBox).toBeVisible();

    await searchCasePage.searchWith16DigitCaseId(VALID_SEARCH_CASE_REFERENCE);

    await expect(page).toHaveURL(/\/cases\/case-details\//);
    await expect(caseDetailsPage.caseActionsDropdown).toBeVisible();

    const caseNumberFromUrl = await caseDetailsPage.getCaseNumberFromUrl();
    expect(caseNumberFromUrl).toBe(VALID_SEARCH_CASE_REFERENCE);
  });

  test('User remains on case list with no cases message for non-existent 16-digit header search', async ({
    caseListPage,
    searchCasePage,
    page,
  }) => {
    await caseListPage.navigateTo();
    await expect(searchCasePage.caseIdTextBox).toBeVisible();

    await searchCasePage.searchWith16DigitCaseId(INVALID_SEARCH_CASE_REFERENCE);

    await expect(page).not.toHaveURL(/\/cases\/case-details\//);
    await expect(page).toHaveURL(/\/cases(?:[/?#]|$)/);
    await expect(page.getByText('No cases found. Try using different filters.')).toBeVisible();
  });
});
