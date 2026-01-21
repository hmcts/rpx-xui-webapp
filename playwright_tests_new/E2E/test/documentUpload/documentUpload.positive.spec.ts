import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";
import { ensureSession, loadSessionCookies } from '../../../common/sessionCapture';
import { TEST_DATA } from './constants';
import { createLogger } from '@hmcts/playwright-common';

const logger = createLogger({ serviceName: 'document-upload-tests', format: 'pretty' });

test.describe("Document upload V2", () => {
    let testValue: string;
    let caseNumber: string;
    let sessionCookies: any[] = [];
    
    test.beforeAll(async () => {
        // Lazy capture: only log in SOLICITOR when this test runs
        await ensureSession('SOLICITOR');
        // Set deterministic seed once per suite
        faker.seed(12345);
    });
    
    test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
        // Generate fresh value per test for retry safety
        testValue = `${faker.person.firstName()}-${Date.now()}-w${process.env.TEST_WORKER_INDEX || '0'}`;
        logger.info('Generated test value', { testValue, worker: process.env.TEST_WORKER_INDEX });
        
        const { cookies } = loadSessionCookies('SOLICITOR');
        sessionCookies = cookies;
        if (sessionCookies.length) {
            await page.context().addCookies(sessionCookies);
        }
        await page.goto('/');
        await createCasePage.createDivorceCase(TEST_DATA.V2.JURISDICTION, TEST_DATA.V2.CASE_TYPE, testValue);
        caseNumber = await caseDetailsPage.getCaseNumberFromAlert();
        logger.info('Created divorce case', { caseNumber, testValue });
    });

    test("Check the documentV2 upload works as expected", async ({ createCasePage, caseDetailsPage }) => {

        await test.step("Verify case details tab does not contain an uploaded file", async () => {
            await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME);
            const tableData = await caseDetailsPage.getCaseDetailsTabData(TEST_DATA.V2.TAB_CLASS);
            expect(tableData).toMatchObject({ [TEST_DATA.V2.TEXT_FIELD_LABEL]: testValue });
        });

        await test.step("Upload a document to the case", async () => {
            await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME);
            await caseDetailsPage.selectCaseAction(TEST_DATA.V2.ACTION);
            await createCasePage.uploadFile(TEST_DATA.V2.FILE_NAME, TEST_DATA.V2.FILE_TYPE, TEST_DATA.V2.FILE_CONTENT);
            await createCasePage.clickContinueMultipleTimes(4);
            await createCasePage.submitButton.click();
        });

        await test.step("Verify the document upload was successful", async () => {
            expect(await caseDetailsPage.caseAlertSuccessMessage.innerText()).toContain(`Case ${caseNumber} has been updated with event: ${TEST_DATA.V2.ACTION}`);
            await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME);
            const tableData = await caseDetailsPage.getCaseDetailsTabData(TEST_DATA.V2.TAB_CLASS);
            expect(tableData).toMatchObject({ 
                [TEST_DATA.V2.TEXT_FIELD_LABEL]: testValue, 
                [TEST_DATA.V2.DOCUMENT_FIELD_LABEL]: TEST_DATA.V2.FILE_NAME 
            });
        });
    });
});

test.describe("Document upload V1", () => {
    let testValue: string;
    let testFileName: string;
    let caseNumber: string;
    let sessionCookies: any[] = [];
    
    test.beforeAll(async () => {
        // Lazy capture: only log in SEARCH_EMPLOYMENT_CASE when this test runs
        await ensureSession('SEARCH_EMPLOYMENT_CASE');
        // Set deterministic seed once per suite
        faker.seed(67890);
    });
    
    test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
        // Generate fresh values per test for retry safety
        testValue = `${faker.person.firstName()}-${Date.now()}-w${process.env.TEST_WORKER_INDEX || '0'}`;
        testFileName = `${faker.string.alphanumeric(8)}-${Date.now()}.pdf`;
        logger.info('Generated test values', { testValue, testFileName, worker: process.env.TEST_WORKER_INDEX });
        
        const { cookies } = loadSessionCookies('SEARCH_EMPLOYMENT_CASE');
        sessionCookies = cookies;
        if (sessionCookies.length) {
            await page.context().addCookies(sessionCookies);
        }
        await page.goto('/');
        await createCasePage.createCaseEmployment(TEST_DATA.V1.JURISDICTION, TEST_DATA.V1.CASE_TYPE, testValue);
        expect(await createCasePage.checkForErrorMessage(), "Error message seen after creating employment case").toBe(false);
        caseNumber = await caseDetailsPage.getCaseNumberFromAlert();
        logger.info('Created employment case', { caseNumber, testValue });
    });

    test("Check the documentV1 upload works as expected", async ({ createCasePage, caseDetailsPage }) => {

        await test.step("Start document upload process", async () => {
            await caseDetailsPage.selectCaseDetailsEvent(TEST_DATA.V1.ACTION);
        });

        await test.step("Upload a document to the case", async () => {
            await createCasePage.uploadEmploymentFile(testFileName, TEST_DATA.V1.FILE_TYPE, TEST_DATA.V1.FILE_CONTENT);
        });

        await test.step("Verify document was uploaded successfully", async () => {
            await caseDetailsPage.selectCaseDetailsTab('Documents');
            await caseDetailsPage.caseActionGoButton.waitFor({ state: 'visible' });
            const table = await caseDetailsPage.getDocumentsList();
            expect(table.length, 'Documents table should contain at least 1 row').toBeGreaterThan(0);
            expect(table[0]).toMatchObject({ "Number": '1', 'Document': testFileName, 'Document Category': 'Misc', 'Type of Document': 'Other' });
        });
    });
});