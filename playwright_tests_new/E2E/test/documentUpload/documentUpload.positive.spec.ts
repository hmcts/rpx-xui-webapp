import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { TEST_DATA } from './constants';
import { expectCaseBanner } from '../../utils';
import { createLogger } from '@hmcts/playwright-common';
import { isTransientWorkflowFailure } from '../../utils/transient-failure.utils';

const logger = createLogger({ serviceName: 'document-upload-tests', format: 'pretty' });

test.describe('Document upload V2', () => {
  test.describe.configure({ timeout: 120000 });
  let testValue: string;
  let caseNumber: string;
  test.beforeAll(async () => {
    // Set deterministic seed once per suite
    faker.seed(12345);
  });

  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
    // Generate fresh value per test for retry safety
    testValue = `${faker.person.firstName()}-${Date.now()}-w${process.env.TEST_WORKER_INDEX || '0'}`;
    logger.info('Generated test value', { testValue, worker: process.env.TEST_WORKER_INDEX });

    await ensureAuthenticatedPage(page, 'SOLICITOR', { waitForSelector: 'exui-header' });
    await createCasePage.createDivorceCase(TEST_DATA.V2.JURISDICTION, TEST_DATA.V2.CASE_TYPE, testValue);
    caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
    logger.info('Created divorce case', { caseNumber, testValue });
  });

  test('Check the documentV2 upload works as expected', async ({ createCasePage, caseDetailsPage }) => {
    await test.step('Verify case details tab does not contain an uploaded file', async () => {
      await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME);
      const textFieldRow = await caseDetailsPage.getCaseViewerRowByName(TEST_DATA.V2.TEXT_FIELD_LABEL);
      await expect(textFieldRow).toContainText(testValue);
    });

    await test.step('Upload a document to the case', async () => {
      const caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();
      const maxAttempts = 2;
      for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME);
        await caseDetailsPage.selectCaseAction(TEST_DATA.V2.ACTION, {
          expectedLocator: createCasePage.fileUploadInput,
          timeoutMs: 30000,
        });
        await createCasePage.uploadFile(TEST_DATA.V2.FILE_NAME, TEST_DATA.V2.FILE_TYPE, TEST_DATA.V2.FILE_CONTENT);
        try {
          await createCasePage.clickSubmitAndWait('after uploading document (V2)', { timeoutMs: 60000 });
          break;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          const isTransientSubmitFailure = isTransientWorkflowFailure(error);
          if (!isTransientSubmitFailure || attempt === maxAttempts) {
            throw error;
          }
          logger.warn('Document V2 upload failed due transient event creation error; retrying event', {
            attempt,
            maxAttempts,
            message: message.slice(0, 250),
          });
          await caseDetailsPage.reopenCaseDetails(caseDetailsUrl);
        }
      }
    });

    await test.step('Verify the document upload was successful', async () => {
      const bannerText = await caseDetailsPage.caseAlertSuccessMessage.innerText();
      expectCaseBanner(bannerText, caseNumber, `has been updated with event: ${TEST_DATA.V2.ACTION}`);
      await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME);
      const textFieldRow = await caseDetailsPage.getCaseViewerRowByName(TEST_DATA.V2.TEXT_FIELD_LABEL);
      await expect(textFieldRow).toContainText(testValue);
      const documentFieldRow = await caseDetailsPage.getCaseViewerRowByName(TEST_DATA.V2.DOCUMENT_FIELD_LABEL);
      await expect(documentFieldRow).toContainText(TEST_DATA.V2.FILE_NAME);
    });
  });
});

test.describe('Document upload V1', () => {
  test.describe.configure({ timeout: 120000 });
  let testValue: string;
  let testFileName: string;
  let caseNumber: string;
  test.beforeAll(async () => {
    // Set deterministic seed once per suite
    faker.seed(67890);
  });

  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
    // Generate fresh values per test for retry safety
    testValue = `${faker.person.firstName()}-${Date.now()}-w${process.env.TEST_WORKER_INDEX || '0'}`;
    testFileName = `${faker.string.alphanumeric(8)}-${Date.now()}.pdf`;
    logger.info('Generated test values', { testValue, testFileName, worker: process.env.TEST_WORKER_INDEX });

    await ensureAuthenticatedPage(page, 'SEARCH_EMPLOYMENT_CASE', { waitForSelector: 'exui-header' });
    await createCasePage.createCaseEmployment(TEST_DATA.V1.JURISDICTION, TEST_DATA.V1.CASE_TYPE);
    expect(await createCasePage.checkForErrorMessage(), 'Error message seen after creating employment case').toBe(false);
    caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
    logger.info('Created employment case', { caseNumber, testValue });
  });

  test('Check the documentV1 upload works as expected', async ({ createCasePage, caseDetailsPage, tableUtils }) => {
    await test.step('Start document upload process', async () => {
      await caseDetailsPage.selectCaseDetailsEvent(TEST_DATA.V1.ACTION);
    });

    await test.step('Upload a document to the case', async () => {
      await createCasePage.uploadEmploymentFile(testFileName, TEST_DATA.V1.FILE_TYPE, TEST_DATA.V1.FILE_CONTENT);
    });

    await test.step('Verify document was uploaded successfully', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Documents');
      await caseDetailsPage.caseActionGoButton.waitFor({ state: 'visible' });
      const table = await caseDetailsPage.getDocumentsList();
      expect(table.length, 'Documents table should contain at least 1 row').toBeGreaterThan(0);
      expect(table[0]).toMatchObject({
        Number: '1',
        Document: testFileName,
        'Document Category': 'Misc',
        'Type of Document': 'Other',
      });

      const documentsTable = caseDetailsPage.caseDocumentsTable.first();
      const parsedRows = await tableUtils.parseDataTable(documentsTable, caseDetailsPage.page);
      const hasUploadedDocument = parsedRows.some((row) => row.Document === testFileName);
      expect(hasUploadedDocument, 'TableUtils should find the uploaded document row').toBe(true);
    });
  });
});
