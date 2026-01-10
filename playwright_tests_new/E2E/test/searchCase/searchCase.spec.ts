import { expect, test } from "../../fixtures";

test.describe("IDAM login to trigger For 16 digit Case Search", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { email, password } = userUtils.getUserCredentials("STAFF_ADMIN");
    await idamPage.login({
      username: email,
      password: password,
    });
  });


  test("Test for 16 digit Case search  @KS", async ({caseDetailsPage,searchCasePage }) => {
    let pageUrl="";
    let caseNumber="";

    await test.step("16 Digit Search ", async () => {
      // TODO case should be created from API script.
      caseNumber = "1766581243916831";
      await searchCasePage.searchWith16DigitCaseId(caseNumber)});
      await searchCasePage.searchResultsPageHeading.isVisible();
      await searchCasePage.caseResultsForHeading.isVisible();
      await searchCasePage.caseHearingCentre.isVisible();
      await searchCasePage.appealReference.isVisible()
      await expect(searchCasePage.searchResultsPageHeading).toContainText('Current progress of the case');
      expect(caseDetailsPage.container).toBeTruthy();
     //expect(page.url()).toStrictEqual('/case-details/IA/Asylum/${caseNumber}/#Overview');
  });
});
