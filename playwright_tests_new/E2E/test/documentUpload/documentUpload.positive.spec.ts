import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";
import { loadSessionCookies } from '../../../common/sessionCapture';
import { TableUtils } from "@hmcts/playwright-common";

test.describe("Document upload ", () => {
    let testValue = faker.person.firstName();
    let testFileName = 'test.doc';
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

    test("Check the documentV2 upload works as expected", async ({ tableUtils, createCasePage, caseDetailsPage }) => {

        await test.step("Verify case details tab does not contain an uploaded file", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Tab 1');
            const tableData = await tableUtils.mapExuiTable(await caseDetailsPage.getTableElementByClassName('tab1'));
            expect.soft(tableData[0]).toMatchObject({ "Text Field": testValue });
        });

        await test.step("Upload a document to the case", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Tab 1');
            await caseDetailsPage.selectCaseAction('Update case');
            await createCasePage.uploadFile(testFileName, 'application/msword', 'Fake Word document content');
            await createCasePage.continueButton.click();
            await createCasePage.continueButton.click();
            await createCasePage.continueButton.click();
            await createCasePage.continueButton.click();
            await createCasePage.submitButton.click();
        });

        await test.step("Verify the document upload was successful", async () => {
            expect.soft(await caseDetailsPage.caseAlertSuccessMessage.innerText()).toContain(`Case ${caseNumber} has been updated with event: Update case`);
            await caseDetailsPage.selectCaseDetailsTab('Tab 1');
            const tableData = await tableUtils.mapExuiTable(await caseDetailsPage.getTableElementByClassName('tab1'));
            expect.soft(tableData[0]).toMatchObject({ "Text Field": testValue, "Document 1": testFileName });
        });
    });
});