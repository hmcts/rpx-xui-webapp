import { faker } from '@faker-js/faker';
import { Page, Response } from '@playwright/test';
import { expect, test } from '../../fixtures';
import { acceptAccessCookiesIfPresent, applySessionCookies, ensureSession } from '../../../common/sessionCapture';
import { CaseFileViewPage } from '../../page-objects/pages/exui/caseFileView.po';
import { buildCasePayloadFromTemplate } from '../../utils/test-setup/payloads/registry';
import { setupCaseForJourney } from '../../utils/test-setup/caseSetup';
import { uploadDocumentViaApi } from '../../utils/test-setup/uploadDocumentViaApi';
import { RuntimeUserAlias } from '../../utils/runtimeUserCredentials';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const JURISDICTION = 'DIVORCE';
const CASE_TYPE = 'xuiTestCaseType';
const MEDIA_VIEWER_ROUTE_PATTERN = /\/media-viewer(?:\?|$)/;
const DOCUMENT_BINARY_ROUTE_PATTERN = /\/documents(?:v2)?\/[^/]+\/binary$/;
const MEDIA_VIEWER_FIXTURE_PATH = path.resolve(
  process.cwd(),
  'playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf'
);
const MEDIA_VIEWER_FIXTURE_CONTENT = readFileSync(MEDIA_VIEWER_FIXTURE_PATH, 'latin1');
const SESSION_BOOTSTRAP_TIMEOUT_MS =
  Number.parseInt(process.env.PW_MEDIA_VIEWER_SESSION_BOOTSTRAP_TIMEOUT_MS ?? '', 10) || 300_000;

test.describe('Media Viewer happy path', { tag: ['@e2e', '@e2e-media-viewer'] }, () => {
  test.beforeAll(async ({}, testInfo) => {
    testInfo.setTimeout(SESSION_BOOTSTRAP_TIMEOUT_MS);
    await ensureSession(RuntimeUserAlias.DIVORCE_SOLICITOR);
  });

  test('Opens uploaded document in the Media Viewer end-to-end', async ({ page, createCasePage, caseDetailsPage }, testInfo) => {
    faker.seed(testInfo.retry + 1);
    const uniqueSuffix = `${Date.now()}-w${testInfo.workerIndex}-r${testInfo.retry}`;
    const documentFileName = `media-viewer-${uniqueSuffix}.pdf`;
    const caseMarker = `media-viewer-${faker.string.alphanumeric(8)}-${uniqueSuffix}`;

    await test.step('Apply solicitor session and open the app shell', async () => {
      await applySessionCookies(page, RuntimeUserAlias.DIVORCE_SOLICITOR);
      await page.goto('/');
      await acceptAccessCookiesIfPresent(page);
      await expect(caseDetailsPage.exuiHeader.header).toBeVisible();
    });

    await test.step('Create a case with a document for this test run', async () => {
      const uploadedDocument = await uploadDocumentViaApi({
        page,
        jurisdictionId: JURISDICTION,
        caseTypeId: CASE_TYPE,
        fileName: documentFileName,
        mimeType: 'application/pdf',
        fileContent: MEDIA_VIEWER_FIXTURE_CONTENT,
      });

      await setupCaseForJourney({
        scenario: 'media-viewer-divorce',
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPE,
        apiEventId: 'createCase',
        mode: 'api-required',
        apiPayload: buildCasePayloadFromTemplate('divorce.xui-test-case-type.create-case', {
          overrides: {
            TextField: caseMarker,
            DocumentUrl: uploadedDocument,
          },
        }),
        page,
        createCasePage,
        caseDetailsPage,
        testInfo,
      });
    });

    await test.step('Open the uploaded document from the case details tab', async () => {
      await caseDetailsPage.waitForDocumentOneRowToContain(documentFileName);
      await expect(caseDetailsPage.caseViewerTable).toBeVisible();
      await expect(caseDetailsPage.documentOneAction).toBeVisible();
    });

    await test.step('Validate the Media Viewer end-to-end happy path', async () => {
      const binaryResponses: string[] = [];
      const onResponse = (response: Response) => {
        if (response.request().method() !== 'GET') {
          return;
        }

        const pathname = new URL(response.url()).pathname;
        if (DOCUMENT_BINARY_ROUTE_PATTERN.test(pathname)) {
          binaryResponses.push(response.url());
        }
      };

      page.context().on('response', onResponse);
      let mediaPage: Page | undefined;
      try {
        mediaPage = await caseDetailsPage.openDocumentOneInMediaViewer();
        await mediaPage.waitForLoadState('domcontentloaded').catch(() => undefined);

        await expect.poll(() => binaryResponses.length).toBeGreaterThan(0);
        await expect.poll(() => binaryResponses.at(-1) ?? '').toMatch(DOCUMENT_BINARY_ROUTE_PATTERN);

        const resolvedMediaViewerPage = new CaseFileViewPage(mediaPage);
        await expect(mediaPage).toHaveURL(MEDIA_VIEWER_ROUTE_PATTERN);
        await expect.poll(async () => mediaPage.title()).toContain(`${documentFileName} - View Document`);
        await expect(resolvedMediaViewerPage.standaloneMediaViewerContainer).toBeVisible();
        await expect(resolvedMediaViewerPage.standaloneMediaViewerToolbar).toBeVisible();
        await expect(resolvedMediaViewerPage.standaloneMediaViewPanel).toBeVisible();
      } finally {
        page.context().off('response', onResponse);
        if (mediaPage && !mediaPage.isClosed()) {
          if (mediaPage === page) {
            await mediaPage.goto('about:blank').catch(() => undefined);
          } else {
            await mediaPage.close().catch(() => undefined);
          }
        }
      }
    });
  });
});
