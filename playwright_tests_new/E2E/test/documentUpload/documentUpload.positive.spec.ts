import { faker } from '@faker-js/faker';
import { Response } from '@playwright/test';
import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { TEST_DATA } from './constants';
import { expectCaseBanner } from '../../utils';
import { createLogger } from '@hmcts/playwright-common';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';
import { createDivorceCase } from '../../utils/test-setup/journeys/divorceCaseJourneys';
import { createEmploymentCase, uploadEmploymentDraftDocument } from '../../utils/test-setup/journeys/employmentJourneys';

const logger = createLogger({ serviceName: 'document-upload-tests', format: 'pretty' });
const DOCUMENT_UPLOAD_SUBMIT_TIMEOUT_MS = 60_000;

test.describe('Document upload V2', { tag: ['@e2e', '@e2e-document-upload'] }, () => {
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
    await createDivorceCase(createCasePage, TEST_DATA.V2.JURISDICTION, TEST_DATA.V2.CASE_TYPE, testValue);
    caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
    logger.info('Created divorce case', { caseNumber, testValue });
  });

  test('Check the documentV2 upload works as expected', async ({ createCasePage, caseDetailsPage }) => {
    let caseDetailsUrl = '';

    await test.step('Verify case details tab does not contain an uploaded file', async () => {
      caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();
      await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME);
      const caseViewerTable = caseDetailsPage.page.getByRole('table', { name: 'case viewer table' });
      await caseViewerTable.waitFor({ state: 'visible' });
      const textFieldRow = caseViewerTable.getByRole('row', { name: TEST_DATA.V2.TEXT_FIELD_LABEL });
      await expect(textFieldRow).toContainText(testValue);
    });

    await test.step('Upload a document to the case', async () => {
      let successfulUpdateEventPosts = 0;
      const updateEventEndpointPattern = new RegExp(`/data/cases/${caseNumber}/events(?:\\?|$)`);
      const onResponse = (response: Response) => {
        if (response.request().method() !== 'POST') {
          return;
        }
        if (!updateEventEndpointPattern.test(response.url())) {
          return;
        }
        if (response.status() < 400) {
          successfulUpdateEventPosts += 1;
        }
      };
      caseDetailsPage.page.on('response', onResponse);
      try {
        await retryOnTransientFailure(
          async () => {
            await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME);
            await caseDetailsPage.selectCaseAction(TEST_DATA.V2.ACTION);
            await createCasePage.uploadFile(TEST_DATA.V2.FILE_NAME, TEST_DATA.V2.FILE_TYPE, TEST_DATA.V2.FILE_CONTENT);
            await createCasePage.clickContinueMultipleTimes(4);
            await createCasePage.clickSubmitAndWait('after uploading V2 document', {
              timeoutMs: DOCUMENT_UPLOAD_SUBMIT_TIMEOUT_MS,
              maxAutoAdvanceAttempts: 3,
            });
            await expect(caseDetailsPage.caseAlertSuccessMessage).toBeVisible({ timeout: 30_000 });
          },
          {
            maxAttempts: 2,
            onRetry: async () => {
              try {
                await caseDetailsPage.reopenCaseDetails(caseDetailsUrl);
              } catch (reopenError) {
                logger.warn('Failed to reopen case details during V2 document upload retry; trying direct goto', {
                  reopenError,
                  caseDetailsUrl,
                });
                await caseDetailsPage.page.goto(caseDetailsUrl);
              }
            },
          }
        );
      } finally {
        caseDetailsPage.page.off('response', onResponse);
      }
      expect(successfulUpdateEventPosts).toBe(1);
    });

    await test.step('Verify the document upload was successful', async () => {
      await expect
        .poll(
          async () => {
            const bannerVisible = await caseDetailsPage.caseAlertSuccessMessage.isVisible().catch(() => false);
            if (bannerVisible) {
              const bannerText = await caseDetailsPage.caseAlertSuccessMessage.innerText().catch(() => '');
              if (bannerText.includes(caseNumber) && bannerText.includes(`has been updated with event: ${TEST_DATA.V2.ACTION}`)) {
                return true;
              }
            }

            await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME).catch(() => undefined);
            const caseViewerTable = caseDetailsPage.page.getByRole('table', { name: 'case viewer table' });
            const tableVisible = await caseViewerTable.isVisible().catch(() => false);
            if (!tableVisible) {
              return false;
            }
            const documentRow = caseViewerTable.getByRole('row', { name: TEST_DATA.V2.DOCUMENT_FIELD_LABEL });
            const documentText = await documentRow.innerText().catch(() => '');
            return documentText.includes(TEST_DATA.V2.FILE_NAME);
          },
          { timeout: 45_000, intervals: [1_000, 2_000, 3_000] }
        )
        .toBe(true);

      const bannerVisible = await caseDetailsPage.caseAlertSuccessMessage.isVisible().catch(() => false);
      if (bannerVisible) {
        const bannerText = await caseDetailsPage.caseAlertSuccessMessage.innerText();
        expectCaseBanner(bannerText, caseNumber, `has been updated with event: ${TEST_DATA.V2.ACTION}`);
      }

      await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME);
      const caseViewerTable = caseDetailsPage.page.getByRole('table', { name: 'case viewer table' });
      await caseViewerTable.waitFor({ state: 'visible' });
      const textFieldRow = caseViewerTable.getByRole('row', { name: TEST_DATA.V2.TEXT_FIELD_LABEL });
      await expect(textFieldRow).toContainText(testValue);

      const documentRow = caseViewerTable.getByRole('row', { name: TEST_DATA.V2.DOCUMENT_FIELD_LABEL });
      await expect(documentRow).toContainText(TEST_DATA.V2.FILE_NAME);
    });
  });
});

test.describe('Document upload V1', { tag: ['@e2e', '@e2e-document-upload'] }, () => {
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
    await createEmploymentCase(createCasePage, TEST_DATA.V1.JURISDICTION, TEST_DATA.V1.CASE_TYPE);
    expect(await createCasePage.checkForErrorMessage(), 'Error message seen after creating employment case').toBe(false);
    caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
    logger.info('Created employment case', { caseNumber, testValue });
  });

  test('Check the documentV1 upload works as expected', async ({ createCasePage, caseDetailsPage, tableUtils }) => {
    await test.step('Start document upload process', async () => {
      await caseDetailsPage.selectCaseAction(TEST_DATA.V1.ACTION, {
        expectedLocator: createCasePage.page.locator('#documentCollection button'),
      });
    });

    await test.step('Upload a document to the case', async () => {
      await uploadEmploymentDraftDocument(createCasePage, testFileName, TEST_DATA.V1.FILE_TYPE, TEST_DATA.V1.FILE_CONTENT);
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
