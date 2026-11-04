import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Page } from '@playwright/test';

import { expect, test } from '../../fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { CaseFileViewPage } from '../../page-objects/pages/exui/caseFileView.po';
import { createCaseBoundDocument } from '../../utils/test-setup/documentAccessFixtures';
import { createLegacyEmploymentDocument } from '../../utils/test-setup/employmentDocumentFixture';
import { MediaViewerBackendMonitor } from '../../utils/test-setup/mediaViewerBackendMonitor';
import { observeMediaViewerLifecycle, readMediaViewerLifecycle } from '../../utils/test-setup/mediaViewerLifecycleObservation';

const FIXTURE_DIRECTORY = path.resolve(process.cwd(), 'playwright_tests_new/integration/testData/documents');
const PDF_CONTENT = readFileSync(path.join(FIXTURE_DIRECTORY, 'case-file-view-document-delivery.pdf'));
const HTML_CONTENT = readFileSync(path.join(FIXTURE_DIRECTORY, 'media-viewer-direct-open.html'));
const TXT_CONTENT = readFileSync(path.join(FIXTURE_DIRECTORY, 'media-viewer-converted-original.txt'));
const PDF_TEXT = 'Case File View - Document Delivery Fixture';
const CONVERTED_TEXT = 'EXUI-4461 original text document';
const MEDIA_VIEWER_TEST_TIMEOUT_MS = Number.parseInt(process.env.PW_MEDIA_VIEWER_TEST_TIMEOUT_MS ?? '', 10) || 300_000;

