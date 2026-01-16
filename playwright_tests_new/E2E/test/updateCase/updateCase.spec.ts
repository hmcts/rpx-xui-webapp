import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";
import { executablePath } from "puppeteer";
import { table } from "console";


test.describe("Verify creating and updating a case works as expected", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { email, password } = userUtils.getUserCredentials("SOLICITOR");
    await idamPage.login({ username: email, password });
  });

  test("Create, update and verify case history", async ({
    createCasePage,
    caseDetailsPage,
    tableUtils,

  }) => {
    let caseNumber: string;
    const updatedFirstName = faker.person.firstName();
    const updatedLastName = faker.person.lastName();
    const textField0 = faker.lorem.word();
    await test.step("Create a case and validate the case number", async () => {
      await createCasePage.createDivorceCase("DIVORCE", "XUI Case PoC", textField0);
      await expect(createCasePage.exuiCaseDetailsComponent.caseHeader).toBeVisible();
      caseNumber = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();

    });
    await test.step("Start Update Case event", async () => {
      await caseDetailsPage.selectCaseAction('Update case');

    });
    await test.step("Update case fields", async () => {
      await createCasePage.person2FirstName.fill(updatedFirstName);
      await createCasePage.person2LastName.fill(updatedLastName);
      await createCasePage.continueButton.click();
      await createCasePage.submitButton.click();

    });
    await test.step("Verify update success banner", async () => {
      expect.soft(await caseDetailsPage.caseAlertSuccessMessage.innerText()).toContain(`Case ${caseNumber} has been updated with event: Update case`);
    });

    await test.step("Verify the 'Some more data' tab has updated names correctly", async () => {
      await caseDetailsPage.selectCaseDetailsTab('Some more data');
      const labels = ['First Name', 'Last Name'];

      for (const label of labels) {
        const row = caseDetailsPage.page.locator('.complex-panel-table tr',{has: caseDetailsPage.page.locator(`th span:text-is("${label}")`) }
        );
        const cell = row.locator('td').first();
        await expect(cell, `${label} should be visible`).toBeVisible();
        await expect(cell, `${label} should not be empty`).not.toHaveText('');
        
      }
    });
    await test.step('Verify that event details are shown on the History tab', async () => {
      await caseDetailsPage.openHistoryTab('History');
      const rows = await caseDetailsPage.mapHistoryTable();

      const updateRow = rows.find(r => r['Event']?.trim() === 'Update case');
      const expectedDetails = {
        Date: await caseDetailsPage.todaysDateFormatted(),
        'End state': 'Case created',
        Event: 'Update case',
        Summary: '-',
        Comment: '-',
      };

      for (const [label, expectedValue] of Object.entries(expectedDetails)) {
        const actualValue = await caseDetailsPage.getDetailField(label);
        expect(actualValue, `${label} value mismatch`).toBe(expectedValue);

      };
    });
  });
})
