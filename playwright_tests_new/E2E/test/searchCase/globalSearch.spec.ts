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

  test("Global Search - using caseId and FPL Jurisdiction", async ({ page, globalSearchPage,caseDetailsPage }) => {
    await test.step("Initiate Global Search  ", async () => {
      await globalSearchPage.performGlobalSearchWithCase(caseNumber);
      expect(globalSearchPage.changeSearchLink.filter({ hasText: 'Change search'}).isVisible());
      expect(globalSearchPage.viewLink.filter({ hasText: 'View'}).isVisible());
    });

    await test.step("Check results page for links to be present ", async () => {
      await globalSearchPage.verifySearchResults();
      expect(globalSearchPage.summaryHeading.isVisible);
    });

    await test.step("Verify Case details ", async () => {
      await globalSearchPage.verifyCaseDetails();
      expect(caseDetailsPage.container).toBeTruthy();
    });
});

  test("Global Search (Partial) - using '*' wildcard on caseNumeber and party name ", async ({ page,  globalSearchPage }) => {
    await test.step("Initiate wildcard Global Search  ", async () => {
      await globalSearchPage.performPartialSearchOfCaseIdAndPartyName(caseNumber);
      await globalSearchPage.verifyWildCardSearchResults(caseNumber);
    });
  });
});
