import { readFileSync } from 'node:fs';
import path from 'node:path';

import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage, ensureSession } from '../../../common/sessionCapture';
import { buildCasePayloadFromTemplate } from '../../utils/test-setup/payloads/registry';
import { setupCaseForJourney } from '../../utils/test-setup/caseSetup';
import { createEmploymentCase, uploadEmploymentDraftDocumentViaApi } from '../../utils/test-setup/journeys/employmentJourneys';
import { formatErrorMessage, isDependencyEnvironmentFailure, retryOnTransientFailure } from '../../utils/transient-failure.utils';

const SESSION_BOOTSTRAP_TIMEOUT_MS = 300_000;
const SUITE_TIMEOUT_MS = 240_000;
const DOCUMENT_FILE_NAME = 'case-file-view-fixture.pdf';
const DOCUMENT_VIEWER_TEXT = 'Case File View - Document Delivery Fixture';
const DOCUMENT_CATEGORY_FOLDER = 'Miscellaneous';
const DOCUMENT_FILE_FOLDER_PATH = 'Miscellaneous.Other';
const DOCUMENT_MIME_TYPE = 'application/pdf';
const DOCUMENT_TOP_LEVEL_CATEGORY = 'Misc';
const DOCUMENT_SUBCATEGORY = 'Other';
const DOCUMENT_BUFFER = readFileSync(
  path.resolve(process.cwd(), 'playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf')
);

test.describe('Case file view', { tag: ['@e2e', '@e2e-case-file-view'] }, () => {
  test.describe.configure({ timeout: SUITE_TIMEOUT_MS });

  const jurisdiction = 'EMPLOYMENT';
  const caseType = 'ET_EnglandWales';
  let caseNumber: string;

  test.beforeAll(async ({ browserName: _browserName }, testInfo) => {
    testInfo.setTimeout(SESSION_BOOTSTRAP_TIMEOUT_MS);
    await ensureSession('SEARCH_EMPLOYMENT_CASE');
  });

  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }, testInfo) => {
    try {
      await retryOnTransientFailure(
        async () => {
          await ensureAuthenticatedPage(page, 'SEARCH_EMPLOYMENT_CASE', { waitForSelector: 'exui-header' });
          const setup = await setupCaseForJourney({
            scenario: 'case-file-view-employment',
            jurisdiction,
            caseType,
            apiEventId: 'initiateCase',
            mode: 'api-required',
            apiPayload: buildCasePayloadFromTemplate('employment.et-england-wales.initiate-case'),
            uiCreate: async () => {
              await createEmploymentCase(createCasePage, jurisdiction, caseType, {
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
    } catch (error) {
      if (isDependencyEnvironmentFailure(error)) {
        throw new Error(`Case file view setup failed due to dependency environment instability: ${formatErrorMessage(error)}`);
      }
      throw error;
    }
  });

  test('shows the uploaded file in the case file view and opens it in the viewer', async ({
    caseDetailsPage,
    caseFileViewPage,
    page,
  }) => {
    await test.step('Upload the document to the case', async () => {
      await uploadEmploymentDraftDocumentViaApi({
        page,
        caseNumber,
        fileName: DOCUMENT_FILE_NAME,
        mimeType: DOCUMENT_MIME_TYPE,
        fileContent: DOCUMENT_BUFFER,
        topLevelDocuments: DOCUMENT_TOP_LEVEL_CATEGORY,
        miscDocuments: DOCUMENT_SUBCATEGORY,
      });
      await caseDetailsPage.reopenCaseDetails(`/cases/case-details/${jurisdiction}/${caseType}/${caseNumber}`);
    });

    await test.step('Open the case file view and confirm the file tree is present', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();

      await expect(caseFileViewPage.treeContainer).toBeVisible();
      await expect(caseFileViewPage.mediaViewerContainer).toBeVisible();
      await expect(caseFileViewPage.documentHeader).toContainText('Documents (1)');
    });

    await test.step('Check the expected folder, file and document count', async () => {
      const folderNode = await caseFileViewPage.getFolderNode(DOCUMENT_CATEGORY_FOLDER);
      await expect(caseFileViewPage.getFolderName(folderNode)).toContainText(DOCUMENT_CATEGORY_FOLDER);
      await expect(caseFileViewPage.getFolderCount(folderNode)).toHaveText('1');
      await expect
        .poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder(DOCUMENT_FILE_FOLDER_PATH))
        .toEqual([DOCUMENT_FILE_NAME]);
    });

    await test.step('Open the uploaded document and verify the viewer content', async () => {
      await caseFileViewPage.clickFile(DOCUMENT_FILE_FOLDER_PATH, DOCUMENT_FILE_NAME);
      await caseFileViewPage.mediaViewPanel.waitFor({ state: 'visible' });
      await expect.poll(async () => (await caseFileViewPage.mediaViewPanel.textContent()) ?? '').toContain(DOCUMENT_VIEWER_TEXT);
    });
  });
});
