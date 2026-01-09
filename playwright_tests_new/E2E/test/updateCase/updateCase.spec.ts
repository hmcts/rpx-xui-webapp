import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";
import { executablePath } from "puppeteer";


test.describe("Verify creating and updating a case works as expected", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { email, password } = userUtils.getUserCredentials("SOLICITOR");
    await idamPage.login({ username: email, password });
  });
  test("Create, update and verify case history", async ({
    createCasePage,
    caseDetailsPage,

  }) => {
    let caseNumber: string;
    const textField0 = faker.lorem.word();
    await test.step("Create a case and validate the case number", async () => {
      await createCasePage.createDivorceCase("DIVORCE", "XUI Case PoC", textField0);
      await expect(createCasePage.exuiCaseDetailsComponent.caseHeader).toBeVisible();
      caseNumber = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
    
    });
    /*await test.step("Find the created case in the case list", async () => {
      await caseListPage.goto();
      await caseListPage.searchByJurisdiction("Family Divorce");
      await caseListPage.searchByCaseType("XUI Case PoC");
      await caseListPage.searchByTextField0(textField0);
      await caseListPage.exuiCaseListComponent.searchByCaseState("Case created");
      await caseListPage.applyFilters();
      */

    // });
    // await test.step("Open the created case", async () => {
    //   const cleanedCaseNumber = caseNumber.replace(/^#/, "");
    //   await caseListPage.openCaseByReference(cleanedCaseNumber);
    // });

    await test.step("Start Update Case event", async () => {
      await caseDetailsPage.selectCaseAction('Update case')

    });
    await test.step("Update case fields", async () => {
      await caseDetailsPage.startUpdateCase('test', 'test street');
    });

    await test.step("Verify update success banner", async () => {
    expect(caseDetailsPage.caseAlertMessage)
    await this.caseAlertMessage.isVisible()

    });
    await test.step("Verify update event appears in history", async () => {
      await caseDetailsPage.validateUpdateEventHistory();

    });
  });
});