test.describe('Media Viewer happy path', { tag: ['@e2e', '@e2e-media-viewer', '@nightly'] }, () => {
  test.describe.configure({ timeout: MEDIA_VIEWER_TEST_TIMEOUT_MS });

  for (const gateway of ['legacy', 'v2'] as const) {
    test(`Downloads ${gateway} PDF from a fresh viewer and after reload`, async ({
      page,
      createCasePage,
      caseDetailsPage,
      identityLease,
    }, testInfo) => {
      const lease = await identityLease.acquire({
        pool: gateway === 'legacy' ? 'SEARCH_EMPLOYMENT_CASE' : 'DIVORCE_SOLICITOR',
      });
      await applySessionCookies(page, lease.identity.userIdentifier);
      const fileName = `media-viewer-${gateway}-${Date.now()}-w${testInfo.workerIndex}-r${testInfo.retry}.pdf`;
      const documentInput = {
        page,
        createCasePage,
        caseDetailsPage,
        testInfo,
        fileName,
        mimeType: 'application/pdf',
        content: PDF_CONTENT,
      };
      // Reuse the case profiles exercised by the existing legacy and v2 upload journeys.
      const fixture =
        gateway === 'legacy'
          ? await createLegacyEmploymentDocument(documentInput)
          : await createCaseBoundDocument({ ...documentInput, gateway });
      const browserBinaryPath = new URL(fixture.binaryPath, page.url()).pathname;
      if (gateway === 'legacy') {
        await caseDetailsPage.selectCaseDetailsTab('Documents');
      } else {
        await caseDetailsPage.waitForDocumentOneRowToContain(fileName);
      }
      const documentAction =
        gateway === 'legacy' ? caseDetailsPage.getDocumentAction(fileName) : caseDetailsPage.documentOneAction;
      await expect(documentAction).toBeVisible();

      await observeMediaViewerLifecycle(page.context());
      const monitor = new MediaViewerBackendMonitor(page.context());
      let viewerPage: Page | undefined;
      try {
        const freshAction = monitor.beginAction(fixture.documentId);
        const [opened] = await Promise.all([page.waitForEvent('popup'), documentAction.click()]);
        viewerPage = opened;
        const viewer = new CaseFileViewPage(opened);

        await test.step('Receive the real asynchronous handoff without stored viewer metadata', async () => {
          await expect(opened).toHaveURL(/\/media-viewer$/);
          await expect.poll(() => monitor.observationsFor(freshAction, opened).length).toBeGreaterThan(0);
          const observations = monitor.observationsFor(freshAction, opened);
          await testInfo.attach('fresh-viewer-binary-observations', {
            body: JSON.stringify(observations),
            contentType: 'application/json',
          });
          expect(observations[0].gateway, `Fixture capability: ${fixture.caseTypeId} must use the ${gateway} gateway`).toBe(
            gateway
          );
          for (const observation of observations) {
            expect(observation).toMatchObject({
              pathname: browserBinaryPath,
              gateway,
              documentId: fixture.documentId,
              status: 200,
              contentType: expect.stringContaining('application/pdf'),
            });
            const requestUrl = new URL(observation.url);
            expect(requestUrl.origin).toBe(new URL(page.url()).origin);
            if (requestUrl.searchParams.has('caseId')) {
              expect(requestUrl.searchParams.getAll('caseId')).toEqual([fixture.caseId]);
            }
          }
          await expect(viewer.standaloneMediaViewerToolbar).toBeVisible();
          await expect(viewer.standaloneMediaViewPanel).toContainText(PDF_TEXT);
          await expect(opened).toHaveTitle(`${fileName} - View Document`);
          const lifecycle = await readMediaViewerLifecycle(opened);
          await testInfo.attach('fresh-viewer-lifecycle', {
            body: JSON.stringify(lifecycle),
            contentType: 'application/json',
          });
          expect(lifecycle.observation?.initialMetadata).toBeNull();
          expect(lifecycle.observation?.handoffs).toContainEqual({
            sameOrigin: true,
            fromOpener: true,
            tokenMatches: true,
          });
          expect(lifecycle.storedMetadata).toMatchObject({
            document_filename: fileName,
            case_id: fixture.caseId,
            case_jurisdiction: fixture.jurisdictionId,
          });
          expect(new URL(lifecycle.storedMetadata!.document_binary_url!, opened.url()).pathname).toBe(browserBinaryPath);
        });

        for (const phase of ['fresh', 'reload'] as const) {
          await test.step(`Save and verify the ${phase} viewer download`, async () => {
            if (phase === 'reload') {
              const reloadAction = monitor.beginAction(fixture.documentId);
              const beforeReload = await readMediaViewerLifecycle(opened);
              await opened.reload({ waitUntil: 'domcontentloaded' });
              await expect(viewer.standaloneMediaViewPanel).toContainText(PDF_TEXT);
              await expect(opened).toHaveTitle(`${fileName} - View Document`);
              const afterReload = await readMediaViewerLifecycle(opened);
              await testInfo.attach('reload-viewer-lifecycle', {
                body: JSON.stringify(afterReload),
                contentType: 'application/json',
              });
              expect(afterReload.observation?.initialMetadata).toEqual(beforeReload.storedMetadata);
              expect(afterReload.observation?.handoffs).toEqual([]);
              expect(afterReload.storedMetadata).toEqual(beforeReload.storedMetadata);
              const observations = monitor.observationsFor(reloadAction, opened);
              await testInfo.attach('reload-binary-observations', {
                body: JSON.stringify({ observations, freshServerAuthorizationProven: false }),
                contentType: 'application/json',
              });
              // Browser caching may avoid a new request; rendered content and a new saved file still prove reload.
              for (const observation of observations) {
                expect(observation).toMatchObject({
                  pathname: browserBinaryPath,
                  gateway,
                  status: 200,
                });
                const requestUrl = new URL(observation.url);
                expect(requestUrl.origin).toBe(new URL(page.url()).origin);
                if (requestUrl.searchParams.has('caseId')) {
                  expect(requestUrl.searchParams.getAll('caseId')).toEqual([fixture.caseId]);
                }
              }
            }

            const [download] = await Promise.all([opened.waitForEvent('download'), viewer.downloadDocument()]);
            expect(await download.failure()).toBeNull();
            expect(download.suggestedFilename()).toBe(fileName);
            const savedFile = testInfo.outputPath(`${phase}-${fileName}`);
            await download.saveAs(savedFile);
            expect(await readFile(savedFile)).toEqual(PDF_CONTENT);
          });
        }
      } finally {
        monitor.dispose();
        if (viewerPage && !viewerPage.isClosed()) {
          await viewerPage.close();
        }
      }
    });
  }

  test('Downloads the original legacy TXT file after rendering its converted PDF', async ({
    page,
    createCasePage,
    caseDetailsPage,
    identityLease,
  }, testInfo) => {
    const lease = await identityLease.acquire({ pool: 'SEARCH_EMPLOYMENT_CASE' });
    await applySessionCookies(page, lease.identity.userIdentifier);
    const fileName = `converted-original-${Date.now()}-w${testInfo.workerIndex}-r${testInfo.retry}.txt`;
    const fixture = await createLegacyEmploymentDocument({
      page,
      createCasePage,
      caseDetailsPage,
      testInfo,
      fileName,
      mimeType: 'text/plain',
      content: TXT_CONTENT,
    });
    await caseDetailsPage.selectCaseDetailsTab('Documents');
    const documentAction = caseDetailsPage.getDocumentAction(fileName);
    await expect(documentAction).toBeVisible();
    let viewerPage: Page | undefined;
    try {
      const [opened, conversion] = await Promise.all([
        page.waitForEvent('popup'),
        page.context().waitForEvent('response', {
          predicate: (response) =>
            response.request().method() === 'POST' &&
            new URL(response.url()).pathname === `/doc-assembly/convert/${encodeURIComponent(fixture.documentId)}`,
        }),
        documentAction.click(),
      ]);
      viewerPage = opened;
      const viewer = new CaseFileViewPage(opened);

      await test.step('Render the genuinely converted PDF from the case-bound original', async () => {
        expect(conversion.frame().page()).toBe(opened);
        expect(new URL(conversion.url()).origin).toBe(new URL(page.url()).origin);
        expect(conversion.status()).toBe(200);
        expect(conversion.headers()['content-type']).toMatch(/^application\/pdf(?:;|$)/i);
        expect((await conversion.body()).subarray(0, 5).toString('ascii')).toBe('%PDF-');
        await expect(opened).toHaveURL(/\/media-viewer$/);
        await expect(opened).toHaveTitle(`${fileName} - View Document`);
        await expect(viewer.standaloneMediaViewerToolbar).toBeVisible();
        await expect(viewer.standaloneMediaViewPanel).toContainText(CONVERTED_TEXT);
        const lifecycle = await readMediaViewerLifecycle(opened);
        expect(lifecycle.storedMetadata).toMatchObject({
          document_filename: fileName,
          case_id: fixture.caseId,
          case_jurisdiction: fixture.jurisdictionId,
        });
        expect(new URL(lifecycle.storedMetadata!.document_binary_url!, opened.url()).pathname).toBe(
          `/documents/${encodeURIComponent(fixture.documentId)}/binary`
        );
      });

      await test.step('Save the original TXT bytes through the viewer Download action', async () => {
        const [download] = await Promise.all([opened.waitForEvent('download'), viewer.downloadDocument()]);
        expect(await download.failure()).toBeNull();
        expect(download.suggestedFilename()).toBe(fileName);
        const originalUrl = new URL(download.url());
        expect(originalUrl.origin).toBe(new URL(page.url()).origin);
        expect(originalUrl.pathname, 'Employment must download the original through the legacy gateway').toBe(
          `/documents/${encodeURIComponent(fixture.documentId)}/binary`
        );
        if (originalUrl.searchParams.has('caseId')) {
          expect(originalUrl.searchParams.getAll('caseId')).toEqual([fixture.caseId]);
        }
        const savedFile = testInfo.outputPath(fileName);
        await download.saveAs(savedFile);
        expect(await readFile(savedFile)).toEqual(TXT_CONTENT);

        // Playwright Download exposes no response headers; this same-session GET verifies the server MIME separately.
        const originalResponse = await opened.request.get(download.url(), { failOnStatusCode: false, maxRedirects: 0 });
        expect(originalResponse.status()).toBe(200);
        expect(originalResponse.headers()['content-type']).toMatch(/^text\/plain(?:;|$)/i);
        expect(await originalResponse.body()).toEqual(TXT_CONTENT);
        await testInfo.attach('converted-original-download', {
          body: JSON.stringify({
            conversion: { pathname: new URL(conversion.url()).pathname, contentType: conversion.headers()['content-type'] },
            nativeDownload: {
              pathname: originalUrl.pathname,
              search: originalUrl.search,
              filename: download.suggestedFilename(),
            },
            sameSessionMimeCheck: { status: originalResponse.status(), contentType: originalResponse.headers()['content-type'] },
            nativeDownloadResponseHeadersObserved: false,
          }),
          contentType: 'application/json',
        });
      });
    } finally {
      if (viewerPage && !viewerPage.isClosed()) {
        await viewerPage.close();
      }
    }
  });

  test('Opens a legacy HTML document directly without adding referrer or case context', async ({
    page,
    createCasePage,
    caseDetailsPage,
    identityLease,
  }, testInfo) => {
    const lease = await identityLease.acquire({ pool: 'SEARCH_EMPLOYMENT_CASE' });
    await applySessionCookies(page, lease.identity.userIdentifier);
    const fixture = await createLegacyEmploymentDocument({
      page,
      createCasePage,
      caseDetailsPage,
      testInfo,
      fileName: `direct-html-${Date.now()}-w${testInfo.workerIndex}-r${testInfo.retry}.html`,
      mimeType: 'text/html',
      content: HTML_CONTENT,
    });
    const browserBinaryPath = new URL(fixture.binaryPath, page.url()).pathname;
    await caseDetailsPage.selectCaseDetailsTab('Documents');
    const documentAction = caseDetailsPage.getDocumentAction(fixture.document.document_filename);
    await expect(documentAction).toBeVisible();
    const monitor = new MediaViewerBackendMonitor(page.context());
    let htmlPage: Page | undefined;
    try {
      const action = monitor.beginAction(fixture.documentId);
      const [opened] = await Promise.all([page.context().waitForEvent('page'), documentAction.click()]);
      htmlPage = opened;
      await expect.poll(() => monitor.observationsFor(action, opened).length).toBeGreaterThan(0);
      const observations = monitor.observationsFor(action, opened);
      await testInfo.attach('direct-html-binary-observations', {
        body: JSON.stringify(observations),
        contentType: 'application/json',
      });
      expect(observations).toHaveLength(1);
      expect(observations[0].gateway, `Fixture capability: ${fixture.caseTypeId} must use the legacy gateway`).toBe('legacy');
      await expect(opened).toHaveURL((url) => url.pathname === browserBinaryPath);
      await expect(opened.getByRole('heading', { name: 'Document access HTML fixture', exact: true })).toBeVisible();
      await expect(opened.getByText('EXUI-4461 synthetic direct-open document.', { exact: true })).toBeVisible();
      expect(await opened.evaluate(() => ({ referrer: document.referrer, hasOpener: !!window.opener }))).toEqual({
        referrer: '',
        hasOpener: false,
      });
      expect(observations[0]).toMatchObject({
        pathname: browserBinaryPath,
        gateway: 'legacy',
        status: 200,
        contentType: expect.stringContaining('text/html'),
        referer: '',
      });
      const requestUrl = new URL(observations[0].url);
      expect(requestUrl.origin).toBe(new URL(page.url()).origin);
      if (requestUrl.searchParams.has('caseId')) {
        expect(requestUrl.searchParams.getAll('caseId')).toEqual([fixture.caseId]);
      }
    } finally {
      monitor.dispose();
      if (htmlPage && !htmlPage.isClosed()) {
        await htmlPage.close();
      }
    }
  });
});
