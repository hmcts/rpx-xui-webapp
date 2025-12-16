import { faker } from "@faker-js/faker";
import { test } from "../../fixtures";


test.describe("IDAM login using credentials from appTestConfig @KS", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    // this should be a DIVORCE  user who can see 16 Digit Search link on TopRight
    // And who can see the  'Find Case' link  and 'Search' link on the TopMenu
    const { email, password } = userUtils.getUserCredentials("SEARCH_EMPLOYMENT_CASE");
    await idamPage.login({
      username: email,
      password: password,
    });
  });


  test("Verify Global Search - ET @KS", async ({ page, validatorUtils, globalSearchPage,caseListPage,createCasePage }) => {
    let caseNumber = " ";
    let textField0 = faker.lorem.word();

    await test.step("Create a new case - (ET) ", async () => {
      //await createCasePage.createDivorceCase("DIVORCE", "XUI Case PoC", textField0);
      //expect.soft(createCasePage.exuiCaseDetailsComponent.caseHeader).toBeInViewport();
      //caseId = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
      let caseNumber = "1744822619841345";
      //validatorUtils.validateDivorceCaseNumber(caseNumber);
    });

    await globalSearchPage.search(caseNumber , page)});

});
