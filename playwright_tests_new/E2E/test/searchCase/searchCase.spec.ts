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


  test("Search by 16-digit case reference", async ({page,caseDetailsPage,searchCasePage }) => {
    let caseNumber="";

    await test.step("16 Digit Search ", async () => {
      // TODO case should be created from API script.
      caseNumber = "1767862749263830";
      await searchCasePage.searchWith16DigitCaseId(caseNumber)});
      await searchCasePage.searchResultsPageHeading.isVisible();
      await searchCasePage.caseResultsForHeading.isVisible();
      await searchCasePage.caseHearingCentre.isVisible();
      await searchCasePage.appealReference.isVisible()
      await expect(searchCasePage.searchResultsPageHeading).toContainText('Current progress of the case');
      expect(caseDetailsPage.container).toBeTruthy();
  });
});
