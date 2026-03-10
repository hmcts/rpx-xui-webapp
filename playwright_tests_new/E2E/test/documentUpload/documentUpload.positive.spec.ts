import { faker } from '@faker-js/faker';
import { createLogger } from '@hmcts/playwright-common';

import { expect, test } from '../../fixtures';
import { expectCaseBanner } from '../../utils';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';
import { buildCasePayloadFromTemplate } from '../../utils/test-setup/payloads/registry';
import {
  provisionDynamicSolicitorForAlias,
  EMPLOYMENT_DYNAMIC_CASEWORKER_ROLES,
} from '../../utils/test-setup/dynamicSolicitorSession';
import { createEmploymentCase, uploadEmploymentDraftDocument } from '../../utils/test-setup/journeys/employmentJourneys';
import { uploadDocumentViaApi } from '../../utils/test-setup/uploadDocumentViaApi';
import { setupCaseForJourney } from '../../utils/test-setup/caseSetup';

import { TEST_DATA } from './constants';

const logger = createLogger({ serviceName: 'document-upload-tests', format: 'pretty' });
const DOCUMENT_UPLOAD_SUBMIT_TIMEOUT_MS = 60_000;

async function withTimeout<T>(action: Promise<T>, timeoutMs: number, timeoutMessage: string): Promise<T> {
  let timeoutHandle: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      action,
      new Promise<T>((_, reject) => {
        timeoutHandle = setTimeout(() => {
          reject(new Error(timeoutMessage));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
  }
}

test.describe('Document upload V2', () => {
  test.describe.configure({ timeout: 600000 });
  let testValue: string;
  let caseNumber: string;

  test.beforeAll(async () => {
    faker.seed(12345);
  });

  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }, testInfo) => {
    testValue = `${faker.person.firstName()}-${Date.now()}-w${process.env.TEST_WORKER_INDEX || '0'}`;
    logger.info('Generated test value', { testValue, worker: process.env.TEST_WORKER_INDEX });

    await retryOnTransientFailure(
      async () => {
        await withTimeout(
          (async () => {
            await ensureAuthenticatedPage(page, 'SOLICITOR', { waitForSelector: 'exui-header' });
            const seededComplexTypeDocument = await uploadDocumentViaApi({
              page,
              jurisdictionId: TEST_DATA.V2.JURISDICTION,
              caseTypeId: TEST_DATA.V2.CASE_TYPE,
              fileName: 'seed.pdf',
              mimeType: 'application/pdf',
              fileContent: '%PDF-1.4\n%seed\n%%EOF',
            });
            const setup = await setupCaseForJourney({
              scenario: 'document-upload-v2-divorce',
              jurisdiction: TEST_DATA.V2.JURISDICTION,
              caseType: TEST_DATA.V2.CASE_TYPE,
              apiEventId: 'createCase',
              mode: 'api-required',
              apiPayload: buildCasePayloadFromTemplate('divorce.xui-test-case-type.create-case', {
                overrides: {
                  TextField: testValue,
                  ComplexType_3: {
                    document: seededComplexTypeDocument,
                  },
                },
              }),
              uiCreate: async () => {
                throw new Error('UI fallback should not be used for document-upload-v2-divorce');
              },
              page,
              createCasePage,
              caseDetailsPage,
              testInfo,
            });
            caseNumber = setup.caseNumber;
            logger.info('Created divorce case', { caseNumber, testValue });
          })(),
          120_000,
          'Document upload V2 setup exceeded 120000ms while creating a case'
        );
      },
      {
        maxAttempts: 2,
        onRetry: async () => {
          if (page.isClosed()) {
            return;
          }
          await page.goto('/').catch(() => undefined);
        },
      }
    );
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
      await retryOnTransientFailure(
        async () => {
          await caseDetailsPage.selectCaseDetailsTab(TEST_DATA.V2.TAB_NAME);
          await caseDetailsPage.selectCaseAction(TEST_DATA.V2.ACTION, {
            expectedLocator: createCasePage.fileUploadInput,
            timeoutMs: 30_000,
          });
          await createCasePage.uploadFile(TEST_DATA.V2.FILE_NAME, TEST_DATA.V2.FILE_TYPE, TEST_DATA.V2.FILE_CONTENT);
          await continueToUpdateCasePage(caseDetailsPage.page, createCasePage, 2);
          await continueToUpdateCasePage(caseDetailsPage.page, createCasePage, 3);
          await continueToUpdateCasePage(caseDetailsPage.page, createCasePage, 4);
          await continueToUpdateCaseSubmitPage(caseDetailsPage.page, createCasePage);
          await createCasePage.clickSubmitAndWait('after uploading V2 document', {
            timeoutMs: DOCUMENT_UPLOAD_SUBMIT_TIMEOUT_MS,
            maxAutoAdvanceAttempts: 1,
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

async function continueToUpdateCasePage(
  page: {
    url: () => string;
    waitForURL: (matcher: (url: URL) => boolean, options?: { timeout?: number }) => Promise<void>;
    waitForTimeout: (timeout: number) => Promise<void>;
  },
  createCasePage: { clickContinueAndWaitForNext: (context: string) => Promise<void> },
  pageNumber: number
) {
  const expectedPath = `/trigger/updateCase/updateCasePage_${pageNumber}`;
  await continueToExpectedPath(page, createCasePage, expectedPath, `navigating to update case page ${pageNumber}`);
}

async function continueToUpdateCaseSubmitPage(
  page: {
    url: () => string;
    waitForURL: (matcher: (url: URL) => boolean, options?: { timeout?: number }) => Promise<void>;
    waitForTimeout: (timeout: number) => Promise<void>;
  },
  createCasePage: { clickContinueAndWaitForNext: (context: string) => Promise<void> }
) {
  await continueToExpectedPath(page, createCasePage, '/trigger/updateCase/submit', 'navigating to update case submit page');
}

async function continueToExpectedPath(
  page: {
    url: () => string;
    waitForURL: (matcher: (url: URL) => boolean, options?: { timeout?: number }) => Promise<void>;
    waitForTimeout: (timeout: number) => Promise<void>;
  },
  createCasePage: { clickContinueAndWaitForNext: (context: string) => Promise<void> },
  expectedPath: string,
  context: string
) {
  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (page.url().includes(expectedPath)) {
      return;
    }

    try {
      await Promise.all([
        page.waitForURL((url: URL) => url.pathname.includes(expectedPath), { timeout: 30_000 }),
        createCasePage.clickContinueAndWaitForNext(`${context} (attempt ${attempt})`),
      ]);
      return;
    } catch (error) {
      if (page.url().includes(expectedPath)) {
        return;
      }
      if (attempt === maxAttempts) {
        throw error;
      }
      await page.waitForTimeout(2_000);
    }
  }
}

test.describe('Document upload V1', () => {
  test.describe.configure({ timeout: 600000 });
  let testValue: string;
  let testFileName: string;
  let caseNumber: string;
  let dynamicHandle: Awaited<ReturnType<typeof provisionDynamicSolicitorForAlias>> | undefined;

  test.beforeAll(async () => {
    faker.seed(67890);
  });

  test.beforeEach(async ({ page, createCasePage, caseDetailsPage, professionalUserUtils }, testInfo) => {
    dynamicHandle = await provisionDynamicSolicitorForAlias({
      alias: 'EMPLOYMENT_DYNAMIC_CASEWORKER',
      professionalUserUtils,
      roleNames: EMPLOYMENT_DYNAMIC_CASEWORKER_ROLES,
      roleContext: {
        jurisdiction: 'employment',
        testType: 'case-create',
      },
      testInfo,
    });

    testValue = `${faker.person.firstName()}-${Date.now()}-w${process.env.TEST_WORKER_INDEX || '0'}`;
    testFileName = `${faker.string.alphanumeric(8)}-${Date.now()}.pdf`;
    logger.info('Generated test values', { testValue, testFileName, worker: process.env.TEST_WORKER_INDEX });

    await retryOnTransientFailure(
      async () => {
        await ensureAuthenticatedPage(page, dynamicHandle!.sessionIdentity, { waitForSelector: 'exui-header' });
        const setup = await setupCaseForJourney({
          scenario: 'document-upload-v1-employment',
          jurisdiction: TEST_DATA.V1.JURISDICTION,
          caseType: TEST_DATA.V1.CASE_TYPE,
          mode: 'ui-only',
          uiCreate: async () => {
            await createEmploymentCase(createCasePage, TEST_DATA.V1.JURISDICTION, TEST_DATA.V1.CASE_TYPE, {
              allowDraftClaimFallback: true,
            });
          },
          page,
          createCasePage,
          caseDetailsPage,
          testInfo,
        });
        caseNumber = setup.caseNumber;
      },
      {
        maxAttempts: 2,
        onRetry: async () => {
          if (page.isClosed()) {
            return;
          }
          await page.goto('/').catch(() => undefined);
        },
      }
    );
    expect(await createCasePage.checkForErrorMessage(), 'Error message seen after creating employment case').toBe(false);
    logger.info('Created employment case', { caseNumber, testValue });
  });

  test.afterEach(async () => {
    dynamicHandle = undefined;
  });

  test('Check the documentV1 upload works as expected', async ({ createCasePage, caseDetailsPage, tableUtils }) => {
    await test.step('Start document upload process', async () => {
      await caseDetailsPage.selectCaseAction(TEST_DATA.V1.ACTION, {
        expectedPath: '/trigger/',
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
