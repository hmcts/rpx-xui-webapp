import { faker } from "@faker-js/faker";
import { test } from "../../fixtures";


test.describe("IDAM login using credentials from appTestConfig ", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    // MC User who can see the 'Search Case' link.
    const { email, password } = userUtils.getUserCredentials("SEARCH_EMPLOYMENT_CASE");
    await idamPage.login({
      username: email,
      password: password,
    });
  });


  test("Verify Global Search - ET ", async ({ page, validatorUtils, globalSearchPage,caseListPage,createCasePage }) => {
    let caseNumber = "";

    await test.step("Create a new case - (ET) ", async () => {
      // TODO case should be created from API script.
      caseNumber = "1741185283110600";
            //validatorUtils.validateDivorceCaseNumber(caseNumber);
    });
    await globalSearchPage.performGlobalSearchFor(caseNumber)});

    await globalSearchPage.searchResultsPageHeading.isVisible();

});
