import { test,expect } from "../../fixtures";

// TODO New Case should be created using a API script.
const caseNumber = "1766581243916831";

test.describe("IDAM login using credentials for Global Search", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { email, password } = userUtils.getUserCredentials("FPL_GS");
    await idamPage.login({
      username: email,
      password: password,
    });
  });

  test("Global Search - using caseId and FPL Jurisdiction", async ({ page, globalSearchPage,caseDetailsPage }) => {
    await test.step("Initiate Global Search  ", async () => {
      await globalSearchPage.performGlobalSearchWithCase(caseNumber);
      expect(globalSearchPage.changeSearchLink.filter({ hasText: 'Change search'}).isVisible());
      expect(globalSearchPage.viewLink.filter({ hasText: 'View'}).isVisible());
    });

    await test.step("Click View link to see Search Results page", async () => {
      await globalSearchPage.verifySearchResults(caseNumber);
      expect(globalSearchPage.summaryHeading.isVisible);
    });

    await test.step("Verify Case details ", async () => {
      await globalSearchPage.verifyCaseDetails(caseNumber);
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
