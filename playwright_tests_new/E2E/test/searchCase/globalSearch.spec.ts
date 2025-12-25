import { test,expect } from "../../fixtures";

test.describe("IDAM login using credentials from appTestConfig ", () => {
  test.beforeEach(async ({ idamPage, globalSearchPage,page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    // MC User who can see the 'Search Case' link.
    const { email, password } = userUtils.getUserCredentials("FPL_GS");
    await idamPage.login({
      username: email,
      password: password,
    });
  });

  test("Global Search - using a FPL Case @KSM ", async ({ page, validatorUtils, globalSearchPage,caseDetailsPage }) => {
      let caseNumber = "";
      await test.step("Initiate Global Search  ", async () => {
      // TODO New Case should be created using a API script preferably
      caseNumber = "1766581243916831";
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
});
