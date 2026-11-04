import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { expect, test } from '../../fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import type { CaseBoundDocument } from '../../utils/test-setup/documentAccessFixtures';
import { createLegacyEmploymentDocument } from '../../utils/test-setup/employmentDocumentFixture';
import { MediaViewerBackendMonitor } from '../../utils/test-setup/mediaViewerBackendMonitor';
import { formatErrorMessage, isDependencyEnvironmentFailure } from '../../utils/transient-failure.utils';

const DOCUMENT_FILE_NAME = 'case-file-view-fixture.pdf';
const DOCUMENT_VIEWER_TEXT = 'Case File View - Document Delivery Fixture';
const DOCUMENT_CATEGORY_FOLDER = 'Miscellaneous';
const DOCUMENT_FILE_FOLDER_PATH = 'Miscellaneous.Other';
const DOCUMENT_MIME_TYPE = 'application/pdf';
const CASE_FILE_VIEW_DOCUMENT_TEST_TIMEOUT_MS =
  Number.parseInt(process.env.PW_CASE_FILE_VIEW_DOCUMENT_TEST_TIMEOUT_MS ?? '', 10) || 300_000;
const DOCUMENT_BUFFER = readFileSync(
  path.resolve(process.cwd(), 'playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf')
);

test.describe('Case file view legacy', { tag: ['@e2e', '@e2e-case-file-view', '@nightly'] }, () => {
  test.describe.configure({ timeout: CASE_FILE_VIEW_DOCUMENT_TEST_TIMEOUT_MS });
  let fixture: CaseBoundDocument;

  test.beforeEach(async ({ page, createCasePage, caseDetailsPage, identityLease }, testInfo) => {
    try {
      const lease = await identityLease.acquire({ pool: 'SEARCH_EMPLOYMENT_CASE' });
      await applySessionCookies(page, lease.identity.userIdentifier);
      fixture = await createLegacyEmploymentDocument({
        page,
        createCasePage,
        caseDetailsPage,
        testInfo,
        fileName: DOCUMENT_FILE_NAME,
        mimeType: DOCUMENT_MIME_TYPE,
        content: DOCUMENT_BUFFER,
      });
    } catch (error) {
      if (isDependencyEnvironmentFailure(error)) {
        throw new Error(`Case file view setup failed due to dependency environment instability: ${formatErrorMessage(error)}`);
      }
      throw error;
    }
  });

  test('shows the uploaded file and downloads the selected document with matching bytes', async ({
    page,
    caseDetailsPage,
    caseFileViewPage,
  }, testInfo) => {
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

    const monitor = new MediaViewerBackendMonitor(page.context());
    try {
      await test.step('Open the selected document and verify its actual delivery gateway', async () => {
        const action = monitor.beginAction(fixture.documentId);
        await caseFileViewPage.clickFile(DOCUMENT_FILE_FOLDER_PATH, DOCUMENT_FILE_NAME);
        await expect.poll(() => monitor.observationsFor(action, page).length).toBeGreaterThan(0);
        const observations = monitor.observationsFor(action, page);
        const binaryPath = new URL(fixture.binaryPath, page.url()).pathname;
        await testInfo.attach('case-file-binary-observations', {
          body: JSON.stringify(observations),
          contentType: 'application/json',
        });
        expect(observations[0].gateway, `Fixture capability: ${fixture.caseTypeId} must use the legacy gateway`).toBe('legacy');
        expect(observations.every((entry) => entry.status === 200)).toBe(true);
        expect(observations[0]).toMatchObject({
          pathname: binaryPath,
          gateway: 'legacy',
          documentId: fixture.documentId,
          contentType: expect.stringContaining(DOCUMENT_MIME_TYPE),
        });
        const requestUrl = new URL(observations[0].url);
        expect(requestUrl.origin).toBe(new URL(page.url()).origin);
        if (requestUrl.searchParams.has('caseId')) {
          expect(requestUrl.searchParams.getAll('caseId')).toEqual([fixture.caseId]);
        }
        await expect(caseFileViewPage.mediaViewPanel).toContainText(DOCUMENT_VIEWER_TEXT);
      });

      await test.step('Download and verify the selected file', async () => {
        const [download] = await Promise.all([page.waitForEvent('download'), caseFileViewPage.downloadDocument()]);
        expect(await download.failure()).toBeNull();
        expect(download.suggestedFilename()).toBe(DOCUMENT_FILE_NAME);
        const savedFile = testInfo.outputPath(DOCUMENT_FILE_NAME);
        await download.saveAs(savedFile);
        expect(await readFile(savedFile)).toEqual(DOCUMENT_BUFFER);
      });
    } finally {
      monitor.dispose();
    }
  });
});
