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
import { createGlobalSearchResultsRouteHandler, setupGlobalSearchMockRoutes } from '../../helpers/caseSearchMockRoutes.helper';
import { TEST_USERS } from '../../testData/caseReferences';

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
  });
});

test.describe(`Search quick find as ${userIdentifier}`, () => {
  test('User can find case by valid 16-digit case reference from header search', async ({
    caseListPage,
    searchCasePage,
    caseDetailsPage,
    page,
  }) => {
    await page.route('**/data/internal/cases/**', async (route) => {
      const requestUrl = route.request().url();
      const caseReference = requestUrl.split('/').pop() ?? VALID_SEARCH_CASE_REFERENCE;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(buildCaseDetailsMock(caseReference)),
      });
    });

    await caseListPage.navigateTo();
    await expect(searchCasePage.caseIdTextBox).toBeVisible();

    await searchCasePage.searchWith16DigitCaseId(VALID_SEARCH_CASE_REFERENCE);

    await expect(page).toHaveURL(/\/cases\/case-details\//);
    await expect(caseDetailsPage.caseActionsDropdown).toBeVisible();

    const caseNumberFromUrl = await caseDetailsPage.getCaseNumberFromUrl();
    expect(caseNumberFromUrl).toBe(VALID_SEARCH_CASE_REFERENCE);
  });

  test('User sees no results for non-existent 16-digit case reference from header search', async ({
    caseListPage,
    searchCasePage,
    page,
  }) => {
    await caseListPage.navigateTo();
    await expect(searchCasePage.caseIdTextBox).toBeVisible();

    await searchCasePage.searchWith16DigitCaseId(INVALID_SEARCH_CASE_REFERENCE);

    await expect(searchCasePage.noResultsHeading).toBeVisible();
    await expect(searchCasePage.backLink).toBeVisible();
  });
});
