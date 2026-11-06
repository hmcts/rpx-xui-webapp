import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Locator, Request } from '@playwright/test';
import { expect, test } from '../../fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { CaseFileViewPage } from '../../page-objects/pages/exui/caseFileView.po';
import { createLegacyEmploymentDocument } from '../../utils/test-setup/employmentDocumentFixture';
import {
  caseFieldValuesFromReadback,
  documentIdFromMetadata,
  documentXsrfHeaders,
  legacyDocumentFromUpload,
  readDocumentCase,
} from '../../utils/test-setup/documentAccessFixtures';

const pdf = readFileSync(
  path.resolve('playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf')
);

test.describe('Pending legacy document upload', { tag: ['@e2e', '@e2e-media-viewer', '@nightly'] }, () => {
  test.describe.configure({ timeout: 5 * 60_000 });
  test('previews and downloads a replacement document before submitting the event', async ({
    page,
    createCasePage,
    caseDetailsPage,
    identityLease,
  }, testInfo) => {
    const lease = await identityLease.acquire({ pool: 'SEARCH_EMPLOYMENT_CASE' });
    await applySessionCookies(page, lease.identity.userIdentifier);
    const filename = `pending-preview-${Date.now()}-w${testInfo.workerIndex}-r${testInfo.retry}.pdf`;
    const baseline = await createLegacyEmploymentDocument({
      page,
      createCasePage,
      caseDetailsPage,
      testInfo,
      fileName: `original-${filename}`,
      mimeType: 'application/pdf',
      content: Buffer.concat([pdf, Buffer.from('\n% Original document before replacement\n')]),
    });
    const caseNumber = baseline.caseId;
    const control = await page.request.get(baseline.binaryPath, {
      headers: await documentXsrfHeaders(page),
      failOnStatusCode: false,
      maxRedirects: 0,
    });
    expect(control.status()).toBe(200);
    expect(await control.body()).toEqual(baseline.expectedContent);
    const eventSubmissions: Request[] = [];
    const observeSubmission = (request: Request) => {
      if (request.method() === 'POST' && new URL(request.url()).pathname === `/data/cases/${caseNumber}/events`) {
        eventSubmissions.push(request);
      }
    };
    page.on('request', observeSubmission);
    try {
      const uploadField = page.locator('#documentCollection ccd-write-document-field').first();
      await caseDetailsPage.selectCaseAction('Upload Document', {
        expectedLocator: uploadField.getByRole('button', { name: baseline.document.document_filename, exact: true }),
        retry: false,
      });
      await expect(uploadField.getByRole('button', { name: baseline.document.document_filename, exact: true })).toBeVisible();
      const [chooser] = await Promise.all([page.waitForEvent('filechooser'), uploadField.locator('input[type="file"]').click()]);
      const [upload] = await Promise.all([
        page.waitForResponse(
          (response) =>
            response.request().method() === 'POST' &&
            /^\/documents(?:v2)?$/.test(new URL(response.url()).pathname) &&
            response.status() === 200
        ),
        chooser.setFiles({ name: filename, mimeType: 'application/pdf', buffer: pdf }),
      ]);
      expect(new URL(upload.url()).pathname, 'This regression must exercise an actual legacy upload').toBe('/documents');
      const document = legacyDocumentFromUpload(await upload.json());
      const documentId = documentIdFromMetadata(document);
      expect(documentId).not.toBe(baseline.documentId);
      expect(document.document_filename).toBe(filename);
      const binaryPath = `/documents/${encodeURIComponent(documentId)}/binary`;

      const previewAndDownload = async (action: Locator, phase: 'pending' | 'saved') => {
        const [viewer, binary] = await Promise.all([
          page.waitForEvent('popup'),
          page.context().waitForEvent('response', {
            predicate: (response) => response.request().method() === 'GET' && new URL(response.url()).pathname === binaryPath,
          }),
          action.click(),
        ]);
        try {
          await testInfo.attach(`${phase}-preview-response`, {
            body: JSON.stringify({
              status: binary.status(),
              contentType: binary.headers()['content-type'],
              eventSubmissions: eventSubmissions.length,
            }),
            contentType: 'application/json',
          });
          expect(binary.frame().page()).toBe(viewer);
          expect(new URL(binary.url()).origin).toBe(new URL(page.url()).origin);
          expect(binary.status(), 'An uploaded document must be previewable before its event is submitted').toBe(200);
          expect(binary.headers()['content-type']).toMatch(/^application\/pdf(?:;|$)/i);
          expect(await binary.body()).toEqual(pdf);
          const viewerPage = new CaseFileViewPage(viewer);
          await expect(viewer).toHaveTitle(`${filename} - View Document`);
          await expect(viewerPage.standaloneMediaViewPanel).toContainText('Case File View - Document Delivery Fixture');
          const [download] = await Promise.all([viewer.waitForEvent('download'), viewerPage.downloadDocument()]);
          expect(await download.failure()).toBeNull();
          expect(download.suggestedFilename()).toBe(filename);
          const savedFile = testInfo.outputPath(`${phase}-${filename}`);
          await download.saveAs(savedFile);
          expect(await readFile(savedFile)).toEqual(pdf);
        } finally {
          await viewer.close();
        }
      };

      await test.step('Preview the uploaded file while the event is still unsaved', async () => {
        const readback = await readDocumentCase(page.request, caseNumber);
        expect(readback.status()).toBe(200);
        const persisted = await readback.text();
        expect(persisted).toContain(baseline.documentId);
        expect(persisted).not.toContain(documentId);
        expect(eventSubmissions).toHaveLength(0);
        await previewAndDownload(uploadField.getByRole('button', { name: filename, exact: true }), 'pending');
        expect(eventSubmissions, 'Previewing and downloading must not submit the case event').toHaveLength(0);
      });

      await test.step('Submit the event and preview the persisted document', async () => {
        await createCasePage.clickSubmitAndWait('after previewing the pending employment upload', {
          timeoutMs: 60_000,
          maxAutoAdvanceAttempts: 1,
        });
        await createCasePage.waitForCaseDetails('after submitting the previewed employment upload');
        expect(eventSubmissions).toHaveLength(1);
        const readback = await readDocumentCase(page.request, caseNumber);
        expect(readback.status()).toBe(200);
        const fields = caseFieldValuesFromReadback(await readback.json(), caseNumber);
        expect(fields.documentCollection).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ value: expect.objectContaining({ uploadedDocument: expect.objectContaining(document) }) }),
          ])
        );
        await caseDetailsPage.selectCaseDetailsTab('Documents');
        await previewAndDownload(caseDetailsPage.getDocumentAction(filename), 'saved');
      });
    } finally {
      page.off('request', observeSubmission);
    }
  });
});
