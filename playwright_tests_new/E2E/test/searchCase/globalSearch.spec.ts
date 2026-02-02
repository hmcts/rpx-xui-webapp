import { test,expect } from "../../fixtures";
import { loadSessionCookies } from '../../../common/sessionCapture.ts';

// TODO New Case should be created using a API script.
const caseNumber = "1766581243916831";


test.describe("IDAM login using credentials for Global Search @KSM", () => {
  let sessionCookies: any[] = [];
  test.beforeEach(async ({ page, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { cookies } = loadSessionCookies('FPL_GLOBAL_SEARCH');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }
    await page.goto('/');
  });

  test("Global Search - using caseId and FPL Jurisdiction", async ({globalSearchPage,caseDetailsPage,tableUtils }) => {
    await test.step("Initiate Global Search  ", async () => {

      await globalSearchPage.performGlobalSearchWithCase(caseNumber,'PUBLICLAW');
     const  searchResultsTable = await tableUtils.mapExuiTable(globalSearchPage.searchResultTable);

      if(searchResultsTable === null) {
        console.error('searchResultsTable must be present for Global Search to work.');
      }

      const expectedSearchResult = {
        "Case": "e2e case\n1766581243916831",
        "Service": "Public Law",
        "State": "Case management",
        "Location": "Royal Courts of Justice"
      }
     expect(searchResultsTable[0]).toMatchObject(expectedSearchResult);
   });

    await test.step("Check that case details page is shown. ", async () => {
      await globalSearchPage.viewCaseDetails();

      const tabsCount = await caseDetailsPage.tabsCount.count();
      expect(tabsCount == 16);

      expect.soft(caseDetailsPage.caseSummaryHeading).toHaveText('Case information');

      await caseDetailsPage.caseActionsDropdown.waitFor();
      await caseDetailsPage.caseActionGoButton.waitFor();
      expect.soft(caseDetailsPage.caseActionsDropdown).toBeVisible();
      expect.soft(caseDetailsPage.caseActionGoButton).toBeVisible();
      expect.soft(caseDetailsPage.extend26WeekTimelineLink).toBeVisible()
    });
  });

  test("Global Search (Partial) - using '*' wildcard on caseNumeber and party name ", async ({globalSearchPage , page, tableUtils}) => {
    await test.step("Initiate wildcard Global Search  ", async () => {
      await globalSearchPage.searchLinkOnMenuBar.click();
      await globalSearchPage.caseIdTextBox.click();
      // search with first 5 digits of valid case id Ex : 15665*
      const first5Digits = caseNumber.substring(0,5);
      await globalSearchPage.caseIdTextBox.fill(`${first5Digits}*`);
      await globalSearchPage.applicantOrPartyName.fill('Will*');
      await globalSearchPage.servicesOption.selectOption('PUBLICLAW');
      await globalSearchPage.searchButton.click();
    });

    await test.step("Verify wildcard (*) search results ", async () => {
      expect(globalSearchPage.searchResultsHeader).toHaveText('Search results');

      // Check Pagination links
      const paginationLinkPreviousPage = globalSearchPage.paginationLinks.nth(0);
      const paginationLinkNextPage  = globalSearchPage.paginationLinks.nth(1);
      expect(paginationLinkPreviousPage).toHaveText('Previous page');
      expect(paginationLinkNextPage).toHaveText('Next page');
      expect(paginationLinkNextPage).toHaveAttribute('href');

      expect(globalSearchPage.searchResultsHeader.isVisible());
      expect(globalSearchPage.changeSearchLink
            .filter({ has: page.getByRole('link', { name: ' Change search ' }) })
            .isVisible());

      const  table = await tableUtils.mapExuiTable(globalSearchPage.searchResultsTable);

      if( table === null) {
        throw new Error('SearchResultsTable must be present for a valid Global Search');
      }else {
        for (const eachRow of table) {
          expect(eachRow).toMatchObject({
            Case: expect.any(String),
            Service: 'Public Law',
            State: expect.stringMatching('Submitted|Case management|Gatekeeping|Closed'),
            Location: expect.any(String)
          });
        }
      }
    });
  });
});
