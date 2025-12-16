import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";


test.describe("IDAM login using credentials from appTestConfig", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    // this should be a DIVORCE  user who can see 16 Digit Search link on TopRight
    // And who can see the  'Find Case' link  and 'Search' link on the TopMenu
    const { email, password } = userUtils.getUserCredentials("STAFF_ADMIN");
    await idamPage.login({
      username: email,
      password: password,
    });
  });


  test("Verify 16 digit Case search  @KS", async ({ page, validatorUtils, searchCasePage,caseListPage,createCasePage }) => {
    let caseNumber = " ";
    let textField0 = faker.lorem.word();

    await test.step("Create a new case and validate the case number", async () => {
      //await createCasePage.createDivorceCase("DIVORCE", "XUI Case PoC", textField0);
      //expect.soft(createCasePage.exuiCaseDetailsComponent.caseHeader).toBeInViewport();
      //caseId = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
      let caseNumber = "1655910307607537";
      //validatorUtils.validateDivorceCaseNumber(caseNumber);
    });

    await searchCasePage.searchWith16DigitCaseId(caseNumber , page)});



});
