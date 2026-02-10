import { test, expect } from '../../fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture.ts';

test.describe('IDAM login using credentials for Global Search', () => {
  let availableCaseReference = '';
  let sessionCookies: any[] = [];
  test.beforeEach(async ({ page, config, caseListPage }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { cookies } = loadSessionCookies('FPL_GLOBAL_SEARCH');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }

    await caseListPage.goto();
    await caseListPage.searchByJurisdiction('Public Law');
    await caseListPage.searchByCaseType('Public Law Applications');
    await caseListPage.applyFilters();
    availableCaseReference = await caseListPage.getRandomCaseReferenceFromResults();
    await page.goto('/');
  });

  test('Global Search - using case id and FPL jurisdiction', async ({ globalSearchPage, caseDetailsPage, tableUtils }) => {
    const caseNumber = availableCaseReference;

    await test.step('Initiate Global Search  ', async () => {
      await globalSearchPage.performGlobalSearchWithCase(caseNumber, 'PUBLICLAW');
      const searchResultsTable = await tableUtils.mapExuiTable(globalSearchPage.searchResultTable);

      if (searchResultsTable === null) {
        throw new Error('searchResultsTable must be present for Global Search to work.');
      }

      expect(searchResultsTable.length).toBeGreaterThan(0);
      expect(searchResultsTable[0]).toMatchObject({
        Case: expect.stringContaining(caseNumber),
        Service: 'Public Law',
        State: expect.any(String),
        Location: expect.any(String),
      });
    });

    await test.step('Check that case details page is shown. ', async () => {
      await globalSearchPage.viewCaseDetails();

      const tabsCount = await caseDetailsPage.tabsCount.count();
      expect(tabsCount).toBeGreaterThan(0);

      await expect.soft(caseDetailsPage.caseSummaryHeading).toHaveText('Case information');

      await caseDetailsPage.caseActionsDropdown.waitFor();
      await caseDetailsPage.caseActionGoButton.waitFor();
      await expect.soft(caseDetailsPage.caseActionsDropdown).toBeVisible();
      await expect.soft(caseDetailsPage.caseActionGoButton).toBeVisible();
      await expect.soft(caseDetailsPage.extend26WeekTimelineLink).toBeVisible();
    });
  });

  test("Global Search (Partial) - using '*' wildcard on case number", async ({
    globalSearchPage,
    tableUtils,
  }) => {
    await test.step('Initiate wildcard Global Search  ', async () => {
      await globalSearchPage.performPartialSearchOfCaseIdAndPartyName(availableCaseReference, undefined, 'PUBLICLAW');
    });

    await test.step('Verify wildcard (*) search results ', async () => {
      await expect(globalSearchPage.searchResultsHeader).toHaveText('Search results');
      await expect(globalSearchPage.changeSearchLink.filter({ hasText: 'Change search' })).toBeVisible();
      await expect(globalSearchPage.viewLink).toBeVisible();

      // Check Pagination links
      const paginationLinkPreviousPage = globalSearchPage.paginationLinks.nth(0);
      const paginationLinkNextPage = globalSearchPage.paginationLinks.nth(1);
      await expect(paginationLinkPreviousPage).toHaveText('Previous page');
      await expect(paginationLinkNextPage).toHaveText('Next page');
      await expect(paginationLinkNextPage).toHaveAttribute('href');

      const table = await tableUtils.mapExuiTable(globalSearchPage.searchResultsTable);

      if (table === null) {
        throw new Error('SearchResultsTable must be present for a valid Global Search');
      } else {
        expect(table.length).toBeGreaterThan(0);
        for (const eachRow of table) {
          expect(eachRow).toMatchObject({
            Case: expect.any(String),
            Service: 'Public Law',
            State: expect.stringMatching('Submitted|Case management|Gatekeeping|Closed'),
            Location: expect.any(String),
          });
        }
      }
    });
  });
});
