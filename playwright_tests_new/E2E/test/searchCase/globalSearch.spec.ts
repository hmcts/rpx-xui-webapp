import { test,expect } from "../../fixtures";

// TODO New Case should be created using a API script preferably
const caseNumber = "1766581243916831";

test.describe("IDAM login using credentials for Global Search ", () => {
  test.beforeEach(async ({ idamPage, globalSearchPage,page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    // MC User who can see the 'Search Case' link.
    const { email, password } = userUtils.getUserCredentials("FPL_GS");
    await idamPage.login({
      username: email,
      password: password,
    });
  });

  test("Global Search - using caseId and FPL Jurisdiction @KSM ", async ({ page, validatorUtils, globalSearchPage,caseDetailsPage }) => {
      await test.step("Initiate Global Search  ", async () => {
      await globalSearchPage.performGlobalSearchWithCase(caseNumber);
      expect(globalSearchPage.changeSearchLink.filter({ hasText: 'Change search'}).isVisible());
      expect(globalSearchPage.viewLink.filter({ hasText: 'View'}).isVisible());
    });

    await test.step("Check Search Result screen", async () => {
      await globalSearchPage.verifySearchResults(caseNumber);
      expect(globalSearchPage.summaryHeading.isVisible);
    });

    await test.step("Click 'View' link and verify Case detail page ", async () => {
      await globalSearchPage.verifyCaseDetails(caseNumber);
      expect(caseDetailsPage.container).toBeTruthy();
    });
});

  test("Global Search - using '*' wildcard  and FPL Jurisdiction @KSM ", async ({ page, validatorUtils, globalSearchPage,caseDetailsPage }) => {
    await test.step("Initiate wildcard Global Search  ", async () => {
      // TODO New Case should be created using a API script preferably
      await globalSearchPage.performGlobalSearchWithCase(caseNumber, true);
      expect(globalSearchPage.changeSearchLink.filter({ hasText: 'Change search'}).isVisible());
      expect(globalSearchPage.viewLink.filter({ hasText: 'View'}).isVisible());
    });

    await test.step("Check Search Result screen", async () => {
      await globalSearchPage.verifySearchResults(caseNumber);
      expect(globalSearchPage.summaryHeading.isVisible);
    });

    await test.step("Click 'View' link and verify Case detail page ", async () => {
      await globalSearchPage.verifyCaseDetails(caseNumber);
      expect(caseDetailsPage.container).toBeTruthy();
    });
  });


});
