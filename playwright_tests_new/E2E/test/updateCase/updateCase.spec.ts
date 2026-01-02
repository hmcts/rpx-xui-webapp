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
    page,

  }) => {
    let caseNumber: string;
    const textField0 = faker.lorem.word();
    await test.step("Create a case and validate the case number", async () => {
      await createCasePage.createDivorceCase("DIVORCE", "XUI Case PoC", textField0);
      await expect(createCasePage.exuiCaseDetailsComponent.caseHeader).toBeVisible();
      caseNumber = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
      validatorUtils.validateDivorceCaseNumber(caseNumber);
    });
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

    await test.step("Start Update Case event", async () => {
      await page.waitForSelector('#next-step')
      page.getByLabel("Next step").selectOption({ label: 'Update case' })
      await expect(page.getByLabel('Next step').locator('option:checked')).toHaveText('Update case');
      await Promise.all([
      page.getByRole('button', { name: 'Go' }).click(),
      ]);

    });
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
    await test.step("Verify update success banner", async () => {
    await expect(page.getByText(/Case #[\d-]+ has/i)).toBeVisible();

    });
    await test.step("Verify update event appears in history", async () => {
      await caseDetailsPage.openHistoryTab();
      const eventEntries = page.locator('ccd-event-log-details span.text-16', { hasText: 'Update case' });
      await expect(eventEntries.first()).toBeVisible();

    });
  });
});
