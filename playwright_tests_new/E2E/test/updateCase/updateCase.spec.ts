import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";


test.describe("Verify creating and updating a case works as expected", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { email, password } = userUtils.getUserCredentials("SOLICITOR");
    await idamPage.login({ username: email, password });
  });
  test("Create, update and verify case history", async ({
    validatorUtils,
    createCasePage,
    caseListPage,
    caseDetailsPage,
    page
 }) => {
    let caseNumber: string;
    const textField0 = faker.lorem.word();
    // Create Case
    await test.step("Create a case and validate the case number", async () => {
      await createCasePage.createDivorceCase("DIVORCE", "XUI Case PoC", textField0);
      await expect(createCasePage.exuiCaseDetailsComponent.caseHeader).toBeVisible();
      caseNumber = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
      validatorUtils.validateDivorceCaseNumber(caseNumber);
    });
    //Find and open the case
    await test.step("Find the created case in the case list", async () => {
      await caseListPage.goto();
      await caseListPage.searchByJurisdiction("Family Divorce");
      await caseListPage.searchByCaseType("XUI Case PoC");
      await caseListPage.searchByTextField0(textField0);
      await caseListPage.exuiCaseListComponent.searchByCaseState("Case created");
      await caseListPage.applyFilters();
    });
    await test.step("Open the created case", async () => {
      const cleanedCaseNumber = caseNumber.replace(/^#/, "");
      await caseListPage.openCaseByReference(cleanedCaseNumber);
    });
    //Start Update Case event
    await test.step("Start Update Case event", async () => {
      await page.waitForSelector('#next-step')
      await page.getByLabel("Next step").selectOption("3: Object");
      await page.waitForTimeout(2000)
      await page.getByRole("button", { name: "Go" }).click();

    });
    // Update Case
    await test.step("Update case fields", async () => {
      await page
        .locator("#Person2_FirstName")
        .fill("test");
      await page
        .locator("#Person2_LastName")
        .fill("test street");
      await page.getByRole("button", { name: "Continue" }).click();
      await page.getByRole("button", { name: "Submit" }).click();

    });
    // Verify update success banner
    await test.step("Verify update success banner", async () => {
      await expect(page.getByText(/Case #[\d-]+ has/i)).toBeVisible();
    });
    // Check History Tab
    await test.step("Verify update event appears in history", async () => {
      await caseDetailsPage.openHistoryTab();
      const eventEntries = page.locator('ccd-event-log-details span.text-16', { hasText: 'Update case' });
      await expect(eventEntries.first()).toBeVisible();

    });
  });
});