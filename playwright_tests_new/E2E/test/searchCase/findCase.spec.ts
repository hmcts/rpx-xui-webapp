import { test,expect } from "../../fixtures";

// TODO New Case should be created using a API script.
const caseNumber = "1766581243916831";

test.describe("IDAM login for Find Search page @KSM", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { email, password } = userUtils.getUserCredentials("FPL_CAFCASS");
    await idamPage.login({
      username: email,
      password: password,
    });
  });

  test("Find Case using caseId in FPL / Public law application Casetype", async ({ page, findCasePage,caseDetailsPage }) => {
    await test.step("Initial Step 1  ", async () => {
      await findCasePage.startFindCaseJourney();
      //expect(findCasePage.changeSearchLink.filter({ hasText: 'Change search'}).isVisible());
      //expect(findCasePage.viewLink.filter({ hasText: 'View'}).isVisible());
    });
    // await test.step("Click View link to see Search Results page", async () => {
    //   await globalSearchPage.verifySearchResults(caseNumber);
    //   expect(globalSearchPage.summaryHeading.isVisible);
    // });
    // await test.step("Verify Case details ", async () => {
    //   await globalSearchPage.verifyCaseDetails(caseNumber);
    //   expect(caseDetailsPage.container).toBeTruthy();
    // });
    //
});

  // test("Initial Step 2 ", async ({ page,  globalSearchPage }) => {
  //   // await test.step("Initiate wildcard Global Search  ", async () => {
  //   //   await globalSearchPage.performPartialSearchOfCaseIdAndPartyName(caseNumber);
  //   //   await globalSearchPage.verifyWildCardSearchResults(caseNumber);
  //   // });
  // });
});
