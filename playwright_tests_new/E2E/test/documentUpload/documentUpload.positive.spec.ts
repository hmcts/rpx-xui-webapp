import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";
import { loadSessionCookies } from '../../../common/sessionCapture';

test.describe("Document upload ", () => {
    let testValue = faker.person.firstName();
    let caseNumber: string;
    const jurisdiction = 'DIVORCE';
    const caseType = 'xuiTestCaseType';
    let sessionCookies: any[] = [];
    test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
        const { cookies } = loadSessionCookies('SOLICITOR');
        sessionCookies = cookies;
        if (sessionCookies.length) {
            await page.context().addCookies(sessionCookies);
        }
        await page.goto('/');
        await createCasePage.createDivorceCase(jurisdiction, caseType, testValue);
        caseNumber = await caseDetailsPage.getCaseNumberFromAlert();
    });

    test("Check the documentV2 upload works as expected", async ({ createCasePage, caseDetailsPage, page }) => {

        await test.step("Upload a document to the case", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Tab 1');
            await caseDetailsPage.selectCaseAction('Update case');

            await createCasePage.uploadFile('test.doc', 'application/msword', 'Fake Word document content');

            // const [fileChooser] = await Promise.all([
            //     page.waitForEvent('filechooser'),
            //     createCasePage.fileUploadInput.click()
            // ]);
            // await fileChooser.setFiles({
            //     name: 'test.doc',
            //     mimeType: 'application/msword',
            //     buffer: Buffer.from('Fake Word document content'),
            // });

            // await page.waitForResponse(r => r.url().includes('/documentv2') && r.request().method() === 'POST', { timeout: 10000 })
            //     .catch(() => null);
            // await page
            //     .locator(".error-message")
            //     .getByLabel('Uploading...')
            //     .waitFor({ state: "hidden" });

            await createCasePage.continueButton.click();
            await createCasePage.continueButton.click();
            await createCasePage.continueButton.click();
            await createCasePage.continueButton.click();
            await createCasePage.submitButton.click();

            expect.soft(await caseDetailsPage.caseAlertSuccessMessage.innerText()).toContain(`has been updated with event: Update case`);
  await caseDetailsPage.selectCaseDetailsTab('Tab 1');
        });
    })
});