import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";

test.describe("Verify creating case flags works as expected", () => {
    test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
        await page.goto(config.urls.manageCaseBaseUrl);
        const { email, password } = userUtils.getUserCredentials("SOLICITOR");
        await idamPage.login({
            username: email,
            password: password,
        });
    });

    test("Verify creating a case flag works as expected", async ({ caseDetailsPage, createCasePage, page }) => {
        let caseNumber: string;
        let textField0 = faker.lorem.word();

        await test.step("Create a case", async () => {
            await createCasePage.createDivorceCase("DIVORCE", "XUI Case PoC", textField0);
            caseNumber = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
        });

        await test.step("Create a new case flag", async () => {
            await caseDetailsPage.selectCaseAction('Create case flag')
            await caseDetailsPage.exuiSpinnerComponent.wait();
            await caseDetailsPage.submitCaseFlagButton.click();
            await caseDetailsPage.exuiSpinnerComponent.wait();
        });
+
        await test.step("Find the created case flag in the case history", async () => {

            expect(await caseDetailsPage.caseAlertMessage.isVisible()).toBeTruthy();
            expect(await caseDetailsPage.caseAlertMessage.innerText()).toContain(`Case ${caseNumber} has been updated with event: Create case flag`);
        });
    });
});
