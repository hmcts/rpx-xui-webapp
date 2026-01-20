import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";
import { loadSessionCookies } from '../../../common/sessionCapture';
import c from "config";

test.describe("Document upload V2", () => {
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

    test("Check the documentV2 upload works as expected", async ({ createCasePage, caseDetailsPage }) => {

        await test.step("Verify case details tab does not contain an uploaded file", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Tab 1');
            const tableData = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.caseTab1Table);
            expect.soft(tableData).toMatchObject({ "Text Field": testValue });
        });

        await test.step("Upload a document to the case", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Tab 1');
            await caseDetailsPage.selectCaseAction('Update case');
            await createCasePage.uploadFile(testFileName, 'application/msword', 'Test Word document content');
            await createCasePage.continueButton.click();
            await createCasePage.continueButton.click();
            await createCasePage.continueButton.click();
            await createCasePage.continueButton.click();
            await createCasePage.submitButton.click();
        });

        await test.step("Verify the document upload was successful", async () => {
            expect.soft(await caseDetailsPage.caseAlertSuccessMessage.innerText()).toContain(`Case ${caseNumber} has been updated with event: Update case`);
            await caseDetailsPage.selectCaseDetailsTab('Tab 1');
            const tableData = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.caseTab1Table);
            expect.soft(tableData).toMatchObject({ "Text Field": testValue, "Document 1": testFileName });
        });
    });
});

test.describe("Document upload V1", () => {
    let testValue = faker.person.firstName();
    let caseNumber: string;
    const jurisdiction = 'EMPLOYMENT';
    const caseType = 'ET_EnglandWales';
    let sessionCookies: any[] = [];
    test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
        const { cookies } = loadSessionCookies('SEARCH_EMPLOYMENT_CASE');
        sessionCookies = cookies;
        if (sessionCookies.length) {
            await page.context().addCookies(sessionCookies);
        }
        await page.goto('/');
        await createCasePage.createCaseEmployment(jurisdiction, caseType, testValue);
        expect(await createCasePage.checkForErrorMessage(), "Error message seen after creating employment case").toBe(false);
        caseNumber = await caseDetailsPage.getCaseNumberFromAlert();
    });

    test("Check the documentV1 upload works as expected", async ({ createCasePage, caseDetailsPage, tableUtils, page }) => {

        await test.step("Verify case details tab does not contain an uploaded file", async () => {
            await caseDetailsPage.selectCaseAction('Upload Document');
        });

        await test.step("Upload a document to the case", async () => {
            await createCasePage.uploadEmploymentFile('test.pdf', 'application/pdf', 'Test PDF document content');
        });

        await test.step("Verify a document to the case", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Documents');
            await caseDetailsPage.caseActionGoButton.waitFor({ state: 'visible' });
            const table = await caseDetailsPage.trTableToObjectsInPage(caseDetailsPage.caseDocumentsTable);
            expect.soft(table[0]).toMatchObject({ "Number": '1', 'Document': 'test.pdf', 'Document Category': 'Misc', 'Type of Document': 'Other' });
        });
    });
});