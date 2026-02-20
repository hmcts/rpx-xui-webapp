import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupFindCaseMockRoutes } from '../../helpers/caseSearchMockRoutes.helper';
import {
  buildFindCaseEmptySearchResultsMock,
  buildFindCaseJurisdictionsMock,
  buildFindCaseWorkBasketInputsMock,
  FIND_CASE_CASE_TYPE_LABEL,
  FIND_CASE_JURISDICTION_LABEL,
} from '../../mocks/findCase.mock';
import {
  SEARCH_CASE_ERROR_STATUS_CODES,
  SEARCH_CASE_MALFORMED_JSON_BODY,
  TEST_CASE_REFERENCES,
  TEST_USERS,
} from '../../testData';

const userIdentifier = TEST_USERS.FPL_GLOBAL_SEARCH;
const existingCaseReference = TEST_CASE_REFERENCES.FIND_CASE_EXISTING;

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);

  await setupFindCaseMockRoutes(page, {
    jurisdictions: buildFindCaseJurisdictionsMock(),
    workBasketInputs: buildFindCaseWorkBasketInputsMock(),
    searchResultsHandler: async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(buildFindCaseEmptySearchResultsMock()),
      });
    },
  });
});

test.describe(`Find Case negative flows as ${userIdentifier}`, () => {
  for (const status of SEARCH_CASE_ERROR_STATUS_CODES) {
    test(`does not navigate to case details when searchCases returns HTTP ${status}`, async ({
      caseListPage,
      findCasePage,
      page,
    }) => {
      let searchRequestSeen = false;
      await page.unroute('**/data/internal/searchCases*');
      await page.route('**/data/internal/searchCases*', async (route) => {
        searchRequestSeen = true;
        await route.fulfill({
          status,
          contentType: 'application/json',
          body: JSON.stringify({ message: `Forced failure ${status}` }),
        });
      });

      await caseListPage.navigateTo();
      await findCasePage.startFindCaseJourney(existingCaseReference, FIND_CASE_CASE_TYPE_LABEL, FIND_CASE_JURISDICTION_LABEL);

      expect(searchRequestSeen).toBeTruthy();
      await expect(page).not.toHaveURL(/\/cases\/case-details\//);
      await expect(findCasePage.searchResultsDataTable).toBeHidden();
      await expect(findCasePage.searchResultsTable.locator('a.govuk-link[href*="/cases/case-details/"]')).toHaveCount(0);
    });
  }

  test('does not navigate to case details when searchCases response is malformed JSON', async ({
    caseListPage,
    findCasePage,
    page,
  }) => {
    let searchRequestSeen = false;
    await page.unroute('**/data/internal/searchCases*');
    await page.route('**/data/internal/searchCases*', async (route) => {
      searchRequestSeen = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: SEARCH_CASE_MALFORMED_JSON_BODY,
      });
    });

    await caseListPage.navigateTo();
    await findCasePage.startFindCaseJourney(existingCaseReference, FIND_CASE_CASE_TYPE_LABEL, FIND_CASE_JURISDICTION_LABEL);

    expect(searchRequestSeen).toBeTruthy();
    await expect(page).not.toHaveURL(/\/cases\/case-details\//);
    await expect(findCasePage.searchResultsDataTable).toBeHidden();
    await expect(findCasePage.searchResultsTable.locator('a.govuk-link[href*="/cases/case-details/"]')).toHaveCount(0);
  });

  test('does not navigate to case details when searchCases request times out', async ({ caseListPage, findCasePage, page }) => {
    let searchRequestSeen = false;
    await page.unroute('**/data/internal/searchCases*');
    await page.route('**/data/internal/searchCases*', async (route) => {
      searchRequestSeen = true;
      await route.abort('timedout');
    });

    await caseListPage.navigateTo();
    await findCasePage.startFindCaseJourney(existingCaseReference, FIND_CASE_CASE_TYPE_LABEL, FIND_CASE_JURISDICTION_LABEL);

    expect(searchRequestSeen).toBeTruthy();
    await expect(page).not.toHaveURL(/\/cases\/case-details\//);
    await expect(findCasePage.searchResultsDataTable).toBeHidden();
    await expect(findCasePage.searchResultsTable.locator('a.govuk-link[href*="/cases/case-details/"]')).toHaveCount(0);
  });
});
